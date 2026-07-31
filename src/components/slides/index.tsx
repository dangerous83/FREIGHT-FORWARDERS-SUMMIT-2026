import type { SlideComponentKey } from '@/data/slides';
import { Slide01Opening } from './Slide01Opening';
import { Slide02GenericPitch } from './Slide02GenericPitch';
import { Slide03Reach } from './Slide03Reach';
import { Slide04Corridor } from './Slide04Corridor';
import { Slide05Boots } from './Slide05Boots';
import { Slide06Receipts } from './Slide06Receipts';
import { Slide07CaseStudy } from './Slide07CaseStudy';
import { Slide08HeavyLift } from './Slide08HeavyLift';
import { Slide09Contrarian } from './Slide09Contrarian';
import { Slide10WhyIls } from './Slide10WhyIls';
import { Slide11Contact } from './Slide11Contact';

export const slideComponents: Record<SlideComponentKey, () => JSX.Element> = {
  opening: Slide01Opening,
  'generic-pitch': Slide02GenericPitch,
  reach: Slide03Reach,
  corridor: Slide04Corridor,
  boots: Slide05Boots,
  receipts: Slide06Receipts,
  'case-study': Slide07CaseStudy,
  'heavy-lift': Slide08HeavyLift,
  contrarian: Slide09Contrarian,
  'why-ils': Slide10WhyIls,
  contact: Slide11Contact,
};
