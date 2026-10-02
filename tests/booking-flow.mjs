/**
 * The booking path, driven in a real browser.
 *
 *   npm run test:flow      (needs `npm run dev` running)
 *
 * Every case here is a bug that was live: the journeys page read a "people"
 * key the widget never wrote, and the custom-journey page dropped the dates a
 * traveller had just picked. Both looked correct in their own file, which is
 * why they want a test that crosses the handoff rather than a code review.
 */
import { chromium } from 'playwright-core'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })
const fails = []
const ok = []
const check = (cond, name, detail = '') => (cond ? ok : fails).push(`${name}${detail ? '  — ' + detail : ''}`)

// ── 1. Journeys search: does the traveller count survive? ──────────
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await p.selectOption('#sw-dest', { index: 2 })
await p.locator('form button[type="submit"]').first().click()
await p.waitForURL(/\/journeys\?/, { timeout: 5000 })
const url1 = new URL(p.url())
check(url1.searchParams.has('adults'), 'search sends a traveller count', `url carries ${[...url1.searchParams.keys()].join(', ')}`)
// The summary mounts a frame or two after the navigation resolves, so wait for
// it rather than reading straight away: that race made this test flaky, not the app.
const partySize = p.locator('.chip').filter({ hasText: /\d+\s+(adult|child)/i })
await partySize.first().waitFor({ state: 'attached', timeout: 4000 }).catch(() => {})
const chips = await partySize.allTextContents()
check(chips.length > 0, 'journeys page shows the party size back',
  chips.length ? `chip reads "${chips[0]}"` : 'no party-size chip rendered')

// ── 2. Custom journey: do the dates the traveller picked survive? ──
await p.goto('http://localhost:5173/journeys/custom-private-journey?from=2027-03-04&to=2027-03-11&adults=3&children=1',
  { waitUntil: 'networkidle' })
const pre = await p.evaluate(() => {
  const f = document.querySelector('form[name="enquiry"]')
  const get = (n) => f?.querySelector(`[name="${n}"]`)?.value ?? '(no field)'
  return { dates: get('dates'), travellers: get('travellers'), trip: get('trip') }
})
check(pre.travellers.includes('3'), 'custom journey prefills travellers', `travellers = "${pre.travellers}"`)
check(pre.dates.trim().length > 0, 'custom journey prefills the dates', `dates = "${pre.dates}"`)

// ── 3. Transport search → contact ─────────────────────────────────
await p.goto('http://localhost:5173/contact?type=transport&pickup=Lombok%20Airport%20(LOP)&dropoff=Senggigi&date=2027-03-04&adults=2&children=0',
  { waitUntil: 'networkidle' })
const t = await p.evaluate(() => {
  const f = document.querySelector('form[name="enquiry"]')
  const get = (n) => f?.querySelector(`[name="${n}"]`)?.value ?? '(no field)'
  return { dates: get('dates'), message: get('message'), travellers: get('travellers') }
})
check(t.dates.trim().length > 0, 'transport search prefills the date', `dates = "${t.dates}"`)
check(t.message.includes('Senggigi'), 'transport search prefills pick-up and drop-off', `message = ${JSON.stringify(t.message.slice(0, 60))}`)

// ── 4. Form validation ────────────────────────────────────────────
await p.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' })
await p.locator('form[name="enquiry"] button:has-text("Continue")').click()
await p.waitForTimeout(300)
const errs = await p.evaluate(() => [...document.querySelectorAll('form[name="enquiry"] p, form[name="enquiry"] span')]
  .map((e) => e.textContent.trim()).filter((t) => /Pick a journey|rough month|call you|look right/.test(t)))
check(errs.length > 0, 'empty first step is blocked with a message', errs.join(' / ') || 'no validation message shown')

console.log(`\n✅ passing (${ok.length})`)
ok.forEach((s) => console.log('   ' + s))
console.log(`\n❌ failing (${fails.length})`)
fails.forEach((s) => console.log('   ' + s))
await b.close()
if (fails.length) process.exit(1)
