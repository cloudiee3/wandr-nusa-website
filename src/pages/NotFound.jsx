import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Img from '../components/Img'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Img name="volcanic-plain" priority sizes="100vw" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-ink-900/75" />

      <div className="wrap relative text-center">
        <p className="label-light">Error 404</p>
        <h1 className="mx-auto mt-4 max-w-xl text-[2.4rem] leading-[1.08] !text-white sm:text-[3.4rem]">
          This track doesn't <span className="flourish-light">go anywhere</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-white/65">
          The page you're after has moved or never existed. The map below still works.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-accent">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Back home
          </Link>
          <Link to="/journeys" className="btn-ghost-light">Browse journeys</Link>
        </div>
      </div>
    </section>
  )
}
