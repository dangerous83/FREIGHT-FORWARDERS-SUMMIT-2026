import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { CaseStudyStage } from '@/data/caseStudies';

interface Props {
  stages: CaseStudyStage[];
  activeIndex: number;
  onSelect: (i: number) => void;
}

/** Clickable step-by-step journey through the case-study stages. */
export function CaseStudyTimeline({ stages, activeIndex, onSelect }: Props) {
  return (
    <ol className="case-timeline" aria-label="Case study stages">
      {stages.map((stage, i) => {
        const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'todo';
        return (
          <li key={stage.id} className={`case-step case-step--${state}`}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={i === activeIndex}
              aria-label={`Stage ${i + 1}: ${stage.key}`}
            >
              <span className="case-step__marker">
                {state === 'done' ? <Check size={13} /> : <span>{i + 1}</span>}
              </span>
              <span className="case-step__key">{stage.key}</span>
            </button>
            {i < stages.length - 1 && (
              <span className="case-step__line" aria-hidden="true">
                <motion.span
                  className="case-step__line-fill"
                  initial={false}
                  animate={{ scaleX: i < activeIndex ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
