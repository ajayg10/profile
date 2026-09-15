import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Brain, Cloud, Code2, Cpu } from 'lucide-react';

const categories = [
  { num: '01', key: 'Backend Engineering',  Icon: Server, label: 'APIs, Gateways & Persistence' },
  { num: '02', key: 'AI Systems',           Icon: Brain,  label: 'LLM Pipelines & Agent Frameworks' },
  { num: '03', key: 'Cloud & DevOps',       Icon: Cloud,  label: 'Containers, Nginx & Monitoring' },
  { num: '04', key: 'Programming',          Icon: Code2,  label: 'Production Languages & Systems' },
];

const STATS = [
  { value: '25+', label: 'Technologies & Frameworks' },
  { value: '4+',  label: 'Core Languages' },
  { value: '3+',  label: 'Years Systems Experience' },
  { value: '6+',  label: 'Production Apps Shipped' },
];

export default function SkillsSection({ profile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const skills = profile.skills;

  return (
    <section id="skills" ref={ref} className="relative py-20 md:py-28 bg-[#F4EFEC]">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-14">
          <div className="eyebrow">
            <Cpu size={14} />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="section-heading">
            Technical Stack & Tooling
          </h2>
          <p className="section-subtitle mt-2">
            The libraries, databases, and infrastructure powering my production deployments.
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {categories.map((cat) => {
            const catSkills = skills[cat.key] || [];
            const Icon = cat.Icon;
            return (
              <div
                key={cat.key}
                className="floating-card p-6 relative overflow-hidden bg-white"
              >
                <span className="absolute top-4 right-5 font-mono font-bold text-xs text-[#E4DDD4]">
                  {cat.num}
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#FDF2EE] text-[#C86D51]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-jakarta font-bold text-[#1C1A19] text-base">
                      {cat.key}
                    </h3>
                    <p className="font-mono text-[0.62rem] text-[#7E7771] tracking-wider uppercase">
                      {cat.label}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE3DC] flex flex-wrap gap-2">
                  {catSkills.map(skill => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 shadow-layer-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-jakarta font-extrabold text-2xl text-[#1C1A19] mb-1">
                {s.value}
              </div>
              <div className="font-mono text-[0.6rem] text-[#7E7771] tracking-wider uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
