import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '../store';

const SKILLS = [
  { name:'React.js',          level:85, cat:'frontend', color:'#61DAFB' },
  { name:'JavaScript (ES6+)', level:82, cat:'frontend', color:'#F7DF1E' },
  { name:'TypeScript',        level:70, cat:'frontend', color:'#3178C6' },
  { name:'HTML5 & CSS3',      level:92, cat:'frontend', color:'#E34F26' },
  { name:'Tailwind CSS',      level:80, cat:'frontend', color:'#06B6D4' },
  { name:'Redux Toolkit',     level:72, cat:'frontend', color:'#764ABC' },
  { name:'Figma',             level:85, cat:'design',   color:'#F24E1E' },
  { name:'UI/UX Design',      level:78, cat:'design',   color:'#E8A0BF' },
  { name:'Responsive Design', level:90, cat:'design',   color:'#0ACF83' },
  { name:'Wireframing',       level:80, cat:'design',   color:'#B8A0E8' },
  { name:'Git & GitHub',      level:80, cat:'tools',    color:'#F05032' },
  { name:'Vite',              level:75, cat:'tools',    color:'#646CFF' },
  { name:'REST APIs',         level:68, cat:'tools',    color:'#6DB33F' },
  { name:'Netlify',           level:75, cat:'tools',    color:'#00C7B7' },
];

type Cat = 'all'|'frontend'|'design'|'tools';
const FILTERS: { key:Cat; label:string }[] = [
  { key:'all',      label:'All'        },
  { key:'frontend', label:'⚛️ Frontend' },
  { key:'design',   label:'🎨 Design'  },
  { key:'tools',    label:'🛠 Tools'   },
];

// Marquee tech logos row
const TECH_STACK = ['React.js','TypeScript','Redux Toolkit','Tailwind CSS','Vite','Figma','Git','Netlify','HTML5','CSS3','JavaScript'];

const Skills: React.FC = () => {
  const theme = useAppSelector(s => s.portfolio.theme);
  const isDark = theme === 'dark';
  const [active, setActive] = useState<Cat>('all');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = active === 'all' ? SKILLS : SKILLS.filter(s => s.cat === active);

  return (
    <section id="skills" className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 rounded-full"
        style={{ background:'radial-gradient(circle, rgba(232,160,191,0.05) 0%, transparent 70%)' }} />

      <div ref={ref}>
        <p className="section-label">What I Know</p>
        <h2 className={isDark ? 'section-title-dark' : 'section-title-light'}>Skills & Tools</h2>
        <div className="section-line" />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(({ key, label }) => (
            <button key={key} onClick={() => setActive(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === key
                  ? 'text-dark-bg shadow-lg'
                  : isDark ? 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/5'
                             : 'bg-light-text/5 text-light-text/55 hover:bg-light-text/10 hover:text-light-text border border-light-text/10'
              }`}
              style={active === key ? { background:'linear-gradient(135deg,#E8A0BF,#F5C842)', boxShadow:'0 4px 20px rgba(232,160,191,0.4)' } : {}}>
              {label}
            </button>
          ))}
        </div>

        {/* Skill bars grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {filtered.map((skill, i) => (
            <div key={skill.name}
              className={`p-5 rounded-2xl border transition-all duration-700 ${
                isDark ? 'card-dark border-white/5' : 'card-light border-black/10'
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay:`${i * 50}ms` }}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: skill.color, boxShadow:`0 0 8px ${skill.color}60` }} />
                  <span className={`font-medium text-sm ${isDark ? 'text-white/85' : 'text-black/85'}`}>{skill.name}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: skill.color }}>{skill.level}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: inView ? `${skill.level}%` : '0%', transitionDelay:`${i * 50 + 200}ms` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Marquee tech strip */}
        <div className={`rounded-2xl border py-5 overflow-hidden relative ${
          isDark ? 'border-white/5 bg-dark-card' : 'border-black/10 bg-light-card'
        }`}>
          <p className={`text-center text-xs font-semibold tracking-widest uppercase mb-4 ${isDark ? 'text-white/25' : 'text-light-text/35'}`}>
            Core Stack
          </p>
          <div className="flex animate-marquee whitespace-nowrap">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span key={i} className={`inline-flex items-center mx-4 px-5 py-2 rounded-xl border text-sm font-semibold ${
                isDark ? 'border-white/10 text-white/50 bg-white/5' : 'border-black/10 text-black/50 bg-black/5'
              }`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
