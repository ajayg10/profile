import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';
import useReducedMotion from '../hooks/useReducedMotion';

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={cardRef}
      custom={index}
      variants={reducedMotion ? {} : cardVariants}
      initial={reducedMotion ? 'show' : 'hidden'}
      animate={isInView ? 'show' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glow-border glass-surface rounded-2xl p-6 md:p-8 flex flex-col h-full
                 focus-within:border-cyan/30 focus-within:shadow-lg focus-within:shadow-cyan/10"
      tabIndex={0}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="font-satoshi text-heading-lg text-white">
              {project.title}
            </h3>
            <p className="font-inter text-body-sm text-cyan mt-1">
              {project.tagline}
            </p>
          </div>
          {project.featured && (
            <span className="flex-shrink-0 px-2.5 py-0.5 text-body-xs font-inter font-medium
                             text-violet bg-violet/10 border border-violet/20 rounded-full">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="font-inter text-body-sm text-gray-400 mb-4 leading-relaxed flex-grow">
        {project.description}
      </p>

      {/* Architecture detail callout */}
      {project.architectureDetail && (
        <div className="mb-5 px-4 py-3 rounded-lg bg-base-200/50 border-l-2 border-violet/40">
          <p className="font-inter text-body-xs text-gray-500 leading-relaxed">
            <span className="text-violet font-medium">Architecture: </span>
            {project.architectureDetail}
          </p>
        </div>
      )}

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((tech, i) => (
          <motion.span
            key={tech}
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            animate={isHovered || reducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0.7, scale: 1 }
            }
            transition={{ delay: isHovered && !reducedMotion ? i * 0.03 : 0, duration: 0.2 }}
            className="tech-badge"
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-body-sm font-inter font-medium
                     text-gray-400 hover:text-cyan transition-colors
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan rounded"
        >
          <GithubIcon size={16} />
          Source
        </a>
      </div>
    </motion.article>
  );
}
