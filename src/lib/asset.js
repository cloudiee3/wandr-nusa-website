// Site assets (photos, logos) live in public/ and are normally served from the
// site root. In the Artifact preview build the page can sit at a subpath, so
// Vite's BASE_URL becomes "./" and every asset URL has to go through here.
const BASE = import.meta.env.BASE_URL || '/'

export const asset = (path) => BASE + String(path).replace(/^\/+/, '')
