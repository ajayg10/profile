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
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-satoshi font-bold text-xl text-white hover:text-cyan transition-colors"
          aria-label="Scroll to top"
        >
          AG<span className="text-cyan">.</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1" role="menubar" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              role="menuitem"
              aria-current={activeSection === item.id ? 'true' : undefined}
              className={`px-4 py-2 text-body-sm font-inter font-medium rounded-lg transition-all duration-200
                ${activeSection === item.id
                  ? 'text-cyan bg-cyan/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan
              `}
            >
              {item.label}
            </button>
          ))}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="px-4 py-2 text-body-sm font-inter font-medium rounded-lg text-gray-400 hover:text-cyan hover:bg-cyan/5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
            >
              Resume
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 z-40 glass-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col items-center justify-center gap-2 p-8 pt-12">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-center px-6 py-3 text-lg font-inter font-medium rounded-xl transition-colors
                    ${activeSection === item.id
                      ? 'text-cyan bg-cyan/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {item.label}
                </motion.button>
              ))}
              {profile.resumeUrl && (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-6 py-3 text-lg font-inter font-medium rounded-xl text-cyan bg-cyan/5 border border-cyan/10 hover:bg-cyan/10 hover:border-cyan/20 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Resume
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
