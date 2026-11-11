import { Layers } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ profile }) {
  const featured = profile.projects.filter(p => p.featured);
  const rest = profile.projects.filter(p => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-20 md:py-32 bg-[#FBF9F6]">
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#F4EFEC] to-transparent pointer-events-none" aria-hidden="true" />

      <div className="site-container relative z-10">
        <div className="mb-16">
          <p className="eyebrow">
            <Layers size={14} aria-hidden="true" />
            <span>03. Projects</span>
          </p>
          <h2 id="projects-heading" className="section-heading">
            Featured Projects
          </h2>
          <p className="section-subtitle mt-2">
            Each card names the problem, what I built, the stack, and one fact you can check in the linked repo: tests, measured results, or architecture.
          </p>
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {featured.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <>
            <h3 className="font-jakarta font-bold text-xl text-[#1C1A19] mt-14 mb-6">More projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i + featured.length} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
