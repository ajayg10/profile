import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './icons';

export default function Footer({ profile }) {
  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-body-xs text-gray-600">
            © {new Date().getFullYear()} {profile.name}. Built with React & Framer Motion.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyan transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyan transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={profile.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyan transition-colors"
              aria-label="LeetCode"
            >
              <LeetCodeIcon size={18} />
            </a>
            <a
              href={`mailto:${profile.social.email}`}
              className="text-gray-600 hover:text-cyan transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
