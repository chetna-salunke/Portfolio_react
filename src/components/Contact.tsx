import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setContactFormStatus } from '../store/slices/portfolioSlice';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';

interface FormData { name:string; email:string; subject:string; message:string; }
const INIT: FormData = { name:'', email:'', subject:'', message:'' };

const validate = (d: FormData) => {
  if (!d.name.trim())               return 'Please enter your name.';
  if (!d.email.includes('@'))       return 'Please enter a valid email.';
  if (!d.subject.trim())            return 'Please enter a subject.';
  if (d.message.trim().length < 10) return 'Message should be at least 10 characters.';
  return null;
};

const Contact: React.FC = () => {
  const dispatch = useAppDispatch();
  const { contactFormStatus } = useAppSelector(s => s.portfolio);
  const theme = useAppSelector(s => s.portfolio.theme);
  const isDark = theme === 'dark';
  const [form, setForm] = useState<FormData>(INIT);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const err = validate(form);
    if (err) { toast.error(err); return; }
    dispatch(setContactFormStatus('sending'));
    await new Promise(r => setTimeout(r, 1600));
    dispatch(setContactFormStatus('success'));
    setForm(INIT);
    toast.success("Message sent! I'll get back to you soon 🌸", {
      style: { background: isDark ? '#13131F' : '#fff', color: isDark ? '#F0ECF8' : '#1A1025', border:`1px solid rgba(232,160,191,0.2)` },
    });
    setTimeout(() => dispatch(setContactFormStatus('idle')), 3000);
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full"
        style={{ background:'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)' }} />

      <div ref={ref}>
        <p className="section-label">Let's Talk</p>
        <h2 className={isDark ? 'section-title-dark' : 'section-title-light'}>Get In Touch</h2>
        <div className="section-line" />

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className={`text-base leading-loose mb-10 ${isDark ? 'text-white/50' : 'text-light-text/65'}`}>
              Have a project in mind? Want to collaborate on a design or build something beautiful together?
              I'd love to hear from you — let's create something amazing.
            </p>

            <div className="space-y-6">
              {[
                { icon:'📧', label:'Email',    val:'chetnasalunke.dev@gmail.com',             href:'mailto:chetnasalunke.dev@gmail.com' },
                { icon:'📍', label:'Location', val:'Pune, Maharashtra, India',                 href:'' },
                { icon:'💼', label:'LinkedIn', val:'linkedin.com/in/chetna-salunke',           href:'https://linkedin.com/in/chetna-salunke-16471523b' },
                { icon:'🐙', label:'GitHub',   val:'github.com/chetna-salunke',                href:'https://github.com/chetna-salunke' },
                { icon:'🎨', label:'Figma',    val:'figma.com/@chetna_dev',                href:'https://www.figma.com/@chetna_dev' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background:'linear-gradient(135deg,rgba(232,160,191,0.15),rgba(245,200,66,0.10))', border:'1px solid rgba(232,160,191,0.15)' }}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <p className={`text-xs uppercase tracking-wider font-semibold mb-0.5 ${isDark ? 'text-white/25' : 'text-light-text/40'}`}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className={`text-sm font-medium transition-colors duration-200 ${isDark ? 'text-white/65 hover:text-rose' : 'text-black/65 hover:text-rose'}`}>
                        {item.val}
                      </a>
                    ) : (
                      <p className={`text-sm font-medium ${isDark ? 'text-white/65' : 'text-light-text/75'}`}>{item.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
              style={{ background:'rgba(100,200,150,0.08)', borderColor:'rgba(100,200,150,0.2)' }}>
              <span className="relative flex w-2.5 h-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-green-400" />
              </span>
              <span className="text-sm font-semibold" style={{ color:'#64C896' }}>Available for Freelance Projects</span>
            </div>
          </div>

          {/* Form */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className={`rounded-2xl border p-8 ${isDark ? 'card-dark border-white/5' : 'card-light border-black/10'}`}>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/40' : 'text-light-text/55'}`}>Name *</label>
                    <input name="name" type="text" value={form.name} onChange={handleChange}
                      placeholder="Your name" className={isDark ? 'input-dark' : 'input-light'} />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/40' : 'text-light-text/55'}`}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com" className={isDark ? 'input-dark' : 'input-light'} />
                  </div>
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/40' : 'text-light-text/55'}`}>Subject *</label>
                  <input name="subject" type="text" value={form.subject} onChange={handleChange}
                    placeholder="Freelance project / Collaboration..." className={isDark ? 'input-dark' : 'input-light'} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/40' : 'text-light-text/55'}`}>Message *</label>
                  <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    className={`${isDark ? 'input-dark' : 'input-light'} resize-none`} />
                </div>

                <button onClick={handleSubmit} disabled={contactFormStatus === 'sending'}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                  {contactFormStatus === 'sending' ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>Sending...</>
                  ) : (
                    <>Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
