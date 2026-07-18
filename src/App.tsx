import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setActiveSection } from './store/slices/portfolioSlice';
import { ToastContainer } from 'react-toastify';

import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import About    from './components/About';
import Projects from './components/Projects';
import Designs  from './components/Designs';
import Skills   from './components/Skills';
import Contact  from './components/Contact';
import Footer   from './components/Footer';

const SECTIONS = ['home','about','projects','designs','skills','contact'];

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme    = useAppSelector(s => s.portfolio.theme);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) dispatch(setActiveSection(e.target.id)); }),
      { threshold: 0.3 }
    );
    SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [dispatch]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    html.classList.toggle('light', theme === 'light');
    // Force body bg color immediately
    document.body.style.backgroundColor = theme === 'dark' ? '#0C0C14' : '#F4F0EC';
    document.body.style.color = theme === 'dark' ? '#F0ECF8' : '#1A1025';
  }, [theme]);

  return (
    <div style={{ minHeight:'100vh', backgroundColor: theme === 'dark' ? '#0C0C14' : '#F4F0EC' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Designs />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        theme={theme}
        toastStyle={{ borderRadius:'14px', fontFamily:'DM Sans, sans-serif', fontSize:'14px' }}
      />
    </div>
  );
};

export default App;
