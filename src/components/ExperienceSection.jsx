import { Briefcase, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './icons';

export default function ExperienceSection({ profile }) {
  const experience = profile.experience || [];
  const research = profile.research || [];

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative py-20 md:py-28 bg-[#FBF9F6]">
      <div className="site-container">
        <div className="mb-12">
          <p className="eyebrow">
            <Briefcase size={14} aria-hidden="true" />
            <span>Experience & Research</span>
          </p>
          <h2 id="experience-heading" className="section-heading">
            Work & Research
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Experience */}
          {experience.map((job) => (
            <article key={job.org + job.period} className="floating-card p-6 md:p-7 bg-white">
              <p className="font-mono text-[0.68rem] font-bold text-[#A9533A] uppercase tracking-wider mb-1">
                Experience · {job.period}
              </p>
              <h3 className="font-jakarta font-extrabold text-xl text-[#1C1A19] leading-tight">
                {job.role}
              </h3>
              <p className="font-jakarta font-semibold text-base text-[#4A4643] mb-4">{job.org}</p>
              <ul className="list-disc pl-5 space-y-2 font-inter text-sm text-[#4A4643] leading-relaxed mb-5">
                {job.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
              {job.tech?.length > 0 && (
                <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                  {job.tech.map((t) => <li key={t} className="tag">{t}</li>)}
                </ul>
              )}
            </article>
          ))}

          {/* Research */}
          {research.map((paper) => (
            <article key={paper.title} className="floating-card p-6 md:p-7 bg-white">
              <div className="flex items-start justify-between gap-3 mb-1">
                <p className="font-mono text-[0.68rem] font-bold text-[#A9533A] uppercase tracking-wider">
                  Research · {paper.role}
                </p>
                <span className="flex-shrink-0 font-mono text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[#4A4643] bg-[#F6F2EE] border border-[#EAE3DC]">
                  {paper.status}
                </span>
              </div>
              <h3 className="font-jakarta font-extrabold text-lg text-[#1C1A19] leading-snug mb-3 flex gap-2">
                <FileText size={18} className="text-[#A9533A] flex-shrink-0 mt-1" aria-hidden="true" />
                <span>{paper.title}</span>
              </h3>
              <p className="font-inter text-sm text-[#4A4643] leading-relaxed mb-5">{paper.summary}</p>
              {paper.code && (
                <a
                  href={paper.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1C1A19] hover:text-[#A9533A] transition-colors"
                >
                  <GithubIcon size={14} aria-hidden="true" />
                  <span>Prototype code: self-healing-cloud</span>
                  <ArrowUpRight size={12} className="text-[#A9533A]" aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
