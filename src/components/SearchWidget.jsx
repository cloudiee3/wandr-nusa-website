import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarDays, Globe, Users } from 'lucide-react'
import { destinations } from '../data/destinations'

const TABS = [
  { id: 'journeys', label: 'Journeys' },
  { id: 'day', label: 'Day trips' },
  { id: 'custom', label: 'Custom' },
]

// A realistic default window a few months out, so the widget doesn't open empty.
const iso = (d) => d.toISOString().slice(0, 10)

/** "Sun, 20 Sep 2026" — native date inputs render in the OS locale, which we
 *  don't control, so the readable value is drawn over a transparent input. */
const pretty = (value) => {
  const d = new Date(value)
  return Number.isNaN(+d)
    ? 'Pick a date'
    : d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}
const plusDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return iso(d)
}

export default function SearchWidget() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('journeys')
  const [dest, setDest] = useState('')
  const [from, setFrom] = useState(plusDays(90))
  const [to, setTo] = useState(plusDays(97))
  const [people, setPeople] = useState('2')

  function submit(e) {
    e.preventDefault()
    if (tab === 'custom') {
      navigate(`/journeys/custom-private-journey?from=${from}&to=${to}&people=${people}`)
      return
    }
    const q = new URLSearchParams({ kind: tab, from, to, people })
    if (dest) q.set('dest', dest)
    navigate(`/journeys?${q}`)
  }

  return (
    <form
      onSubmit={submit}
      className="w-full rounded-3xl border border-white/20 bg-white/[0.12] p-5 shadow-[0_24px_70px_-24px_rgba(1,15,31,0.7)] backdrop-blur-2xl sm:p-7"
    >
      <h2 className="text-[1.45rem] !text-white">Find your island</h2>

      {/* what kind of trip */}
      <div
        role="tablist"
        aria-label="Trip type"
        className="mt-5 grid grid-cols-3 gap-1 rounded-full bg-white/15 p-1"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full py-2.5 text-[0.85rem] transition-all duration-300 ${
              tab === t.id ? 'bg-white font-medium text-ink shadow-sm' : 'text-white/75 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="field-label" htmlFor="sw-dest">Destination</label>
        <div className="field">
          <Globe className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
          <select id="sw-dest" value={dest} onChange={(e) => setDest(e.target.value)}>
            <option value="">Anywhere we go</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <DateField id="sw-from" label="Arrive" value={from} min={iso(new Date())} onChange={setFrom} />
        <DateField id="sw-to" label="Leave" value={to} min={from} onChange={setTo} />
      </div>

      <div className="mt-5">
        <label className="field-label" htmlFor="sw-people">Travellers</label>
        <div className="field">
          <Users className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
          <select id="sw-people" value={people} onChange={(e) => setPeople(e.target.value)}>
            {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => (
              <option key={n} value={n}>{n} {n === '1' ? 'traveller' : 'travellers'}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn mt-7 w-full bg-ink py-4 text-white hover:bg-ink-600">
        Explore now <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </button>

      <p className="mt-3 text-center text-[11.5px] text-white/55">
        No payment now — we reply with a routed plan and the real cost.
      </p>
    </form>
  )
}

function DateField({ id, label, value, min, onChange }) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="field relative">
        <CalendarDays className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
        <span aria-hidden="true" className="truncate">{pretty(value)}</span>
        <input
          id={id}
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  )
}
