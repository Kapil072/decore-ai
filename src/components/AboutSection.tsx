'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/data/products';

export default function AboutSection() {
  return (
    <section id="about" style={{ background: '#fff' }}>

      {/* Brand story — full-width Zara-style editorial */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh',
      }}>
        {/* Left: editorial maroon block */}
        <motion.div
          data-dark
          style={{
            background: 'linear-gradient(145deg, #4A0010 0%, #6B0F1A 60%, #8B0000 100%)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: 'clamp(40px,7vw,80px)',
            position: 'relative', overflow: 'hidden',
          }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
        >
          {/* Subtle pattern overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(232,73,106,0.12) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Our Story</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300, color: '#fff', lineHeight: 1.0,
            marginBottom: '32px',
          }}>
            Crafting India&apos;s<br />
            <em style={{ fontStyle: 'italic' }}>Heritage in<br />Every Thread</em>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '0.92rem', maxWidth: '400px', marginBottom: '24px' }}>
            Born from a deep love for Indian craftsmanship, Dorcreation was founded to bring authentic handcrafted ethnic wear to every doorstep in India.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '0.92rem', maxWidth: '400px', marginBottom: '40px' }}>
            Every piece in our collection is carefully curated from artisan workshops — from Chikankari embroiderers of Lucknow to Banarasi silk weavers of Varanasi.
          </p>

          <div className="about-stats" style={{ display: 'flex', gap: '40px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {[['500+','Styles'], ['10K+','Customers'], ['50+','Artisan Partners']].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300, color: '#E8496A', margin: 0 }}>{v}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: fabric grid — richer, more colorful editorial tones */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#E5E5E5' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
        >
          {[
            { bg: '#F2D4D7', label: 'Chanderi Silk' },
            { bg: '#C8B4A0', label: 'Banarasi' },
            { bg: '#D4C5E2', label: 'Mulmul Cotton' },
            { bg: '#8B0000', label: 'Georgette', light: true },
            { bg: '#C41E3A', label: 'Kanjivaram', light: true },
            { bg: '#F5E6D0', label: 'Raw Silk' },
            { bg: '#B8D4C8', label: 'Net Fabric' },
            { bg: '#E8D5A3', label: 'Jacquard' },
            { bg: '#2C1810', label: 'Chiffon', light: true },
          ].map(({ bg, label, light }, i) => (
            <div key={i} style={{
              background: bg, display: 'flex',
              alignItems: 'flex-end', padding: '12px',
              aspectRatio: '1', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `repeating-linear-gradient(
                  45deg, transparent, transparent 3px,
                  rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 6px
                )`,
              }} />
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.58rem', letterSpacing: '0.1em',
                color: light ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.5)',
                textTransform: 'uppercase', position: 'relative',
              }}>
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials */}
      <div style={{ borderTop: '1px solid #EDD8CC', padding: '80px 0', background: '#FDF8F5' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '8px', color: '#C41E3A' }}>Customer Stories</p>
              <h2 className="section-title">
                What they<br /><em style={{ fontStyle: 'italic' }}>say about us</em>
              </h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px', background: '#EDD8CC',
          }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                style={{ background: '#fff', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <span key={si} style={{ color: '#C41E3A', fontSize: '0.8rem' }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.6, color: '#111', fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>
                  {t.product}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F5EAE6' }}>
                  <div style={{
                    width: 32, height: 32, background: '#8B0000', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    color: '#fff', fontSize: '0.8rem',
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#000', fontSize: '0.82rem', margin: 0 }}>{t.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", color: '#888', fontSize: '0.72rem', margin: 0 }}>{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
