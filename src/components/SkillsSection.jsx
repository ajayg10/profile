import { Server, Brain, Cloud, Code2, Cpu, LayoutTemplate } from 'lucide-react';

const categories = [
  { num: '01', key: 'Languages',          Icon: Code2,          label: 'Used across my repos' },
  { num: '02', key: 'Backend & Data',     Icon: Server,         label: 'APIs, auth & persistence' },
  { num: '03', key: 'AI & Agents',        Icon: Brain,          label: 'LLMs, retrieval & agent platforms' },
  { num: '04', key: 'Cloud & DevOps',     Icon: Cloud,          label: 'Containers, CI/CD & AWS' },
  { num: '05', key: 'Frontend & Testing', Icon: LayoutTemplate, label: 'UI & test frameworks' },
];

export default function SkillsSection({ profile }) {
  const skills = profile.skills;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative py-20 md:py-28 bg-[#F4EFEC]">
      <div className="site-container">
        <div className="mb-14">
          <p className="eyebrow">
            <Cpu size={14} aria-hidden="true" />
            <span>Skills</span>
          </p>
          <h2 id="skills-heading" className="section-heading">
            Technical Stack
          </h2>
          <p className="section-subtitle mt-2">
            Only tools that appear in the code of the projects on this page.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const catSkills = skills[cat.key] || [];
            const Icon = cat.Icon;
            return (
              <div key={cat.key} className="floating-card p-6 relative overflow-hidden bg-white">
                <span
                  data-num={cat.num}
                  className="absolute top-4 right-5 font-mono font-bold text-xs text-[#D5CBC0] before:content-[attr(data-num)]"
                  aria-hidden="true"
                />

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#FDF2EE] text-[#A9533A]">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-jakarta font-bold text-[#1C1A19] text-base">
                      {cat.key}
                    </h3>
                    <p className="font-mono text-[0.62rem] text-[#6B6460] tracking-wider uppercase">
                      {cat.label}
                    </p>
                  </div>
                </div>

                <ul className="pt-4 border-t border-[#EAE3DC] flex flex-wrap gap-2">
                  {catSkills.map(skill => (
                    <li key={skill} className="tag">{skill}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
