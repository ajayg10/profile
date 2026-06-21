import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, GitBranch, GraduationCap } from 'lucide-react';
import NodeGraph from './NodeGraph';
import useTypewriter from '../hooks/useTypewriter';
import useReducedMotion from '../hooks/useReducedMotion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const MARQUEE_ITEMS = [
  'FastAPI', 'Python', 'Docker', 'FAISS', 'PostgreSQL',
  'LangChain', 'GitHub Actions', 'Nginx', 'React', 'JWT',
  'Docker Compose', 'Prometheus', 'Grafana', 'OAuth 2.0', 'Redis',
  'FastAPI', 'Python', 'Docker', 'FAISS', 'PostgreSQL',
  'LangChain', 'GitHub Actions', 'Nginx', 'React', 'JWT',
  'Docker Compose', 'Prometheus', 'Grafana', 'OAuth 2.0', 'Redis',
];

const STAT_CARDS = [
  { icon: GraduationCap, value: '8.58', label: 'CGPA', color: '#00D9FF', delay: 0 },
  { icon: Zap, value: '4+', label: 'Projects', color: '#8B5CF6', delay: 0.15 },
  { icon: GitBranch, value: 'CI/CD', label: 'Pipeline', color: '#00D9FF', delay: 0.3 },
  { icon: Sparkles, value: 'Agentic', label: 'AI Systems', color: '#8B5CF6', delay: 0.45 },
];

