import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import NodeGraph from './NodeGraph';
import useTypewriter from '../hooks/useTypewriter';
import useReducedMotion from '../hooks/useReducedMotion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection({ profile }) {
  const reducedMotion = useReducedMotion();
  const { text, isCursorBlinking } = useTypewriter(profile.typewriterPhrases);

  // Framer Motion spring values for smooth ambient mouse-glow following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e) => {
      // Set coordinates relative to viewport, offset by half of glow blob size (250px)
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, reducedMotion]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid-overlay"
    >
      {/* Dynamic ambient cursor glow (disabled if prefers-reduced-motion) */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[120px] pointer-events-none z-0"
            style={{
              x: glowX,
              y: glowY,
            }}
          />
          {/* Drifting secondary violet ambient blob */}
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-violet/5 blur-[150px] pointer-events-none z-0 animate-pulse duration-[12000ms]" />
          {/* Third subtle center glow to brighten orchestrator node area */}
          <div className="absolute top-[35%] left-[40%] w-[350px] h-[350px] rounded-full bg-cyan/5 blur-[90px] pointer-events-none z-0" />
        </>
      )}

      {/* Node graph background */}
      <div className="absolute inset-0 z-0">
        <NodeGraph />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-base/20 via-transparent to-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/15 via-transparent to-base/15" />
      </div>

      {/* Content */}
      <motion.div
        variants={reducedMotion ? {} : container}
        initial={reducedMotion ? 'show' : 'hidden'}
        animate="show"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Name */}
        <motion.h1
          variants={reducedMotion ? {} : item}
          className="font-satoshi text-display-xl text-white mb-4
                     max-md:text-display-lg max-sm:text-display-md"
        >
          {profile.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={reducedMotion ? {} : item}
          className="font-inter text-body-lg text-gray-400 mb-6
                     max-sm:text-body-md"
        >
          {profile.subtitle}
        </motion.p>

        {/* Typewriter */}
        <motion.div
          variants={reducedMotion ? {} : item}
          className="h-10 flex items-center justify-center mb-10"
        >
          <span className="font-inter text-heading-lg text-cyan max-sm:text-heading-md">
            {text}
          </span>
          <span
            className={`inline-block w-[2px] h-6 bg-cyan ml-1 ${
              isCursorBlinking ? 'animate-typewriter-blink' : ''
            }`}
            aria-hidden="true"
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={reducedMotion ? {} : item}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-3 rounded-xl font-inter font-semibold text-body-md
                       bg-cyan text-base hover:bg-cyan-300 
                       transition-all duration-200 hover:shadow-lg hover:shadow-cyan/20
                       hover:scale-[1.02] active:scale-[0.98]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            View Projects
          </button>
          <button
            onClick={scrollToContact}
            className="px-8 py-3 rounded-xl font-inter font-semibold text-body-md
                       text-gray-300 border border-white/15 hover:border-cyan/40 hover:text-white
                       bg-white/5 hover:bg-white/10
                       transition-all duration-200
                       hover:scale-[1.02] active:scale-[0.98]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={reducedMotion ? {} : item}
          className="mt-16"
        >
          <button
            onClick={scrollToAbout}
            className="text-gray-500 hover:text-cyan transition-colors animate-float"
            aria-label="Scroll down to About section"
          >
            <ArrowDown size={24} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
