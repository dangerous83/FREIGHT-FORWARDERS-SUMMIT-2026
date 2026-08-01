# Higgsfield Image Prompts — ILS Freight Forwarders Summit 2026

**Generation setting: Higgsfield 1K only. Do NOT request or generate 2K.**

---

## ✅ The 8 renders are ALREADY GENERATED (in your Higgsfield account)

All eight images below were generated with the **Soul Location** model and are
in your Higgsfield generation history (the model even placed them at the real
locations — Hamburg's Waltershofer Hafen, Jebel Ali, the Pamir Highway, Salang
Pass, Port Qasim). This build environment's network policy blocks the image
CDN, so they could not be pulled in automatically. **From your own browser they
download fine.**

**To drop them in (2 minutes):**
1. Open each link below (or find it in your Higgsfield history), download the PNG.
2. Convert to WebP (any tool, or `cwebp in.png -q 80 -o out.webp`) — optional but recommended.
3. Save into `public/assets/images/` using the exact filename in the table.
4. In `src/data/imageManifest.ts` change that entry's extension to `.webp`
   (or `.png`) and set `replaceWithGenerated: false`.
5. `npm run build`. Done — no code changes.

> Links are unsigned CloudFront URLs and **may expire**; if a link 404s, the
> render is still in your Higgsfield account history under the same date.

Base URL: `https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/`

| Save as (public/assets/images/) | Higgsfield render file (append to Base URL) |
|---|---|
| `hero-convoy.webp` | `hf_20260731_193531_1831f935-0bd4-4f49-8ae9-005dc183118b.png` |
| `hamburg-port.webp` | `hf_20260731_193609_36dea3ee-30a7-4364-ae44-d932441ce4c2.png` |
| `dubai-operations.webp` | `hf_20260731_193616_83bc6d81-63a8-4ca5-a26f-44949195d5ea.png` |
| `central-asia-corridor.webp` | `hf_20260731_193625_f929cdee-19f8-4905-a02d-1ebbcebd5554.png` |
| `kabul-corridor.webp` | `hf_20260731_193628_8b902196-c59b-48f8-9b9f-4bb7f62da312.png` |
| `karachi-port.webp` | `hf_20260731_193638_fce3dcc5-6639-49d6-9fa8-2d4a2ad6c891.png` |
| `heavy-lift.webp` | `hf_20260731_193644_b795d464-7746-4607-b323-8d8885526d10.png` |
| `humanitarian-case.webp` | `hf_20260731_193652_19e73005-d76c-40d8-905e-ae57af322cd1.png` |

Until then the deck ships with **cinematic atmospheric placeholder art** (dark
film-graded compositions, not clip-art) so it already looks premium. The prompts
below are the source of truth if you want to regenerate.

---

The presentation currently ships with polished local **SVG placeholder
compositions** (clearly marked `PLACEHOLDER · REPLACE WITH HIGGSFIELD 1K`) so
the build is self-contained. To go live, generate each image below at **1K**,
optimise to **WebP/AVIF**, and drop it into `public/assets/images/` using the
**same base filename** (then update the extension in `src/data/imageManifest.ts`).

Global rules for every image:
- 1K only · no text in the image · no fabricated ILS logos or branding
- no impossible vehicle geometry · no distorted containers, wheels, cranes or hands
- realistic scale and lighting · documentary, premium, corporate tone
- subtle ILS cobalt-blue (`#255AAD`) accents where natural

---

## 1. `hero-convoy` — Opening hero
- **Slide:** 01 · Opening
- **Aspect ratio:** 16:9 · **Setting:** 1K
- **Recommended crop:** full-bleed background, subject left-of-centre (text sits left)
- **Prompt:** *Cinematic wide shot at dawn of an oversized industrial cargo convoy — heavy trucks and a multi-axle platform trailer — crossing a difficult route between desert and rugged mountains. Cold blue morning light with warm sun on the horizon, long shadows, atmospheric haze, dust. Premium, photorealistic, epic sense of scale and distance. Subtle cobalt-blue accents on vehicles. Editorial commercial photography.*
- **Negative:** *text, logos, watermarks, cartoon, neon, glow, distorted wheels or trailers, floating vehicles, warped containers, extra axles, people close-up hands.*
- **Alt:** Oversized industrial cargo convoy crossing a difficult desert-and-mountain route at dawn, with subtle ILS cobalt-blue accents.

## 2. `hamburg-port` — Hamburg
- **Slide:** 04/05 · Hamburg · **AR:** 3:2 · **1K**
- **Crop:** landscape, cranes upper third
- **Prompt:** *Realistic European container port at Hamburg, cold atmospheric overcast light. Gantry cranes, neatly stacked shipping containers, quayside, calm water reflections. Muted blue-grey palette, fine drizzle in the air. Documentary industrial photography, wide depth of field.*
- **Negative:** *text, logos, tropical light, palm trees, distorted cranes, bent containers, surreal colours.*
- **Alt:** Realistic European container port at Hamburg with cranes and stacked containers under cold atmospheric light.

