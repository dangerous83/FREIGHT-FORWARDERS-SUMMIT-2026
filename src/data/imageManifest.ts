/**
 * Image manifest for the presentation.
 *
 * All visuals ship as polished, brand-consistent local SVG placeholder
 * compositions so the build is fully self-contained and never depends on
 * external hotlinks. Each entry maps 1:1 to a prompt in
 * docs/HIGGSFIELD_IMAGE_PROMPTS.md. To swap in a final Higgsfield 1K render,
 * drop a file with the SAME `file` path (as .webp/.avif) into
 * public/assets/images and update the extension here.
 *
 * `replaceWithGenerated: true` marks placeholders that should be replaced by a
 * real generated image before a live conference showing.
 */
export interface ManifestImage {
  id: string;
  /** Public path (served from /public). */
  file: string;
  slide: string;
  aspectRatio: '16:9' | '4:3' | '3:2' | '1:1';
  alt: string;
  purpose: string;
  /** Higgsfield generation setting — 1K only, per brief. */
  higgsfieldSetting: '1K';
  replaceWithGenerated: boolean;
}

export const imageManifest: ManifestImage[] = [
  {
    id: 'hero-convoy',
    file: '/assets/images/hero-convoy.svg',
    slide: 'Slide 01 — Opening',
    aspectRatio: '16:9',
    alt: 'Oversized industrial cargo convoy crossing a difficult desert-and-mountain route at dawn, with subtle ILS cobalt-blue accents.',
    purpose: 'Cinematic hero backdrop communicating difficult-corridor logistics.',
    higgsfieldSetting: '1K',
    replaceWithGenerated: true,
  },
  {
    id: 'hamburg-port',
    file: '/assets/images/hamburg.png',
    slide: 'Slide 04/05 — Hamburg',
    aspectRatio: '3:2',
    alt: 'Realistic European container port at Hamburg with cranes and stacked containers under cold atmospheric light.',
    purpose: 'Location card / corridor node visual for Hamburg.',
    higgsfieldSetting: '1K',
    replaceWithGenerated: true,
  },
  {
    id: 'dubai-operations',
    file: '/assets/images/dubai.png',
    slide: 'Slide 04/05 — Dubai',
    aspectRatio: '3:2',
    alt: 'Modern Dubai logistics environment with the skyline used naturally in the background and a cargo yard in the foreground.',
    purpose: 'Location card / corridor node visual for Dubai HQ.',
    higgsfieldSetting: '1K',
    replaceWithGenerated: true,
  },
  {
    id: 'central-asia-corridor',
    file: '/assets/images/central-asia.png',
    slide: 'Slide 04/05 — Central Asia',
    aspectRatio: '3:2',
    alt: 'Long-distance cargo trucks moving through rugged Central Asian terrain on a remote regional road.',
    purpose: 'Location card / corridor node visual for the Central Asia overland leg.',
    higgsfieldSetting: '1K',
    replaceWithGenerated: true,
  },
  {
    id: 'kabul-corridor',
    file: '/assets/images/kabul.png',
    slide: 'Slide 04/05/07 — Kabul',
    aspectRatio: '3:2',
    alt: 'Professional cargo convoy on a mountain approach toward Kabul, documentary in tone and respectful — no weapons or conflict drama.',
    purpose: 'Location card / humanitarian corridor visual for Kabul.',
    higgsfieldSetting: '1K',
    replaceWithGenerated: true,
  },
  {
    id: 'karachi-port',
    file: '/assets/images/karachi.png',
    slide: 'Slide 04/05 — Karachi',
    aspectRatio: '3:2',
    alt: 'Large South Asian port at Karachi with cargo cranes and an industrial working atmosphere.',
    purpose: 'Location card / corridor node visual for Karachi.',
    higgsfieldSetting: '1K',
    replaceWithGenerated: true,
  },
  {
    id: 'heavy-lift',
    file: '/assets/images/heavy-lift.svg',
    slide: 'Slide 08 — Heavy Lift',
    aspectRatio: '16:9',
    alt: 'Oversized refinery module transported on a multi-axle platform trailer with engineering escorts, realistic scale and safety procedures.',
    purpose: 'Premium heavy-lift capability visual.',
    higgsfieldSetting: '1K',
    replaceWithGenerated: true,
  },
  {
    id: 'humanitarian-case',
    file: '/assets/images/humanitarian-case.svg',
    slide: 'Slide 07 — Case study',
    aspectRatio: '16:9',
    alt: 'Sealed relief-cargo containers moving through a difficult mountain corridor, human-centred and documentary — not exploitative.',
    purpose: 'Case-study hero visual for the humanitarian corridor.',
    higgsfieldSetting: '1K',
    replaceWithGenerated: true,
  },
];

export const getImage = (id: string): ManifestImage | undefined =>
  imageManifest.find((i) => i.id === id);
