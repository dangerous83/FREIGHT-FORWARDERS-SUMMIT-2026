# ILS — Freight Forwarders Summit 2026

A cinematic, interactive web presentation for **ILS — International Logistic
Services**, built for a large conference screen. Futuristic entry gateway, an
11-slide composed 16:9 deck, real interactions (corridor map, expandable cards,
case-study journey, working contact links), and a clean PDF export path.

> **We don't do easy.** International Logistic Services · Dubai, since 2002.

Built with **React + TypeScript + Vite**, **Framer Motion**, **Lucide React**,
CSS variables and SVG. No backend.

---

## Quick start

```bash
npm install       # install dependencies
npm run dev       # local dev server (http://localhost:5173)
npm run build     # type-check + production build → dist/
npm run preview   # preview the production build (http://localhost:4173)
```

Quality gates:

```bash
npm run lint      # ESLint (0 warnings)
npm run test      # Playwright end-to-end tests
```

The final build in `dist/` is a **static site** — deploy it anywhere.

---

## Presenting

1. Open the site → the **entry gateway** appears. Click the central ILS icon
   (or press **Enter/Space**) to run the reveal and enter the deck. It attempts
   fullscreen automatically.
2. Navigate:

| Input | Action |
|---|---|
| → / Space / PageDown | Next slide |
| ← / PageUp | Previous slide |
| Home / End | First / last slide |
| 1–9 | Jump to slide |
| Mouse wheel | Next/prev (throttled to one slide per gesture) |
| Swipe (touch) | Next/prev |
| Left / right edge zones | Prev / next (click) |
| **O** | Slide overview (clickable thumbnails) |
| **F** | Fullscreen |
| **P** | Autoplay on/off |
| **?** | Keyboard help |
| **Esc** | Close overlays |

Every slide has a **direct URL hash** (e.g. `#/corridor`, `#/heavy-lift`) for
deep-linking. **Return to Start** (home icon, top-right) returns to the entry
gateway without reloading.

**Reduced motion:** with `prefers-reduced-motion` enabled, the intro fades
(no camera/scaling/spinning), counters snap, and slide changes cross-fade — the
deck stays fully usable.

---

## Export / print as PDF

The deck ships with a print stylesheet that renders **one 16:9 slide per page
with no interface controls**.

1. `npm run preview` (or open the deployed site).
2. Browser → **Print** (⌘/Ctrl-P).
3. Destination **Save as PDF**, **Landscape**, margins **None**, enable
   **Background graphics**.

---

## Editing slide content

Content is separated from components — edit data, not JSX:

| File | What it controls |
|---|---|
| `src/data/slides.ts` | Slide registry (order, titles, hashes) + per-slide copy |
| `src/data/locations.ts` | Corridor nodes (real coordinates), capabilities, challenges |
| `src/data/proofPoints.ts` | "The Receipts" metric cards |
| `src/data/caseStudies.ts` | Case-study stages + the **unverified** testimonial |
| `src/data/contact.ts` | Approved contact details |
| `src/data/intro.ts` | Entry-gateway title, timing, audio/fullscreen/skip options |
| `src/data/imageManifest.ts` | Image files, alt text, aspect ratios |

To reorder or add/remove a slide, edit the `slides` array in
`src/data/slides.ts` and (for a new slide) add a component in
`src/components/slides/` wired through `src/components/slides/index.tsx`.

---

## Replacing the Higgsfield images

The deck ships with local **SVG placeholders** (marked
`PLACEHOLDER · REPLACE WITH HIGGSFIELD 1K`). To use final renders:

1. Generate each image at **Higgsfield 1K** using the prompts in
   [`docs/HIGGSFIELD_IMAGE_PROMPTS.md`](docs/HIGGSFIELD_IMAGE_PROMPTS.md).
2. Optimise to `.webp` / `.avif`.
3. Save into `public/assets/images/` using the **same base filename**.
4. Update that entry's extension in `src/data/imageManifest.ts` and set
   `replaceWithGenerated: false`.
5. Rebuild. No component changes needed.

Regenerate placeholders any time with:

```bash
node scripts/generate-placeholders.mjs
```

### Audio (optional)
Interface audio is **disabled by default** and never autoplays. A mute/unmute
control lives on the entry screen. To wire real sounds, drop files into
`public/audio/` (e.g. `hover.mp3`, `activate.mp3`, `enter.mp3`) and play them
from a user gesture inside `IntroAudioControl` / `PresentationIntro`.

---

## Deploying (static host)

Any static host works — the build is fully self-contained (assets inlined, no
external runtime calls; fonts load from Google Fonts).

**Vercel**
- Framework preset: **Vite** · Build: `npm run build` · Output: `dist`
- or `vercel --prod` from the project root.

**Netlify**
- Build command `npm run build`, publish directory `dist`.
- or drag-and-drop the `dist/` folder into Netlify.

**GitHub Pages / any bucket**
- Serve the contents of `dist/`. `vite.config.ts` uses `base: './'` so it works
  from any sub-path.

---

## Project structure

```
src/
  components/
    intro/    PresentationIntro, ActivationButton, NetworkBackground, LoadingRing, …
    shell/    PresentationShell, SlideNavigation, SlideProgress, SlideOverview, …
    common/   AnimatedHeadline, RouteMap, LocationCard, MetricCard, CaseStudyTimeline,
              ImageReveal, ContactPanel, Modal, Drawer
    slides/   Slide01Opening … Slide11Contact (+ index registry)
  context/    PresentationContext (navigation state)
  hooks/      useReducedMotion, useNavigationInput, useCountUp, useInViewOnce
  data/       slides, locations, proofPoints, caseStudies, contact, intro, imageManifest
  styles/     tokens.css, global.css, intro.css, shell.css, slides.css, print.css
docs/         CONTENT_AUDIT, PRESENTATION_STRUCTURE, DESIGN_SYSTEM, HIGGSFIELD_IMAGE_PROMPTS
public/       logo/ (official ILS assets), assets/images/ (placeholders)
tests/        presentation.spec.ts (Playwright)
```

---

## Content accuracy & governance

- The **testimonial** attributed to Sarah Aldridge (Crescent Aid Foundation) is
  stored with `verified: false` and shown with a visible placeholder flag. Do
  **not** present it publicly as factual until the client confirms it.
- No fabricated statistics, volumes, dates, client names, awards, certifications
  or success rates are used anywhere.
- Corridor **geography uses real coordinates**; the map is a graticule with
  correctly-projected nodes — no invented borders or coastlines.
- Contact details are the approved values (the source PDF's malformed mobile
  number and shortened address were corrected). See
  [`docs/CONTENT_AUDIT.md`](docs/CONTENT_AUDIT.md).
