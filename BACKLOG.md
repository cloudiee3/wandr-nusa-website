# Backlog — everything worth fixing once the products settle

Nothing here is urgent while the catalogue is still being built, and none of
it is broken today. This is the list of things I would want done before the
site goes in front of real customers, written down now so none of it gets
lost between trips.

Ordered by what would actually hurt, not by effort.

---

## 1. Must be settled before launch

These are the ones that carry real risk. Everything else on this page is
polish.

| | What | Why it matters |
|---|---|---|
| ☐ | **Ratings and review counts are placeholders.** All ten cards carry invented figures. | Made-up reviews are actionable in most of the markets these guests come from. Either real numbers or the row comes off the cards entirely. |
| ☐ | **Six trips publish a competitor's price.** Pink Beach, Gili Kondo, Benang, Sendang Gile, the three Gilis, Kuta. | They are `lombok.travelers.id` figures sitting on the page as ours. One message with the real from-prices clears all six. |
| ☐ | **Contact details are invented.** `hello@wandrnusa.com` and the Senggigi street address. | A guest emailing that address reaches nobody. |
| ☐ | **The repository is public.** | Anyone can read the source, and the history still holds every rate pushed before `b281aa4`. Making it private is the only thing that closes the history. This file and `CONTENT-REVIEW.md` are public too, and they are the most candid documents in the project. |
| ☐ | **No terms, cancellation or privacy content.** The Legal page exists but is not written. | Taking deposits without published cancellation terms is a dispute waiting to happen. |
| ☐ | **No business registration in the footer.** | Indonesian operators normally show one; guests and OTAs look for it. |

## 2. Content gaps

| | What |
|---|---|
| ☐ | **Sukarara is on the Explore Lombok package but not the Kuta day trip.** Either a stop on that day too, or an on-request add. |
| ☐ | **The Sendang Gile day trip and day three of the package are different days.** One has the monkey forest, the other has Bayan, Malimbu and Villa Hantu. Deliberate or an oversight? |
| ☐ | **Three photographs registered but unused** — `aik-berik-tubing` (river tubing, priced separately), `gili-beacon-islet` (unidentified island) and `rice-road-aerial` (came off the custom card and has no obvious home). `npm run check` lists them every run. |
| ☐ | **Which gili is which** in the two aerials on the three-Gili card. |
| ☐ | **Which monkey forest** the Senaru day actually stops at — Pusuk or the Senaru forest road. |
| ☐ | **Benang gate fee** varies by source (70k / 90k / 125k). Tickets are included, so it is a margin question. |
| ☐ | **Sumbawa and NTT have no destination pages.** Six destinations, all Lombok. |
| ☐ | **Explore Sumbawa has one photograph and no gallery.** Moyo, a whale shark and one of the west islands would complete the card. |
| ☐ | **Almost nothing with people in it.** `travellers-viewpoint` on the custom card and `rinjani-rim` on the mountain are the only two. No guides, no guests at a table, no food, no boats with anyone aboard. Still the single biggest gap in the library. |

## 3. Photographs that are too small

Heroes run full-bleed and want roughly 3,000px. These render soft:

| Photo | Source width | Used on |
|---|---|---|
| Sembalun set (4 photos) | 1,080–1,280px | the hills hike |
| `tetebatu-field` | 1,439px | Tetebatu |
| `rinjani-rim` | 2,000px | Rinjani |
| `benang-kelambu-curtain` | 1,125px | Benang |
| `jungle-waterfall` | stock | the only non-yours frame on the Senaru day |
| `lombok-beach-stay` | 1,500px | the Explore Lombok hero |
| `kenawa-island` | **1,024px** | the Explore Sumbawa hero — the smallest source in the library, on a flagship card |

Same originals at full size would fix all of them.

## 4. Interface, once the catalogue is bigger

| | What |
|---|---|
| ☐ | **Featuring a few trips on the home page.** It shows all ten now; past twelve a "Show N more" opens the rest in place. When the catalogue is large you said you would rather feature a handful — that is a one-line change to a curated list. |
| ☐ | **Filters beyond category.** Duration, price band and region. The chip row alone stops being enough somewhere around twenty trips. |
| ☑ | ~~Day trip vs multi-day.~~ Done — a **Packages** chip now sits next to Day Trips, and a day trip's page surfaces the package that contains it, by shared tags rather than list order. |
| ☐ | **The card slider caps at four photographs.** Fine now; worth revisiting if a trip deserves more. |
| ☐ | **No sort.** Price, duration, popularity. |
| ☐ | **"Check availability" goes to a form,** not a calendar. Real availability is a much bigger build — worth it only once departures are fixed. |
| ☐ | **No currency switch.** Everything is IDR; your own flyers quote USD as well. |
| ☐ | **No map on trip pages.** The island map is only on the home page. |

## 5. Technical

| | What |
|---|---|
| ☐ | **One share image for the whole site.** Every trip shared to WhatsApp or Instagram shows the same Segara Anak photo. Per-trip `og:image` is a small change with a visible payoff. |
| ☐ | **No `sitemap.xml`, no `robots.txt`, no canonical tags.** All three matter for being found. |
| ☐ | **No confirmation email.** The enquiry form posts to Netlify; nobody has written what the guest receives back. |
| ☐ | **`check-content.mjs` scans a hard-coded list of source files** for trip references. It should glob `src/` so a new file cannot slip a dead link past it. |
| ☐ | **No tests beyond the content linter.** The linter has caught several real bugs; a couple of render tests would catch the rest. |
| ☐ | **Publishing to the preview is a hand-written file map.** Works, but it is the one step that could quietly drop a file. |

---

## Things deliberately decided, so they do not get re-litigated

- **No detailed rate card anywhere in this repository.** Only the published
  "from" figure per trip. Group tiers and transfer charges stay private and
  are discussed on WhatsApp.
- **No ampersands in trip titles, summaries or price notes.** The display
  serif's `&` sits heavy and the alternatives all looked borrowed. The word is
  spelled out, and `npm run check` fails the build if one creeps back in.
- **Day trips do not include meals** unless the flyer says so. Kuta and Gili
  Kondo include lunch; the rest do not.
- **Every journey and destination has a cover photograph nothing else uses.**
  Gallery frames may repeat; covers may not.
- **River tubing is not on the Benang day** — it is priced separately, so it is
  not in the title, the itinerary or the pictures.
