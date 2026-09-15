import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Server, Cpu, Database, Shield, Zap } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';
import useMousePosition from '../hooks/useMousePosition';
import { GithubIcon, LinkedinIcon } from './icons';

/* ── Interactive 3D System Architecture Card ── */
function Architectural3DCard({ mouse }) {
  const tiltX = mouse.y * -8;
  const tiltY = mouse.x * 10;

  return (
    <div className="perspective-viewport relative w-full h-[460px] flex items-center justify-center">
      <div
        className="hero-3d-card relative w-[380px] sm:w-[420px] h-[340px] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        {/* Layer 1: Base Card (Shadow & Foundation) */}
        <div className="absolute inset-0 bg-[#F4EFEC] border border-[#EAE3DC] rounded-2xl shadow-layer-2 transform translate-z-[-20px] overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-40" />
          <div className="absolute top-4 left-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4DDD4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4DDD4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4DDD4]" />
            <span className="ml-2 font-mono text-[0.65rem] text-[#7E7771] tracking-wider uppercase">
              system-mesh.v2
            </span>
          </div>
        </div>

        {/* Layer 2: Main Floating White Panel */}
        <div className="absolute inset-4 bg-white/95 backdrop-blur-md border border-[#EAE3DC] rounded-xl p-5 shadow-3d flex flex-col justify-between transform translate-z-[15px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F4EFEC]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#FDF2EE] text-[#C86D51]">
                <Server size={18} />
              </div>
              <div>
                <h4 className="font-jakarta font-bold text-sm text-[#1C1A19]">
                  API & Agent Infrastructure
                </h4>
                <p className="font-mono text-[0.65rem] text-[#7E7771]">
                  Self-Healing Microservices
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#FDF2EE] text-[#C86D51] font-mono text-[0.65rem] font-semibold border border-rgba(200,109,81,0.2)">
              ACTIVE
            </span>
          </div>

          {/* Microservices Node Flow */}
          <div className="grid grid-cols-3 gap-2.5 my-2">
            <div className="p-3 bg-[#F6F2EE] border border-[#EAE3DC] rounded-lg text-center flex flex-col items-center gap-1 hover:border-[#C86D51] transition-colors">
              <Cpu size={16} className="text-[#C86D51]" />
              <span className="font-mono text-[0.68rem] font-bold text-[#1C1A19]">
                LLM Gateway
              </span>
              <span className="font-mono text-[0.58rem] text-[#7E7771]">
                LangChain
              </span>
            </div>

            <div className="p-3 bg-[#F6F2EE] border border-[#EAE3DC] rounded-lg text-center flex flex-col items-center gap-1 hover:border-[#C86D51] transition-colors">
              <Database size={16} className="text-[#C86D51]" />
              <span className="font-mono text-[0.68rem] font-bold text-[#1C1A19]">
                Vector DB
              </span>
              <span className="font-mono text-[0.58rem] text-[#7E7771]">
                FAISS / Pg
              </span>
            </div>

            <div className="p-3 bg-[#F6F2EE] border border-[#EAE3DC] rounded-lg text-center flex flex-col items-center gap-1 hover:border-[#C86D51] transition-colors">
              <Shield size={16} className="text-[#C86D51]" />
              <span className="font-mono text-[0.68rem] font-bold text-[#1C1A19]">
                Auth & Cache
              </span>
              <span className="font-mono text-[0.58rem] text-[#7E7771]">
                JWT / Redis
              </span>
            </div>
          </div>

          {/* Metrics Footer */}
          <div className="pt-2 border-t border-[#F4EFEC] flex items-center justify-between font-mono text-[0.68rem] text-[#4A4643]">
            <span className="flex items-center gap-1.5">
              <Zap size={12} className="text-[#C86D51]" />
              99.9% Uptime
            </span>
            <span className="text-[#7E7771]">Latency &lt; 14ms</span>
          </div>
        </div>

        {/* Layer 3: Top Floating Badge */}
        <div className="absolute -top-3 -right-3 bg-white border border-[#EAE3DC] px-4 py-2 rounded-xl shadow-layer-2 flex items-center gap-2 transform translate-z-[45px] hover:scale-105 transition-transform">
          <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-pulse" />
          <span className="font-mono text-xs font-bold text-[#1C1A19]">
            Agentic AI Built
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection({ profile }) {
  const reducedMotion = useReducedMotion();
  const mouse = useMousePosition();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

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
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center min-h-[75vh]">
          
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
                <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-pulse" />
                <span className="font-mono text-[0.72rem] font-semibold text-[#4A4643] uppercase tracking-wider">
                  Open for System Architecture & AI Roles
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
              Building Scalable <span className="text-[#C86D51]">Backend Systems</span> & AI Architecture.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter text-[#4A4643] text-lg leading-relaxed mb-8 max-w-xl"
            >
              I engineering resilient microservices, vector retrieval systems, and self-healing backend workflows designed for performance and scale.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <button
                id="hero-explore-work"
                onClick={() => scrollTo('projects')}
                className="btn-primary"
              >
                <span>Explore Featured Work</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <GithubIcon size={16} className="text-[#1C1A19]" />
                <span>GitHub</span>
              </a>

              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <LinkedinIcon size={16} className="text-[#0A66C2]" />
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
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#7E7771] hover:text-[#C86D51] transition-colors z-10"
        aria-label="Scroll to Layer 2: About"
      >
        <span className="font-mono text-[0.62rem] font-bold tracking-[0.2em] uppercase">
          02. ABOUT & PHILOSOPHY
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
