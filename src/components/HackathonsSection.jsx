import { Trophy, ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';

export default function HackathonsSection({ profile }) {
  const hackathons = profile.hackathons || [];
  if (hackathons.length === 0) return null;

  return (
    <section id="hackathons" aria-labelledby="hackathons-heading" className="relative py-16 md:py-24 bg-[#F4EFEC]">
      <div className="site-container">
        <div className="mb-10">
          <p className="eyebrow">
            <Trophy size={14} aria-hidden="true" />
            <span>Hackathons</span>
          </p>
          <h2 id="hackathons-heading" className="section-heading">
            Hackathon builds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {hackathons.map((h) => (
            <article key={h.name} className="floating-card p-6 bg-white flex flex-col">
              <h3 className="font-jakarta font-extrabold text-lg text-[#1C1A19]">{h.name}</h3>
              <p className="font-mono text-[0.68rem] font-semibold text-[#6B6460] mb-3">{h.event}</p>
              <p className="font-inter text-sm text-[#4A4643] leading-relaxed flex-grow mb-5">{h.summary}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-[#EAE3DC] font-mono text-xs">
                <a
                  href={h.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#1C1A19] hover:text-[#A9533A] transition-colors"
                >
                  <GithubIcon size={14} aria-hidden="true" />
                  <span>Code<span className="sr-only">: {h.name} on GitHub</span></span>
                  <ArrowUpRight size={12} className="text-[#A9533A]" aria-hidden="true" />
                </a>
                {h.live && (
                  <a
                    href={h.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#1C1A19] hover:text-[#A9533A] transition-colors"
                  >
                    <ExternalLink size={13} aria-hidden="true" />
                    <span>Live<span className="sr-only">: {h.name}</span></span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
