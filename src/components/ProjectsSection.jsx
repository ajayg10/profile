import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layers } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ profile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const featured = profile.projects.filter(p => p.featured);
  const rest = profile.projects.filter(p => !p.featured);

  return (
    <section id="projects" ref={ref} className="relative py-20 md:py-32 bg-[#FBF9F6]">
      {/* 3D Layer Divider */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#F4EFEC] to-transparent pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Layer 3 Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow">
            <Layers size={14} />
            <span>03. System Architecture & Projects</span>
          </div>
          <h2 className="section-heading">
            Featured Systems & Production Code
          </h2>
          <p className="section-subtitle mt-2">
            Real-world backend architectures, self-healing services, and AI agent frameworks built with performance metrics in mind.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        {featured.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {featured.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        )}

        {/* Remaining Projects Grid */}
        {rest.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8">
            {rest.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i + featured.length} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
