import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// The Artifact preview is served as static files with no rewrite rule, so deep
// links there have to live in the hash. The deployed site uses real paths.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

// Scroll reveals only hide their content once we know JS is running.
document.documentElement.classList.add('js-reveal')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
