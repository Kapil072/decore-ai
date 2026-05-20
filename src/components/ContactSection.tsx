'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name}.%0A%0A${form.message}%0A%0APhone: ${form.phone}%0AEmail: ${form.email}`;
    window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: '#fff', borderTop: '1px solid #EDD8CC' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '600px' }}>
        {/* Left — crimson info panel */}
        <motion.div
          data-dark
          style={{
            background: 'linear-gradient(160deg, #2A0010 0%, #5C1525 40%, #A91D3A 100%)',
            padding: 'clamp(40px,7vw,80px)',
            display: 'flex', flexDirection: 'column', gap: '40px',
            justifyContent: 'center', position: 'relative', overflow: 'hidden',
          }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          {/* Glow accent */}
          <div style={{
            position: 'absolute', bottom: -40, right: -40, width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(232,73,106,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div>
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '16px' }}>Contact</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300, color: '#fff', lineHeight: 1.0,
            }}>
              Let&apos;s Create<br />
              <em style={{ fontStyle: 'italic' }}>Something Beautiful</em>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { l: 'WhatsApp', v: '+91-7976521214 / +91-9039174549' },
              { l: 'Email',    v: 'dor_creation_indore' },
              { l: 'Hours',    v: 'Mon–Sun, 10am–9pm IST' },
            ].map(c => (
              <div key={c.l} style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '20px' }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '4px' }}>{c.l}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", color: '#fff', fontSize: '0.95rem', fontWeight: 300 }}>{c.v}</p>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/917976521214"
            target="_blank" rel="noreferrer"
            className="text-link text-link-inv"
            style={{ alignSelf: 'flex-start' }}
          >
            Chat on WhatsApp →
          </a>
        </motion.div>

        {/* Right — form on warm cream background */}
        <motion.div
          style={{ padding: 'clamp(40px,7vw,80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#FDF8F5' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          {!sent ? (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B0000', marginBottom: '8px' }}>Name</label>
                  <input type="text" required placeholder="Your name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B0000', marginBottom: '8px' }}>Phone</label>
                  <input type="tel" placeholder="+91 XXXXX" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="form-input" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B0000', marginBottom: '8px' }}>Email</label>
                <input type="email" placeholder="your@email.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="form-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B0000', marginBottom: '8px' }}>Message</label>
                <textarea rows={4} required placeholder="Tell us about your order, sizing, custom requirements..." value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="form-input" />
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button type="submit" style={{
                  flex: 1, background: '#A91D3A', color: '#fff', border: 'none',
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem',
                  fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '14px 32px', cursor: 'none', transition: 'background 0.25s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#C73659')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#A91D3A')}
                >
                  Send Message
                </button>
                <a href="https://wa.me/917976521214" target="_blank" rel="noreferrer"
                  className="btn-secondary" style={{ padding: '13px 20px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '40px 0' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, color: '#000' }}>
                Thank You
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: '#888', lineHeight: 1.7 }}>
                Your message has been sent via WhatsApp. We&apos;ll respond within 2 hours.
              </p>
              <button onClick={() => setSent(false)} className="btn-secondary" style={{ marginTop: '8px' }}>
                Send Another
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
