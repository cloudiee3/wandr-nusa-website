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
| `tours/senaru.jpg` | Sendang Gile or Tiu Kelep | stand-in — not the real place |
| gallery | Any trip photos — needs **at least 3** before the grid appears | 1 so far |

"Stand-in" means a licensed stock photo that is not the actual place. It is
there so the page looks finished, and it should be replaced.

`Tetebatu Rice Plant.avif` and `Tetebatu Rice Field.jpg` are both here and
unused — two more gallery photos would bring the whole photo section back, and
those two could be the first of them.

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
| `Rinjani Crater Lake.jpg` | hero + social preview |
| `Sembalun Bukit Selong.jpg` | Sembalun card |
| `Benang Kelambu.webp` | Central Lombok card |
| `Monkey Forest .avif` | Tetebatu card |
| `Durian Indah Waterfall 2.avif` | gallery |
| `Tetebatu Rice Field.jpg` | not used |
| `Tetebatu Rice Plant.avif` | not used |
| `pexels-vincent-ma-janssen-…jpg` | Senaru card — **stand-in** |
| `pexels-firman-fatthul-…jpg` | not used |

The `pexels-` files are from Pexels, which permits commercial use. Every photo
that arrived without clear commercial rights has been deleted.
