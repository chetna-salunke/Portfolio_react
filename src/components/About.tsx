import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '../store';

const SERVICES = [
  { icon: '⚛️', title: 'React Development',   desc: 'Fast, scalable SPAs with React.js, TypeScript & Redux Toolkit.' },
  { icon: '🎨', title: 'UI/UX Design',         desc: 'Figma wireframes to pixel-perfect, animated interfaces.' },
  { icon: '📱', title: 'Responsive Web',        desc: 'Flawless layouts across mobile, tablet & desktop.' },
  { icon: '✨', title: 'Animations & Motion',   desc: 'Smooth micro-interactions and transitions that delight.' },
];

const About: React.FC = () => {
  const theme = useAppSelector(s => s.portfolio.theme);
  const isDark = theme === 'dark';
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full"
        style={{ background:'radial-gradient(circle, rgba(232,160,191,0.07) 0%, transparent 70%)' }} />

      <div ref={ref}>
        <p className="section-label">Who I Am</p>
        <h2 className={isDark ? 'section-title-dark' : 'section-title-light'}>About Me</h2>
        <div className="section-line" />

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Text */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <p className={`text-base leading-loose mb-5 ${isDark ? 'text-white/55' : 'text-light-text/65'}`}>
              I'm <span className={`font-semibold ${isDark ? 'text-white' : 'text-light-text'}`}>Chetna Salunke</span> — a freelance
              frontend developer & UI designer based in{' '}
              <span className="gradient-text font-semibold">Pune, India</span>.
            </p>
            <p className={`text-base leading-loose mb-5 ${isDark ? 'text-white/55' : 'text-light-text/65'}`}>
              I specialize in turning ideas and Figma designs into beautiful, production-ready web experiences
              using <span className="text-rose font-medium">React.js</span>,{' '}
              <span style={{color:'#F5C842'}} className="font-medium">TypeScript</span> and{' '}
              <span style={{color:'#B8A0E8'}} className="font-medium">Tailwind CSS</span>.
            </p>
            <p className={`text-base leading-loose ${isDark ? 'text-white/55' : 'text-light-text/65'}`}>
              I care deeply about aesthetics and animation — every project I build should not just work,
              but feel <span className={`font-medium italic ${isDark ? 'text-white/80' : 'text-black/80'}`}>delightful</span> to use.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <a href="https://linkedin.com/in/chetna-salunke-16471523b" target="_blank" rel="noopener noreferrer"
                className="btn-primary">LinkedIn ↗</a>
              <a href="#contact" className={isDark ? 'btn-ghost-dark' : 'btn-ghost-light'}>Let's Work Together</a>
            </div>
          </div>

          {/* Visual: avatar + floating chips */}
          <div className={`flex justify-center transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative w-64 h-64">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-dashed animate-spin-slow"
                style={{ borderColor:'rgba(232,160,191,0.2)' }} />
              {/* Inner card */}
              <div className="absolute inset-6 rounded-full flex items-center justify-center"
                style={{ background:'linear-gradient(135deg, #E8A0BF22 0%, #F5C84222 100%)', border:'1px solid rgba(232,160,191,0.15)' }}>
                <span className="font-display text-5xl font-bold gradient-text">CS</span>
              </div>
              {/* Floating chips */}
              {[
                { label:'React.js ⚛️', top:'-8%', left:'60%',  color:'rgba(232,160,191,0.15)', border:'rgba(232,160,191,0.3)', delay:'0s'   },
                { label:'Figma 🎨',    top:'75%',  left:'-5%',  color:'rgba(245,200,66,0.12)',  border:'rgba(245,200,66,0.3)',  delay:'0.8s' },
                { label:'TypeScript',  top:'5%',   left:'-10%', color:'rgba(184,160,232,0.12)', border:'rgba(184,160,232,0.3)', delay:'1.6s' },
              ].map(chip => (
                <div key={chip.label}
                  className="absolute px-3 py-1.5 rounded-xl text-xs font-semibold animate-bounce-slow"
                  style={{ top:chip.top, left:chip.left, background:chip.color, border:`1px solid ${chip.border}`,
                    color: isDark ? '#F0ECF8' : '#1A1025', animationDelay:chip.delay, backdropFilter:'blur(8px)' }}>
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`p-6 rounded-2xl border transition-all duration-700 group cursor-default ${
                isDark ? 'card-dark' : 'card-light'
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">{s.icon}</div>
              <h3 className={`font-display font-bold text-sm mb-2 ${isDark ? 'text-white' : 'text-light-text'}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/45' : 'text-black/50'}`}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
