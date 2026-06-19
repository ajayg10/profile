import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Code } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './icons';
import useReducedMotion from '../hooks/useReducedMotion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const contactLinks = [
  {
    key: 'email',
    label: 'Email',
    IconComponent: Mail,
    isLucide: true,
    getHref: (social) => `mailto:${social.email}`,
    getValue: (social) => social.email,
  },
  {
    key: 'github',
    label: 'GitHub',
    IconComponent: GithubIcon,
    isLucide: false,
    getHref: (social) => social.github,
    getValue: () => 'ajayg10',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    IconComponent: LinkedinIcon,
    isLucide: false,
    getHref: (social) => social.linkedin,
    getValue: () => 'ajayg10',
  },
  {
    key: 'leetcode',
    label: 'LeetCode',
    IconComponent: LeetCodeIcon,
    isLucide: false,
    getHref: (social) => social.leetcode,
    getValue: () => 'Ajay-10',
  },
];

export default function ContactSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="section-container">
        {/* Section heading */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          className="mb-14 text-center"
        >
          <p className="font-inter text-body-sm text-cyan font-medium tracking-wider uppercase mb-3">
            Contact
          </p>
          <h2 className="font-satoshi text-display-md text-white mb-4 max-sm:text-display-sm">
            Get in Touch
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-cyan to-violet rounded-full mx-auto" />
        </motion.div>

        {/* Contact card */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-surface rounded-2xl p-8 md:p-10">
            <p className="font-inter text-body-md text-gray-400 text-center mb-8">
              Building something interesting or want to talk systems architecture?
              Reach out through any of these.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactLinks.map((link) => {
                const Icon = link.IconComponent;
                return (
                  <a
                    key={link.key}
                    href={link.getHref(profile.social)}
                    target={link.key === 'email' ? undefined : '_blank'}
                    rel={link.key === 'email' ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5
                               hover:border-cyan/20 hover:bg-base-200/30 transition-all duration-200 group
                               focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                  >
                    <div className="p-2.5 rounded-lg bg-base-200 group-hover:bg-cyan/10 transition-colors">
                      {link.isLucide ? (
                        <Icon size={20} className="text-gray-500 group-hover:text-cyan transition-colors" />
                      ) : (
                        <Icon size={20} className="text-gray-500 group-hover:text-cyan transition-colors" />
                      )}
                    </div>
                    <div>
                      <p className="font-inter text-body-xs text-gray-500">
                        {link.label}
                      </p>
                      <p className="font-inter text-body-sm text-gray-300 group-hover:text-white transition-colors">
                        {link.getValue(profile.social)}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
