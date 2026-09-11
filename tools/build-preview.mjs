/* ==========================================================================
   wandrnusa — single-file build
   --------------------------------------------------------------------------
   Inlines the whole site into one .html that runs with no server: CSS inlined,
   ES modules bundled, every asset embedded as a data URI.

   Run:  node tools/build-preview.mjs [outfile]

   Useful for sending someone a clickable preview, opening the site offline, or
   checking it without running a local server. It is NOT what you deploy — the
   real site ships as separate files so the browser can cache them.
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.argv[2] || path.join(ROOT, 'preview', 'wandrnusa-preview.html');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

/* ---- 1. Bundle the ES modules ------------------------------------------ */
/* Each module is wrapped in its own function and reached through a tiny
   registry, so nothing collides in a shared scope no matter how many files
   get added later. Only the import/export forms this codebase actually uses
   are supported — anything else throws rather than emitting broken output. */

const JS_ROOT = path.join(ROOT, 'js');
const modules = new Map();

function loadModule(id) {
  if (modules.has(id)) return;
  const file = path.join(JS_ROOT, id);
  if (!fs.existsSync(file)) throw new Error(`module not found: ${id}`);
  let src = fs.readFileSync(file, 'utf8');
  const deps = [];

  // import { a, b } from './x.js';   (single- or multi-line)
  src = src.replace(/^import\s*\{([\s\S]*?)\}\s*from\s*['"](.+?)['"];?\s*$/gm, (_m, names, spec) => {
    const depId = path.posix.normalize(path.posix.join(path.posix.dirname(id), spec));
    deps.push(depId);
    const clean = names.split(',').map((n) => n.trim()).filter(Boolean).join(', ');
    return `const { ${clean} } = __req(${JSON.stringify(depId)});`;
  });

  // Anything else beginning with `import` is a form we do not handle.
  const stray = src.match(/^\s*import\s.+$/m);
  if (stray) throw new Error(`${id}: unsupported import form → ${stray[0].trim()}`);

  // export const X = …  /  export function f() {…}
  const exported = [];
  src = src.replace(/^export\s+(const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/gm, (_m, kw, name) => {
    exported.push(name);
    return `${kw} ${name}`;
  });

  const leftover = src.match(/^\s*export\s.+$/m);
  if (leftover) throw new Error(`${id}: unsupported export form → ${leftover[0].trim()}`);

  modules.set(id, { src, exported });
  deps.forEach(loadModule);
}

loadModule('main.js');

const bundle = `
const __mods = {};
const __cache = {};
function __def(id, fn) { __mods[id] = fn; }
function __req(id) {
  if (id in __cache) return __cache[id];
  const fn = __mods[id];
  if (!fn) throw new Error('missing module: ' + id);
  const exports = (__cache[id] = {});
  fn(exports, __req);
  return exports;
}
${[...modules].map(([id, m]) => `
__def(${JSON.stringify(id)}, function (__exports, __req) {
${m.src}
Object.assign(__exports, { ${m.exported.join(', ')} });
});`).join('\n')}
__req('main.js');
`;

/* ---- 2. Inline the stylesheets ------------------------------------------ */

let html = read('index.html');
const cssFiles = [...html.matchAll(/<link rel="stylesheet" href="(css\/[^"]+)">/g)].map((m) => m[1]);
if (!cssFiles.length) throw new Error('no local stylesheets found in index.html');
const css = cssFiles.map((f) => `/* ${f} */\n${read(f)}`).join('\n');

/* Replacement text is passed as a FUNCTION on purpose. With a plain string,
   `String.replace` treats `$$` as an escape for a literal `$` — which silently
   rewrote every `$$(...)` selector helper in the bundle into `$(...)`. */
html = html.replace(/\s*<link rel="stylesheet" href="css\/[^"]+">/g, '');
html = html.replace('</head>', () => `  <style>\n${css}\n  </style>\n</head>`);
html = html.replace(/\s*<script type="module" src="js\/main\.js"><\/script>/,
  () => `\n  <script type="module">\n${bundle}\n  </script>`);

/* ---- 3. Embed every asset ----------------------------------------------- */

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
               '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif' };
const seen = new Map();
let missing = 0;

html = html.replace(/assets\/[A-Za-z0-9/_.-]+\.(png|jpe?g|svg|webp|avif)/g, (rel) => {
  if (seen.has(rel)) return seen.get(rel);
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { missing++; seen.set(rel, rel); return rel; }
  const mime = MIME[path.extname(rel).toLowerCase()];
  const uri = `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
  seen.set(rel, uri);
  return uri;
});

/* ---- 4. Optional fragment form ------------------------------------------
   Some hosts (Claude Artifacts among them) supply their own
   <!doctype>/<html>/<head>/<body> skeleton and expect page content only.
   `--fragment` drops the document wrapper and the tags that host provides,
   keeping <title>, <style>, the markup and the script. */

if (process.argv.includes('--fragment')) {
  const title = (html.match(/<title>[\s\S]*?<\/title>/) || [''])[0];
  const style = (html.match(/<style>[\s\S]*?<\/style>/) || [''])[0];
  const fonts = [...html.matchAll(/<link rel="(?:preconnect|stylesheet)"[^>]*fonts\.g[^>]*>/g)].map((m) => m[0]).join('\n  ');
  const ld = (html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/) || [''])[0];
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/) || [, ''])[1];
  // the bundled module sits in <head>, so pull it across explicitly
  const script = (html.match(/<script type="module">[\s\S]*?<\/script>/) || [''])[0];
  html = `${title}\n  ${fonts}\n  ${style}\n${ld}\n${body}\n${script}`;
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);

/* Sanity check: every name a module exports must appear intact in the output.
   Cheap, and it catches escaping damage like the one above immediately. */
const emitted = fs.readFileSync(OUT, 'utf8');
for (const [id, m] of modules) {
  for (const name of m.exported) {
    if (!emitted.includes(name)) throw new Error(`export "${name}" from ${id} did not survive bundling`);
  }
}

const kb = fs.statSync(OUT).size / 1024;
console.log(`modules bundled : ${modules.size}`);
console.log(`stylesheets     : ${cssFiles.length}`);
console.log(`assets embedded : ${[...seen.values()].filter((v) => v.startsWith('data:')).length}` +
            (missing ? `  (${missing} path(s) not on disk, left as-is)` : ''));
console.log(`written         : ${path.relative(ROOT, OUT)}  ${(kb / 1024).toFixed(2)} MB`);
