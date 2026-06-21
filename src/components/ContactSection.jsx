import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, ArrowUpRight, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './icons';
import useReducedMotion from '../hooks/useReducedMotion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const contactLinks = [
  {
    key: 'email',
    label: 'Email',
    description: 'Preferred intro channel',
    IconComponent: Mail,
    getHref: (s) => `mailto:${s.email}`,
    getValue: (s) => s.email,
    color: '#00D9FF',
    colorRgb: '0,217,255',
  },
  {
    key: 'github',
    label: 'GitHub',
    description: 'Open source contributions',
    IconComponent: GithubIcon,
    getHref: (s) => s.github,
    getValue: () => 'ajayg10',
    color: '#8B5CF6',
    colorRgb: '139,92,246',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    description: 'Professional network',
    IconComponent: LinkedinIcon,
    getHref: (s) => s.linkedin,
    getValue: () => 'ajayg10',
    color: '#00D9FF',
    colorRgb: '0,217,255',
  },
  {
    key: 'leetcode',
    label: 'LeetCode',
    description: 'Problem solving',
    IconComponent: LeetCodeIcon,
    getHref: (s) => s.leetcode,
    getValue: () => 'Ajay-10',
    color: '#8B5CF6',
    colorRgb: '139,92,246',
  },
];

export default function ContactSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,217,255,0.065) 0%, rgba(139,92,246,0.045) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          className="mb-14 text-center"
        >
          <span className="section-label block text-center">Contact</span>
          <h2
            className="font-syne font-extrabold text-white mb-6 tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Let's Build Something
          </h2>
          {/* Triple gradient divider */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent to-cyan" />
            <div className="h-[2px] w-6 rounded-full bg-gradient-to-r from-cyan to-violet" />
            <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-violet to-transparent" />
          </div>
          <p className="font-inter text-gray-500 text-sm max-w-md mx-auto">
            Building something interesting or want to talk systems architecture?
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden backdrop-blur-xl"
            style={{
              background: 'rgba(12,18,32,0.8)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 0 60px rgba(0,217,255,0.04), 0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Corner decoration */}
            <div className="absolute top-4 right-5 flex gap-1.5" aria-hidden="true">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00D9FF', opacity: 0.4, boxShadow: '0 0 6px rgba(0,217,255,0.6)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B5CF6', opacity: 0.4, boxShadow: '0 0 6px rgba(139,92,246,0.6)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            </div>

            {/* Response time hint */}
            <div className="flex items-center justify-center gap-2 mb-7">
              <MessageSquare size={14} className="text-gray-600" />
              <p className="font-mono text-xs text-gray-600 tracking-wider">
                Typically responds within 24 hours
              </p>
            </div>

            {/* Links grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {contactLinks.map((link, i) => {
                const Icon = link.IconComponent;
                return (
                  <motion.a
                    key={link.key}
                    id={`contact-${link.key}`}
                    href={link.getHref(profile.social)}
                    target={link.key === 'email' ? undefined : '_blank'}
                    rel={link.key === 'email' ? undefined : 'noopener noreferrer'}
                    initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.09 }}
                    className="flex items-center gap-3.5 p-4 rounded-xl transition-all duration-300 group"
                    style={{
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `rgba(${link.colorRgb},0.3)`;
                      e.currentTarget.style.background = `rgba(${link.colorRgb},0.07)`;
                      e.currentTarget.style.boxShadow = `0 0 24px rgba(${link.colorRgb},0.08)`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="p-2.5 rounded-xl flex-shrink-0 transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <Icon
                        size={17}
                        className="transition-colors duration-300"
                        style={{ color: '#6B7280' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = link.color; }}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[0.62rem] text-gray-600 tracking-[0.15em] uppercase mb-0.5">
                        {link.label}
                      </p>
                      <p className="font-inter text-sm font-medium text-gray-300 truncate">
                        {link.getValue(profile.social)}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight
                      size={14}
                      style={{ color: link.color, opacity: 0.5 }}
                      className="flex-shrink-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