## 3. `dubai-operations` — Dubai HQ
- **Slide:** 04/05 · Dubai · **AR:** 3:2 · **1K**
- **Crop:** skyline background, cargo yard foreground
- **Prompt:** *Modern Dubai logistics environment at golden hour. A container / cargo yard and logistics vehicles in the foreground; the Dubai skyline naturally in the far background at a realistic distance. Warm desert light, clean modern infrastructure. Professional corporate photography.*
- **Negative:** *text, logos, Burj Khalifa placed inside a seaport, skyscrapers next to ships unrealistically, distorted buildings, fake reflections, neon.*
- **Alt:** Modern Dubai logistics environment with the skyline used naturally in the background and a cargo yard in the foreground.

## 4. `central-asia-corridor` — Central Asia
- **Slide:** 04/05 · Central Asia · **AR:** 3:2 · **1K**
- **Crop:** road leading into rugged terrain
- **Prompt:** *Long-distance cargo trucks moving along a remote regional road through rugged Central Asian terrain — dry hills, wide valleys, distant snow-capped mountains. Late afternoon light, dust trail behind the trucks. Realistic, documentary, sense of long overland distance.*
- **Negative:** *text, logos, highways with modern signage, tropical scenery, distorted trucks, floating vehicles, surreal colours.*
- **Alt:** Long-distance cargo trucks moving through rugged Central Asian terrain on a remote regional road.

## 5. `kabul-corridor` — Kabul humanitarian corridor
- **Slide:** 04/05/07 · Kabul · **AR:** 3:2 · **1K**
- **Crop:** convoy on mountain approach
- **Prompt:** *A professional cargo convoy on a mountain approach toward a landlocked city, respectful documentary tone. Dust, rugged brown mountains, clear high-altitude light. Focus on logistics and movement, dignified and calm.*
- **Negative:** *text, logos, weapons, soldiers, military vehicles, conflict drama, explosions, sensationalism, distorted trucks.*
- **Alt:** Professional cargo convoy on a mountain approach toward Kabul, documentary in tone and respectful — no weapons or conflict drama.

## 6. `karachi-port` — Karachi
- **Slide:** 04/05 · Karachi · **AR:** 3:2 · **1K**
- **Crop:** working port, cranes and containers
- **Prompt:** *Large South Asian port at Karachi, busy industrial working atmosphere. Cargo cranes, container stacks, trucks, warm hazy coastal light. Realistic, documentary, energetic but ordered.*
- **Negative:** *text, logos, distorted cranes, bent containers, surreal colours, cartoon.*
- **Alt:** Large South Asian port at Karachi with cargo cranes and an industrial working atmosphere.

## 7. `heavy-lift` — Heavy-lift operation
- **Slide:** 08 · Heavy Lift · **AR:** 16:9 · **1K**
- **Crop:** module + trailer centre, escorts visible
- **Prompt:** *An oversized refinery module transported on a multi-axle self-propelled platform trailer on a wide road, with engineering escort vehicles front and back. Realistic scale — the module dwarfs the trucks — safety markings, daylight, professional heavy-transport operation. Photorealistic industrial photography.*
- **Negative:** *text, logos, impossible geometry, too few or floating axles, distorted trailer, warped module, unsafe unrealistic rigging.*
- **Alt:** Oversized refinery module transported on a multi-axle platform trailer with engineering escorts, realistic scale and safety procedures.

## 8. `humanitarian-case` — Case study hero
- **Slide:** 07 · Case study · **AR:** 16:9 · **1K**
- **Crop:** sealed containers/relief cargo in a mountain corridor
- **Prompt:** *Sealed relief-cargo shipping containers and trucks moving through a difficult mountain corridor. Human-centred but not exploitative — focus on the cargo and the route, dignified documentary style, cool daylight, dust and distance.*
- **Negative:** *text, logos, distress imagery, crowds, weapons, military, sensationalism, distorted containers.*
- **Alt:** Sealed relief-cargo containers moving through a difficult mountain corridor, human-centred and documentary — not exploitative.

---

## Replacement workflow
1. Generate the image at **1K** in Higgsfield with the prompt above.
2. Optimise to `.webp` (or `.avif`).
3. Save to `public/assets/images/<id>.webp` (same base name as the placeholder).
4. In `src/data/imageManifest.ts`, change that entry's `file` extension to
   `.webp` and set `replaceWithGenerated: false`.
5. Rebuild — no code changes required.
