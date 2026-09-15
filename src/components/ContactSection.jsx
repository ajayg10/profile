import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './icons';

const links = [
  { key: 'email',    label: 'Email',    sub: 'Direct Email',          Icon: Mail,        href: s => `mailto:${s.email}`,    val: s => s.email },
  { key: 'github',   label: 'GitHub',   sub: 'Open Source Repos',     Icon: GithubIcon,  href: s => s.github,               val: () => 'github.com/ajayg10' },
  { key: 'linkedin', label: 'LinkedIn', sub: 'Professional Network',  Icon: LinkedinIcon,href: s => s.linkedin,             val: () => 'linkedin.com/in/ajayg10' },
  { key: 'leetcode', label: 'LeetCode', sub: 'Algorithmic Practice',   Icon: LeetCodeIcon,href: s => s.leetcode,             val: () => 'leetcode.com/Ajay-10' },
];

export default function ContactSection({ profile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-20 md:py-32 bg-[#F4EFEC]">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-14 text-center max-w-xl mx-auto">
          <div className="eyebrow justify-center">
            <Send size={14} />
            <span>04. Get In Touch</span>
          </div>
          <h2 className="section-heading text-center">
            Let's Engineer Together
          </h2>
          <p className="section-subtitle text-center mt-2 mx-auto">
            Whether discussing high-scale backend architecture, AI systems, or full-time opportunities — my inbox is always open.
          </p>
        </div>

        {/* Contact Container */}
        <div className="max-w-2xl mx-auto">
          
          {/* Email Quick Copy Box */}
          <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 md:p-8 shadow-layer-1 mb-6 text-center">
            <span className="font-mono text-xs text-[#7E7771] tracking-wider uppercase font-semibold block mb-2">
              Primary Direct Channel
            </span>
            <h3 className="font-jakarta font-extrabold text-2xl md:text-3xl text-[#1C1A19] mb-4">
              {profile.social.email}
            </h3>
            
            <button
              onClick={copyEmail}
              className="btn-primary"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
            </button>
          </div>

          {/* Social Links Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {links.map((link) => {
              const Icon = link.Icon;
              return (
                <a
                  key={link.key}
                  id={`contact-${link.key}`}
                  href={link.href(profile.social)}
                  target={link.key === 'email' ? undefined : '_blank'}
                  rel={link.key === 'email' ? undefined : 'noopener noreferrer'}
                  className="floating-card p-5 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#FDF2EE] text-[#C86D51] group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-jakarta font-bold text-sm text-[#1C1A19]">
                        {link.label}
                      </h4>
                      <p className="font-mono text-[0.65rem] text-[#7E7771]">
                        {link.sub}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight size={16} className="text-[#7E7771] group-hover:text-[#C86D51] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
