# Content Audit — ILS Freight Forwarders Summit 2026

Source: `ILS_Summit_Presentation.pdf` (9 pages). This audit records what the
original deck said, the problems found, and the editorial decisions applied when
rebuilding it into the interactive presentation.

---

## 1. Original structure (as extracted)

| PDF page | Content |
|---|---|
| 1 | Title — "WE DON'T DO EASY." / International Logistics Services — Dubai, since 2002 / Freight Forwarders Summit · 2026 |
| 2 | "Every forwarder's slide one" — Ocean / Air / Road cards → "Sound familiar? That's because it's everyone's slide." |
| 3 | "200+ countries and territories in our network" → "So does the guy next to you." → "Reach isn't rare anymore. What's rare is where we actually go." |
| 4 | "The Corridor Nobody Else Wants" — Hamburg / Dubai / Central Asia / Kabul / Karachi, with Landlocked / Conflict Zones / Remote & complex |
| 5 | "Boots on the Ground. Not an Agent List." — Dubai / Hamburg / Central Asia / Kabul / Karachi |
| 6 | "The Receipts" — 2002 / Local Talent / 3 yrs / Heavy Lift |
| 7 | Testimonial — Sarah Aldridge, Crescent Aid Foundation |
| 8 | "Anyone can get a container to Rotterdam." / "We get it to Kabul." |
| 9 | "Let's Move What Matters" — contact details |

The narrative arc is strong: **setup (everyone's the same) → turn (we go where others won't) → proof → statement → close.** It was preserved and tightened.

---

## 2. Problems found & corrections

### 2.1 Reversed / malformed phone numbers
- **Mobile number** in the PDF was rendered as `+ 971 54 546 1339` with digits split across styled runs — inconsistent with the approved mobile. **Corrected to the approved `+971 50 466 5474`** (`tel:+971504665474`).
- **Office number** `+ 971 4 434 3800` was split across runs (`+ 971` / `4` / `434` / `3800`). **Normalised to `+971 4 434 3800`** (`tel:+97144343800`).

### 2.2 Punctuation placed at the start of the next line
The PDF repeatedly split a trailing period onto its own run/line, e.g.:
- `WE DON'T DO EASY` + `.`
- `Sound familiar? That's because it's everyone's slide` + `.`
- `So does the guy next to you` + `.`

All sentence-final punctuation was **re-attached to its sentence**.

### 2.3 "yrs 3" / "3 yrs" formatting
- `3` `yrs` (split) → **"3 Years"** (with "yrs" retained as a compact suffix on the metric card where space is tight).
- `Local Talent … led by two decades` → reframed as **"20+ yrs — Regional logistics experience"** to make the proof point a real, countable receipt.

### 2.4 Broken quotation marks
The testimonial opened with a leading `"` on its own line and closed with `".` The quote was **re-typeset with matched curly quotes** and the period placed inside the sentence.

### 2.5 Inconsistent capitalisation / casing
- Slide titles were inconsistently cased (Title Case vs sentence case). Standardised: **display headlines in the deck's bold voice**, section kickers in uppercase tracking.

### 2.6 Tone clean-ups (kept the fearless voice)
- "So does the **guy** next to you" → "So does the **company sitting next to you**" (keeps the jab, reads for an international executive audience).
- "The map most of our competitors only look at from a very safe distance" → "**This is the map most competitors only view from a safe distance.**"
- "Not a partner we call when it gets hard" → "**Not a partner we call only when it gets hard.**"

### 2.7 Company name
The PDF mixes "International Logistics Services" (page 1) with the brief's **"International Logistic Services."** The brief spelling is treated as authoritative for the brand line; the descriptive phrase "logistics services" is retained where it reads naturally.

---

## 3. Content governance — unverified & non-fabricated

- **Testimonial (Sarah Aldridge, Crescent Aid Foundation):** stored in `src/data/caseStudies.ts` with `verified: false` and rendered with a visible **"Unverified · placeholder — pending client approval"** flag. It is never presented as established fact.
- **No fabricated figures.** The case study deliberately omits tonnage, shipment counts, dates, revenue, headcount, fleet size, delivery percentages, awards, certifications and client lists. Where the PDF implied numbers ("three years"), only the qualitative, source-supported claim is kept.
- **Geography is real.** Corridor coordinates are actual latitude/longitude; the map draws a graticule + correctly-projected nodes, with **no invented borders or coastlines**.
- **Images are clearly-marked placeholders** ("PLACEHOLDER · REPLACE WITH HIGGSFIELD 1K") to be swapped for approved renders. No fabricated ILS logos are generated; the official supplied logo/icon assets are used.

---

## 4. Verified / approved facts used

- Established **2002**, Dubai HQ.
- Corridor: **Hamburg → Dubai → Central Asia → Kabul → Karachi**.
- Contact: `info@ilsmtc.com` · `+971 4 434 3800` · `+971 50 466 5474` · `www.ilsmtc.com` · Business Central Tower, Office No. 2802 B, Media City, Dubai, UAE · P.O. Box 502344.
- Tagline: **"Moving Cargo. Driving Trade. Since 2002."**
