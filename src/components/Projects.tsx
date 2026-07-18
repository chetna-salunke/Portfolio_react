import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '../store';
import type { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: 'vintage-car',
    title: 'Vintage Car Frontend',
    description: 'A stunning showcase for classic & vintage cars. Rich gallery layout, smooth animations, interactive catalog, and immersive hero sections.',
    tech: ['React.js', 'CSS3', 'JavaScript', 'HTML5'],
    githubUrl: 'https://github.com/chetna-salunke',
    featured: true,
    type: 'react',
  },
  {
    id: 'petal-task',
    title: 'Petal – Task Manager',
    description: 'Beautiful task management with drag-and-drop boards, priority labels, filters, and silky smooth state updates via Redux Toolkit.',
    tech: ['React.js', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/chetna-salunke',
    featured: true,
    type: 'react',
  },
  {
    id: 'home-decor',
    title: 'Home Decor Web App',
    description: 'E-commerce style frontend for a home decor brand — product listings, filtering, cart system, and an elegant warm aesthetic.',
    tech: ['React.js', 'Tailwind CSS', 'TypeScript', 'Vite'],
    githubUrl: 'https://github.com/chetna-salunke',
    featured: true,
    type: 'react',
  },
  {
    id: 'plant-shop',
    title: 'Plant Selling E-Commerce',
    description: 'Full-featured plant shop with product pages, category filters, shopping cart, and a fresh green botanical aesthetic.',
    tech: ['React.js', 'Redux Toolkit', 'CSS3', 'JavaScript'],
    githubUrl: 'https://github.com/chetna-salunke',
    featured: false,
    type: 'react',
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    description: 'This portfolio — React.js, TypeScript, Redux Toolkit, Tailwind. Features dark/light mode, canvas animations, and React Toastify.',
    tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'Tailwind', 'Vite'],
    githubUrl: 'https://github.com/chetna-salunke',
    featured: false,
    type: 'react',
  },
];

const PROJECT_META: Record<string, { emoji: string; grad: string; accentColor: string }> = {
  'vintage-car':   { emoji:'🚗', grad:'linear-gradient(135deg,rgba(245,200,66,0.15),rgba(232,160,191,0.08))', accentColor:'#F5C842' },
  'petal-task':    { emoji:'🌸', grad:'linear-gradient(135deg,rgba(232,160,191,0.18),rgba(184,160,232,0.08))', accentColor:'#E8A0BF' },
  'home-decor':    { emoji:'🏠', grad:'linear-gradient(135deg,rgba(184,160,232,0.15),rgba(245,200,66,0.08))',  accentColor:'#B8A0E8' },
  'plant-shop':    { emoji:'🌿', grad:'linear-gradient(135deg,rgba(100,200,150,0.15),rgba(184,160,232,0.08))', accentColor:'#64C896' },
  'portfolio-site':{ emoji:'💼', grad:'linear-gradient(135deg,rgba(232,160,191,0.12),rgba(245,200,66,0.10))',  accentColor:'#E8A0BF' },
};

const Projects: React.FC = () => {
  const theme = useAppSelector(s => s.portfolio.theme);
  const isDark = theme === 'dark';
  const [showAll, setShowAll] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  const displayed = showAll ? PROJECTS : PROJECTS.filter(p => p.featured);

  return (
    <section id="projects" className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-0 left-0 w-96 h-96 rounded-full"
        style={{ background:'radial-gradient(circle, rgba(245,200,66,0.05) 0%, transparent 70%)' }} />

      <div ref={ref}>
        <p className="section-label">What I Built</p>
        <h2 className={isDark ? 'section-title-dark' : 'section-title-light'}>Projects</h2>
        <div className="section-line" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, i) => {
            const meta = PROJECT_META[project.id];
            return (
              <div
                key={project.id}
                className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-700 cursor-default ${
                  isDark ? 'card-dark border-white/5' : 'card-light border-black/10'
                } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay:`${i * 100}ms` }}
              >
                {/* Image placeholder / screenshot area */}
                <div className="relative h-48 overflow-hidden flex items-center justify-center"
                  style={{ background: meta.grad }}>
                  {/* Screenshot placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="text-5xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">{meta.emoji}</span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full mt-1 ${isDark ? 'text-white/30 bg-white/5' : 'text-black/30 bg-black/5'}`}>
                      📸 Add screenshot
                    </span>
                  </div>
                  {/* Hover shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background:'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)', backgroundSize:'200% 100%', animation:'shimmer 1.5s linear infinite' }} />
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background:`linear-gradient(90deg, transparent, ${meta.accentColor}, transparent)` }} />
                  {/* React badge */}
                  <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{ background:isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)', color: meta.accentColor, backdropFilter:'blur(8px)' }}>
                    React.js
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className={`font-display font-bold text-base mb-2 transition-colors duration-300 group-hover:text-rose ${isDark ? 'text-white' : 'text-light-text'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed flex-1 mb-4 ${isDark ? 'text-white/45' : 'text-light-text/60'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map(tag => <span key={tag} className="tech-tag">{tag}</span>)}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 ${
                          isDark ? 'border-white/10 text-white/50 hover:border-white/25 hover:text-white' : 'border-black/10 text-black/50 hover:border-black/25 hover:text-black'
                        }`}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2 px-4">Live ↗</a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => setShowAll(p => !p)} className={isDark ? 'btn-ghost-dark' : 'btn-ghost-light'}>
            {showAll ? '← Show Featured' : 'View All Projects →'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
