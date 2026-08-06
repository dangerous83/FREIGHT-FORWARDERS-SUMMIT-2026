/**
 * Slide 07 — Humanitarian corridor case study.
 *
 * IMPORTANT / CONTENT GOVERNANCE:
 * The testimonial attributed to "Sarah Aldridge, Crescent Aid Foundation" that
 * appears in the source PDF is UNVERIFIED. It is stored here with
 * `verified: false` and MUST be presented as placeholder content requiring
 * client approval — never as an established fact.
 *
 * No shipment volumes, dates, client names, tonnage or success percentages are
 * invented. The stage copy describes the TYPE of operation and its complexity
 * in qualitative terms only.
 */

export interface Testimonial {
  quote: string;
  attributionName: string;
  attributionRole: string;
  attributionOrg: string;
  /** false => do NOT present publicly as factual; label as placeholder. */
  verified: boolean;
  note: string;
}

export interface CaseStudyStage {
  id: string;
  key: string;
  title: string;
  body: string;
}

export interface CaseStudy {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  stages: CaseStudyStage[];
  testimonial: Testimonial;
}

export const humanitarianCase: CaseStudy = {
  id: 'humanitarian-corridor',
  kicker: 'Case · Relief cargo into a landlocked corridor',
  title: 'Moving what matters, where others won’t',
  intro:
    'A qualitative walkthrough of how ILS runs humanitarian cargo into a landlocked, conflict-sensitive destination. Figures are deliberately omitted — this describes the operation, not fabricated performance data.',
  stages: [
    {
      id: 'challenge',
      key: 'The Challenge',
      title: 'A destination most forwarders decline',
      body: 'Relief cargo bound for a landlocked market reachable only through conflict-sensitive corridors, difficult terrain and multiple national borders. Standard networks stop at the last "safe" port.',
    },
    {
      id: 'route',
      key: 'The Route',
      title: 'Corridor, not a single lane',
      body: 'Cargo is staged and routed across the region — combining sea, road and rail legs — with each border and handover planned in advance rather than improvised on arrival.',
    },
    {
      id: 'complexity',
      key: 'The Complexity',
      title: 'Where the difficulty actually lives',
      body: 'Multi-border customs, conflict-sensitive access, remote last-mile terrain and constant coordination between drivers, agents and desks across several time zones.',
    },
    {
      id: 'response',
      key: 'The ILS Response',
      title: 'People on the ground, not an agent list',
      body: 'ILS runs the corridor with its own desks and regional network — routing around disruption, holding permits and escorts in place, and keeping cargo moving milestone to milestone.',
    },
    {
      id: 'result',
      key: 'The Result',
      title: 'Cargo that arrives where it was needed',
      body: 'Relief cargo delivered into a destination most competitors only view from a distance — repeatedly, over 15+ years. (Specific volumes and figures are intentionally not published without client verification.)',
    },
  ],
  testimonial: {
    quote:
      'We needed a partner who could handle Afghanistan and Central Asia without flinching. ILS has been moving our humanitarian shipments for 15+ years — every container, every milestone.',
    attributionName: 'Sarah Aldridge',
    attributionRole: 'Logistics Lead',
    attributionOrg: 'Crescent Aid Foundation',
    verified: false,
    note: 'PLACEHOLDER — unverified testimonial from source material. Do not present publicly as factual until confirmed and approved by the client.',
  },
};
