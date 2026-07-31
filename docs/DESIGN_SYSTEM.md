# Design System — ILS Freight Forwarders Summit 2026

Tokens live in `src/styles/tokens.css`. This document is the human-readable
companion.

---

## 1. Brand palette

| Token | Hex | Role |
|---|---|---|
| `--ils-cobalt` | `#255AAD` | Primary brand — dominant accent |
| `--ils-cobalt-bright` | `#3A7BD5` | Interactive / hover cobalt |
| `--navy-deep` | `#071B33` | Primary background |
| `--navy-mid` | `#0B2748` | Elevated surfaces |
| `--gold` | `#E8B72E` | Emphasis (used sparingly) |
| `--orange` | `#E96332` | Corridor / warning emphasis (sparingly) |
| `--off-white` | `#F6F8FB` | Primary text |
| `--grey-soft` | `#DDE4EC` | Secondary text base |

**Discipline:** cobalt + navy dominate every slide. Gold and orange appear only
on genuine emphasis — proof points, corridor difficulty, the Kabul reveal. No
rainbow gradients, no neon, no glassmorphism overload.

---

## 2. Typography

- **Display / headings:** Sora (700–800). Big, tight, editorial.
- **Body / UI:** Inter (400–600).
- Fluid scale via `clamp()` + container query units (`cqw`) so type scales with
  the 16:9 **stage**, not the browser window — the deck reads identically at
  1920×1080 and on a laptop.

Key steps: `--fs-display` (hero), `--fs-h2` (slide titles), `--fs-mega-number`
(200+, count-ups), `--fs-kicker` (uppercase tracked eyebrows).

---

## 3. Layout

- Everything renders inside a **16:9 stage** (`.stage`, `container-type: size`).
  Container queries drive all responsive behaviour.
- Composition: dramatic scale contrast, generous whitespace, controlled
  asymmetry, oversized numbers, concise copy.
- Portrait phones: the stage fills the viewport and slides restructure into
  composed full-screen portrait layouts (internal scroll where needed) — never
  a tiny letterbox, never a long scrolling website.

---

## 4. Motion

- Framer Motion. Durations **300–900ms**; hero/statement reveals slightly
  longer. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Vocabulary: masked text reveals, masked image reveals, route-line draw,
  number counters (once, on enter), card expansion, drawer/modal slides,
  cinematic image scale, purposeful hover.
- **`prefers-reduced-motion`** fully supported: no camera moves, no large
  scaling, no spinning rings, counters snap to final value, slide changes fade.

---

## 5. Components

Shell: `PresentationShell`, `Slide` layer, `SlideNavigation`, `SlideProgress`,
`SlideOverview`, `FullscreenControl`, `KeyboardHelp`.
Intro: `PresentationIntro`, `ActivationButton`, `NetworkBackground`,
`IntroRouteAnimation` (route dashes), `LoadingRing`, `IntroAudioControl`,
`SkipIntroButton`.
Content: `AnimatedHeadline`, `ImageReveal`, `RouteMap`, `LocationCard`,
`MetricCard`, `CaseStudyTimeline`, `ContactPanel`, `Modal`, `Drawer`.

---

## 6. Accessibility

- Semantic HTML, ARIA labels on every icon-only control, `:focus-visible`
  styling (gold ring), keyboard operation of all interactions, `aria-live` on
  the slide counter, real `<button>`/`<a>` elements (no fake buttons).
- Contrast: off-white on deep navy comfortably exceeds WCAG AA for body text.

---

## 7. Do / Don't (per brief)

**Do:** premium corporate, bold editorial, cinematic, minimal-but-powerful,
logistics-focused, accurate geography.

**Don't:** generic blue gradients everywhere, excessive glassmorphism, neon,
glowing text, crowded layouts, tiny text, decorative-only animation, stock
handshakes, fake maps, fabricated statistics.
