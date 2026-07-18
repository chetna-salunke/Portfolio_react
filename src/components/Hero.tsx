import { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../store';

const ROLES = ['React Developer', 'Frontend Developer', 'UI Designer', 'Freelancer'];

const useTypewriter = (words: string[], speed = 75, pause = 2200) => {
  const [displayed, setDisplayed] = useState('');
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi];
    const delay = del ? speed / 2 : ci === cur.length ? pause : speed;
    const t = setTimeout(() => {
      if (!del && ci < cur.length)      { setDisplayed(cur.slice(0, ci+1)); setCi(i=>i+1); }
      else if (!del && ci===cur.length) { setDel(true); }
      else if (del && ci > 0)           { setDisplayed(cur.slice(0, ci-1)); setCi(i=>i-1); }
      else                              { setDel(false); setWi(i=>(i+1)%words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return displayed;
};

// Floating particle component
const Particle = ({ x, y, size, delay, color }: { x:number; y:number; size:number; delay:number; color:string }) => (
  <div
    className="absolute rounded-full animate-float-slow pointer-events-none"
    style={{ left:`${x}%`, top:`${y}%`, width:size, height:size, background:color, opacity:0.4, animationDelay:`${delay}s`, filter:'blur(1px)' }}
  />
);

const Hero: React.FC = () => {
  const theme = useAppSelector(s => s.portfolio.theme);
  const isDark = theme === 'dark';
  const role = useTypewriter(ROLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated grid dots
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let frame = 0;
    let raf: number;
    const dots: { x:number; y:number; ox:number; oy:number }[] = [];
    const spacing = 50;
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        dots.push({ x, y, ox: x, oy: y });
      }
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 0.008;
      dots.forEach(d => {
        const wave = Math.sin(frame + d.ox * 0.02 + d.oy * 0.015) * 4;
        d.x = d.ox + wave;
        d.y = d.oy + Math.cos(frame + d.ox * 0.015) * 3;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(232,160,191,0.18)' : 'rgba(232,160,191,0.25)';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [isDark]);

  const PARTICLES = [
    { x:15, y:20, size:6,  delay:0,   color:'#E8A0BF' },
    { x:80, y:15, size:4,  delay:1.5, color:'#F5C842' },
    { x:70, y:75, size:8,  delay:0.8, color:'#B8A0E8' },
    { x:25, y:70, size:5,  delay:2.2, color:'#E8A0BF' },
    { x:90, y:50, size:3,  delay:1,   color:'#F5C842' },
    { x:50, y:10, size:4,  delay:3,   color:'#B8A0E8' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
      {/* Animated canvas grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

      {/* Floating orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full animate-glow-pulse"
          style={{ background:'radial-gradient(circle, rgba(232,160,191,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] rounded-full animate-glow-pulse-2"
          style={{ background:'radial-gradient(circle, rgba(245,200,66,0.10) 0%, transparent 70%)', animationDelay:'2s' }} />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full"
          style={{ background:'radial-gradient(circle, rgba(184,160,232,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p,i) => <Particle key={i} {...p} />)}

      {/* Decorative ring */}
      <div aria-hidden className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-rose/10 animate-spin-slow pointer-events-none hidden lg:block">
        <div className="absolute inset-6 rounded-full border border-gold/8 animate-spin-slow" style={{ animationDirection:'reverse', animationDuration:'8s' }} />
        <div className="absolute inset-12 rounded-full border border-lavender/10" />
        {/* Dot on ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rose animate-bounce-slow" style={{ boxShadow:'0 0 12px #E8A0BF' }} />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 pt-28">
        {/* Greeting */}
        <p className={`font-display font-medium mb-3 opacity-0 animate-fade-up delay-100 text-lg ${
          isDark ? 'text-white/40' : 'text-light-text/55'
        }`}>
          Hello, I'm
        </p>

        {/* Name */}
        <h1 className="font-display font-extrabold leading-none mb-5 opacity-0 animate-fade-up delay-300">
          <span className="block text-6xl md:text-8xl gradient-text-animate">
            Chetna
          </span>
          <span className={`block text-5xl md:text-7xl mt-1 ${isDark ? 'text-white/90' : 'text-light-text'}`}>
            Salunke
          </span>
        </h1>

        {/* Typewriter */}
        <div className="mb-8 h-10 opacity-0 animate-fade-up delay-400">
          <span className={`font-display text-xl md:text-2xl font-semibold ${isDark ? 'text-white/45' : 'text-black/45'}`}>
            {'// '}
          </span>
          <span className="font-display text-xl md:text-2xl font-semibold gradient-text">{role}</span>
          <span className="animate-blink text-rose ml-1 text-2xl">|</span>
        </div>

        {/* Badge - available for freelance */}
        <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium mb-7
          border opacity-0 animate-fade-up delay-500 ${
          isDark
            ? 'border-white/10 text-white/55 bg-white/5'
            : 'border-rose/20 bg-rose/5 text-rose/80'
        }`}>
          <span className="relative flex w-2.5 h-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-60" />
            <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-rose" />
          </span>
          Open to Freelance · Pune &amp; Remote
        </div>

        {/* Bio */}
        <p className={`max-w-lg text-base leading-relaxed mb-10 opacity-0 animate-fade-up delay-600 ${
          isDark ? 'text-white/45' : 'text-light-text/65'
        }`}>
          I craft beautiful, high-performance web experiences with React.js & TypeScript —
          and bring them to life from Figma to pixel-perfect code.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16 opacity-0 animate-fade-up delay-600">
          <a href="#projects" className="btn-primary">
            View My Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#contact" className={isDark ? 'btn-ghost-dark' : 'btn-ghost-light'}>Hire Me</a>
          <a href="https://github.com/chetna-salunke" target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              isDark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
            }`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="opacity-0 animate-fade-in delay-800 flex flex-col items-start gap-1">
          <span className={`text-xs tracking-[0.2em] uppercase font-medium ${isDark ? 'text-white/20' : 'text-light-text/35'}`}>Scroll</span>
          <div className="relative w-px h-16 overflow-hidden">
            <div className="absolute inset-0 w-full" style={{ background:'linear-gradient(#E8A0BF, transparent)', animation:'slideDown 1.5s ease infinite' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          0%   { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes float-slow {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
