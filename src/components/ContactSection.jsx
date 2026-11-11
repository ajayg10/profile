import { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Send, Phone, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './icons';

const links = [
  { key: 'email',    label: 'Email',    Icon: Mail,         href: s => `mailto:${s.email}`,                   val: s => s.email },
  { key: 'phone',    label: 'Phone',    Icon: Phone,        href: s => `tel:${s.phone.replace(/\s/g, '')}`,   val: s => s.phone },
  { key: 'github',   label: 'GitHub',   Icon: GithubIcon,   href: s => s.github,                              val: () => 'github.com/ajayg10' },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon, href: s => s.linkedin,                            val: () => 'linkedin.com/in/ajayg10' },
  { key: 'leetcode', label: 'LeetCode', Icon: LeetCodeIcon, href: s => s.leetcode,                            val: () => 'leetcode.com/u/Ajay-10' },
];

export default function ContactSection({ profile }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.social.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-20 md:py-32 bg-[#F4EFEC]">
      <div className="site-container">

        <div className="mb-12 text-center max-w-xl mx-auto">
          <p className="eyebrow justify-center">
            <Send size={14} aria-hidden="true" />
            <span>04. Contact</span>
          </p>
          <h2 id="contact-heading" className="section-heading text-center">
            Let's talk
          </h2>
          <p className="section-subtitle text-center mt-2 mx-auto">
            Hiring for SDE-1, an SDE internship, or an AI developer / AI engineer role? Email or call me.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 md:p-8 shadow-layer-1 mb-6 text-center">
            <p className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#FDF2EE] border border-[#C86D51]/20 font-mono text-xs font-semibold text-[#A9533A]">
              <span className="w-2 h-2 rounded-full bg-[#C86D51]" aria-hidden="true" />
              {profile.availability}
            </p>
            <p className="font-jakarta font-extrabold text-xl sm:text-2xl md:text-3xl text-[#1C1A19] mb-5 break-all">
              <a href={`mailto:${profile.social.email}`} className="hover:text-[#A9533A] transition-colors">
                {profile.social.email}
              </a>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={copyEmail} className="btn-primary">
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                <span>{copied ? 'Email copied' : 'Copy email'}</span>
              </button>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <FileText size={16} aria-hidden="true" />
                <span>Resume (PDF)</span>
              </a>
            </div>
            <span className="sr-only" role="status" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
          </div>

          <ul className="grid sm:grid-cols-2 gap-4">
            {links.map((link) => {
              const Icon = link.Icon;
              const external = link.key !== 'email' && link.key !== 'phone';
              return (
                <li key={link.key} className={link.key === 'leetcode' ? 'sm:col-span-2' : undefined}>
                  <a
                    id={`contact-${link.key}`}
                    href={link.href(profile.social)}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="floating-card p-5 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="p-2.5 rounded-xl bg-[#FDF2EE] text-[#A9533A] group-hover:scale-110 transition-transform">
                        <Icon size={18} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-jakarta font-bold text-sm text-[#1C1A19]">{link.label}</p>
                        <p className="font-mono text-[0.7rem] text-[#6B6460] truncate">{link.val(profile.social)}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#6B6460] group-hover:text-[#A9533A] flex-shrink-0" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
