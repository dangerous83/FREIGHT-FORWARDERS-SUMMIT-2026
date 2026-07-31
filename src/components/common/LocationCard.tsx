import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import type { CorridorLocation } from '@/data/locations';
import { ImageReveal } from './ImageReveal';

interface Props {
  location: CorridorLocation;
  order: number;
  onOpen: (id: CorridorLocation['id']) => void;
}

const presenceLabel: Record<CorridorLocation['presence'], string> = {
  office: 'ILS office',
  hub: 'Regional hub',
  field: 'Field operations',
};

/** Expandable location card for "Boots on the Ground". */
export function LocationCard({ location, order, onOpen }: Props) {
  return (
    <motion.button
      type="button"
      className="location-card"
      onClick={() => onOpen(location.id)}
      aria-label={`${location.name}, ${location.country}. Open details.`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: order * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="location-card__media">
        <ImageReveal src={location.image} alt={location.name + ' operations'} delay={order * 0.06} rounded={false} />
        <span className="location-card__presence">
          <MapPin size={12} /> {presenceLabel[location.presence]}
        </span>
      </div>
      <div className="location-card__body">
        <div className="location-card__head">
          <h3>{location.name}</h3>
          <ArrowUpRight size={18} className="location-card__arrow" />
        </div>
        <p className="location-card__country">{location.country} · {location.role}</p>
      </div>
    </motion.button>
  );
}
