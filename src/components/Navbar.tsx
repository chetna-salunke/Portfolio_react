import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleTheme } from '../store/slices/portfolioSlice';

const NAV_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
  { label: 'Designs',  href: '#designs'  },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Contact',  href: '#contact'  },
];

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme, activeSection } = useAppSelector(s => s.portfolio);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? isDark
          ? 'border-b border-white/5 backdrop-blur-2xl'
          : 'border-b border-black/10 backdrop-blur-2xl'
        : ''
    }`}
    style={scrolled ? { background: isDark ? 'rgba(12,12,20,0.85)' : 'rgba(244,240,236,0.92)' } : {}}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="font-display font-bold text-lg flex items-center gap-1 group">
          <span style={{ color:'#E8A0BF' }}>{'<'}</span>
          <span className={`transition-all duration-300 ${isDark ? 'text-white' : 'text-light-text'}`}>CS</span>
          <span style={{ color:'#F5C842' }}>{'/>'}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <a href={href} className={`text-sm font-medium relative transition-all duration-300 group ${
                  isActive ? 'gradient-text' : isDark ? 'text-white/50 hover:text-white/80' : 'text-light-text/55 hover:text-light-text'
                }`}>
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-px rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} style={{ background:'linear-gradient(90deg,#E8A0BF,#F5C842)' }} />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            onClick={() => dispatch(toggleTheme())}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 ${
              isDark
                ? 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                : 'border-light-text/15 bg-light-text/5 hover:border-light-text/25 hover:bg-light-text/10'
            }`}
          >
            <span className="text-base">{isDark ? '☀️' : '🌙'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(p => !p)}
          >
            {[0,1,2].map(i => (
              <span key={i} className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? 'bg-white' : 'bg-black'} ${
                i===0 ? menuOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5' :
                i===1 ? menuOpen ? 'w-0 opacity-0' : 'w-4' :
                         menuOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-3'
              }`} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}
        style={{ background: isDark ? 'rgba(12,12,20,0.97)' : 'rgba(244,240,236,0.97)' }}>
        <div className={`border-t px-6 py-4 space-y-1 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className={`block py-2.5 text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-white/60 hover:text-white' : 'text-light-text/65 hover:text-light-text'
              }`}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
