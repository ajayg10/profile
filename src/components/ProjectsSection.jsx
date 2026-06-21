import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';
import useReducedMotion from '../hooks/useReducedMotion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectsSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  const featured = profile.projects.filter((p) => p.featured);
  const rest = profile.projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient glow */}
      <div
        className="absolute left-1/4 top-1/3 w-[700px] h-[700px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 65%)',
          filter: 'blur(90px)',
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
          <span className="section-label">Projects</span>
          <h2 className="font-syne font-extrabold text-white mb-5 tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.025em' }}>
            Featured Work
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-14 h-[2px] bg-gradient-to-r from-cyan to-violet rounded-full" />
            <p className="font-inter text-sm text-gray-500">
              Production-grade systems built from the ground up
            </p>
          </div>
        </motion.div>

        {/* Featured projects — full width then 2-col */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {featured.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        )}

        {/* Other projects */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i + featured.length}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
