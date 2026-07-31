# Presentation Structure — ILS Freight Forwarders Summit 2026

A cinematic entry gateway followed by **11 composed slides** in a four-act arc.
Content lives in `src/data/`; components render it.

---

## Entry gateway (pre-slide)
`PresentationIntro` — a full-screen futuristic gateway (not counted as a slide).
Animated network background, globe geometry, and a central **ILS activation
button** with idle rings + scanning sweep. Click → 2.6s reveal sequence →
Slide 01. Skip-intro and reduced-motion paths fade straight in. Config in
`src/data/intro.ts`.

---

## Act I — The Setup ("everyone's the same")

**Slide 01 · Opening** — `WE DON'T DO EASY.`
Cinematic hero, animated route lines, "Begin the Journey" CTA. Establishes the
fearless positioning instantly.

**Slide 02 · Every Forwarder's Slide One**
Three interactive service cards (Ocean / Air / Road). Click/hover reveals the
tired industry clichés, then the punchline: *"Sound familiar? That's because
it's everyone's slide."*

**Slide 03 · Reach Isn't The Difference**
Giant animated `200+` counter → *"So does the company sitting next to you."* →
*"Reach isn't rare anymore. What's rare is where we actually go."* Abstract
network cloud (not a geographic map).

---

## Act II — The Difference ("we go where others won't")

**Slide 04 · The Corridor Nobody Else Wants**
Interactive corridor map (real coordinates) Hamburg → Dubai → Central Asia →
Kabul → Karachi. Route animates; each node opens an operational-brief drawer
with the real challenges (landlocked, conflict-sensitive, multi-border…).
Closes: *"This is the map most competitors only view from a safe distance."*

**Slide 05 · Boots On The Ground**
Five expandable location cards. Each opens a drawer with capability detail.
*"Our people. Our desks. Not a partner we call only when it gets hard."*

---

## Act III — The Proof ("the receipts")

**Slide 06 · The Receipts**
Four proof-point metric cards with on-enter count-up: 2002 · 20+ yrs · 3 yrs ·
Heavy Lift. Click a card for context. Numbers animate once, on viewport enter.

**Slide 07 · Humanitarian Corridor Case Study**
Clickable 5-stage journey (Challenge → Route → Complexity → Response → Result).
Includes the **unverified testimonial**, clearly flagged as placeholder pending
client approval. No fabricated figures.

**Slide 08 · Heavy-Lift Capability**
Progressive 6-step operational checklist (Route survey → Engineering → Permits →
Escorts → Lifting plan → Delivery) beside a heavy-lift visual. Message: complex
cargo needs a plan, not just a truck.

---

## Act IV — The Statement & Close

**Slide 09 · Rotterdam vs. Kabul**
Bold typographic reveal: `ANYONE CAN GET A CONTAINER TO ROTTERDAM.` →
`WE GET IT TO KABUL.` → *"When your GPS says 'route not found,' that's when our
phone rings."*

**Slide 10 · Why ILS**
Interactive comparison: select a genuine differentiator to see ILS vs. "the
usual pitch." Difficult corridors, regional knowledge, teams on the ground,
cross-border problem solving, heavy/project cargo, humanitarian logistics.

**Slide 11 · Let's Move What Matters**
Final CTA + working contact controls (email / office / mobile / website / map),
"Start a Conversation" modal, and "Return to Start."

---

## Navigation model
- Arrow keys / Space / PageUp-Down, mouse-wheel (throttled to one slide per
  gesture), swipe, edge click-zones, prev/next buttons, number keys 1–9,
  Home/End.
- Slide overview (thumbnails), keyboard-help panel, fullscreen, autoplay
  (pause-able), progress bar with clickable ticks, per-slide URL hash, and
  "Return to Start".
- Print stylesheet → one 16:9 slide per page for clean PDF export.
