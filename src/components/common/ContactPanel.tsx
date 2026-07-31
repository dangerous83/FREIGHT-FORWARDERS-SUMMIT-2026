import { Globe, Mail, Phone, Smartphone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactChannels, contactAddress, type ContactChannel } from '@/data/contact';

const iconFor: Record<ContactChannel['icon'], typeof Globe> = {
  globe: Globe,
  mail: Mail,
  phone: Phone,
  smartphone: Smartphone,
  'map-pin': MapPin,
  inbox: MapPin,
};

/** Working contact controls — real tel:/mailto:/https links. */
export function ContactPanel() {
  return (
    <div className="contact-panel">
      <div className="contact-grid">
        {contactChannels.map((c, i) => {
          const Icon = iconFor[c.icon];
          return (
            <motion.a
              key={c.id}
              className="contact-item"
              href={c.href}
              target={c.icon === 'globe' ? '_blank' : undefined}
              rel={c.icon === 'globe' ? 'noopener noreferrer' : undefined}
              aria-label={`${c.label}: ${c.display}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="contact-item__icon">
                <Icon size={18} />
              </span>
              <span className="contact-item__text">
                <span className="contact-item__label">{c.label}</span>
                <span className="contact-item__value">{c.display}</span>
              </span>
              <ArrowUpRight size={16} className="contact-item__arrow" />
            </motion.a>
          );
        })}
      </div>

      <div className="contact-address">
        <span className="contact-item__icon">
          <MapPin size={18} />
        </span>
        <address>
          {contactAddress.lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
          <span className="muted">P.O. Box {contactAddress.poBox}</span>
        </address>
      </div>
    </div>
  );
}
