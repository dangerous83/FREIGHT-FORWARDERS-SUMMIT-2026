/**
 * "The Receipts" — Slide 06 proof points.
 * Only verifiable, non-fabricated claims are used. Numbers animate on enter.
 * Nothing here invents volumes, revenue, headcount or success percentages.
 */
export interface ProofPoint {
  id: string;
  /** Numeric value for the counter (null => non-numeric label like "Heavy Lift"). */
  value: number | null;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
  description: string;
  /** Extra context revealed on click. */
  detail: string;
  accent: 'cobalt' | 'gold' | 'orange';
}

export const proofPoints: ProofPoint[] = [
  {
    id: 'established',
    value: 2002,
    label: 'Established in Hamburg',
    description: 'Two decades of finding a way through.',
    detail:
      'ILS has operated from Dubai since 2002 — long enough to have built the relationships, permits and know-how that difficult corridors demand.',
    accent: 'cobalt',
  },
  {
    id: 'experience',
    value: 20,
    suffix: '+ yrs',
    label: 'Regional logistics experience',
    description: 'Hands-on operators led by two decades of regional expertise.',
    detail:
      'Young, hands-on operators on the ground, guided by leadership with more than twenty years moving cargo across the Gulf, Central and South Asia.',
    accent: 'cobalt',
  },
  {
    id: 'humanitarian',
    value: 15,
    suffix: '+ yrs',
    label: 'Humanitarian cargo into Kabul',
    description: 'Every container, every milestone.',
    detail:
      'Over fifteen continuous years moving humanitarian shipments into Kabul — a landlocked, conflict-sensitive destination that most forwarders will not touch.',
    accent: 'gold',
  },
  {
    id: 'heavy-lift',
    value: null,
    display: 'Heavy Lift',
    label: 'Refinery modules & project cargo',
    description: 'Permits, escorts, zero drama.',
    detail:
      'Oversized refinery modules moved on multi-axle platforms — with route surveys, permits, escort coordination and lifting plans handled as one operation.',
    accent: 'orange',
  },
];
