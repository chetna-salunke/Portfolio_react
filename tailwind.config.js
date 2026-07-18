/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        // DARK MODE — deep midnight with warm rose/gold accents
        primary:  { DEFAULT: '#E8A0BF', dark: '#D4789F', light: '#F0BDD3' },  // soft rose
        accent:   { DEFAULT: '#F5C842', dark: '#D4A800', light: '#FFE082' },   // warm gold
        dark: {
          bg:    '#0C0C14',   // deep midnight
          card:  '#13131F',   // card surface
          nav:   '#0A0A12',
          muted: '#1C1C2E',
        },
        // LIGHT MODE — creamy warm white with blush
        light: {
          bg:   '#F4F0EC',   // warm stone — clearly different from white cards
          card: '#FFFFFF',
          text: '#1C1128',   // deep aubergine — not pure black
          muted:'#EDE8E2',
          border:'#3B2A52',
        },
        'dark-text':  '#F0ECF8',
        'light-text': '#1C1128',
        rose: '#E8A0BF',
        gold: '#F5C842',
        lavender: '#B8A0E8',
      },
      animation: {
        'fade-up':       'fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':       'fadeIn 0.6s ease forwards',
        'fade-left':     'fadeLeft 0.75s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-right':    'fadeRight 0.75s cubic-bezier(0.22,1,0.36,1) forwards',
        'blink':         'blink 1.1s step-end infinite',
        'float':         'float 7s ease-in-out infinite',
        'float-slow':    'float 10s ease-in-out infinite',
        'glow-pulse':    'glowPulse 4s ease-in-out infinite',
        'glow-pulse-2':  'glowPulse 5s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'spin-slow':     'spin 12s linear infinite',
        'bounce-slow':   'bounceSlow 3s ease-in-out infinite',
        'slide-up':      'slideUp 0.5s ease forwards',
        'marquee':       'marquee 20s linear infinite',
      },
      keyframes: {
        fadeUp:     { '0%': { opacity:'0', transform:'translateY(40px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        fadeIn:     { '0%': { opacity:'0' }, '100%': { opacity:'1' } },
        fadeLeft:   { '0%': { opacity:'0', transform:'translateX(-40px)' }, '100%': { opacity:'1', transform:'translateX(0)' } },
        fadeRight:  { '0%': { opacity:'0', transform:'translateX(40px)' }, '100%': { opacity:'1', transform:'translateX(0)' } },
        blink:      { '0%,100%': { opacity:'1' }, '50%': { opacity:'0' } },
        float:      { '0%,100%': { transform:'translateY(0px) rotate(0deg)' }, '50%': { transform:'translateY(-18px) rotate(2deg)' } },
        glowPulse:  { '0%,100%': { opacity:'0.3', transform:'scale(1)' }, '50%': { opacity:'0.7', transform:'scale(1.08)' } },
        shimmer:    { '0%': { backgroundPosition:'-200% center' }, '100%': { backgroundPosition:'200% center' } },
        bounceSlow: { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-8px)' } },
        slideUp:    { '0%': { opacity:'0', transform:'translateY(16px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        marquee:    { '0%': { transform:'translateX(0%)' }, '100%': { transform:'translateX(-50%)' } },
      },
      backgroundImage: {
        'gradient-rose-gold': 'linear-gradient(135deg, #E8A0BF 0%, #F5C842 100%)',
        'gradient-dark-card': 'linear-gradient(135deg, #13131F 0%, #1A1A2E 100%)',
        'gradient-mesh':      'radial-gradient(at 40% 20%, #E8A0BF22 0px, transparent 50%), radial-gradient(at 80% 0%, #F5C84222 0px, transparent 50%), radial-gradient(at 0% 50%, #B8A0E822 0px, transparent 50%)',
      },
      boxShadow: {
        'rose':     '0 0 40px rgba(232,160,191,0.25)',
        'gold':     '0 0 40px rgba(245,200,66,0.2)',
        'card-dark':'0 4px 32px rgba(0,0,0,0.5)',
        'glow-rose':'0 0 60px rgba(232,160,191,0.15)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
