/**
 * Approved ILS contact details.
 * These values are the authoritative, client-approved contact points.
 * The source PDF contained a malformed mobile number ("+971 54 546 1339")
 * and a shortened address; both are corrected here per the approved brief.
 */
export interface ContactChannel {
  id: string;
  label: string;
  /** Human-readable display value */
  display: string;
  /** href for the actionable link (tel:, mailto:, https:) */
  href: string;
  icon: 'globe' | 'mail' | 'phone' | 'smartphone' | 'map-pin' | 'inbox';
}

export const contactChannels: ContactChannel[] = [
  {
    id: 'website',
    label: 'Website',
    display: 'www.ilsmtc.com',
    href: 'https://www.ilsmtc.com',
    icon: 'globe',
  },
  {
    id: 'email',
    label: 'Email',
    display: 'info@ilsmtc.com',
    href: 'mailto:info@ilsmtc.com',
    icon: 'mail',
  },
  {
    id: 'office',
    label: 'Office',
    display: '+971 4 434 3800',
    href: 'tel:+97144343800',
    icon: 'phone',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    display: '+971 50 466 5474',
    href: 'tel:+971504665474',
    icon: 'smartphone',
  },
];

export const contactAddress = {
  lines: ['Business Central Tower', 'Office No. 2802 B', 'Media City, Dubai, UAE'],
  poBox: '502344',
};

export const companyMeta = {
  legalName: 'ILS — International Logistic Services',
  shortName: 'ILS',
  tagline: 'Moving Cargo. Driving Trade. Since 2002.',
  established: 2002,
  hq: 'Dubai, UAE',
};
