'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-h]', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 1.1,
        ease: 'power3.out', delay: 0.15,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: '100vh', display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Left — crimson panel with headline */}
      <div
        data-dark
        style={{
          background: 'linear-gradient(160deg, #1A0008 0%, #2D0015 40%, #5C1525 75%, #A91D3A 100%)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: 'clamp(40px, 6vw, 80px)',
          paddingTop: '80px', position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Brand vertical accent bar */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
          background: 'linear-gradient(180deg, #7A0020 0%, #A91D3A 50%, transparent 100%)',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div data-h style={{ overflow: 'hidden' }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.25em', color: '#C73659',
              textTransform: 'uppercase', marginBottom: '0',
            }}>
              New Collection — 2025
            </p>
          </div>

          <div data-h>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 300, lineHeight: 0.95,
              color: '#fff', letterSpacing: '-0.01em',
            }}>
              The Art<br />
              <em style={{ fontStyle: 'italic' }}>of Indian</em><br />
              Craft
            </h1>
          </div>

          <div data-h>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem', fontWeight: 300,
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
              maxWidth: '360px',
            }}>
              Premium ethnic wear curated from India&apos;s finest artisan workshops. Handcrafted, authentic, timeless.
            </p>
          </div>

          <div data-h style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary-inv"
            >
              Shop Now
            </button>
            <button
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.7)',
                padding: '13px 28px', cursor: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              Our Story
            </button>
          </div>

          {/* Stats row */}
          <div data-h className="hero-stats" style={{ display: 'flex', gap: '32px', paddingTop: '16px', borderTop: '1px solid rgba(169,29,58,0.3)' }}>
            {[['500+','Styles'],['10K+','Customers'],['50+','Artisans']].map(([val, label]) => (
              <div key={label}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: '#C73659', margin: 0 }}>{val}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — editorial garment visual */}
      <div
        style={{
          background: '#F5F0EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden', minHeight: '100vh',
          borderLeft: '1px solid #DDD0CC',
        }}
      >
        {/* Abstract garment editorial art */}
        <div data-h style={{
          position: 'relative', width: '55%', maxWidth: 320,
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {/* Main garment rectangle — editorial style */}
          <div style={{
            width: '100%', aspectRatio: '2/3',
            background: '#E8E4DD',
            border: '1px solid #D0CBC0',
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Fabric texture simulation */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent, transparent 2px,
                rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px
              )`,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent, transparent 4px,
                rgba(0,0,0,0.01) 4px, rgba(0,0,0,0.01) 8px
              )`,
            }} />
            {/* Embroidery motif center */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 80, height: 80,
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 48, height: 48,
                border: '1px solid rgba(169,29,58,0.2)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 16, height: 16, background: '#A91D3A', borderRadius: '50%', opacity: 0.7 }} />
              </div>
            </div>
            {/* Neckline */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 80, height: 40,
              border: '1px solid rgba(0,0,0,0.1)', borderTop: 'none',
              borderRadius: '0 0 50% 50%',
            }} />
            {/* Bottom border embroidery */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
              borderTop: '1px solid rgba(0,0,0,0.08)',
              background: 'rgba(0,0,0,0.02)',
            }} />
          </div>

          {/* Product label card */}
          <div style={{
            background: '#fff', padding: '16px 20px',
            border: '1px solid #E5E5E5', borderTop: 'none',
          }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, margin: 0 }}>
              Handwoven Silk Kurta Set
            </p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', color: '#888', margin: '4px 0 0', letterSpacing: '0.05em' }}>
              Pure Chanderi Silk · Handwoven
            </p>
          </div>
        </div>

        {/* Floating label top-right */}
        <div style={{
          position: 'absolute', top: 40, right: 32,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px',
        }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase' }}>
            Collection
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, color: '#111' }}>
            Summer&apos;25
          </p>
        </div>

        {/* Bottom scroll hint */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <div style={{
            width: 1, height: 48,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3), transparent)',
            animation: 'scrollHint 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @keyframes scrollHint {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
        }
        @media (max-width: 768px) {
          #hero { grid-template-columns: 1fr !important; min-height: auto !important; }
          #hero > div:first-child { min-height: 70vh; padding-top: 24px !important; }
          #hero > div:last-child { min-height: 50vw !important; border-left: none !important; }
        }
      `}</style>
    </section>
  );
}
