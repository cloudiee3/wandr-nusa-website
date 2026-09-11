# Where to upload photos

**Put your photos in this folder.** That is the whole answer.

On GitHub: open this `photos/` folder → **Add file** → **Upload files** → drag your
pictures in → scroll down and press the green **Commit changes** button. That
last step is the one people miss; without it nothing is saved.

Upload the original full-size files. Do not resize or compress them first —
that is done for you, and starting from the original always looks better.

## Then tell the site to use them

Each photo is cropped into a named slot. Open `tools/process-photos.mjs`, add a
line to the `SLOTS` list naming your file, and run:

```bash
npm run photos
```

It crops, resizes, compresses and writes into `assets/img/`. It prints what it
did and refuses to write anything over its size budget.

## What is still needed

| Slot | What it should show | Status |
|---|---|---|
| `tours/sembalun.jpg` | Sembalun — Bukit Selong, the fields, Desa Beleq | **missing** |
| `tours/lombok-tengah.jpg` | Benang Kelambu or Benang Stokel, or river tubing | stand-in |
| `tours/senaru.jpg` | Sendang Gile or Tiu Kelep | stand-in |
| `hero/hero.jpg` | The Tetebatu valley, wide | have it, but low resolution |
| gallery | Any trip photos — needs **at least 3** before the grid appears | 1 so far |

"Stand-in" means a licensed stock photo that is not the actual place. They are
there so the page looks finished, and they should be replaced.

## Shooting for these slots

- **Hero** — landscape, as wide and high-resolution as you can. The headline
  sits over the left half, so keep that side uncluttered.
- **Trip cards** — landscape, roughly 3:2.
- **Gallery** — anything. People, food, hands, a guide mid-sentence. These carry
  more weight than another wide landscape.

Natural and documentary. No heavy filters, no text burned into the picture.

## Photos already here

| File | Where it is used |
|---|---|
| `Tetebatu Rice Field.jpg` | hero + social preview |
| `Tetebatu Rice Plant.avif` | About |
| `Monkey Forest .avif` | Tetebatu card |
| `Durian Indah Waterfall 2.avif` | gallery |
| `pexels-firman-fatthul-…jpg` | Central Lombok card — **stand-in** |
| `pexels-vincent-ma-janssen-…jpg` | Senaru card — **stand-in** |

The two `pexels-` files are from Pexels, which permits commercial use. Every
photo that arrived without clear commercial rights has been deleted.
