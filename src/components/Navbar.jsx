import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import profile from '../data/profile';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (winScroll / docHeight) * 100 : 0);
      setScrolled(winScroll > 50);

      const sections = ['contact', 'github', 'skills', 'projects', 'about', 'hero'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(id === 'hero' ? '' : id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav shadow-2xl shadow-black/40' : 'bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-syne font-extrabold text-xl text-white hover:text-cyan transition-colors tracking-tight group"
            aria-label="Scroll to top"
          >
            <span className="group-hover:opacity-80 transition-opacity">AG</span>
            <span
              className="text-cyan transition-all duration-300 group-hover:text-shadow-cyan"
              style={{ textShadow: '0 0 12px rgba(0,217,255,0.6)' }}
            >
              .
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navItems.map((navItem) => (
              <button
                key={navItem.id}
                id={`nav-${navItem.id}`}
                onClick={() => scrollTo(navItem.id)}
                role="menuitem"
                aria-current={activeSection === navItem.id ? 'true' : undefined}
                className="relative px-4 py-2 font-inter text-sm font-medium rounded-lg transition-all duration-200
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                style={{
                  color: activeSection === navItem.id ? '#00D9FF' : '#94A3B8',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== navItem.id) e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== navItem.id) e.currentTarget.style.color = '#94A3B8';
                }}
              >
                {navItem.label}
                {/* Animated active indicator */}
                {activeSection === navItem.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(0,217,255,0.08)',
                      border: '1px solid rgba(0,217,255,0.22)',
                      boxShadow: '0 0 12px rgba(0,217,255,0.1)',
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10" />
              </button>
            ))}

            {/* Resume button */}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="nav-resume"
                className="ml-3 px-4 py-2 font-syne text-sm font-bold rounded-lg
                           transition-all duration-300 group relative overflow-hidden"
                style={{
                  color: '#00D9FF',
                  border: '1px solid rgba(0,217,255,0.28)',
                  background: 'rgba(0,217,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,217,255,0.14)';
                  e.currentTarget.style.borderColor = 'rgba(0,217,255,0.55)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,217,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,217,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0,217,255,0.28)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Resume
              </a>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-100"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #00D9FF, #8B5CF6)',
            boxShadow: '0 0 8px rgba(0,217,255,0.6)',
          }}
        />
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(28px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-16 z-40"
            style={{ background: 'rgba(8,12,20,0.92)' }}
            role="dialog"
            aria-modal="true"
          >
            {/* Ambient blobs */}
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.4) 0%, transparent 70%)', filter: 'blur(50px)' }} />
            <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full pointer-events-none opacity-15"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            <div className="relative flex flex-col items-center justify-center gap-2 px-8 pt-8 pb-16 h-full">
              {navItems.map((navItem, i) => (
                <motion.button
                  key={navItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(navItem.id)}
                  className="w-full text-center px-6 py-4 font-syne font-semibold text-xl rounded-2xl transition-all duration-200"
                  style={{
                    color: activeSection === navItem.id ? '#00D9FF' : '#CBD5E1',
                    background: activeSection === navItem.id ? 'rgba(0,217,255,0.08)' : 'transparent',
                    border: activeSection === navItem.id ? '1px solid rgba(0,217,255,0.2)' : '1px solid transparent',
                  }}
                >
                  {navItem.label}
                </motion.button>
              ))}
              {profile.resumeUrl && (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full text-center px-6 py-4 font-syne font-bold text-xl rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #00D9FF, #8B5CF6)',
                    color: 'white',
                    boxShadow: '0 0 30px rgba(0,217,255,0.3)',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Resume
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
