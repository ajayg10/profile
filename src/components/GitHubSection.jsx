import { useRef, useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, BookOpen, Code2, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './icons';

const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#F1E05A', Java: '#B07219',
  Go: '#00ADD8', TypeScript: '#3178C6', HTML: '#E34C26',
  CSS: '#563D7C', Shell: '#89E051', Dockerfile: '#384D54',
  C: '#555555', 'C++': '#f34b7d',
};

function computeStats(repos, userProfile, totalReposConfig) {
  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const forksEarned = repos.reduce((s, r) => s + (r.forks_count || 0), 0);
  const forksCount = repos.filter(r => r.fork).length;
  const sourcesCount = repos.filter(r => !r.fork).length;

  const langMap = {};
  repos.forEach(r => {
    if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
  });
  const topLangs = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const totalLangRepos = topLangs.reduce((s, [, c]) => s + c, 0);

  const totalRepos = totalReposConfig || (userProfile?.public_repos ? Math.max(userProfile.public_repos, repos.length) : repos.length);

  return {
    totalRepos,
    sourcesCount,
    forksCount,
    forksEarned,
    totalStars,
    topLangs,
    totalLangRepos,
    publicCount: userProfile?.public_repos || repos.length,
  };
}

function StatBlock({ value, label, sublabel, Icon }) {
  return (
    <div className="flex flex-col items-center text-center">
      {Icon && <Icon size={16} className="text-[#A9533A] mb-1.5" />}
      <div className="font-jakarta font-extrabold text-2xl md:text-3xl text-[#1C1A19] leading-tight">
        {value}
      </div>
      <div className="font-mono text-[0.62rem] text-[#1C1A19] font-bold tracking-wider uppercase mt-0.5">
        {label}
      </div>
      {sublabel && (
        <span className="font-mono text-[0.55rem] text-[#6B6460]">
          {sublabel}
        </span>
      )}
    </div>
  );
}

