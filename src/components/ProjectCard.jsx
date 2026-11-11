import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { ArrowUpRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';
import useReducedMotion from '../hooks/useReducedMotion';

/* ── Mini architecture node pipeline (decorative summary of the description) ── */
function ArchitectureFlow({ nodes }) {
  if (!nodes || nodes.length === 0) return null;
  return (
    <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1 scrollbar-none" aria-hidden="true">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
          <span className="px-2.5 py-1 rounded-md bg-[#F6F2EE] border border-[#EAE3DC] font-mono text-[0.62rem] text-[#4A4643] font-semibold whitespace-nowrap">
            {node}
          </span>
          {i < nodes.length - 1 && (
            <svg width="14" height="8" viewBox="0 0 14 8" className="text-[#A9533A] flex-shrink-0">
              <path d="M0 4h10M8 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -4, y: x * 5 });
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.article
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={inView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="perspective-viewport min-w-0"
      aria-labelledby={`project-${index}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="floating-card p-6 md:p-7 flex flex-col h-full relative overflow-hidden bg-white"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 id={`project-${index}`} className="font-jakarta font-extrabold text-xl text-[#1C1A19] leading-tight tracking-tight">
            {project.title}
          </h3>
          {project.featured && (
            <span className="flex-shrink-0 font-mono text-[0.6rem] font-bold tracking-wider uppercase
                             px-2.5 py-0.5 rounded-full text-[#A9533A] bg-[#FDF2EE] border border-[#C86D51]/25">
              Featured
            </span>
          )}
        </div>

        {project.tagline && (
          <p className="font-mono text-xs text-[#4A4643] font-semibold">
            {project.tagline}
          </p>
        )}
        {project.context && (
          <p className="font-mono text-[0.68rem] text-[#6B6460] mb-4">
            {project.context}
          </p>
        )}

        <ArchitectureFlow nodes={project.architectureFlow} />

        {project.problem && (
          <p className="font-inter text-sm text-[#1C1A19] mb-2 leading-relaxed">
            <strong className="font-semibold">Problem: </strong>{project.problem}
          </p>
        )}
        <p className="font-inter text-sm text-[#4A4643] mb-5 leading-relaxed flex-grow">
          {project.description}
        </p>

        {project.evidence && (
          <div className="rounded-xl px-4 py-3 mb-5 text-xs font-inter text-[#1C1A19] bg-[#FDF2EE] border-l-4 border-[#C86D51] flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-[#A9533A] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-mono font-bold text-[0.62rem] text-[#A9533A] uppercase tracking-wider block">
                Verifiable in the repo
              </span>
              <span>{project.evidence}</span>
            </div>
          </div>
        )}

        <ul className="flex flex-wrap gap-1.5 mb-6" aria-label="Tech stack">
          {project.tech.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-[#EAE3DC] font-mono text-xs">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-[#1C1A19] hover:text-[#A9533A] transition-colors"
          >
            <GithubIcon size={14} aria-hidden="true" />
            <span>GitHub<span className="sr-only">: {project.title} source code</span></span>
            <ArrowUpRight size={12} className="text-[#A9533A]" aria-hidden="true" />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#1C1A19] hover:text-[#A9533A] transition-colors"
            >
              <ExternalLink size={13} aria-hidden="true" />
              <span>{project.liveLabel || 'Live demo'}<span className="sr-only">: {project.title}</span></span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
