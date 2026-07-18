import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '../store';

const DESIGNS = [
  {
    id: 'fashion',
    title: 'Fashion Website Design',
    description: 'A high-end fashion brand website — elegant editorial layout, full-screen lookbook, product showcase, and bold typography system.',
    figmaUrl: 'https://www.figma.com/community/file/1432793129014767435/fashion-site',
    tags: ['Fashion', 'Editorial', 'E-Commerce', 'Figma'],
    emoji: '👗',
    grad: 'linear-gradient(135deg, rgba(232,160,191,0.2) 0%, rgba(245,200,66,0.1) 100%)',
    accentColor: '#E8A0BF',
  },
  {
    id: 'vintage-design',
    title: 'Vintage Car Website Design',
    description: 'Full UI design for a vintage car showcase — dark cinematic aesthetic, animated hero, car gallery grid, and specs comparison page.',
    figmaUrl: 'https://www.figma.com/community/file/1438229116423315212/car-dashboard-design-system',
    tags: ['Automotive', 'Dark Theme', 'Landing Page', 'Figma'],
    emoji: '🚗',
    grad: 'linear-gradient(135deg, rgba(245,200,66,0.18) 0%, rgba(184,160,232,0.1) 100%)',
    accentColor: '#F5C842',
  },
  {
    id: 'app-design',
    title: 'Mobile App UI Design',
    description: 'Clean mobile app UI — onboarding flow, dashboard, and user profile screens designed with accessibility and modern aesthetics in mind.',
    figmaUrl: 'https://www.figma.com/@chetna_salunke',
    tags: ['Mobile UI', 'App Design', 'Onboarding', 'Figma'],
    emoji: '📱',
    grad: 'linear-gradient(135deg, rgba(184,160,232,0.18) 0%, rgba(232,160,191,0.1) 100%)',
    accentColor: '#B8A0E8',
  },
];

const Designs: React.FC = () => {
  const theme = useAppSelector(s => s.portfolio.theme);
  const isDark = theme === 'dark';
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="designs" className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-1/2 right-0 w-80 h-80 rounded-full"
        style={{ background:'radial-gradient(circle, rgba(184,160,232,0.07) 0%, transparent 70%)' }} />

      <div ref={ref}>
        <p className="section-label">Visual Work</p>
        <h2 className={isDark ? 'section-title-dark' : 'section-title-light'}>Figma Designs</h2>
        <div className="section-line" />

        <p className={`text-base leading-relaxed max-w-xl mb-14 ${isDark ? 'text-white/45' : 'text-light-text/60'}`}>
          Before writing a single line of code, I design in Figma. Here are some of my UI designs —
          click to explore on Figma.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {DESIGNS.map((d, i) => (
            <div
              key={d.id}
              className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-700 ${
                isDark ? 'card-dark border-white/5' : 'card-light border-black/10'
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay:`${i * 120}ms` }}
            >
              {/* Preview area - screenshot goes here */}
              <div className="relative h-52 overflow-hidden" style={{ background: d.grad }}>
                {/* Figma-style UI mockup skeleton */}
                <div className="absolute inset-0 p-5 flex flex-col gap-2.5 opacity-50">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-3 rounded-full" style={{ background: d.accentColor, opacity:0.6 }} />
                    <div className="flex-1 h-2 rounded-full" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
                  </div>
                  <div className="h-24 rounded-xl mt-1" style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border:`1px solid ${d.accentColor}20` }} />
                  <div className="flex gap-2">
                    <div className="h-10 flex-1 rounded-lg" style={{ background: d.accentColor, opacity:0.25 }} />
                    <div className="h-10 flex-1 rounded-lg" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }} />
                  </div>
                </div>
                {/* Center emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl transition-all duration-500 group-hover:scale-125 drop-shadow-lg">{d.emoji}</span>
                </div>
                {/* Hover overlay - open in Figma */}
                <a href={d.figmaUrl} target="_blank" rel="noopener noreferrer"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center"
                  style={{ backdropFilter:'blur(8px)', background: isDark ? 'rgba(12,12,20,0.75)' : 'rgba(253,248,245,0.80)' }}>
                  <span className="btn-primary text-sm">
                    Open in Figma ↗
                  </span>
                </a>
                {/* Figma badge */}
                <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-lg"
                  style={{ background:'rgba(232,42,35,0.85)', color:'white', backdropFilter:'blur(8px)' }}>
                  Figma
                </span>
                {/* Screenshot note */}
                <span className={`absolute bottom-3 right-3 text-xs ${isDark ? 'text-white/25' : 'text-black/25'}`}>
                  + screenshot soon
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className={`font-display font-bold text-sm mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-light-text'}`}
                  style={{ color: '' }}>
                  {d.title}
                </h3>
                <p className={`text-sm leading-relaxed flex-1 mb-4 ${isDark ? 'text-white/45' : 'text-light-text/60'}`}>{d.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {d.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full border"
                      style={{ background: `${d.accentColor}12`, color: d.accentColor, borderColor:`${d.accentColor}25` }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={d.figmaUrl} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-xs font-semibold transition-all duration-200 hover:gap-3 ${
                    isDark ? 'text-white/35 hover:text-white/70' : 'text-black/35 hover:text-black/70'
                  }`}>
                  View on Figma →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Designs;
