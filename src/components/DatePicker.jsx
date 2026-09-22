import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Dates are handled locally throughout — toISOString() is UTC and would shift
// the day for anyone east or west of Greenwich, which is most of our travellers.
export const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const fromISO = (s) => {
  const [y, m, d] = String(s).split('-').map(Number)
  return new Date(y || 1970, (m || 1) - 1, d || 1)
}

export const addDays = (iso, n) => {
  const d = fromISO(iso)
  d.setDate(d.getDate() + n)
  return toISO(d)
}

export const startOfToday = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** "Tue, 22 Sep 2026", or without the weekday when space is tight. */
export const prettyDate = (value, short = false) => {
  if (!value) return 'Pick a date'
  return fromISO(value).toLocaleDateString('en-GB', {
    ...(short ? {} : { weekday: 'short' }),
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function Panel({ from, to, mode, onPick, onClose, drop }) {
  const [cursor, setCursor] = useState(() => {
    const d = fromISO(from || toISO(new Date()))
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const today = toISO(startOfToday())
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  const title = cursor.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  const shift = (n) => setCursor(new Date(year, month + n, 1))

  return (
    <div
      role="dialog"
      aria-label="Choose dates"
      className={`absolute inset-x-0 z-30 rounded-2xl bg-white p-4 shadow-lift sm:p-5 ${drop}`}
    >
      <div className="flex items-center justify-between">
        <NavBtn label="Previous month" onClick={() => shift(-1)}><ChevronLeft className="h-4 w-4" strokeWidth={2} /></NavBtn>
        <span className="font-display text-[1.05rem] font-semibold text-ink">{title}</span>
        <NavBtn label="Next month" onClick={() => shift(1)}><ChevronRight className="h-4 w-4" strokeWidth={2} /></NavBtn>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-1">
        {WEEKDAYS.map((w) => (
          <span key={w} className="pb-2 text-center text-[0.8rem] font-semibold text-ink-400">{w}</span>
        ))}

        {Array.from({ length: firstWeekday }, (_, i) => <span key={`pad${i}`} />)}

        {Array.from({ length: days }, (_, i) => {
          const date = toISO(new Date(year, month, i + 1))
          const past = date < today
          const isFrom = date === from
          const isTo = mode === 'range' && date === to
          const inRange = mode === 'range' && from && to && date > from && date < to
          const marked = isFrom || isTo || inRange

          return (
            <button
              key={date}
              type="button"
              disabled={past}
              aria-pressed={marked}
              aria-label={fromISO(date).toLocaleDateString('en-GB', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
              onClick={() => onPick(date)}
              className={`mx-auto flex h-11 w-full max-w-[44px] items-center justify-center rounded-lg
                          text-[0.92rem] tnum transition-colors duration-150 sm:h-9 sm:text-[0.86rem] ${
                past
                  ? 'cursor-not-allowed text-ink-200'
                  : marked
                    ? 'bg-sand-300/70 font-medium text-ink'
                    : 'text-ink hover:bg-sand-200'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex justify-end border-t border-ink/[0.07] pt-3">
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] rounded-full px-5 text-[0.9rem] font-medium text-ink-500 transition-colors hover:text-ink"
        >
          Done
        </button>
      </div>
    </div>
  )
}

const NavBtn = ({ label, onClick, children }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-500
               transition-colors active:scale-95 hover:bg-sand-200 hover:text-ink"
  >
    {children}
  </button>
)

/**
 * Closes the panel on Escape or an outside click, and decides whether it opens
 * up or down. The hero clips its overflow, and the widget sits at the bottom of
 * it, so a panel that always dropped downward would be cut in half.
 */
export function usePopover(open, close, panelHeight = 420) {
  const box = useRef(null)
  const [up, setUp] = useState(false)

  useLayoutEffect(() => {
    if (!open || !box.current) return
    const r = box.current.getBoundingClientRect()
    setUp(r.bottom + panelHeight > window.innerHeight && r.top > panelHeight)
  }, [open, panelHeight])

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) close() }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return { box, up, drop: up ? 'bottom-full mb-2' : 'top-full mt-2' }
}

const Trigger = ({ label, value, active, onClick }) => (
  <div>
    <span className="field-label" aria-hidden="true">{label}</span>
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      aria-label={`${label}: ${prettyDate(value)}`}
      className={`field !gap-2 !px-3.5 text-left ${active ? 'shadow-[0_0_0_2px_rgba(18,160,168,0.55)]' : ''}`}
    >
      <CalendarDays className="h-4 w-4 shrink-0 text-sea-600" strokeWidth={1.75} />
      <span className="truncate text-[0.82rem]">
        {/* the weekday doesn't fit two-up on a phone */}
        <span className="sm:hidden">{prettyDate(value, true)}</span>
        <span className="hidden sm:inline">{prettyDate(value)}</span>
      </span>
    </button>
  </div>
)

/** Two fields sharing one calendar, the way the reference does it. */
export function DateRangeFields({ from, to, setFrom, setTo, labels }) {
  const [open, setOpen] = useState(null) // null | 'from' | 'to'
  const { box, drop } = usePopover(open, () => setOpen(null))

  function pick(date) {
    if (open === 'from') {
      setFrom(date)
      if (date >= to) setTo(addDays(date, 1))
      setOpen('to')
      return
    }
    if (date <= from) {
      setFrom(date)
      setOpen('to')
      return
    }
    setTo(date)
    setOpen(null)
  }

  return (
    <div ref={box} className="relative mt-5">
      <div className="grid grid-cols-2 gap-3">
        <Trigger label={labels[0]} value={from} active={open === 'from'} onClick={() => setOpen(open === 'from' ? null : 'from')} />
        <Trigger label={labels[1]} value={to} active={open === 'to'} onClick={() => setOpen(open === 'to' ? null : 'to')} />
      </div>
      {open && <Panel from={from} to={to} mode="range" drop={drop} onPick={pick} onClose={() => setOpen(null)} />}
    </div>
  )
}

export function SingleDateField({ label, value, onChange }) {
  const [open, setOpen] = useState(false)
  const { box, drop } = usePopover(open, () => setOpen(false))

  return (
    <div ref={box} className="relative mt-5">
      <Trigger label={label} value={value} active={open} onClick={() => setOpen((v) => !v)} />
      {open && (
        <Panel
          from={value}
          mode="single"
          drop={drop}
          onPick={(d) => { onChange(d); setOpen(false) }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}
