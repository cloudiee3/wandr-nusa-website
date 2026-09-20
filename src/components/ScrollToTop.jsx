import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** React Router keeps scroll position between routes; this resets it. */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}
