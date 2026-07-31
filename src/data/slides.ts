/**
 * Master slide registry + per-slide content.
 * Components read from here; content is never hard-coded inside large JSX files.
 */

export interface SlideMeta {
  /** 1-based index. */
  index: number;
  /** URL hash id, e.g. #/opening */
  hash: string;
  /** Short title for overview + thumbnails. */
  title: string;
  /** Overview kicker / section label. */
  section: string;
  /** Component key resolved in the SlideRenderer. */
  component: SlideComponentKey;
  /** Accent theme for progress + thumbnail. */
  accent: 'cobalt' | 'gold' | 'orange' | 'navy';
}

export type SlideComponentKey =
  | 'opening'
  | 'generic-pitch'
  | 'reach'
  | 'corridor'
  | 'boots'
  | 'receipts'
  | 'case-study'
  | 'heavy-lift'
  | 'contrarian'
  | 'why-ils'
  | 'contact';

export const slides: SlideMeta[] = [
  { index: 1, hash: '/opening', title: 'We Don’t Do Easy', section: 'Opening', component: 'opening', accent: 'navy' },
  { index: 2, hash: '/every-forwarder', title: 'Every Forwarder’s Slide One', section: 'The Setup', component: 'generic-pitch', accent: 'cobalt' },
  { index: 3, hash: '/reach', title: 'Reach Isn’t The Difference', section: 'The Setup', component: 'reach', accent: 'cobalt' },
  { index: 4, hash: '/corridor', title: 'The Corridor Nobody Wants', section: 'The Difference', component: 'corridor', accent: 'orange' },
  { index: 5, hash: '/boots', title: 'Boots On The Ground', section: 'The Difference', component: 'boots', accent: 'cobalt' },
  { index: 6, hash: '/receipts', title: 'The Receipts', section: 'The Proof', component: 'receipts', accent: 'gold' },
  { index: 7, hash: '/case-study', title: 'Humanitarian Corridor', section: 'The Proof', component: 'case-study', accent: 'gold' },
  { index: 8, hash: '/heavy-lift', title: 'Heavy-Lift Capability', section: 'The Proof', component: 'heavy-lift', accent: 'orange' },
  { index: 9, hash: '/rotterdam-kabul', title: 'Rotterdam vs. Kabul', section: 'The Statement', component: 'contrarian', accent: 'orange' },
  { index: 10, hash: '/why-ils', title: 'Why ILS', section: 'The Close', component: 'why-ils', accent: 'cobalt' },
  { index: 11, hash: '/contact', title: 'Let’s Move What Matters', section: 'The Close', component: 'contact', accent: 'gold' },
];

export const SLIDE_COUNT = slides.length;