// Simple background particles
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 28 }).map((_, i) => {
        const size = Math.random() * 2.5 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 8;
        const dur = Math.random() * 6 + 8;
        const opacity = Math.random() * 0.45 + 0.1;
        const isViolet = i % 3 === 0;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              background: isViolet ? '#8B5CF6' : '#00D9FF',
              opacity,
              animation: `particle-float ${dur}s ${delay}s ease-in-out infinite`,
              boxShadow: isViolet
                ? `0 0 ${size * 3}px rgba(139,92,246,0.6)`
                : `0 0 ${size * 3}px rgba(0,217,255,0.6)`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function HeroSection({ profile }) {
  const reducedMotion = useReducedMotion();
  const { text, isCursorBlinking } = useTypewriter(profile.typewriterPhrases);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 55, stiffness: 70, mass: 1 });
  const glowY = useSpring(mouseY, { damping: 55, stiffness: 70, mass: 1 });

  useEffect(() => {
    if (reducedMotion) return;
    const move = (e) => { mouseX.set(e.clientX - 350); mouseY.set(e.clientY - 350); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY, reducedMotion]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cyber-grid-overlay"
    >
      {/* ── Background layers ── */}
      {!reducedMotion && (
        <>
          {/* Cursor glow */}
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full pointer-events-none z-0"
            style={{
              x: glowX, y: glowY,
              background: 'radial-gradient(circle, rgba(0,217,255,0.055) 0%, transparent 65%)',
            }}
          />
          {/* Drifting ambient blobs */}
          <div className="ambient-blob animate-drift-1" style={{
            width: '700px', height: '700px', top: '-180px', left: '-180px',
            background: 'radial-gradient(circle, rgba(0,217,255,0.09) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }} />
          <div className="ambient-blob animate-drift-2" style={{
            width: '600px', height: '600px', top: '-80px', right: '-150px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 65%)',
            filter: 'blur(65px)',
          }} />
          <div className="ambient-blob animate-drift-3" style={{
            width: '500px', height: '500px', bottom: '60px', left: '30%',
            background: 'radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }} />
          {/* Floating particles */}
          <Particles />
        </>
      )}

      {/* Node graph bg */}
      <div className="absolute inset-0 z-0">
        <NodeGraph />
        <div className="absolute inset-0 bg-gradient-to-b from-base/20 via-transparent to-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/25 via-transparent to-base/25" />
      </div>

      {/* ── Ghost watermark text ── */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-[1] select-none"
        aria-hidden="true"
      >
        <span
          className="font-syne font-black text-white uppercase tracking-[0.25em] whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 16vw, 14rem)',
            opacity: 0.022,
            userSelect: 'none',
            letterSpacing: '0.2em',
          }}
        >
          BACKEND ENGINEER
        </span>
      </div>

      {/* ── Rotating halo ring behind name ── */}
      {!reducedMotion && (
        <div
          className="absolute z-[2] pointer-events-none"
          style={{
            width: 'clamp(340px, 55vw, 720px)',
            height: 'clamp(200px, 28vw, 380px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-full h-full rounded-full animate-halo-spin"
            style={{
              background: 'conic-gradient(from 0deg, transparent 20%, rgba(0,217,255,0.18) 40%, rgba(139,92,246,0.22) 60%, rgba(0,217,255,0.18) 80%, transparent 100%)',
              filter: 'blur(32px)',
              borderRadius: '50%',
            }}
          />
        </div>
      )}

      {/* ── Floating Stat Cards ── */}
      {!reducedMotion && (
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {/* Top-left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[22%] left-[5%] xl:left-[8%]"
            style={{ animation: 'float-stat 7s 0s ease-in-out infinite' }}
          >
            <StatCard card={STAT_CARDS[0]} />
          </motion.div>
          {/* Top-right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[22%] right-[5%] xl:right-[8%]"
            style={{ animation: 'float-stat 9s 1s ease-in-out infinite' }}
          >
            <StatCard card={STAT_CARDS[1]} />
          </motion.div>
          {/* Bottom-left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[28%] left-[5%] xl:left-[8%]"
            style={{ animation: 'float-stat 8s 0.5s ease-in-out infinite' }}
          >
            <StatCard card={STAT_CARDS[2]} />
          </motion.div>
          {/* Bottom-right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[28%] right-[5%] xl:right-[8%]"
            style={{ animation: 'float-stat 10s 1.5s ease-in-out infinite' }}
          >
            <StatCard card={STAT_CARDS[3]} />
          </motion.div>
        </div>
      )}

      {/* ── Main Content ── */}
      <motion.div
        variants={reducedMotion ? {} : container}
        initial={reducedMotion ? 'show' : 'hidden'}
        animate="show"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Availability badge */}
        <motion.div variants={reducedMotion ? {} : item} className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full backdrop-blur-sm"
            style={{
              background: 'rgba(0,217,255,0.07)',
              border: '1px solid rgba(0,217,255,0.3)',
              boxShadow: '0 0 24px rgba(0,217,255,0.15), inset 0 0 12px rgba(0,217,255,0.05)',
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-cyan opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan shadow-[0_0_8px_rgba(0,217,255,0.9)]" />
            </span>
            <span className="font-mono text-[0.7rem] text-cyan tracking-[0.18em] uppercase font-bold">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Name — keep Syne font unchanged */}
        <motion.h1
          variants={reducedMotion ? {} : item}
          className="font-syne font-extrabold text-white mb-5 leading-[0.93] tracking-tight"
          style={{
            fontSize: 'clamp(3.8rem, 9vw, 7.5rem)',
            letterSpacing: '-0.035em',
            textShadow: '0 0 60px rgba(255,255,255,0.08)',
          }}
        >
          {profile.name}
        </motion.h1>

        {/* Subtitle with gradient */}
        <motion.p
          variants={reducedMotion ? {} : item}
          className="gradient-text-cyan font-inter mb-8 max-sm:text-base"
          style={{
            fontSize: 'clamp(1rem, 2.4vw, 1.2rem)',
            fontWeight: 400,
          }}
        >
          {profile.subtitle}
        </motion.p>

        {/* Typewriter */}
        <motion.div
          variants={reducedMotion ? {} : item}
          className="flex items-center justify-center mb-10"
        >
          <div
            className="inline-flex items-center gap-0 px-5 py-2.5 rounded-xl backdrop-blur-sm"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(0,217,255,0.18)',
              boxShadow: '0 0 20px rgba(0,217,255,0.06)',
            }}
          >
            <span
              className="font-mono text-cyan font-semibold"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' }}
            >
              {text}
            </span>
            <span
              className={`inline-block w-[2px] h-5 bg-cyan ml-0.5 rounded-full shadow-[0_0_8px_rgba(0,217,255,0.8)] ${
                isCursorBlinking ? 'animate-typewriter-blink' : ''
              }`}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={reducedMotion ? {} : item}
          className="flex items-center justify-center gap-4 flex-wrap mb-16"
        >
          <button
            id="hero-cta-projects"
            onClick={() => scrollTo('projects')}
            className="btn-gradient relative px-8 py-3.5 rounded-xl font-syne font-bold text-base text-white
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={16} />
              View Projects
            </span>
          </button>

          <button
            id="hero-cta-contact"
            onClick={() => scrollTo('contact')}
            className="px-8 py-3.5 rounded-xl font-syne font-semibold text-base
                       text-gray-200 border border-white/15 hover:border-cyan/50 hover:text-white
                       backdrop-blur-sm
                       hover:shadow-[0_0_24px_rgba(0,217,255,0.12)]
                       transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={reducedMotion ? {} : item}>
          <button
            onClick={() => scrollTo('about')}
            className="group flex flex-col items-center gap-2 text-gray-600 hover:text-cyan transition-colors mx-auto"
            aria-label="Scroll to About"
          >
            <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase">scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-cyan/50 to-transparent group-hover:from-cyan" />
            <ArrowDown size={14} className="animate-float" />
          </button>
        </motion.div>
      </motion.div>

      {/* ── Tech Marquee (bottom) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 z-10 pb-4"
      >
        <div className="section-divider mb-4" />
        <div className="marquee-container">
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="font-mono text-[0.7rem] tracking-widest uppercase text-gray-600 hover:text-cyan transition-colors cursor-default">
                  {item}
                </span>
                <span className="text-gray-800">·</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StatCard({ card }) {
  const Icon = card.icon;
  return (
    <div
      className="stat-card flex items-center gap-2.5 cursor-default group"
      style={{ '--card-glow': card.color }}
    >
      <div
        className="p-1.5 rounded-lg transition-all duration-300"
        style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
      >
        <Icon size={14} style={{ color: card.color }} />
      </div>
      <div>
        <div
          className="font-syne font-black text-sm leading-none"
          style={{ color: card.color }}
        >
          {card.value}
        </div>
        <div className="font-mono text-[0.6rem] text-gray-600 tracking-wider uppercase mt-0.5">
          {card.label}
        </div>
      </div>
    </div>
  );
}
