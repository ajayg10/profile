import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { GitBranch, Layers } from 'lucide-react';
import { GithubIcon } from './icons';
import useReducedMotion from '../hooks/useReducedMotion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const accentColor = project.featured ? '#00D9FF' : '#8B5CF6';
  const accentRgb = project.featured ? '0,217,255' : '139,92,246';

  return (
    <motion.article
      ref={cardRef}
      custom={index}
      variants={reducedMotion ? {} : cardVariants}
      initial={reducedMotion ? 'show' : 'hidden'}
      animate={isInView ? 'show' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="gradient-border-card relative flex flex-col h-full p-6 md:p-7"
      style={{
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        transform: isHovered && !reducedMotion ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered && !reducedMotion
          ? `0 0 50px rgba(${accentRgb},0.12), 0 20px 50px rgba(0,0,0,0.5)`
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      tabIndex={0}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`
            : 'rgba(255,255,255,0.05)',
        }}
      />

      {/* Corner glow */}
      {isHovered && !reducedMotion && (
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${accentRgb},0.12) 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-syne font-bold text-xl text-white tracking-tight leading-tight mb-1.5">
              {project.title}
            </h3>
            <p
              className="font-mono text-xs tracking-wide"
              style={{ color: accentColor }}
            >
              {project.tagline}
            </p>
          </div>
          {project.featured && (
            <span
              className="flex-shrink-0 font-mono text-[0.6rem] font-bold tracking-[0.12em] uppercase
                         px-2.5 py-1 rounded-full border"
              style={{
                color: accentColor,
                background: `rgba(${accentRgb},0.1)`,
                borderColor: `rgba(${accentRgb},0.3)`,
                boxShadow: `0 0 12px rgba(${accentRgb},0.15)`,
              }}
            >
              ★ Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p className="font-inter text-sm text-gray-400 mb-4 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Architecture callout */}
        {project.architectureDetail && (
          <div className="arch-callout mb-5" style={{ borderLeftColor: `rgba(${accentRgb},0.5)` }}>
            <p className="font-inter text-xs text-gray-500 leading-relaxed">
              <span className="font-mono font-semibold" style={{ color: accentColor }}>
                // arch:{' '}
              </span>
              {project.architectureDetail}
            </p>
          </div>
        )}

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              animate={isHovered || reducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0.6, scale: 1 }
              }
              transition={{ delay: isHovered && !reducedMotion ? i * 0.035 : 0, duration: 0.2 }}
              className="tech-badge"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-4 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium
                       text-gray-500 transition-colors duration-200"
            style={{ color: isHovered ? accentColor : undefined }}
            onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; }}
          >
            <GithubIcon size={14} />
            Source Code
          </a>
          <div className="flex items-center gap-1.5 font-mono text-xs text-gray-700">
            <Layers size={11} />
            <span>{project.tech.length} stack</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-gray-700">
            <GitBranch size={11} />
            <span>main</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
