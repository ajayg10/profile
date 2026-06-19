import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection({ profile }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();

  const { about, education } = profile;
  const paragraphs = about.narrative.split('\n\n');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="section-container">
        <motion.div
          variants={reducedMotion ? {} : container}
          initial={reducedMotion ? 'show' : 'hidden'}
          animate={isInView ? 'show' : 'hidden'}
        >
          {/* Section heading */}
          <motion.div variants={reducedMotion ? {} : fadeUp} className="mb-16">
            <p className="font-inter text-body-sm text-cyan font-medium tracking-wider uppercase mb-3">
              About
            </p>
            <h2 className="font-satoshi text-display-md text-white mb-4 max-sm:text-display-sm">
              The Arc So Far
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-cyan to-violet rounded-full" />
          </motion.div>

          {/* Two-column layout: Narrative + Photo */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 mb-20">
            {/* Narrative — 3 cols */}
            <motion.div variants={reducedMotion ? {} : fadeUp} className="lg:col-span-3 space-y-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="font-inter text-body-md text-gray-400 leading-relaxed">
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Profile card — 2 cols */}
            <motion.div variants={reducedMotion ? {} : fadeUp} className="lg:col-span-2">
              <div className="glass-surface rounded-2xl p-6 space-y-6">
                {/* Profile image */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-base-200">
                  <img
                    src="/images/profile-formal.jpg"
                    alt="Ajay Garg"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
                </div>

                {/* Education quick stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-inter text-body-sm text-gray-500">Institution</span>
                    <span className="font-inter text-body-sm text-gray-300 text-right">
                      {education.institution}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-inter text-body-sm text-gray-500">Program</span>
                    <span className="font-inter text-body-sm text-gray-300">
                      {education.degree}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-inter text-body-sm text-gray-500">CGPA</span>
                    <span className="font-inter text-body-sm text-cyan font-medium">
                      {education.cgpa}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-inter text-body-sm text-gray-500">Graduating</span>
                    <span className="font-inter text-body-sm text-gray-300">
                      {education.graduation}
                    </span>
                  </div>
                </div>

                {/* Resume download button */}
                {profile.resumeUrl && (
                  <div className="pt-4 border-t border-white/5">
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl
                                 font-inter font-semibold text-body-sm text-cyan border border-cyan/30 bg-cyan/5
                                 hover:bg-cyan/15 hover:border-cyan/50 transition-all duration-200
                                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                    >
                      <FileText size={18} />
                      Download Resume
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div variants={reducedMotion ? {} : fadeUp}>
            <h3 className="font-satoshi text-heading-lg text-white mb-10">
              Timeline
            </h3>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-violet via-violet/30 to-transparent" />

            <div className="space-y-8">
              {about.timeline.map((entry, i) => (
                <motion.div
                  key={i}
                  variants={reducedMotion ? {} : fadeLeft}
                  className="relative pl-8 md:pl-10"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-[6px] w-[15px] h-[15px] md:w-[23px] md:h-[23px]
                                  rounded-full border-2 border-violet bg-base flex items-center justify-center">
                    <div className="w-[5px] h-[5px] md:w-[7px] md:h-[7px] rounded-full bg-violet" />
                  </div>

                  <div className="glass-surface rounded-xl p-5">
                    <span className="inline-block font-inter text-body-xs text-violet font-semibold tracking-wider uppercase mb-1">
                      {entry.year}
                    </span>
                    <h4 className="font-satoshi text-heading-sm text-white mb-2">
                      {entry.title}
                    </h4>
                    <p className="font-inter text-body-sm text-gray-400">
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
