import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import profile from '../data/profile';

const navItems = [
  { id: 'hero',     label: '01. Intro' },
  { id: 'about',    label: '02. About' },
  { id: 'projects', label: '03. Projects' },
  { id: 'contact',  label: '04. Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const winY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (winY / docH) * 100 : 0);
      setScrolled(winY > 30);

      const ids = ['contact', 'projects', 'about', 'hero'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 200 && r.bottom > 100) { setActive(id); break; }
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 md:pt-5 px-4 pointer-events-none">
        <div className="site-container flex items-center justify-between">
          
          {/* Logo Pill */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto group px-4 py-2 bg-white/90 backdrop-blur-md border border-[#EAE3DC] rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
            aria-label="Top"
          >
            <span className="font-jakarta font-extrabold text-sm text-[#1C1A19] tracking-tight">
              AJAY GARG
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51] group-hover:scale-125 transition-transform" />
          </button>

          {/* Floating Pill Nav for Desktop */}
          <nav
            aria-label="Primary navigation"
            className={`pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-md border border-[#EAE3DC] rounded-full transition-all duration-300 ${
              scrolled ? 'shadow-md border-[#D5CBC0]' : 'shadow-sm'
            }`}
          >
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => go(item.id)}
                  className="relative px-4 py-1.5 font-mono text-[0.76rem] font-semibold transition-colors duration-200 rounded-full"
                  style={{ color: isActive ? '#1C1A19' : '#7E7771' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill-active"
                      className="absolute inset-0 bg-[#F3EEEA] rounded-full -z-10 border border-[#EAE3DC]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}

            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="nav-resume"
                className="ml-2 px-3.5 py-1.5 font-jakarta text-[0.76rem] font-bold rounded-full transition-all duration-200
                           text-[#C86D51] bg-[#FDF2EE] border border-rgba(200,109,81,0.2) hover:bg-[#C86D51] hover:text-white flex items-center gap-1"
              >
                Resume
                <ArrowUpRight size={12} />
              </a>
            )}
          </nav>

          {/* Mobile Menu Toggle Pill */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="pointer-events-auto md:hidden p-2.5 bg-white/90 backdrop-blur-md border border-[#EAE3DC] rounded-full text-[#1C1A19] shadow-sm"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-transparent">
          <div
            className="h-full bg-[#C86D51] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-[#FBF9F6]/95 backdrop-blur-xl px-6 pt-10"
          >
            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(item.id)}
                  className="w-full text-left py-3.5 px-5 font-jakarta font-bold text-lg text-[#1C1A19] bg-white border border-[#EAE3DC] rounded-xl flex items-center justify-between shadow-sm"
                >
                  <span>{item.label}</span>
                  <span className="w-2 h-2 rounded-full bg-[#C86D51]" />
                </motion.button>
              ))}

              {profile.resumeUrl && (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-4 text-center font-jakarta font-bold text-base text-white bg-[#C86D51] rounded-xl shadow-md flex items-center justify-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Download Resume</span>
                  <ArrowUpRight size={16} />
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
