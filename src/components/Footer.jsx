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
            <span className="text-[#6B6460] font-mono text-xs">
              © {new Date().getFullYear()} — Built with React, Vite &amp; Tailwind CSS.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            type="button" className="flex items-center gap-1.5 font-mono text-xs text-[#6B6460] hover:text-[#A9533A] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
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
                className="p-2 rounded-full bg-white border border-[#EAE3DC] text-[#6B6460] hover:text-[#A9533A] hover:border-[#C86D51] transition-colors shadow-sm"
              >
                <Icon size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
