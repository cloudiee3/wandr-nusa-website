import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BedDouble, Car, Globe, Minus, Plus, Users } from 'lucide-react'
import { optionValue, searchGroups } from '../data/destinations'
import { OTHER_PLACE, stayGroups, transferGroups } from '../data/site'
import { DateRangeFields, SingleDateField, addDays, toISO, usePopover } from './DatePicker'

const TABS = [
  { id: 'journeys', label: 'Journeys' },
  { id: 'stays', label: 'Hotels' },
  { id: 'transport', label: 'Transport' },
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

  const [pickup, setPickup] = useState(transferGroups[0].options[0])
  const [dropoff, setDropoff] = useState('Senggigi')
  const [area, setArea] = useState(stayGroups[0].options[0])

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
    // we don’t run a fixed departure yet, so the journeys page offers to plan it.
    if (dest.startsWith('place:')) q.set('place', dest.slice(6))
    else if (dest) q.set('dest', dest)
    navigate(`/journeys?${q}`)
  }

  return (
    <form
      onSubmit={submit}
      className="w-full rounded-3xl border border-white/20 bg-white/[0.13] p-5 shadow-[0_24px_70px_-24px_rgba(1,15,31,0.7)] backdrop-blur-xl sm:p-7 sm:backdrop-blur-2xl"
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
            className={`min-h-[44px] rounded-full px-2 text-[0.88rem] transition-all duration-300 ${
              tab === t.id ? 'bg-white font-medium text-ink shadow-sm' : 'text-white/75 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* All three panels sit in the same grid cell, so the card is always as
          tall as the tallest of them and never jumps when you change tab. The
          two that are not showing are inert — out of the tab order and out of
          the accessibility tree — rather than merely transparent. */}
      <div className="grid">
        <div
          key="journeys"
          inert={tab !== 'journeys'}
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            tab === 'journeys' ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
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
          <GuestsRow label="Peoples" {...{ adults, children, setAdults, setChildren }} />
        </div>
        <div
          key="transport"
          inert={tab !== 'transport'}
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            tab === 'transport' ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {/* Side by side once there is room for the labels to be read. On a
              phone half a field clipped "Lombok Airport (LOP)" to "Lombok A",
              and knowing where the car is coming from matters more than the
              tab being exactly as tall as the other two. */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="sw-pickup">Pick-up</label>
              <GroupedSelect id="sw-pickup" icon={Car} value={pickup} onChange={setPickup} groups={transferGroups} tail={OTHER_PLACE} />
            </div>
            <div>
              <label className="field-label" htmlFor="sw-dropoff">Drop-off</label>
              <GroupedSelect id="sw-dropoff" icon={Globe} value={dropoff} onChange={setDropoff} groups={transferGroups} tail={OTHER_PLACE} />
            </div>
          </div>
          <SingleDateField label="Date" value={from} onChange={setFrom} />
          <GuestsRow label="Passengers" {...{ adults, children, setAdults, setChildren }} />
        </div>
        <div
          key="stays"
          inert={tab !== 'stays'}
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            tab === 'stays' ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Row label="Area" htmlFor="sw-area">
            <GroupedSelect id="sw-area" icon={BedDouble} value={area} onChange={setArea} groups={stayGroups} />
          </Row>
          <DateRangeFields {...{ from, to, setFrom, setTo }} labels={['Check-in', 'Check-out']} />
          <GuestsRow label="Guests" {...{ adults, children, setAdults, setChildren }} />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-alive group mt-7 w-full bg-ink-900 py-4 text-white
                   hover:-translate-y-0.5 hover:bg-ink"
      >
        Wander Now
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      </button>

      <p className="mt-3 text-center text-[12.5px] sm:text-[11.5px] text-white/55">
        No payment now — we reply with a routed plan and the real cost.
      </p>
    </form>
  )
}

/** Select whose options are grouped, with an optional ungrouped option last. */
const GroupedSelect = ({ id, icon: Icon, value, onChange, groups, tail }) => (
  <div className="field">
    <Icon className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      {groups.map((g) => (
        <optgroup key={g.group} label={g.group}>
          {g.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </optgroup>
      ))}
      {tail && <option value={tail}>{tail}</option>}
    </select>
  </div>
)

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
        <div className={`absolute inset-x-0 z-30 rounded-2xl border border-ink/[0.09] bg-white p-4 shadow-lift ${drop}`}>
          <Stepper label="Adults" min={1} value={adults} onChange={setAdults} />
          <Stepper label="Children" min={0} value={children} onChange={setChildren} hint="Under 12" />
        </div>
      )}
    </div>
  )
}

function Stepper({ label, value, min, onChange, hint }) {
  return (
    <div className="flex items-center justify-between gap-6 py-1.5">
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
    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink
               transition-colors active:scale-95 hover:border-ink hover:bg-ink hover:text-white
               disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/15
               disabled:hover:bg-transparent disabled:hover:text-ink"
  >
    {children}
  </button>
)
