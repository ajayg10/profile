import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, BookOpen, Code2 } from 'lucide-react';
import { GithubIcon } from './icons';
import useReducedMotion from '../hooks/useReducedMotion';

const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#F1E05A', Java: '#B07219',
  Go: '#00ADD8', TypeScript: '#3178C6', HTML: '#E34C26',
  CSS: '#563D7C', Shell: '#89E051', Dockerfile: '#384D54',
};

function computeStats(repos) {
  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);

  const langMap = {};
  repos.forEach(r => {
    if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
  });
  const topLangs = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const totalLangRepos = topLangs.reduce((s, [, c]) => s + c, 0);

  return { totalStars, totalForks, topLangs, totalLangRepos, repoCount: repos.length };
}

function StatBlock({ value, label, Icon }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {Icon && <Icon size={16} className="text-[#C86D51] mb-1" />}
      <div className="font-jakarta font-extrabold text-2xl text-[#1C1A19]">{value}</div>
      <div className="font-mono text-[0.6rem] text-[#7E7771] tracking-wider uppercase">{label}</div>
    </div>
  );
}

function LangBar({ langs, total }) {
  return (
    <div>
      <p className="font-mono text-[0.62rem] text-[#7E7771] tracking-wider uppercase mb-3 font-semibold">
        Top Languages Breakdown
      </p>
      <div className="flex rounded-full overflow-hidden h-2 mb-4 gap-px bg-[#F4EFEC]">
        {langs.map(([lang, count]) => (
          <div
            key={lang}
            style={{
              width: `${(count / total) * 100}%`,
              backgroundColor: LANG_COLORS[lang] || '#C86D51',
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {langs.map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: LANG_COLORS[lang] || '#C86D51' }}
            />
            <span className="font-mono text-xs text-[#1C1A19] font-medium">{lang}</span>
            <span className="font-mono text-[0.65rem] text-[#7E7771]">
              {Math.round((count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHubSection({ profile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=30&type=owner`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setRepos(data.filter(r => !r.fork));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [profile.githubUsername]);

  const stats = !loading && !error && repos.length ? computeStats(repos) : null;
  const displayRepos = repos.slice(0, 6);

  return (
    <section id="github" ref={ref} className="relative py-20 md:py-28 bg-[#FBF9F6]">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-14">
          <div className="eyebrow">
            <Code2 size={14} />
            <span>Open Source & Activity</span>
          </div>
          <h2 className="section-heading">
            Live GitHub Ecosystem
          </h2>
          <p className="section-subtitle mt-2">
            Real-time contribution commit frequency and dynamic repository metrics.
          </p>
        </div>

        {/* Top row: heatmap + computed stats */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          
          {/* Contribution heatmap */}
          <div className="floating-card p-6 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[0.65rem] text-[#7E7771] tracking-wider uppercase mb-3 font-semibold">
                Contribution Heatmap
              </p>
              <img
                src={`https://ghchart.rshah.org/c86d51/${profile.githubUsername}`}
                alt={`${profile.name}'s GitHub contribution graph`}
                className="w-full h-auto rounded-lg filter contrast-125"
                loading="lazy"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE3DC] flex items-center justify-between font-mono text-xs text-[#7E7771]">
              <span>Active Committer</span>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C86D51] font-bold hover:underline flex items-center gap-1"
              >
                @{profile.githubUsername}
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Computed stats panel */}
          <div className="floating-card p-6 flex flex-col justify-between">
            {loading && (
              <div className="flex-1 flex items-center justify-center min-h-[160px]">
                <div className="w-6 h-6 rounded-full border-2 border-[#EAE3DC] border-t-[#C86D51] animate-spin" />
              </div>
            )}

            {error && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <p className="font-inter text-xs text-[#7E7771]">Couldn't fetch GitHub stats</p>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-1.5 px-4 text-xs"
                >
                  <GithubIcon size={14} /> View Profile
                </a>
              </div>
            )}

            {stats && (
              <>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <StatBlock value={stats.repoCount}   label="Repos"  Icon={BookOpen} />
                  <StatBlock value={stats.totalStars}  label="Stars"  Icon={Star} />
                  <StatBlock value={stats.totalForks}  label="Forks"  Icon={GitFork} />
                </div>

                <div className="pt-4 border-t border-[#EAE3DC]">
                  <LangBar langs={stats.topLangs} total={stats.totalLangRepos} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Repositories grid */}
        {!loading && !error && (
          <div>
            <h3 className="font-jakarta font-bold text-lg text-[#1C1A19] mb-4">
              Recent Repositories
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="floating-card p-5 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-mono text-sm font-bold text-[#1C1A19] group-hover:text-[#C86D51] transition-colors truncate">
                        {repo.name}
                      </h4>
                      <ExternalLink size={12} className="text-[#7E7771] group-hover:text-[#C86D51]" />
                    </div>
                    {repo.description && (
                      <p className="font-inter text-xs text-[#4A4643] mb-4 line-clamp-2 leading-relaxed">
                        {repo.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#7E7771] pt-3 border-t border-[#F4EFEC]">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: LANG_COLORS[repo.language] || '#C86D51' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-[#C86D51]" /> {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork size={12} /> {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