function LangBar({ langs, total }) {
  if (!langs || langs.length === 0) return null;
  return (
    <div>
      <p className="font-mono text-[0.62rem] text-[#6B6460] tracking-wider uppercase mb-3 font-semibold">
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
            <span className="font-mono text-[0.65rem] text-[#6B6460]">
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
  const [repos, setRepos] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'sources' | 'forks'
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${profile.githubUsername}`),
          fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100`)
        ]);

        let userData = null;
        if (userRes.ok) {
          userData = await userRes.json();
        }

        if (!reposRes.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposRes.json();

        if (isMounted) {
          setUserProfile(userData);
          // Keep all repositories (sources + forks)
          setRepos(Array.isArray(reposData) ? reposData : []);
        }
      } catch {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [profile.githubUsername]);

  const stats = !loading && !error && repos.length > 0
    ? computeStats(repos, userProfile, profile.totalRepos)
    : null;

  // Filtered repositories based on tab selection
  const filteredRepos = repos.filter(repo => {
    if (filter === 'sources') return !repo.fork;
    if (filter === 'forks') return repo.fork;
    return true; // 'all'
  });

  const displayedRepos = showAll ? filteredRepos : filteredRepos.slice(0, 6);

  return (
    <section id="github" ref={ref} className="relative py-20 md:py-28 bg-[#FBF9F6]">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-14">
          <div className="eyebrow">
            <Code2 size={14} />
            <span>Open Source</span>
          </div>
          <h2 className="section-heading">
            GitHub Activity
          </h2>
          <p className="section-subtitle mt-2">
            Contribution graph and public repositories, fetched live from the GitHub API.
          </p>
        </div>

        {/* Top row: heatmap + computed stats */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          
          {/* Contribution heatmap */}
          <div className="floating-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[0.65rem] text-[#6B6460] tracking-wider uppercase font-semibold">
                  Contribution Heatmap
                </p>
                <span className="font-mono text-[0.65rem] text-[#A9533A] font-bold">
                  @{profile.githubUsername}
                </span>
              </div>
              <img
                src={`https://ghchart.rshah.org/c86d51/${profile.githubUsername}`}
                alt={`${profile.name}'s GitHub contribution graph`}
                className="w-full h-auto rounded-lg filter contrast-125"
                loading="lazy"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE3DC] flex items-center justify-between font-mono text-xs text-[#6B6460]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-pulse" />
                Contributions, last 12 months
              </span>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A9533A] font-bold hover:underline flex items-center gap-1"
              >
                View Profile
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
                <p className="font-inter text-xs text-[#6B6460]">Couldn't fetch GitHub stats</p>
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
                {/* 3 Main Stat Blocks */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <StatBlock
                    value={stats.totalRepos}
                    label="Repositories"
                    sublabel="Total on GitHub"
                    Icon={BookOpen}
                  />
                  <StatBlock
                    value={stats.sourcesCount}
                    label="Original Repos"
                    sublabel="Not forks"
                    Icon={FolderGit2}
                  />
                  <StatBlock
                    value={stats.forksCount}
                    label="Forked Repos"
                    sublabel="Open source forks"
                    Icon={GitFork}
                  />
                </div>

                <div className="pt-4 border-t border-[#EAE3DC]">
                  <LangBar langs={stats.topLangs} total={stats.totalLangRepos} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Repositories section with filter tabs */}
        {!loading && !error && repos.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-jakarta font-bold text-xl text-[#1C1A19]">
                  Repositories Showcase
                </h3>
                <p className="font-mono text-xs text-[#6B6460] mt-0.5">
                  Showing {displayedRepos.length} of {filteredRepos.length} {filter === 'all' ? 'public' : filter} repositories
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="inline-flex p-1 bg-[#F4EFEC] border border-[#EAE3DC] rounded-xl self-start sm:self-auto font-mono text-xs">
                <button
                  type="button" aria-pressed={filter === 'all'} onClick={() => { setFilter('all'); setShowAll(false); }}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    filter === 'all'
                      ? 'bg-white text-[#1C1A19] shadow-sm'
                      : 'text-[#6B6460] hover:text-[#1C1A19]'
                  }`}
                >
                  All ({repos.length})
                </button>
                <button
                  type="button" aria-pressed={filter === 'sources'} onClick={() => { setFilter('sources'); setShowAll(false); }}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    filter === 'sources'
                      ? 'bg-white text-[#1C1A19] shadow-sm'
                      : 'text-[#6B6460] hover:text-[#1C1A19]'
                  }`}
                >
                  Original ({repos.filter(r => !r.fork).length})
                </button>
                <button
                  type="button" aria-pressed={filter === 'forks'} onClick={() => { setFilter('forks'); setShowAll(false); }}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    filter === 'forks'
                      ? 'bg-white text-[#1C1A19] shadow-sm'
                      : 'text-[#6B6460] hover:text-[#1C1A19]'
                  }`}
                >
                  Forks ({repos.filter(r => r.fork).length})
                </button>
              </div>
            </div>

            {/* Repositories Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {displayedRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="floating-card p-5 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h4 className="font-mono text-sm font-bold text-[#1C1A19] group-hover:text-[#A9533A] transition-colors truncate">
                          {repo.name}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {repo.fork && (
                          <span className="px-2 py-0.5 rounded text-[0.6rem] font-mono font-bold bg-[#FDF2EE] text-[#A9533A] border border-[#C86D51]/20">
                            Fork
                          </span>
                        )}
                        <ExternalLink size={13} className="text-[#6B6460] group-hover:text-[#A9533A] transition-colors" />
                      </div>
                    </div>

                    {repo.description ? (
                      <p className="font-inter text-xs text-[#4A4643] mb-4 line-clamp-2 leading-relaxed">
                        {repo.description}
                      </p>
                    ) : (
                      <p className="font-mono text-[0.7rem] text-[#6B6460] italic mb-4">
                        {repo.fork ? 'Forked repository' : 'Source repository'}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#6B6460] pt-3 border-t border-[#F4EFEC]">
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
                        <Star size={12} className="text-[#A9533A]" /> {repo.stargazers_count}
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

            {/* Toggle Show More / Show Less */}
            {filteredRepos.length > 6 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn-secondary py-2 px-6 text-xs font-mono font-semibold"
                >
                  {showAll ? 'Show Fewer Repositories' : `Show All ${filteredRepos.length} Repositories`}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
