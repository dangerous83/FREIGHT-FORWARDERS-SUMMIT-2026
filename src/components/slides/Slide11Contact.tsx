import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, RotateCcw } from 'lucide-react';
import { contactContent } from '@/data/slides';
import { companyMeta } from '@/data/contact';
import { usePresentation } from '@/context/PresentationContext';
import { AnimatedHeadline } from '@/components/common/AnimatedHeadline';
import { ContactPanel } from '@/components/common/ContactPanel';
import { Modal } from '@/components/common/Modal';

export function Slide11Contact() {
  const { returnToStart } = usePresentation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="slide slide--contact" aria-label="Let's move what matters">
      <div className="slide-bg" aria-hidden="true">
        <div className="slide-bg__scrim slide-bg__scrim--flat" />
        <svg className="slide-bg__routes" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke="#255aad" strokeWidth="1.2" opacity="0.4">
            <path d="M-40,700 C500,560 1000,600 1660,420" strokeDasharray="4 200" className="intro-route-dash" />
          </g>
        </svg>
      </div>

      <div className="slide__inner contact-layout">
        <div className="contact-hero">
          <p className="kicker kicker--gold">{contactContent.kicker}</p>
          <AnimatedHeadline as="h2" className="contact-headline" text={contactContent.headline} />
          <p className="contact-support">{contactContent.supporting}</p>

          <div className="contact-actions">
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              <MessageSquare size={18} />
              {contactContent.cta}
            </button>
            <button className="btn-ghost" onClick={returnToStart}>
              <RotateCcw size={16} />
              Return to start
            </button>
          </div>
        </div>

        <div className="contact-details">
          <ContactPanel />
        </div>
      </div>

      <footer className="contact-footer" aria-hidden="true">
        <img src="/logo/ils-logo-white.png" alt="" />
        <span>{companyMeta.legalName} · {companyMeta.tagline}</span>
      </footer>

      <AnimatePresence>
        {modalOpen && (
          <Modal open onClose={() => setModalOpen(false)} title="Start a conversation with ILS">
            <div className="cta-modal">
              <p className="kicker kicker--gold">Start a conversation</p>
              <h3 className="cta-modal__title">Tell us what needs to move.</h3>
              <p className="muted">
                Reach the ILS team directly. Every channel below is live — email, phone and web.
              </p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <ContactPanel />
              </motion.div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
