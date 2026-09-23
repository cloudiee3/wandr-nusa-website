// Builds the site for publishing as a Claude Artifact preview.
//
// Two things differ from the Netlify build:
//   • base is "./" — an artifact page can sit at a subpath, so every asset URL
//     is relative and nothing may start with "/".
//   • routing is hash-based — artifact hosting serves static files with no
//     rewrite rule, so /journeys/x would 404 on refresh.
//
// The page itself is written without <html>/<head>/<body>: the Artifact
// platform wraps the file in its own skeleton at publish time.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const OUT = 'dist-artifact'

execFileSync('npx', ['vite', 'build', '--outDir', OUT, '--base', './'], {
  stdio: 'inherit',
  env: { ...process.env, VITE_HASH_ROUTER: '1' },
})

// Anything Vite left rooted at "/" would escape the artifact's subpath.
const toRelative = (css) => css.replace(/url\(\s*\/(?!\/)/g, 'url(')

let fixed = 0
for (const f of readdirSync(path.join(OUT, 'assets'))) {
  if (!f.endsWith('.css')) continue
  const p = path.join(OUT, 'assets', f)
  const before = readFileSync(p, 'utf8')
  const after = toRelative(before)
  if (after !== before) { writeFileSync(p, after); fixed++ }
}

// Pull the hashed bundle names out of Vite's index.html.
const built = readFileSync(path.join(OUT, 'index.html'), 'utf8')
const js = built.match(/src="\.?\/?(assets\/[^"]+\.js)"/)?.[1]
const css = built.match(/href="\.?\/?(assets\/[^"]+\.css)"/)?.[1]
if (!js || !css) throw new Error('could not find built asset names in index.html')

mkdirSync('artifact', { recursive: true })
writeFileSync('artifact/index.html', `<title>Wandr Nusa Travel</title>
<meta name="description" content="Small-group and private journeys through Lombok, Mount Rinjani, Nusa Penida and the Gilis." />

<link rel="stylesheet" href="${css}" />
<style>
  /* The artifact skeleton ships a small reset of its own; these three lines
     hand the page back to the site's own styling. */
  :root { padding: 0; color-scheme: light; }
  body { margin: 0; background: #FFFFFF; }
  #root { isolation: isolate; }
</style>

<div id="root"></div>
<script type="module" src="${js}"></script>
`)

// Everything Vite emitted, minus the files the artifact shell replaces.
const files = []
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else files.push(path.relative(OUT, full))
  }
}
walk(OUT)
const publish = files.filter((f) => f !== 'index.html' && f !== '_redirects')

writeFileSync('artifact/files.json', JSON.stringify(publish, null, 2))
console.log(`\nrewrote ${fixed} css file(s) to relative urls`)
console.log(`page  : artifact/index.html  -> ${js} + ${css}`)
console.log(`files : ${publish.length} supporting files`)
