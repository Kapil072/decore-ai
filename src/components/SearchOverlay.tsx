'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

function addToCart(p: (typeof products)[0]) {
  try {
    const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
    const idx = cart.findIndex((i: { id: string }) => i.id === p.id);
    if (idx > -1) cart[idx].qty += 1;
    else cart.push({ ...p, qty: 1 });
    localStorage.setItem('dc_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart_update'));
    window.dispatchEvent(new CustomEvent('toggle_cart'));
  } catch (e) { console.error(e); }
}

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim().length === 0
    ? products.slice(0, 6)
    : products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        (p.tag && p.tag.toLowerCase().includes(query.toLowerCase()))
      );

  useEffect(() => {
    const toggle = () => setOpen(o => !o);
    window.addEventListener('toggle_search', toggle);
    return () => window.removeEventListener('toggle_search', toggle);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    if (!open) setQuery('');
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: 24, right: 32,
              background: 'none', border: 'none', cursor: 'none',
              color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem',
              fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em',
              textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px',
            }}
            aria-label="Close search"
          >
            <span>ESC</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Search input */}
          <div className="search-input-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A91D3A" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              placeholder="Search kurtas, lehengas, sarees…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>

          {/* Label */}
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            marginBottom: '20px',
          }}>
            {query.trim() ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"` : 'Popular products'}
          </p>

          {/* Results */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                  No results found
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>
                  Try &quot;lehenga&quot;, &quot;silk&quot;, or &quot;kurta&quot;
                </p>
              </div>
            ) : (
              filtered.map(p => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="search-result-card"
                  onClick={() => setOpen(false)}
                  style={{ textDecoration: 'none' }}
                >
                  {/* Thumb */}
                  <div style={{
                    width: 60, height: 75, flexShrink: 0,
                    background: 'rgba(169,29,58,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.6rem', color: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(169,29,58,0.3)',
                    borderRadius: '2px',
                  }}>
                    {p.icon}
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.6rem', letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: '#A91D3A', marginBottom: '4px',
                    }}>
                      {p.fabric}
                    </p>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.1rem', fontWeight: 400,
                      color: '#fff', lineHeight: 1.2,
                    }}>
                      {p.name}
                    </p>
                    <p style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.82rem', color: '#C73659',
                      fontWeight: 500, marginTop: '4px',
                    }}>
                      ₹{p.price.toLocaleString('en-IN')}
                      {p.originalPrice && (
                        <span style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through', marginLeft: '8px', fontSize: '0.72rem' }}>
                          ₹{p.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </p>
                  </div>
                  {/* Add to cart quick */}
                  <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(p); setOpen(false); }}
                    style={{
                      background: '#A91D3A', color: '#fff', border: 'none',
                      padding: '8px 16px', cursor: 'none',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                      flexShrink: 0,
                    }}
                  >
                    Add
                  </button>
                </Link>
              ))
            )}
          </div>

          {/* Keyboard hint */}
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.08em', marginTop: '20px', textAlign: 'center',
          }}>
            Press ⌘K to open search anytime
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
