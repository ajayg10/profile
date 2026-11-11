import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Server, Cpu, Database, Wrench, FileText } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';
import useMousePosition from '../hooks/useMousePosition';
import { GithubIcon, LinkedinIcon } from './icons';

/* ── Illustrative diagram of VEDA's service layout (no live metrics) ── */
function Architectural3DCard({ mouse }) {
  const tiltX = mouse.y * -8;
  const tiltY = mouse.x * 10;
  const nodes = [
    { Icon: Cpu, name: 'Planner', sub: 'Groq / Ollama' },
    { Icon: Database, name: 'Memory', sub: 'FAISS' },
    { Icon: Wrench, name: 'Executor', sub: 'Topo-sorted steps' },
  ];

  return (
    <figure
      className="perspective-viewport relative w-full h-[460px] flex items-center justify-center m-0"
      role="img"
      aria-label="Illustrative diagram of VEDA's service layout: an Orchestrator routes to Planner, Memory and Executor services, each in its own Docker container behind Nginx."
    >
      <div
        className="hero-3d-card relative w-[380px] sm:w-[420px] h-[340px] transition-transform duration-200 ease-out"
        style={{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}
        aria-hidden="true"
      >
        {/* Layer 1: Base Card */}
        <div className="absolute inset-0 bg-[#F4EFEC] border border-[#EAE3DC] rounded-2xl shadow-layer-2 transform translate-z-[-20px] overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-40" />
          <div className="absolute top-4 left-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4DDD4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4DDD4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4DDD4]" />
            <span className="ml-2 font-mono text-[0.65rem] text-[#6B6460] tracking-wider uppercase">
              veda / docker-compose.yml
            </span>
          </div>
        </div>

        {/* Layer 2: Main Panel */}
        <div className="absolute inset-4 bg-white/95 backdrop-blur-md border border-[#EAE3DC] rounded-xl p-5 shadow-3d flex flex-col justify-between transform translate-z-[15px]">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#F4EFEC]">
            <div className="p-2 rounded-lg bg-[#FDF2EE] text-[#A9533A]">
              <Server size={18} />
            </div>
            <div>
              <p className="font-jakarta font-bold text-sm text-[#1C1A19]">VEDA · Orchestrator</p>
              <p className="font-mono text-[0.65rem] text-[#6B6460]">routes each request to:</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 my-2">
            {nodes.map(({ Icon, name, sub }) => (
              <div key={name} className="p-3 bg-[#F6F2EE] border border-[#EAE3DC] rounded-lg text-center flex flex-col items-center gap-1">
                <Icon size={16} className="text-[#A9533A]" />
                <span className="font-mono text-[0.68rem] font-bold text-[#1C1A19]">{name}</span>
                <span className="font-mono text-[0.58rem] text-[#6B6460]">{sub}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#F4EFEC] font-mono text-[0.68rem] text-[#4A4643]">
            One container per service · Nginx · Prometheus
          </div>
        </div>

        {/* Layer 3: Label */}
        <div className="absolute -top-3 -right-3 bg-white border border-[#EAE3DC] px-4 py-2 rounded-xl shadow-layer-2 transform translate-z-[45px]">
          <span className="font-mono text-xs font-bold text-[#1C1A19]">Illustrative diagram</span>
        </div>
      </div>
    </figure>
  );
}

export default function HeroSection({ profile }) {
  const reducedMotion = useReducedMotion();
  const mouse = useMousePosition();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#FBF9F6]"
    >
      {/* Background Soft Warm Mesh */}
      <div className="absolute inset-0 pointer-events-none bg-noise opacity-30" />
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#FDF2EE] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#F3EEEA] blur-3xl opacity-70 pointer-events-none" />

      <div className="site-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center min-h-[75vh]">
          
          {/* Left Text & Identity */}
          <div className="max-w-2xl">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE3DC] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-pulse" aria-hidden="true" />
                <span className="font-mono text-[0.72rem] font-semibold text-[#4A4643] uppercase tracking-wider">
                  {profile.hero.status}
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-jakarta font-extrabold text-[#1C1A19] leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4rem)' }}
            >
              {(() => {
                const { headline, accent } = profile.hero;
                const i = headline.indexOf(accent);
                if (i < 0) return headline;
                return (
                  <>
                    {headline.slice(0, i)}
                    <span className="text-[#A9533A]">{accent}</span>
                    {headline.slice(i + accent.length)}
                  </>
                );
              })()}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter text-[#4A4643] text-lg leading-relaxed mb-8 max-w-xl"
            >
              {profile.hero.subheading}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <a id="hero-explore-work" href="#projects" className="btn-primary">
                <span>See projects</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FileText size={16} aria-hidden="true" />
                <span>Resume (PDF)</span>
              </a>

              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <GithubIcon size={16} className="text-[#1C1A19]" aria-hidden="true" />
                <span>GitHub</span>
              </a>

              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <LinkedinIcon size={16} className="text-[#0A66C2]" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          {/* Right 3D Architectural Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <Architectural3DCard mouse={reducedMotion ? { x: 0, y: 0 } : mouse} />
          </motion.div>
        </div>
      </div>

      {/* Layer 1 to Layer 2 Transition Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-[#6B6460] hover:text-[#A9533A] transition-colors z-10"
      >
        <span className="font-mono text-[0.62rem] font-bold tracking-[0.2em] uppercase">
          02. About
        </span>
        <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
