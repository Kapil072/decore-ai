'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Shop',        id: 'shop',     href: '/shop' },
  { label: 'New In',      id: 'products', href: '' },
  { label: 'Lehengas',   id: 'products', href: '' },
  { label: 'Sarees',     id: 'products', href: '' },
  { label: 'Our Story',  id: 'about',    href: '' },
];

// Scroll to section with offset to account for fixed header
function scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const offset = 104; // announcement bar (40) + nav (64)
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navigation() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger scrolled check immediately and on scroll
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      try {
        const c = JSON.parse(localStorage.getItem('dc_cart') || '[]');
        setCartCount(c.reduce((s: number, i: { qty: number }) => s + (i.qty || 1), 0));
      } catch { setCartCount(0); }
    };
    update();
    window.addEventListener('storage', update);
    window.addEventListener('cart_update', update);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('cart_update', update);
    };
  }, []);

  useEffect(() => {
    if (!mobileRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(mobileRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [menuOpen]);

  const go = (link: typeof navLinks[0]) => {
    setMenuOpen(false);
    if (link.href) { window.location.href = link.href; return; }
    scrollTo(link.id);
  };

  const textColor = scrolled ? '#151515' : '#fff';
  const logoColor = scrolled ? '#A91D3A' : '#fff';

  return (
    <>
      {/* ─── Announcement Bar — fixed at top ─── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 600,
        background: '#A91D3A',
        height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <AnnouncementText />
      </div>

      {/* ─── Navigation — fixed below announcement bar ─── */}
      <nav
        style={{
          position: 'fixed',
          top: '40px',          /* exactly below announcement bar */
          left: 0, right: 0,
          zIndex: 500,
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(26,0,8,0.93)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid #E0E0E0' : '1px solid rgba(169,29,58,0.3)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: '64px', gap: 'clamp(12px, 3vw, 32px)' }}>
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', cursor: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src="/dor-creation-logo.png"
              alt="डोर Creation Logo"
              width={36}
              height={36}
              style={{ objectFit: 'contain', borderRadius: '6px' }}
              priority
            />
            <span className="nav-logo-text" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.25rem', fontWeight: 700,
              letterSpacing: '0.12em', color: logoColor,
              textTransform: 'uppercase', lineHeight: 1,
              transition: 'color 0.4s',
            }}>
              डोर <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.18em' }}>CREATION</span>
            </span>
          </a>

          {/* Desktop nav links — only show on md+ using a div that's flex on desktop */}
          <div id="desktop-nav-links" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '1.8rem' }}>
            {navLinks.map(l => (
              <button
                key={l.label}
                onClick={() => go(l)}
                style={{ background:'none', border:'none', cursor:'none', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', fontWeight:l.href?600:500, letterSpacing:'0.1em', textTransform:'uppercase', color:textColor, transition:'color 0.25s', padding:'4px 0', whiteSpace:'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#A91D3A')}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled ? '#151515' : '#fff')}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 16px)', flexShrink: 0 }}>
            {/* Wishlist */}
            <a href="/wishlist"
              style={{ background:'none', border:'none', cursor:'none', color:textColor, display:'flex', transition:'color 0.25s', textDecoration:'none' }}
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </a>

            {/* Search */}
            <button
              id="nav-search-btn"
              onClick={() => window.dispatchEvent(new CustomEvent('toggle_search'))}
              style={{ background: 'none', border: 'none', cursor: 'none', color: textColor, display: 'flex', transition: 'color 0.25s' }}
              aria-label="Search products"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Cart */}
            <button
              id="nav-cart-btn"
              onClick={() => window.dispatchEvent(new CustomEvent('toggle_cart'))}
              style={{ background: 'none', border: 'none', cursor: 'none', color: textColor, display: 'flex', position: 'relative', transition: 'color 0.25s' }}
              aria-label="Shopping cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  width: 16, height: 16, borderRadius: '50%',
                  background: '#A91D3A', color: '#fff',
                  fontSize: '0.55rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              id="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'none', color: textColor, display: 'none', transition: 'color 0.25s' }}
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile fullscreen menu ─── */}
      <div
        ref={mobileRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 490,
          background: '#1A0008',
          transform: 'translateX(100%)',
          display: 'flex', flexDirection: 'column',
          padding: '100px 32px 40px',
          gap: '0',
        }}
      >
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Image
            src="/dor-creation-logo.png"
            alt="डोर Creation Logo"
            width={40}
            height={40}
            style={{ objectFit: 'contain', borderRadius: '6px' }}
          />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#A91D3A', letterSpacing: '0.12em', fontWeight: 700 }}>
            डोर <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.18em' }}>CREATION</span>
          </span>
        </div>

        {navLinks.map(l => (
          <button
            key={l.label}
            onClick={() => go(l)}
            style={{
              background: 'none', border: 'none', textAlign: 'left', cursor: 'none',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 300, color: '#fff',
              padding: '10px 0', lineHeight: 1.1,
              borderBottom: '1px solid rgba(169,29,58,0.2)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#A91D3A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
          >
            {l.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="https://wa.me/917976521214" target="_blank" rel="noreferrer"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: '#fff', textDecoration: 'none', cursor: 'none' }}
          >
            📞 +91-7976521214 / +91-9039174549
          </a>
          <a href="https://www.instagram.com/dor_creation_indore" target="_blank" rel="noreferrer"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: '#C73659', textDecoration: 'none', cursor: 'none' }}
          >
            @dor_creation_indore
          </a>
        </div>
      </div>

      {/* ─── Responsive: hide desktop links on mobile ─── */}
      <style>{`
        @media (max-width: 768px) {
          #desktop-nav-links { display: none !important; }
          #nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ─── Rotating announcement messages ─── */
function AnnouncementText() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  const messages = [
    '📞 +91-7976521214  |  +91-9039174549',
    'Free Delivery on orders above ₹1,999 across India',
    'Custom stitching available — WhatsApp us for details',
    '📸 Follow us: @dor_creation_indore',
  ];

  useEffect(() => {
    const iv = setInterval(() => {
      if (!ref.current) return;
      ref.current.style.opacity = '0';
      ref.current.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        setIdx(i => (i + 1) % messages.length);
        if (ref.current) {
          ref.current.style.opacity = '1';
          ref.current.style.transform = 'translateY(0)';
        }
      }, 300);
    }, 4000);
    return () => clearInterval(iv);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={ref}
      className="announce-text"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.72rem', fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: '#fff',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {messages[idx]}
    </span>
  );
}
