import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './icons';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#EAE3DC] py-8 bg-[#FBF9F6]">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-jakarta font-extrabold text-sm text-[#1C1A19]">
              AJAY GARG
            </span>
            <span className="text-[#7E7771] font-mono text-xs">
              © {new Date().getFullYear()} — Built with React &amp; 3D Scroll Depth.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-mono text-xs text-[#7E7771] hover:text-[#C86D51] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>

          <div className="flex items-center gap-3">
            {[
              { href: profile.social.github,   Icon: GithubIcon,   label: 'GitHub' },
              { href: profile.social.linkedin, Icon: LinkedinIcon,  label: 'LinkedIn' },
              { href: profile.social.leetcode, Icon: LeetCodeIcon,  label: 'LeetCode' },
              { href: `mailto:${profile.social.email}`, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label === 'Email' ? undefined : '_blank'}
                rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className="p-2 rounded-full bg-white border border-[#EAE3DC] text-[#7E7771] hover:text-[#C86D51] hover:border-[#C86D51] transition-colors shadow-sm"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
