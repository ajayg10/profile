import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';
import useReducedMotion from '../hooks/useReducedMotion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectsSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Subtle top separator */}
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
            Projects
          </p>
          <h2 className="font-satoshi text-display-md text-white mb-4 max-sm:text-display-sm">
            What I&apos;ve Built
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-cyan to-violet rounded-full" />
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {profile.projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
