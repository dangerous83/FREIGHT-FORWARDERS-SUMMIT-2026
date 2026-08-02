/**
 * Corridor nodes for the RouteMap (Slide 04) and the "Boots on the Ground"
 * location cards (Slide 05).
 *
 * Coordinates are REAL latitude/longitude for each city/region so the corridor
 * geography is accurate. "Central Asia" is a region, represented here by a
 * representative regional hub position (Tashkent, Uzbekistan) and clearly
 * labelled as a regional hub rather than a single office.
 */
export type LocationId = 'hamburg' | 'dubai' | 'central-asia' | 'kabul' | 'karachi';

export interface CorridorLocation {
  id: LocationId;
  name: string;
  country: string;
  role: string;
  /** Real geographic coordinates. */
  lat: number;
  lng: number;
  /** Sequence order along the corridor (Hamburg → Karachi). */
  order: number;
  /** Whether ILS operates a physical desk/office here vs. a regional footprint. */
  presence: 'office' | 'hub' | 'field';
  /** Short operational summary used in the corridor info panel. */
  summary: string;
  /** Concrete on-the-ground capability points (Slide 05). */
  capabilities: string[];
  /** The hard part of this leg (Slide 04 challenge chips). */
  challenges: string[];
  image: string;
}

export const locations: CorridorLocation[] = [
  {
    id: 'hamburg',
    name: 'Hamburg',
    country: 'Germany',
    role: 'European gateway',
    lat: 53.5511,
    lng: 9.9937,
    order: 0,
    presence: 'office',
    summary:
      'Where the corridor begins. Consolidation, documentation and departure planning out of one of Europe’s largest ports.',
    capabilities: [
      'Ocean & rail consolidation from Europe',
      'Export documentation and compliance',
      'Departure planning for onward corridors',
    ],
    challenges: ['Multi-modal handoffs', 'Strict EU export controls'],
    image: '/assets/images/hamburg.jpg',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    role: 'Headquarters',
    lat: 25.2048,
    lng: 55.2708,
    order: 1,
    presence: 'office',
    summary:
      'The nerve centre. Since 2002, ILS has coordinated difficult corridors from its Dubai HQ — the point where routes are engineered, not just booked.',
    capabilities: [
      'Corridor engineering & control tower',
      'Re-export & transhipment hub',
      'Customs, permits and carrier relationships',
    ],
    challenges: ['Complex re-export rules', 'Multi-border coordination'],
    image: '/assets/images/dubai.jpg',
  },
  {
    id: 'central-asia',
    name: 'Central Asia',
    country: 'Regional hub',
    role: 'Overland corridor',
    lat: 41.2995,
    lng: 69.2401,
    order: 2,
    presence: 'hub',
    summary:
      'The long overland stretch. Landlocked markets reached by road and rail across rugged terrain and multiple national borders.',
    capabilities: [
      'Overland road & rail movement',
      'Multi-border transit coordination',
      'Regional agent and driver network',
    ],
    challenges: ['Landlocked destinations', 'Difficult terrain', 'Multi-border coordination'],
    image: '/assets/images/central-asia.jpg',
  },
  {
    id: 'kabul',
    name: 'Kabul',
    country: 'Afghanistan',
    role: 'Landlocked destination',
    lat: 34.5553,
    lng: 69.2075,
    order: 3,
    presence: 'field',
    summary:
      'The destination most competitors only view from a safe distance. Conflict-sensitive, landlocked, and reached only with people who know the ground.',
    capabilities: [
      'Humanitarian cargo delivery',
      'Conflict-sensitive routing',
      'Last-mile into landlocked terrain',
    ],
    challenges: ['Conflict-sensitive corridor', 'Remote & landlocked', 'Complex customs'],
    image: '/assets/images/kabul.jpg',
  },
  {
    id: 'karachi',
    name: 'Karachi',
    country: 'Pakistan',
    role: 'South Asian seaport',
    lat: 24.8607,
    lng: 67.0011,
    order: 4,
    presence: 'office',
    summary:
      'The South Asian sea gateway. A major port feeding the overland corridors north — and an alternative route into the region.',
    capabilities: [
      'South Asian port operations',
      'Onward overland to landlocked markets',
      'Heavy and project cargo handling',
    ],
    challenges: ['Congested port flows', 'Onward inland complexity'],
    image: '/assets/images/karachi.jpg',
  },
];

export const getLocation = (id: LocationId): CorridorLocation =>
  locations.find((l) => l.id === id) as CorridorLocation;
