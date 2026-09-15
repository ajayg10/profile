import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { GitBranch, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './icons';
import useReducedMotion from '../hooks/useReducedMotion';

/* ── Mini Architecture Node Pipeline ── */
function ArchitectureFlow({ nodes }) {
  if (!nodes || nodes.length === 0) return null;
  return (
    <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1 scrollbar-none">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
          <span className="px-2.5 py-1 rounded-md bg-[#F6F2EE] border border-[#EAE3DC] font-mono text-[0.62rem] text-[#4A4643] font-semibold whitespace-nowrap">
            {node}
          </span>
          {i < nodes.length - 1 && (
            <svg width="14" height="8" viewBox="0 0 14 8" className="text-[#C86D51] flex-shrink-0">
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="perspective-viewport"
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
        {/* Top Featured Badge */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-jakarta font-extrabold text-xl text-[#1C1A19] leading-tight tracking-tight">
            {project.title}
          </h3>
          {project.featured && (
            <span className="flex-shrink-0 font-mono text-[0.6rem] font-bold tracking-wider uppercase
                             px-2.5 py-0.5 rounded-full text-[#C86D51] bg-[#FDF2EE] border border-rgba(200,109,81,0.25)">
              Featured Architecture
            </span>
          )}
        </div>

        {project.tagline && (
          <p className="font-mono text-xs text-[#7E7771] mb-4 font-semibold">
            {project.tagline}
          </p>
        )}

        {/* System Architecture Node Flow */}
        <ArchitectureFlow nodes={project.architectureFlow} />

        {/* Narrative Description */}
        <p className="font-inter text-sm text-[#4A4643] mb-5 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Impact Callout */}
        {project.impact && (
          <div className="rounded-xl px-4 py-3 mb-5 text-xs font-inter text-[#1C1A19] bg-[#FDF2EE] border-l-4 border-[#C86D51] flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-[#C86D51] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-mono font-bold text-[0.62rem] text-[#C86D51] uppercase tracking-wider block">
                Engineering Impact
              </span>
              <span>{project.impact}</span>
            </div>
          </div>
        )}

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Card Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EAE3DC] font-mono text-xs">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-[#1C1A19] hover:text-[#C86D51] transition-colors"
          >
            <GithubIcon size={14} />
            <span>Repository Source</span>
            <ArrowUpRight size={12} className="text-[#C86D51]" />
          </a>
          <span className="text-[#7E7771] flex items-center gap-1">
            <Layers size={12} />
            {project.tech.length} Tech Stack Modules
          </span>
        </div>
      </div>
    </motion.article>
  );
}
