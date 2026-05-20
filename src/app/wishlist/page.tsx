'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';

function ProductArt({ bgColor, icon }: { bgColor: string; icon: string }) {
  return (
    <div style={{ width:'100%', height:'100%', background:`linear-gradient(160deg,${bgColor}cc,${bgColor}44)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(0,0,0,0.015) 3px,rgba(0,0,0,0.015) 6px)` }}/>
      <span style={{ fontSize:'5rem', opacity:0.12, userSelect:'none' }}>{icon}</span>
    </div>
  );
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedId, setAddedId] = useState<string|null>(null);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem('dc_wishlist') || '[]'));
  }, []);

  const remove = (id: string) => {
    const newW = wishlist.filter(x => x !== id);
    localStorage.setItem('dc_wishlist', JSON.stringify(newW));
    setWishlist(newW);
  };

  const addToCart = (p: typeof products[0]) => {
    const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
    const idx = cart.findIndex((i: {id:string}) => i.id === p.id);
    if (idx > -1) cart[idx].qty += 1; else cart.push({ ...p, qty: 1 });
    localStorage.setItem('dc_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart_update'));
    window.dispatchEvent(new CustomEvent('toggle_cart'));
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const wishlisted = products.filter(p => wishlist.includes(p.id));

  return (
    <div style={{ paddingTop:104, minHeight:'100vh', background:'#fff' }}>
      <div className="page-hero" style={{ background:'linear-gradient(160deg,#1A0008,#A91D3A)', padding:'48px 32px', textAlign:'center' }}>
        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.68rem', color:'rgba(255,255,255,0.6)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:8 }}>My Collection</p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4.5rem)', fontWeight:300, color:'#fff', margin:0 }}>Wishlist</h1>
        <p style={{ fontFamily:"'Inter',sans-serif", color:'rgba(255,255,255,0.6)', marginTop:12, fontSize:'0.9rem' }}>{wishlisted.length} saved item{wishlisted.length !== 1 ? 's':''}</p>
      </div>

      <div className="container" style={{ paddingTop:48, paddingBottom:80 }}>
        {wishlisted.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <div style={{ fontSize:'4rem', marginBottom:16, opacity:0.3 }}>♡</div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:300, color:'#888', marginBottom:8 }}>Your wishlist is empty</p>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.85rem', color:'#aaa', marginBottom:24 }}>Save items you love to revisit them later</p>
            <Link href="/shop" style={{ display:'inline-block', background:'#A91D3A', color:'#fff', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', padding:'14px 32px', textDecoration:'none' }}>
              Browse Collection
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.85rem', color:'#888' }}>{wishlisted.length} items</p>
              <button onClick={() => { localStorage.setItem('dc_wishlist','[]'); setWishlist([]); }}
                style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.7rem', color:'#888', background:'none', border:'1px solid #E0E0E0', padding:'8px 16px', cursor:'none', letterSpacing:'0.08em' }}>
                Clear All
              </button>
            </div>
            <div className="wishlist-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'#E0E0E0' }}>
              {wishlisted.map(p => {
                const disc = p.originalPrice ? Math.round(((p.originalPrice-p.price)/p.originalPrice)*100):0;
                return (
                  <div key={p.id} style={{ background:'#fff', position:'relative' }}>
                    <Link href={`/product/${p.slug}`} style={{ textDecoration:'none', display:'block' }}>
                      <div style={{ aspectRatio:'3/4', overflow:'hidden', position:'relative' }}>
                        <ProductArt bgColor={p.bgColor} icon={p.icon} />
                        {disc>0 && <div style={{ position:'absolute', top:12, left:12, background:'#2E7D32', color:'#fff', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.58rem', fontWeight:600, padding:'3px 8px' }}>{disc}% OFF</div>}
                      </div>
                      <div style={{ padding:'12px 14px' }}>
                        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.58rem', color:'#A91D3A', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>{p.fabric}</p>
                        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#151515', lineHeight:1.3, marginBottom:6 }}>{p.name}</p>
                        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.85rem', fontWeight:500 }}>₹{p.price.toLocaleString('en-IN')}</span>
                          {p.originalPrice && <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', color:'#bbb', textDecoration:'line-through' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>}
                        </div>
                      </div>
                    </Link>
                    {/* Remove wishlist */}
                    <button onClick={() => remove(p.id)}
                      style={{ position:'absolute', top:10, right:10, background:'rgba(255,255,255,0.9)', border:'none', width:30, height:30, borderRadius:'50%', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#A91D3A" stroke="#A91D3A" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                    {/* Add to cart */}
                    <button onClick={() => addToCart(p)}
                      style={{ position:'absolute', bottom:0, left:0, right:0, background:addedId===p.id?'#2E7D32':'#151515', color:'#fff', border:'none', padding:'10px', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', cursor:'none', transition:'background 0.2s', opacity:0 }}
                      className="quick-add-btn">
                      {addedId===p.id?'✓ Added':'+ Move to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <style>{`div:hover > .quick-add-btn { opacity: 1 !important; }`}</style>
    </div>
  );
}
