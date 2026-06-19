import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Brain, Cloud, Code2 } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';

const categoryIcons = {
  'Backend': Server,
  'AI & Agentic Systems': Brain,
  'Cloud & DevOps': Cloud,
  'Languages': Code2,
};

const categoryColors = {
  'Backend': 'cyan',
  'AI & Agentic Systems': 'violet',
  'Cloud & DevOps': 'cyan',
  'Languages': 'violet',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export default function SkillsSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  const categories = Object.entries(profile.skills);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="section-container">
        {/* Section heading */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          className="mb-14"
        >
          <p className="font-inter text-body-sm text-cyan font-medium tracking-wider uppercase mb-3">
            Skills
          </p>
          <h2 className="font-satoshi text-display-md text-white mb-4 max-sm:text-display-sm">
            Tools & Technologies
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-cyan to-violet rounded-full" />
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map(([category, skills], catIndex) => {
            const Icon = categoryIcons[category] || Code2;
            const accent = categoryColors[category] || 'cyan';

            const hoverClass = accent === 'cyan'
              ? 'hover:bg-white/[0.04] hover:border-cyan/20 hover:shadow-[0_0_30px_rgba(0,217,255,0.04)]'
              : 'hover:bg-white/[0.04] hover:border-violet/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.04)]';

            return (
              <motion.div
                key={category}
                variants={reducedMotion ? {} : fadeUp}
                initial={reducedMotion ? 'show' : 'hidden'}
                animate={isInView ? 'show' : 'hidden'}
                transition={{ delay: catIndex * 0.1 }}
                className={`glass-surface rounded-2xl p-6 transition-all duration-300 ${hoverClass}`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-lg ${
                    accent === 'cyan'
                      ? 'bg-cyan/10 text-cyan'
                      : 'bg-violet/10 text-violet'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-satoshi text-heading-sm text-white">
                    {category}
                  </h3>
                </div>

                {/* Skill badges */}
                <motion.div
                  variants={reducedMotion ? {} : staggerContainer}
                  initial={reducedMotion ? 'show' : 'hidden'}
                  animate={isInView ? 'show' : 'hidden'}
                  className="flex flex-wrap gap-2"
                >
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={reducedMotion ? {} : scaleIn}
                      className={`inline-flex items-center px-3 py-1.5 text-body-xs font-inter font-medium
                        rounded-lg border transition-colors duration-200
                        ${accent === 'cyan'
                          ? 'text-gray-300 bg-cyan/5 border-cyan/10 hover:border-cyan/30 hover:text-cyan'
                          : 'text-gray-300 bg-violet/5 border-violet/10 hover:border-violet/30 hover:text-violet'
                        }
                      `}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
