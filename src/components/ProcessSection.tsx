'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const marqueeText = 'Handcrafted in India   ·   Artisan Made   ·   Free Delivery   ·   Custom Stitching   ·   Premium Ethnic Wear   ·   ';

const badges = [
  { n: 'Free Delivery',     d: 'On orders above ₹1,999' },
  { n: 'Easy Returns',      d: '7-day hassle free' },
  { n: 'WhatsApp Support',  d: 'Mon–Sun, 10am–9pm' },
  { n: 'Custom Stitching',  d: 'Tailored to you' },
  { n: 'Artisan Crafted',   d: 'By Indian masters' },
];

export default function ProcessSection() {
  const m1 = useRef<HTMLDivElement>(null);
  const m2 = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!m1.current || !m2.current) return;

    const tl1 = gsap.to(m1.current, { x: '-50%', duration: 28, ease: 'none', repeat: -1 });
    const tl2 = gsap.to(m2.current, { x: '0%',   duration: 34, ease: 'none', repeat: -1 });
    gsap.set(m2.current, { x: '-50%' });

    ScrollTrigger.create({
      trigger: sRef.current,
      start: 'top 80%', end: 'bottom 20%',
      onUpdate: self => {
        const spd = 1 + Math.abs(self.getVelocity()) / 2000;
        tl1.timeScale(spd); tl2.timeScale(spd);
      },
    });
    return () => { tl1.kill(); tl2.kill(); };
  }, []);

  return (
    <section ref={sRef} style={{ paddingBottom: 80 }}>
      {/* Marquee 1 — italic serif */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5',
        padding: '18px 0',
      }}>
        <div ref={m1} className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 300,
              color: '#000', paddingRight: '3rem', whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}>
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1px', background: '#E5E5E5',
        }}>
          {badges.map((b, idx) => {
            const bgs = ['#fff', '#FDF8F5', '#fff', '#FDF5F5', '#fff'];
            return (
              <div key={b.n} style={{
                background: bgs[idx % bgs.length], padding: '32px 24px',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.1rem', fontWeight: 500,
                  color: idx % 2 === 0 ? '#8B0000' : '#000',
                }}>
                  {b.n}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem', color: '#888', lineHeight: 1.5,
                }}>
                  {b.d}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee 2 — crimson bold strip */}
      <div style={{
        overflow: 'hidden',
        background: '#8B0000',
        padding: '16px 0',
      }}>
        <div ref={m2} className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.65rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.85)', letterSpacing: '0.3em',
              textTransform: 'uppercase', paddingRight: '4rem',
              whiteSpace: 'nowrap',
            }}>
              {marqueeText.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
