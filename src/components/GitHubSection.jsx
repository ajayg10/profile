import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';
import useReducedMotion from '../hooks/useReducedMotion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const LANGUAGE_COLORS = {
  Python: '#3572A5',
  JavaScript: '#F1E05A',
  Java: '#B07219',
  Go: '#00ADD8',
  TypeScript: '#3178C6',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Dockerfile: '#384D54',
};

export default function GitHubSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cacheBuster, setCacheBuster] = useState('');

  useEffect(() => {
    setCacheBuster(Date.now().toString());
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6&type=owner`
        );
        if (!res.ok) throw new Error('GitHub API error');
        const data = await res.json();
        setRepos(data.filter((r) => !r.fork).slice(0, 6));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [profile.githubUsername]);

  return (
    <section id="github" ref={sectionRef} className="relative py-24 md:py-32">
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
            Open Source
          </p>
          <h2 className="font-satoshi text-display-md text-white mb-4 max-sm:text-display-sm">
            GitHub Activity
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-cyan to-violet rounded-full" />
        </motion.div>

        {/* GitHub stats cards */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 gap-4 mb-10"
        >
          {/* Contribution graph */}
          <div className="glass-surface rounded-2xl p-4 overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-cyan/20 hover:shadow-[0_0_25px_rgba(0,217,255,0.04)]">
            <img
              src={`https://ghchart.rshah.org/00D9FF/${profile.githubUsername}?t=${cacheBuster}`}
              alt={`${profile.name}'s GitHub contribution graph`}
              className="w-full h-auto rounded-lg opacity-80"
              loading="lazy"
            />
          </div>

          {/* Stats card */}
          <div className="glass-surface rounded-2xl p-4 flex items-center justify-center transition-all duration-300 hover:bg-white/[0.04] hover:border-cyan/20 hover:shadow-[0_0_25px_rgba(0,217,255,0.04)]">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&hide_border=true&bg_color=00000000&title_color=00D9FF&icon_color=8B5CF6&text_color=94A3B8&hide_title=false&hide_rank=false&cache_bust=${cacheBuster}`}
              alt={`${profile.name}'s GitHub stats`}
              className="w-full h-auto max-w-sm"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Top Languages */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          className="mb-10"
        >
          <div className="glass-surface rounded-2xl p-6 max-w-sm mx-auto transition-all duration-300 hover:bg-white/[0.04] hover:border-violet/20 hover:shadow-[0_0_25px_rgba(139,92,246,0.04)]">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&hide_border=true&bg_color=00000000&title_color=00D9FF&text_color=94A3B8&langs_count=8&cache_bust=${cacheBuster}`}
              alt={`${profile.name}'s top programming languages`}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Recent repos */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
        >
          <h3 className="font-satoshi text-heading-lg text-white mb-6">
            Recent Repositories
          </h3>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-surface rounded-xl p-5 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-white/5 rounded w-full mb-2" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="glass-surface rounded-xl p-8 text-center">
              <p className="font-inter text-body-sm text-gray-500 mb-3">
                Couldn&apos;t load repos from GitHub API
              </p>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan hover:underline font-inter text-body-sm"
              >
                <GithubIcon size={16} />
                View on GitHub
              </a>
            </div>
          )}

          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-surface rounded-xl p-5 border border-transparent
                             hover:border-cyan/20 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(0,217,255,0.03)]
                             transition-all duration-300 group
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-inter text-body-sm font-semibold text-gray-200 group-hover:text-cyan transition-colors truncate">
                      {repo.name}
                    </h4>
                    <ExternalLink size={14} className="text-gray-600 group-hover:text-cyan transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                  {repo.description && (
                    <p className="font-inter text-body-xs text-gray-500 mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-body-xs font-inter text-gray-500">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#8B949E' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork size={12} />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
