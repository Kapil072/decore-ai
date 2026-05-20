'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Product } from '@/data/products';

interface CartItem extends Product { qty: number; selectedSize?: string; }

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open(): void };
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

export default function CartDrawer() {
  const [open,    setOpen]    = useState(false);
  const [cart,    setCart]    = useState<CartItem[]>([]);
  const [paying,  setPaying]  = useState(false);
  const [payDone, setPayDone] = useState<string | null>(null);

  useEffect(() => {
    const toggle = () => setOpen(o => !o);
    const update = () => {
      try { setCart(JSON.parse(localStorage.getItem('dc_cart') || '[]')); }
      catch { setCart([]); }
    };
    window.addEventListener('toggle_cart', toggle);
    window.addEventListener('cart_update', update);
    update();
    return () => {
      window.removeEventListener('toggle_cart', toggle);
      window.removeEventListener('cart_update', update);
    };
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const upd = (id: string, d: number) => {
    const u = cart.map(i => i.id === id ? { ...i, qty: i.qty + d } : i).filter(i => i.qty > 0);
    setCart(u); localStorage.setItem('dc_cart', JSON.stringify(u));
    window.dispatchEvent(new CustomEvent('cart_update'));
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const waMsg = () => {
    const lines = cart.map(i => `• ${i.name} × ${i.qty} = ₹${(i.price * i.qty).toLocaleString('en-IN')}`).join('%0A');
    return `https://wa.me/917976521214?text=Hi%2C+I%27d+like+to+order%3A%0A%0A${lines}%0A%0ATotal%3A+%E2%82%B9${total.toLocaleString('en-IN')}`;
  };

  // Load Razorpay script dynamically
  const loadRazorpay = (): Promise<boolean> => {
    return new Promise(resolve => {
      if (typeof window.Razorpay !== 'undefined') { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async () => {
    setPaying(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) { alert('Payment gateway failed to load. Please try WhatsApp order.'); setPaying(false); return; }

      // Create order via API
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, cart }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Could not create payment order. Please try WhatsApp.');
        setPaying(false); return;
      }

      const data = await res.json();

      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'Dorcreation',
        description: `Order of ${count} item${count !== 1 ? 's' : ''}`,
        order_id: data.orderId,
        handler: async (response) => {
          // Verify payment
          const vRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          if (vRes.ok) {
            localStorage.removeItem('dc_cart');
            window.dispatchEvent(new CustomEvent('cart_update'));
            setCart([]);
            setPayDone(response.razorpay_payment_id);
          } else {
            alert('Payment verification failed. Please contact us via WhatsApp with your payment ID: ' + response.razorpay_payment_id);
          }
          setPaying(false);
        },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#A91D3A' },
        modal: { ondismiss: () => setPaying(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Razorpay error', err);
      alert('Something went wrong. Please try WhatsApp ordering.');
      setPaying(false);
    }
  };

  const W = typeof window !== 'undefined' ? Math.min(420, window.innerWidth) : 420;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.4)' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div key="drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: W,
              background: '#fff', borderLeft: '1px solid #E0E0E0',
              zIndex: 700, display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Accent strip */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #7A0020, #A91D3A, #C73659)' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, margin: 0 }}>
                  Shopping Bag
                </h2>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.65rem', color: '#888', letterSpacing: '0.08em', margin: '2px 0 0' }}>
                  {count} Item{count !== 1 ? 's' : ''}
                </p>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'none', color: '#888', lineHeight: 1 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Payment success state */}
            {payDone ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#A91D3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300 }}>Payment Successful!</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>
                  Thank you for your order. We will contact you shortly.<br/>
                  <strong style={{ color: '#A91D3A' }}>Payment ID: {payDone.slice(0, 16)}…</strong>
                </p>
                <button onClick={() => { setPayDone(null); setOpen(false); }} className="btn-primary" style={{ marginTop: '8px' }}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
                  {cart.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem', opacity: 0.2 }}>🛍️</div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#888' }}>
                        Your bag is empty
                      </p>
                      <button onClick={() => setOpen(false)} className="btn-primary" style={{ fontSize: '0.72rem', padding: '11px 24px' }}>
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {cart.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderBottom: '1px solid #F0F0F0' }}>
                          <div style={{
                            width: 72, height: 90, flexShrink: 0,
                            background: '#F2F0EC', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.8rem', color: 'rgba(0,0,0,0.12)',
                            border: '1px solid #E5E5E5',
                          }}>
                            {item.icon}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, color: '#151515', marginBottom: '2px' }}>
                              {item.name}
                            </p>
                            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', color: '#888', letterSpacing: '0.06em', marginBottom: '12px' }}>
                              {item.fabric}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #E0E0E0' }}>
                                <button onClick={() => upd(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'none', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: '#A91D3A' }}>−</button>
                                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.82rem', minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                                <button onClick={() => upd(item.id, +1)} style={{ background: 'none', border: 'none', cursor: 'none', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: '#A91D3A' }}>+</button>
                              </div>
                              <span className="price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div style={{ padding: '20px 24px', borderTop: '1px solid #E0E0E0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>Subtotal</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400 }}>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    {total >= 1999 && (
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', color: '#A91D3A', letterSpacing: '0.05em', marginBottom: '16px' }}>
                        ✓ Free delivery applied
                      </p>
                    )}

                    {/* Razorpay Pay Online */}
                    <button
                      onClick={handleRazorpay}
                      disabled={paying}
                      style={{
                        display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '8px',
                        marginBottom: '10px', padding: '14px',
                        background: paying ? '#888' : '#A91D3A', color: '#fff', border: 'none',
                        fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem',
                        fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
                        cursor: paying ? 'not-allowed' : 'none', transition: 'background 0.2s',
                      }}
                    >
                      {paying ? (
                        <>Processing…</>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                          </svg>
                          Pay Online — ₹{total.toLocaleString('en-IN')}
                        </>
                      )}
                    </button>

                    {/* WhatsApp fallback */}
                    <a href={waMsg()} target="_blank" rel="noreferrer"
                      style={{
                        display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '8px',
                        padding: '12px',
                        background: '#25D366', color: '#fff', border: 'none',
                        fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem',
                        fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                        textDecoration: 'none',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Order via WhatsApp
                    </a>

                    {total < 1999 && (
                      <p style={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', color: '#888', letterSpacing: '0.04em', marginTop: '8px' }}>
                        Add ₹{(1999 - total).toLocaleString('en-IN')} more for free delivery
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
