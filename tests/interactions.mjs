/**
 * The interactions a guest actually performs, driven in a real browser.
 *
 *   npm run test:ui        (needs `npm run dev` running)
 *
 * Every case is a bug that was live: the heart saved a slug nothing read back,
 * Escape left the mobile menu open with the page still locked, a transfer could
 * be booked from a place to itself, and "Somewhere else" reached the enquiry as
 * those literal words.
 */
import { chromium } from 'playwright-core'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const F = [], P = []
const chk = (c, s, d = '') => (c ? P : F).push(s + (d ? `  — ${d}` : ''))

// 1. saved trips lead somewhere
{
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })
  await p.goto('http://localhost:5173/journeys', { waitUntil: 'networkidle' })
  const noChip = await p.locator('button.chip', { hasText: /^Saved/ }).count()
  chk(noChip === 0, 'the Saved chip is hidden when nothing is saved')
  await p.locator('button[aria-label^="Save"]').first().click(); await p.waitForTimeout(350)
  await p.locator('button[aria-label^="Save"]').first().click(); await p.waitForTimeout(350)
  const chip = p.locator('button.chip', { hasText: /^Saved/ })
  const label = await chip.textContent().catch(() => '')
  chk(/Saved 2/.test(label || ''), 'the Saved chip appears and counts live', `reads "${(label||'').trim()}"`)
  await chip.click(); await p.waitForTimeout(400)
  const n = await p.locator('article').count()
  chk(n === 2, 'the Saved view shows exactly the saved trips', `${n} shown`)
  // unsave both from inside the saved view
  await p.locator('button[aria-label^="Remove"]').first().click(); await p.waitForTimeout(350)
  await p.locator('button[aria-label^="Remove"]').first().click(); await p.waitForTimeout(500)
  const back = await p.locator('article').count()
  const chipGone = await p.locator('button.chip', { hasText: /^Saved/ }).count()
  chk(back > 2 && chipGone === 0, 'unsaving the last one drops back to all trips rather than an empty page', `${back} trips, chip gone: ${chipGone === 0}`)
  await p.close()
}

// 2. escape closes the drawer
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p.getByLabel('Open menu').click(); await p.waitForTimeout(450)
  await p.keyboard.press('Escape'); await p.waitForTimeout(450)
  const st = await p.evaluate(() => ({
    expanded: document.querySelector('[aria-label="Open menu"],[aria-label="Close menu"]')?.getAttribute('aria-expanded'),
    overflow: getComputedStyle(document.body).overflow,
  }))
  chk(st.expanded === 'false' && st.overflow !== 'hidden', 'Escape closes the mobile menu and unlocks the page', `expanded=${st.expanded} overflow=${st.overflow || 'normal'}`)
  // A closed drawer that is still focusable puts five invisible links in the
  // tab order, which is what aria-hidden alone left behind.
  const reachable = await p.evaluate(() => {
    const link = [...document.querySelectorAll('a')].find((a) => /Message Us on WhatsApp/.test(a.textContent))
    if (!link) return false
    link.focus()
    return document.activeElement === link
  })
  chk(!reachable, 'the closed drawer is out of the tab order')
  await p.close()
}

// 3 + 4. transport validation and "Somewhere else"
{
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p.locator('[role="tab"]', { hasText: 'Transport' }).click(); await p.waitForTimeout(300)
  const opts = await p.locator('#sw-pickup option').allTextContents()
  await p.selectOption('#sw-pickup', { label: opts[1] })
  await p.selectOption('#sw-dropoff', { label: opts[1] }); await p.waitForTimeout(200)
  await p.locator('form button[type="submit"]').first().click(); await p.waitForTimeout(500)
  const blocked = !p.url().includes('/contact')
  const msg = await p.locator('[role="alert"]').textContent().catch(() => '')
  chk(blocked && /same place/i.test(msg), 'the same pick-up and drop-off is refused with a reason', `"${(msg||'').trim()}"`)

  await p.selectOption('#sw-dropoff', { label: 'Somewhere else' }); await p.waitForTimeout(300)
  const box = await p.locator('#sw-dropoff-else').count()
  chk(box === 1, '"Somewhere else" opens a box to say where')
  await p.locator('form button[type="submit"]').first().click(); await p.waitForTimeout(400)
  const msg2 = await p.locator('[role="alert"]').textContent().catch(() => '')
  chk(!p.url().includes('/contact') && /where that is/i.test(msg2), 'leaving that box empty is refused', `"${(msg2||'').trim()}"`)
  await p.fill('#sw-dropoff-else', 'Villa Hantu, Malimbu')
  await p.selectOption('#sw-pickup', { label: opts[2] }); await p.waitForTimeout(200)
  await p.locator('form button[type="submit"]').first().click(); await p.waitForTimeout(800)
  const message = await p.inputValue('form[name="enquiry"] [name="message"]').catch(() => '')
  chk(/Villa Hantu, Malimbu/.test(message) && !/Somewhere else/.test(message),
    'the typed place reaches the enquiry instead of the words "Somewhere else"', message.replace(/\n/g, ' / ').slice(0, 70))
  await p.close()
}

// 5. heading order
{
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })
  await p.goto('http://localhost:5173/journeys', { waitUntil: 'networkidle' })
  const jumps = await p.evaluate(() => {
    const hs = [...document.querySelectorAll('h1,h2,h3,h4')].map((e) => +e.tagName[1])
    const bad = []
    for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i-1] > 1) bad.push(`h${hs[i-1]}->h${hs[i]}`)
    return bad
  })
  chk(jumps.length === 0, 'heading levels on /journeys step one at a time', jumps.join(', ') || 'no jumps')
  await p.close()
}

console.log('FIXED'); P.forEach((s) => console.log('   ✓ ' + s))
console.log('\nSTILL BROKEN'); F.length ? F.forEach((s) => console.log('   ✗ ' + s)) : console.log('   nothing')
await b.close()
if (F.length) process.exit(1)
