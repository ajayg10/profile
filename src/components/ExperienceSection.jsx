import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Network, Brain, Database, Cloud, Cpu } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';

const highlightIcons = [Cpu, Shield, Network, Brain, Database, Cloud];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function ExperienceSection({ profile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();
  const { systemFlow = [], highlights = [] } = profile.experience || {};

  return (
    <section id="experience" ref={ref} className="relative py-24 md:py-32">
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="site-container">
        {/* ── Section heading ── */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp()}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={inView ? 'show' : 'hidden'}
          className="mb-14"
        >
          <span className="eyebrow">Experience</span>
          <h2 className="section-heading mb-4">
            Engineering Depth
          </h2>
          <p className="font-inter text-sm text-[var(--text-muted)] max-w-md">
            How I think about building systems — from HTTP to LLM and back.
          </p>
        </motion.div>

        {/* ── System Flow — horizontal pipeline ── */}
        {systemFlow.length > 0 && (
          <motion.div
            variants={reducedMotion ? {} : fadeUp(0.1)}
            initial={reducedMotion ? 'show' : 'hidden'}
            animate={inView ? 'show' : 'hidden'}
            className="mb-14"
          >
            <h3 className="font-satoshi font-bold text-[var(--text-primary)] text-base mb-6 tracking-tight">
              Request Lifecycle
            </h3>

            {/* Pipeline visualization */}
            <div className="glass rounded-xl p-5 overflow-x-auto">
              <div className="flex items-stretch gap-0 min-w-max">
                {systemFlow.map((step, i) => (
                  <div key={step.label} className="flex items-stretch">
                    {/* Step */}
                    <div className="flex flex-col justify-between px-5 py-3 min-w-[160px]">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-accent/40" />
                          <h4 className="font-satoshi font-semibold text-[var(--text-primary)] text-sm whitespace-nowrap">
                            {step.label}
                          </h4>
                        </div>
                        <code className="font-mono text-[0.62rem] text-[var(--text-muted)] block mb-1">
                          {step.log}
                        </code>
                      </div>
                      <span className="font-mono text-[0.58rem] text-[var(--text-faint)] mt-2">
                        {step.metric}
                      </span>
                    </div>

                    {/* Arrow connector */}
                    {i < systemFlow.length - 1 && (
                      <div className="flex items-center px-1">
                        <svg width="20" height="12" viewBox="0 0 20 12" className="text-accent/20">
                          <path d="M0 6h16M13 2l4 4-4 4" stroke="currentColor" strokeWidth="1" fill="none" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Technical Highlights ── */}
        {highlights.length > 0 && (
          <>
            <motion.div
              variants={reducedMotion ? {} : fadeUp(0.15)}
              initial={reducedMotion ? 'show' : 'hidden'}
              animate={inView ? 'show' : 'hidden'}
              className="mb-6"
            >
              <h3 className="font-satoshi font-bold text-[var(--text-primary)] text-base tracking-tight">
                Technical Highlights
              </h3>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlights.map((item, i) => {
                const Icon = highlightIcons[i % highlightIcons.length];
                return (
                  <motion.div
                    key={item.text}
                    variants={reducedMotion ? {} : fadeUp(0.2 + i * 0.06)}
                    initial={reducedMotion ? 'show' : 'hidden'}
                    animate={inView ? 'show' : 'hidden'}
                    className="glass card-hover rounded-xl p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] flex-shrink-0 mt-0.5">
                        <Icon size={14} className="text-accent/50" />
                      </div>
                      <div>
                        <h4 className="font-satoshi font-semibold text-[var(--text-primary)] text-sm mb-2 leading-tight">
                          {item.text}
                        </h4>
                        <p className="font-inter text-xs text-[var(--text-muted)] leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
