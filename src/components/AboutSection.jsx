import { useRef } from 'react';

import { Brain, Server, Cloud, Cpu, GraduationCap, Sparkles } from 'lucide-react';

const pipeline = [
  { num: '01', title: 'AI Agents',              Icon: Brain,  desc: 'LLM planners, FAISS memory, and guardrails that check what an agent proposes before anything runs (VEDA, TapRemit, Hindsight).' },
  { num: '02', title: 'Backend Services',       Icon: Server, desc: 'FastAPI and Express APIs, JWT/OAuth 2.0, hashed single-use refresh tokens, PostgreSQL and SQLite (Digital Vault, TapRemit).' },
  { num: '03', title: 'Cloud & Delivery',       Icon: Cloud,  desc: 'Docker Compose stacks behind Nginx, AWS Lambda canary deploys, GitHub Actions and GitLab CI (VEDA, GreenGate).' },
  { num: '04', title: 'Full-Stack Apps',        Icon: Cpu,    desc: 'React and Next.js frontends on top of those APIs, deployed on Vercel and AWS Amplify (Digital Vault, RXCLEAR).' },
];

export default function AboutSection({ profile }) {
  const ref = useRef(null);
  const timeline = profile.about.timeline || [];
  const currentFocus = profile.about.currentFocus || [];

  return (
    <section id="about" ref={ref} className="relative py-20 md:py-32 bg-[#F4EFEC]">
      {/* Decorative top border shadow simulating 3D card overlap */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/[0.04] to-transparent pointer-events-none" />

      <div className="site-container">
        
        {/* Layer 2 Heading Header */}
        <div className="mb-16">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>02. About</span>
          </div>
          <h2 className="section-heading">
            Background, Timeline & Education
          </h2>
          <p className="section-subtitle mt-2">
            What I work on, how I got here, and where I study.
          </p>
        </div>

        {/* Story & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 mb-20">
          
          {/* Left: Narrative & Focus */}
          <div>
            <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 md:p-8 shadow-layer-1 mb-8">
              <h3 className="font-jakarta font-bold text-xl text-[#1C1A19] mb-4">
                About me
              </h3>
              <div className="space-y-4 text-[#4A4643] text-base leading-relaxed font-inter">
                {profile.about.narrative.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Currently Exploring Tags */}
            {currentFocus.length > 0 && (
              <div className="bg-white/80 border border-[#EAE3DC] rounded-xl p-5">
                <span className="font-mono text-[0.68rem] text-[#6B6460] uppercase tracking-wider font-bold block mb-3">
                  Current focus
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentFocus.map((topic) => (
                    <span key={topic} className="tag">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Timeline & Education */}
          <div className="space-y-8">
            
            {/* Career Timeline */}
            <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 shadow-layer-1">
              <h3 className="font-jakarta font-bold text-lg text-[#1C1A19] mb-6 flex items-center justify-between">
                <span>Timeline</span>
                <span className="font-mono text-xs text-[#A9533A] font-semibold">2023 – 2026</span>
              </h3>

              <div className="relative pl-6 space-y-6">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#EAE3DC]" />
                
                {timeline.map((entry, i) => (
                  <div key={i} className="relative group">
                    <span className="absolute -left-[1.62rem] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#C86D51] group-hover:scale-125 transition-transform" />
                    <span className="font-mono text-[0.65rem] font-bold text-[#A9533A] tracking-wider uppercase block">
                      {entry.year}
                    </span>
                    <h4 className="font-jakarta font-bold text-sm text-[#1C1A19] mt-0.5">
                      {entry.title}
                    </h4>
                    <p className="font-inter text-xs text-[#6B6460] mt-1 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Card */}
            {profile.education && (
              <div className="bg-[#FDF2EE] border border-[#C86D51]/20 rounded-2xl p-6 shadow-layer-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#C86D51] text-white">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[0.65rem] font-bold text-[#A9533A] uppercase tracking-wider">
                      Education
                    </span>
                    <h4 className="font-jakarta font-bold text-base text-[#1C1A19]">
                      {profile.education.institution}
                    </h4>
                  </div>
                </div>

                <p className="font-inter text-sm text-[#4A4643] mb-4">
                  {profile.education.degree}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#C86D51]/15 font-mono text-xs">
                  <span className="text-[#6B6460]">
                    CGPA: <strong className="text-[#1C1A19]">{profile.education.cgpa}</strong>
                  </span>
                  <span className="text-[#6B6460]">
                    Class of <strong className="text-[#1C1A19]">{profile.education.graduation}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── What I Build Grid ── */}
        <div className="pt-8 border-t border-[#EAE3DC]">
          <div className="mb-8">
            <p className="eyebrow">What I build</p>
            <h3 className="font-jakarta font-extrabold text-2xl text-[#1C1A19]">
              What I build, and where it shows up
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pipeline.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.num}
                  className="floating-card p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  <span
                    data-num={item.num}
                    className="absolute top-4 right-5 font-mono font-bold text-xs text-[#E4DDD4] group-hover:text-[#A9533A] transition-colors before:content-[attr(data-num)]"
                    aria-hidden="true"
                  />

                  <div>
                    <div className="p-3 rounded-xl bg-[#FDF2EE] text-[#A9533A] w-fit mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <h4 className="font-jakarta font-bold text-base text-[#1C1A19] mb-2">
                      {item.title}
                    </h4>
                    <p className="font-inter text-xs text-[#6B6460] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