export const findSlideByHash = (hash: string): SlideMeta | undefined => {
  const clean = hash.replace(/^#/, '');
  return slides.find((s) => s.hash === clean);
};

/* ------------------------------------------------------------------ */
/*  Slide 01 — Opening                                                 */
/* ------------------------------------------------------------------ */
export const openingContent = {
  kicker: 'Freight Forwarders Summit · 2026',
  headline: 'WE DON’T DO EASY.',
  supportingLines: ['International Logistic Services', 'Dubai, since 2002'],
  cta: 'Begin the Journey',
};

/* ------------------------------------------------------------------ */
/*  Slide 02 — The generic forwarder pitch                             */
/* ------------------------------------------------------------------ */
export interface ServiceCard {
  id: string;
  service: string;
  subtitle: string;
  icon: 'ship' | 'plane' | 'truck';
  /** The tired industry phrases revealed on interaction. */
  clichés: string[];
}

export const genericPitch = {
  kicker: 'Slide one of every pitch deck ever made',
  headline: 'Every forwarder’s slide one',
  cards: [
    {
      id: 'ocean',
      service: 'Ocean Freight',
      subtitle: 'FCL · LCL · Reefer',
      icon: 'ship',
      clichés: ['“Global coverage”', '“Competitive rates”', '“End-to-end visibility”'],
    },
    {
      id: 'air',
      service: 'Air Freight',
      subtitle: 'Time-critical cargo',
      icon: 'plane',
      clichés: ['“Speed you can trust”', '“Priority handling”', '“Anywhere, overnight”'],
    },
    {
      id: 'road',
      service: 'Road Transport',
      subtitle: 'Cross-border trucking',
      icon: 'truck',
      clichés: ['“Seamless door-to-door”', '“Reliable fleet”', '“Full track & trace”'],
    },
  ] as ServiceCard[],
  punchline: 'Sound familiar? That’s because it’s everyone’s slide.',
};

/* ------------------------------------------------------------------ */
/*  Slide 03 — Reach is not the difference                             */
/* ------------------------------------------------------------------ */
export const reachContent = {
  kicker: 'Reach is table stakes',
  number: 200,
  suffix: '+',
  label: 'Countries and territories in our network.',
  reveal: 'So does the company sitting next to you.',
  statement: 'Reach isn’t rare anymore. What’s rare is where we actually go.',
};

/* ------------------------------------------------------------------ */
/*  Slide 04 — The corridor                                            */
/* ------------------------------------------------------------------ */
export const corridorContent = {
  kicker: 'The route map',
  headline: 'The Corridor Nobody Else Wants',
  closing: 'This is the map most competitors only view from a safe distance.',
};

/* ------------------------------------------------------------------ */
/*  Slide 05 — Boots on the ground                                     */
/* ------------------------------------------------------------------ */
export const bootsContent = {
  kicker: 'Presence, not proximity',
  headlineLines: ['Boots on the ground.', 'Not an agent list.'],
  statement: 'Our people. Our desks. Not a partner we call only when it gets hard.',
};

/* ------------------------------------------------------------------ */
/*  Slide 06 — The receipts (see proofPoints.ts)                       */
/* ------------------------------------------------------------------ */
export const receiptsContent = {
  kicker: 'The receipts',
  headline: 'Twenty years of finding a way through',
};

/* ------------------------------------------------------------------ */
/*  Slide 08 — Heavy lift                                              */
/* ------------------------------------------------------------------ */
export interface HeavyLiftStep {
  id: string;
  step: string;
  detail: string;
}

export const heavyLiftContent = {
  kicker: 'Project & heavy cargo',
  headline: 'Complex cargo needs a plan, not just a truck',
  intro:
    'Refinery modules, oversized units and project cargo aren’t moved — they’re engineered from survey to final delivery.',
  steps: [
    { id: 'survey', step: 'Route Survey', detail: 'Physical survey of the corridor — clearances, bridges, turns and load-bearing points.' },
    { id: 'engineering', step: 'Engineering Review', detail: 'Load calculations, trailer configuration and structural checks before anything moves.' },
    { id: 'permits', step: 'Permits', detail: 'Oversize / overweight permits and cross-border authorisations secured in advance.' },
    { id: 'escorts', step: 'Escort Coordination', detail: 'Police and pilot-vehicle escorts scheduled across each jurisdiction.' },
    { id: 'lifting', step: 'Lifting Plan', detail: 'Crane selection, rigging and lift sequencing signed off by engineers.' },
    { id: 'delivery', step: 'Final Delivery', detail: 'Placement and hand-over at destination — the plan executed, not improvised.' },
  ] as HeavyLiftStep[],
};

/* ------------------------------------------------------------------ */
/*  Slide 09 — The contrarian statement                                */
/* ------------------------------------------------------------------ */
export const contrarianContent = {
  kicker: 'The statement',
  setup: 'ANYONE CAN GET A CONTAINER TO ROTTERDAM.',
  reveal: 'WE GET IT TO KABUL.',
  supporting: 'When your GPS says “route not found,” that’s when our phone rings.',
};

/* ------------------------------------------------------------------ */
/*  Slide 10 — Why ILS                                                 */
/* ------------------------------------------------------------------ */
export interface Differentiator {
  id: string;
  label: string;
  detail: string;
  /** The "everyone else" contrast column. */
  generic: string;
}

export const whyIlsContent = {
  kicker: 'The genuine difference',
  headline: 'Why ILS',
  intro: 'Not a longer service list. A different definition of what “possible” means.',
  differentiators: [
    { id: 'corridors', label: 'Difficult trade corridors', detail: 'We specialise where others stop — landlocked, conflict-sensitive, remote.', generic: 'The easy, high-volume lanes' },
    { id: 'knowledge', label: 'Regional knowledge', detail: 'Two decades of on-the-ground understanding across the Gulf and Central/South Asia.', generic: 'A global name, local strangers' },
    { id: 'teams', label: 'Operational teams on the ground', detail: 'Our own people and desks — not a partner we call only when it gets hard.', generic: 'An agent list' },
    { id: 'problem-solving', label: 'Cross-border problem solving', detail: 'Multi-border customs and coordination handled as one movement.', generic: 'Handoffs and finger-pointing' },
    { id: 'heavy', label: 'Heavy & project cargo', detail: 'Refinery modules, permits, escorts and lifting plans — engineered end to end.', generic: 'Standard boxes only' },
    { id: 'humanitarian', label: 'Humanitarian logistics', detail: 'Relief cargo delivered into destinations most networks decline.', generic: 'Route not found' },
  ] as Differentiator[],
};

/* ------------------------------------------------------------------ */
/*  Slide 11 — Contact                                                 */
/* ------------------------------------------------------------------ */
export const contactContent = {
  kicker: 'Let’s talk',
  headline: 'LET’S MOVE WHAT MATTERS.',
  supporting: 'ILS — Moving Cargo. Driving Trade. Since 2002.',
  cta: 'Start a Conversation',
};
