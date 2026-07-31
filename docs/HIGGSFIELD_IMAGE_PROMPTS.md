# Higgsfield Image Prompts — ILS Freight Forwarders Summit 2026

**Generation setting: Higgsfield 1K only. Do NOT request or generate 2K.**

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
