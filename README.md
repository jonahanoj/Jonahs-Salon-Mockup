# Jonah's Salon Mockup

Static **multi-page** marketing mockup for **Lumen Lane Salon**, a fictional boutique hair salon in York, PA. Built as a second sample (alongside the landscaping mockup) so Jonah can compare two directions despite a thin local lead pool.

**Folder:** `/workspace/lumen-lane-salon/`

## Brand direction

Intentionally different from the landscaping sample (green / cream / Fraunces + DM Sans):

- Soft blush + ink + gold accents
- Display serif: **Cormorant Garamond**
- Clean sans: **Outfit**
- Asymmetric boutique layout, sticky mobile **Book** bar
- Unique feature: interactive before/after hair **slider** (pointer drag, touch, keyboard)

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home - hero, intro, featured services, before/after slider, CTA |
| `services.html` | Full service menu with pricing |
| `gallery.html` | Photo grid + second before/after slider |
| `about.html` | Story, values, team, quotes |
| `contact.html` | Visit details + front-end-only booking form |
| `css/styles.css` | Design system and layout |
| `js/main.js` | Mobile nav, before/after slider, form UI |
| `images/` | Local Unsplash JPGs (exact-case filenames) |
| `README.md` | This file |
| `IMAGES-LICENSE.md` | Unsplash license notes |

## Page map

```
Home (index.html)
├── Services (services.html)
├── Gallery (gallery.html)
├── About (about.html)
└── Book / Contact (contact.html)
```

Every page shares sticky header (logo + links; current page via `aria-current`), footer, mobile hamburger, and a sticky mobile Book bar.

## How to preview

```bash
cd /workspace/lumen-lane-salon
python3 -m http.server 8766
```

Open `http://127.0.0.1:8766/`

## Before/after slider

- Drag the handle or anywhere on the frame (mouse or touch)
- Keyboard: focus the handle, then Arrow Left/Right (Shift for larger steps), Home/End
- Accessible: `role="slider"`, `aria-valuenow`, visible Before/After labels

Home uses `ba-before.jpg` / `ba-after.jpg`. Gallery uses `before.jpg` / `after.jpg`.

## Booking form

Front-end only. Submit shows an on-page success message and resets the form. Nothing is emailed or stored.

## Notes

- Local images only - no remote image URLs
- Hyphens used instead of em dashes in copy
- Fictional business for portfolio / sales demos
