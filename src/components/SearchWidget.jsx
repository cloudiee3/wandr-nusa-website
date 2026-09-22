import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BedDouble, Car, Globe, Minus, Plus, Users } from 'lucide-react'
import { destinations, optionValue, searchGroups } from '../data/destinations'
import { pickupPoints, stayAreas } from '../data/site'
import { DateRangeFields, SingleDateField, addDays, toISO, usePopover } from './DatePicker'

const TABS = [
  { id: 'journeys', label: 'Journeys' },
  { id: 'transport', label: 'Transport' },
  { id: 'stays', label: 'Stays' },
]

const plusDays = (n) => addDays(toISO(new Date()), n)

export default function SearchWidget() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('journeys')

  const [dest, setDest] = useState('')
  const [from, setFrom] = useState(() => plusDays(90))
  const [to, setTo] = useState(() => plusDays(97))
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const [pickup, setPickup] = useState(pickupPoints[0])
  const [dropoff, setDropoff] = useState(pickupPoints[3])
  const [area, setArea] = useState(stayAreas[0])

  function submit(e) {
    e.preventDefault()
    const people = { adults: String(adults), children: String(children) }

    if (tab === 'transport') {
      navigate(`/contact?${new URLSearchParams({ type: 'transport', pickup, dropoff, date: from, ...people })}`)
      return
    }
    if (tab === 'stays') {
      navigate(`/contact?${new URLSearchParams({ type: 'stay', area, from, to, ...people })}`)
      return
    }
    if (dest === 'custom') {
      navigate(`/journeys/custom-private-journey?from=${from}&to=${to}&adults=${adults}&children=${children}`)
      return
    }
    const q = new URLSearchParams({ kind: 'journeys', from, to, ...people })
    // A destination slug filters the catalogue; a "place:" option is somewhere
    // we don't run a fixed departure yet, so the journeys page offers to plan it.
    if (dest.startsWith('place:')) q.set('place', dest.slice(6))
    else if (dest) q.set('dest', dest)
    navigate(`/journeys?${q}`)
  }

  return (
    <form
      onSubmit={submit}
      className="w-full rounded-3xl border border-white/20 bg-white/[0.13] p-5 shadow-[0_24px_70px_-24px_rgba(1,15,31,0.7)] backdrop-blur-2xl sm:p-7"
    >
      <h2 className="text-[1.5rem] !text-white">Find the best Places</h2>

      <div role="tablist" aria-label="What are you looking for" className="mt-5 grid grid-cols-3 gap-1 rounded-full bg-white/15 p-1">
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

      {tab === 'journeys' && (
        <>
          <Row label="Destination" htmlFor="sw-dest">
            <div className="field">
              <Globe className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
              <select id="sw-dest" value={dest} onChange={(e) => setDest(e.target.value)}>
                <option value="">Anywhere we go</option>
                {searchGroups.map((g) => (
                  <optgroup key={g.region} label={g.region}>
                    {g.options.map((o) => (
                      <option key={o.label} value={optionValue(o)}>{o.label}</option>
                    ))}
                  </optgroup>
                ))}
                <option value="custom">Custom / Request a trip</option>
              </select>
            </div>
          </Row>
          <DateRangeFields {...{ from, to, setFrom, setTo }} labels={['Arrive', 'Leave']} />
          <GuestsRow label="Travellers" {...{ adults, children, setAdults, setChildren }} />
        </>
      )}

      {tab === 'transport' && (
        <>
          <Row label="Pick-up" htmlFor="sw-pickup">
            <div className="field">
              <Car className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
              <select id="sw-pickup" value={pickup} onChange={(e) => setPickup(e.target.value)}>
                {pickupPoints.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </Row>
          <Row label="Drop-off" htmlFor="sw-dropoff">
            <div className="field">
              <Globe className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
              <select id="sw-dropoff" value={dropoff} onChange={(e) => setDropoff(e.target.value)}>
                {pickupPoints.map((p) => <option key={p} value={p}>{p}</option>)}
                {destinations.map((d) => <option key={d.slug} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </Row>
          <SingleDateField label="Date" value={from} onChange={setFrom} />
          <GuestsRow label="Passengers" {...{ adults, children, setAdults, setChildren }} />
        </>
      )}

      {tab === 'stays' && (
        <>
          <Row label="Area" htmlFor="sw-area">
            <div className="field">
              <BedDouble className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
              <select id="sw-area" value={area} onChange={(e) => setArea(e.target.value)}>
                {stayAreas.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </Row>
          <DateRangeFields {...{ from, to, setFrom, setTo }} labels={['Check-in', 'Check-out']} />
          <GuestsRow label="Guests" {...{ adults, children, setAdults, setChildren }} />
        </>
      )}

      <button type="submit" className="btn mt-7 w-full bg-ink-900 py-4 text-white hover:bg-ink">
        Wander Now <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </button>

      <p className="mt-3 text-center text-[11.5px] text-white/55">
        No payment now — we reply with a routed plan and the real cost.
      </p>
    </form>
  )
}

const Row = ({ label, htmlFor, children }) => (
  <div className="mt-5">
    <label className="field-label" htmlFor={htmlFor}>{label}</label>
    {children}
  </div>
)

const GuestsRow = (props) => (
  <div className="mt-5">
    <GuestsField {...props} />
  </div>
)

/** Single field reading "2 Adults, 0 Children", with steppers behind it. */
function GuestsField({ label, adults, children, setAdults, setChildren }) {
  const [open, setOpen] = useState(false)
  const { box, drop } = usePopover(open, () => setOpen(false), 170)

  const summary = `${adults} ${adults === 1 ? 'Adult' : 'Adults'}, ${children} ${children === 1 ? 'Child' : 'Children'}`

  return (
    <div ref={box} className="relative">
      <span className="field-label">{label}</span>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="field text-left">
        <Users className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
        <span className="truncate">{summary}</span>
      </button>

      {open && (
        <div className={`absolute inset-x-0 z-30 rounded-2xl bg-white p-4 shadow-lift ${drop}`}>
          <Stepper label="Adults" min={1} value={adults} onChange={setAdults} />
          <Stepper label="Children" min={0} value={children} onChange={setChildren} hint="Under 12" />
        </div>
      )}
    </div>
  )
}

function Stepper({ label, value, min, onChange, hint }) {
  return (
    <div className="flex items-center justify-between gap-6 py-2">
      <span>
        <span className="block text-[0.9rem] font-medium text-ink">{label}</span>
        {hint && <span className="block text-[0.75rem] text-ink-300">{hint}</span>}
      </span>
      <span className="flex items-center gap-3">
        <StepBtn label={`One fewer ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Minus className="h-4 w-4" strokeWidth={2} />
        </StepBtn>
        <span className="w-5 text-center text-[0.95rem] tnum text-ink">{value}</span>
        <StepBtn label={`One more ${label}`} disabled={value >= 12} onClick={() => onChange(value + 1)}>
          <Plus className="h-4 w-4" strokeWidth={2} />
        </StepBtn>
      </span>
    </div>
  )
}

const StepBtn = ({ label, disabled, onClick, children }) => (
  <button
    type="button"
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink
               transition-colors hover:border-ink hover:bg-ink hover:text-white
               disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/15
               disabled:hover:bg-transparent disabled:hover:text-ink"
  >
    {children}
  </button>
)
