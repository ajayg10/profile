import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Brain, Cloud, Code2 } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';

const categories = [
  {
    num: '01',
    key: 'Backend',
    icon: Server,
    color: '#00D9FF',
    colorRgb: '0,217,255',
    description: 'APIs, auth systems & data persistence',
  },
  {
    num: '02',
    key: 'AI & Agentic Systems',
    icon: Brain,
    color: '#8B5CF6',
    colorRgb: '139,92,246',
    description: 'LLM pipelines, vector memory & agents',
  },
  {
    num: '03',
    key: 'Cloud & DevOps',
    icon: Cloud,
    color: '#00D9FF',
    colorRgb: '0,217,255',
    description: 'Containers, CI/CD & observability',
  },
  {
    num: '04',
    key: 'Languages',
    icon: Code2,
    color: '#8B5CF6',
    colorRgb: '139,92,246',
    description: 'Production-grade programming languages',
  },
];

const STATS = [
  { value: '25+', label: 'Technologies' },
  { value: '4', label: 'Languages' },
  { value: '3+', label: 'Years Building' },
  { value: '4', label: 'Major Projects' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.75 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export default function SkillsSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  const skills = profile.skills;

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient glow */}
      <div
        className="absolute right-[-10%] top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute left-[-5%] bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.07) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <span className="section-label">Skills</span>
          <h2 className="font-syne font-extrabold text-white mb-5 tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.025em' }}>
            Tools &amp; Technologies
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-14 h-[2px] bg-gradient-to-r from-cyan to-violet rounded-full" />
            <p className="font-inter text-sm text-gray-500">
              The stack powering production systems
            </p>
          </div>
        </motion.div>

        {/* Numbered skill cards grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {categories.map((cat, catIdx) => {
            const Icon = cat.icon;
            const catSkills = skills[cat.key] || [];
            return (
              <motion.div
                key={cat.key}
                variants={reducedMotion ? {} : fadeUp}
                initial={reducedMotion ? 'show' : 'hidden'}
                animate={isInView ? 'show' : 'hidden'}
                transition={{ delay: catIdx * 0.12 }}
                className="skill-number-card group p-6"
                style={{
                  '--card-color': cat.color,
                  '--card-color-rgb': cat.colorRgb,
                }}
              >
                {/* Card inner */}
                <div className="flex items-start justify-between mb-5">
                  {/* Big number */}
                  <span
                    className="font-syne font-black leading-none select-none"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      color: cat.color,
                      opacity: 0.12,
                      letterSpacing: '-0.05em',
                      lineHeight: 1,
                    }}
                  >
                    {cat.num}
                  </span>
                  {/* Icon */}
                  <div
                    className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${cat.color}12`,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    <Icon size={20} style={{ color: cat.color }} />
                  </div>
                </div>

                {/* Category name */}
                <h3 className="font-syne font-bold text-white text-lg mb-1 tracking-tight">
                  {cat.key}
                </h3>
                <p className="font-mono text-[0.65rem] text-gray-600 tracking-wider uppercase mb-5">
                  {cat.description}
                </p>

                {/* Glowing neon underline */}
                <div
                  className="w-full h-px mb-5 opacity-30"
                  style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                />

                {/* Skill pills */}
                <motion.div
                  variants={reducedMotion ? {} : { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                  initial={reducedMotion ? 'show' : 'hidden'}
                  animate={isInView ? 'show' : 'hidden'}
                  className="flex flex-wrap gap-2"
                >
                  {catSkills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={reducedMotion ? {} : scaleIn}
                      className="inline-flex items-center px-3 py-1.5 font-mono text-xs font-medium
                                 rounded-lg border transition-all duration-250 cursor-default"
                      style={{
                        color: '#94A3B8',
                        background: `${cat.color}06`,
                        borderColor: `${cat.color}18`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = cat.color;
                        e.currentTarget.style.borderColor = `${cat.color}50`;
                        e.currentTarget.style.background = `${cat.color}12`;
                        e.currentTarget.style.boxShadow = `0 0 12px ${cat.color}20`;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#94A3B8';
                        e.currentTarget.style.borderColor = `${cat.color}18`;
                        e.currentTarget.style.background = `${cat.color}06`;
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delay: 0.5 }}
        >
          <div
            className="rounded-2xl px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 backdrop-blur-sm"
            style={{
              background: 'rgba(14,22,38,0.65)',
              border: '1px solid rgba(0,217,255,0.1)',
              boxShadow: '0 0 40px rgba(0,217,255,0.04)',
            }}
          >
            {STATS.map((stat, i) => (
              <div key={i} className="text-center group">
                <div
                  className="font-syne font-black text-3xl mb-1 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: i % 2 === 0
                      ? 'linear-gradient(135deg, #00D9FF, #33E5FF)'
                      : 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[0.65rem] text-gray-600 tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
