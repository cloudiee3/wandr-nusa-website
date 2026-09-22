import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { journeys } from '../data/journeys'
import { site, whatsappLink } from '../data/site'

const STEPS = ['Your trip', 'Your details', 'Anything else']
const EMPTY = {
  trip: '', dates: '', travellers: '2 adults',
  name: '', email: '', phone: '',
  message: '', 'bot-field': '',
}

const encode = (data) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

export default function EnquiryForm({ defaultTrip = '', defaultMessage = '', defaultTravellers = '', defaultDates = '' }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    ...EMPTY,
    trip: defaultTrip,
    message: defaultMessage,
    travellers: defaultTravellers || EMPTY.travellers,
    dates: defaultDates,
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((x) => ({ ...x, [k]: undefined }))
  }

  function validate(which) {
    const e = {}
    if (which === 0) {
      if (!form.trip) e.trip = 'Pick a journey — or "Not sure yet".'
      if (!form.dates.trim()) e.dates = 'Even a rough month helps.'
    }
    if (which === 1) {
      if (!form.name.trim()) e.name = 'What should we call you?'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'That email doesn’t look right.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => validate(step) && setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  async function handleSubmit(e) {
    e.preventDefault()
    // A submit can still reach us from an early step — Enter pressed in a field,
    // or the browser running its default action on a button React has just
    // re-typed from "button" to "submit". Advance instead of sending.
    if (step < STEPS.length - 1) { next(); return }
    if (!validate(0)) { setStep(0); return }
    if (!validate(1)) { setStep(1); return }

    setStatus('sending')
    try {
      // Netlify Forms picks this up from the static copy in index.html.
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'enquiry', ...form }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      // Local dev has no form handler; don't leave the traveller stuck.
      setStatus(import.meta.env.DEV ? 'sent' : 'error')
    }
  }

  const waMessage = `Hi ${site.name}! I'd like to enquire about: ${form.trip || 'a trip to Lombok'}.
Dates: ${form.dates || 'flexible'}
Travellers: ${form.travellers}
${form.message ? `\n${form.message}` : ''}
— ${form.name || ''}`

  if (status === 'sent') {
    return (
      <div className="card p-8 text-center sm:p-12">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-sea-100 text-sea-600">
          <Check className="h-7 w-7" strokeWidth={2} />
        </span>
        <h3 className="mt-6 text-2xl">Your enquiry is with us</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-500">
          We answer every message personally, usually within one working day. If you'd rather not wait,
          message us on WhatsApp and we'll pick it up now.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="btn-whatsapp">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Continue on WhatsApp
          </a>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => { setForm({ ...EMPTY, trip: defaultTrip, message: defaultMessage, travellers: defaultTravellers || EMPTY.travellers, dates: defaultDates }); setStep(0); setStatus('idle') }}
          >
            Send another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      name="enquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="card p-6 sm:p-9"
    >
      <input type="hidden" name="form-name" value="enquiry" />
      <p className="hidden">
        <label>Leave this empty: <input name="bot-field" value={form['bot-field']} onChange={set('bot-field')} /></label>
      </p>

      {/* step rail */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-[12px] transition-colors duration-300 ${
                i < step ? 'bg-sea-500 text-white'
                  : i === step ? 'bg-ink text-white'
                  : 'bg-ink/[0.07] text-ink-300'
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : i + 1}
            </span>
            <span className={`hidden text-xs sm:block ${i === step ? 'text-ink' : 'text-ink-300'}`}>{s}</span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-ink/10" />}
          </li>
        ))}
      </ol>

      {/* Step 1 */}
      <fieldset className={step === 0 ? 'block' : 'hidden'}>
        <legend className="sr-only">Your trip</legend>
        <Field label="Which journey?" error={errors.trip}>
          <select name="trip" value={form.trip} onChange={set('trip')} className={inputCls(errors.trip)}>
            <option value="">Choose one…</option>
            {journeys.map((j) => <option key={j.slug} value={j.title}>{j.title}</option>)}
            <option value="Transport / airport transfer">Transport / airport transfer</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Not sure yet">Not sure yet — help me choose</option>
          </select>
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="When?" hint="A month is fine" error={errors.dates}>
            <input name="dates" value={form.dates} onChange={set('dates')} placeholder="e.g. mid-July 2027" className={inputCls(errors.dates)} />
          </Field>
          <Field label="How many of you?">
            <input name="travellers" value={form.travellers} onChange={set('travellers')} className={inputCls()} />
          </Field>
        </div>
      </fieldset>

      {/* Step 2 */}
      <fieldset className={step === 1 ? 'block' : 'hidden'}>
        <legend className="sr-only">Your details</legend>
        <Field label="Your name" error={errors.name}>
          <input name="name" value={form.name} onChange={set('name')} autoComplete="name" className={inputCls(errors.name)} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" error={errors.email}>
            <input type="email" name="email" value={form.email} onChange={set('email')} autoComplete="email" className={inputCls(errors.email)} />
          </Field>
          <Field label="Phone / WhatsApp" hint="Optional">
            <input type="tel" name="phone" value={form.phone} onChange={set('phone')} autoComplete="tel" className={inputCls()} />
          </Field>
        </div>
      </fieldset>

      {/* Step 3 */}
      <fieldset className={step === 2 ? 'block' : 'hidden'}>
        <legend className="sr-only">Anything else</legend>
        <Field label="Tell us about the trip" hint="Fitness, diet, what you'd love to see — all useful">
          <textarea name="message" rows={5} value={form.message} onChange={set('message')} className={`${inputCls()} resize-y`} />
        </Field>
        {status === 'error' && (
          <p className="mb-4 rounded-xl bg-ember/10 px-4 py-3 text-sm text-ember">
            That didn't send. Try again, or reach us on WhatsApp — we'll get it either way.
          </p>
        )}
      </fieldset>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.07] pt-6">
        <button type="button" onClick={back} className={`btn-ghost ${step === 0 ? 'invisible' : ''}`}>
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Back
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="btn-ghost">
            <WhatsAppIcon className="h-[17px] w-[17px]" /> WhatsApp instead
          </a>
          {/* Distinct keys so React swaps the DOM node instead of retyping one. */}
          {step < STEPS.length - 1 ? (
            <button key="next" type="button" onClick={next} className="btn-primary">
              Continue <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          ) : (
            <button key="send" type="submit" disabled={status === 'sending'} className="btn-accent disabled:opacity-60">
              {status === 'sending'
                ? <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> Sending…</>
                : <><Send className="h-4 w-4" strokeWidth={1.75} /> Send enquiry</>}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

function Field({ label, hint, error, children }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 flex items-baseline justify-between gap-3">
        <span className="font-sans text-sm font-medium text-ink">{label}</span>
        {hint && <span className="font-sans text-[12px] text-ink-300 sm:text-[10px]">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block font-sans text-[12.5px] text-ember sm:text-[11px]">{error}</span>}
    </label>
  )
}

// text-base on phones: under 16px, iOS Safari zooms the page on focus.
const inputCls = (error) =>
  `w-full min-h-[52px] rounded-xl border bg-sand-100/60 px-4 py-3 text-base text-ink
   transition-colors duration-200 placeholder:text-ink-200
   focus:border-sea-500 focus:bg-white focus:outline-none sm:min-h-0 sm:text-[0.95rem]
   ${error ? 'border-ember/60' : 'border-ink/12'}`
