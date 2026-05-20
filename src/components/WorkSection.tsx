'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories, type Product } from '@/data/products';

function ProductArt({ bgColor, icon }: { bgColor: string; icon: string }) {
  return (
    <div style={{ width:'100%', height:'100%', background:`linear-gradient(160deg,${bgColor}cc 0%,${bgColor}44 100%)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(0,0,0,0.015) 3px,rgba(0,0,0,0.015) 6px)` }}/>
      <span style={{ fontSize:'5rem', opacity:0.12, userSelect:'none', pointerEvents:'none' }}>{icon}</span>
    </div>
  );
}

function addToCartLocal(p: Product) {
  const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
  const idx = cart.findIndex((i: {id:string}) => i.id === p.id);
  if (idx > -1) cart[idx].qty += 1; else cart.push({ ...p, qty: 1 });
  localStorage.setItem('dc_cart', JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart_update'));
  window.dispatchEvent(new CustomEvent('toggle_cart'));
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

  useEffect(() => {
    const w = JSON.parse(localStorage.getItem('dc_wishlist') || '[]');
    setWishlisted(w.includes(p.id));
  }, [p.id]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCartLocal(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const w = JSON.parse(localStorage.getItem('dc_wishlist') || '[]');
    const newW = wishlisted ? w.filter((x: string) => x !== p.id) : [...w, p.id];
    localStorage.setItem('dc_wishlist', JSON.stringify(newW));
    setWishlisted(!wishlisted);
  };

  return (
    <motion.div
      style={{ background:'#fff', position:'relative' }}
      initial={{ opacity:0 }} whileInView={{ opacity:1 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.5, delay:(index%4)*0.06 }}
    >
      <Link href={`/product/${p.slug}`} style={{ textDecoration:'none', display:'block' }}>
        <div className="product-card-img" style={{ background:'transparent', cursor:'none' }}>
          <ProductArt bgColor={p.bgColor} icon={p.icon} />

          {p.tag && <div className={`product-card-tag ${p.tagType==='new'||p.tagType==='terra'?'new':''}`}>{p.tag}</div>}
          {discount > 0 && (
            <div style={{ position:'absolute', top:12, right:12, fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.6rem', fontWeight:700, color:'#A91D3A' }}>-{discount}%</div>
          )}

          {/* Wishlist */}
          <button onClick={handleWishlist}
            style={{ position:'absolute', top:10, right:36, background:'rgba(255,255,255,0.9)', border:'none', width:30, height:30, borderRadius:'50%', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted?'#A91D3A':'none'} stroke="#A91D3A" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Hover actions */}
          <div className="product-card-actions" style={{ background:'rgba(255,255,255,0.98)', borderTop:'1px solid #E0E0E0' }}>
            <button onClick={handleAdd} className="btn-primary" style={{ fontSize:'0.72rem', padding:'11px 16px', width:'100%' }}>
              {added ? '✓ Added to Cart' : '+ Add to Cart'}
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                window.open(`https://wa.me/917976521214?text=Hi%2C+I+want+to+order+${encodeURIComponent(p.name)}`, '_blank');
              }}
              className="btn-secondary" style={{ fontSize:'0.72rem', padding:'10px 16px', width:'100%', justifyContent:'center' }}>
              Order via WhatsApp
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding:'14px 16px 16px' }}>
          <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.6rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#888', marginBottom:4 }}>{p.fabric}</p>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', fontWeight:400, color:'#151515', lineHeight:1.3, marginBottom:8 }}>{p.name}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.88rem', fontWeight:500 }}>₹{p.price.toLocaleString('en-IN')}</span>
            {p.originalPrice && <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.78rem', color:'#bbb', textDecoration:'line-through' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>}
            {discount>0 && <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.7rem', color:'#2E7D32', fontWeight:500 }}>Save {discount}%</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <span style={{ color:'#A91D3A', fontSize:'0.72rem' }}>{'★'.repeat(Math.round(p.rating))}</span>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.68rem', color:'#aaa' }}>({p.reviewCount})</span>
          </div>
          <div style={{ display:'flex', gap:4, marginTop:8, flexWrap:'wrap' }}>
            {p.sizes.slice(0,5).map(sz => (
              <span key={sz} style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.58rem', padding:'2px 6px', border:'1px solid #E0E0E0', color:'#888' }}>{sz}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsSection() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? products : products.filter(p => p.category === active);

  return (
    <section id="products" style={{ paddingTop:'80px' }}>
      <div style={{ background:'#FDF8F5', borderBottom:'1px solid #EDD8CC' }}>
        <div className="container" style={{ paddingBottom:'40px', paddingTop:'40px' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'24px', marginBottom:'32px' }}>
            <div>
              <p className="section-label" style={{ marginBottom:'8px' }}>Our Collections</p>
              <h2 className="section-title">Explore<br/><em style={{ fontStyle:'italic' }}>Ethnic Wear</em></h2>
            </div>
            <Link href="/shop" style={{ alignSelf:'flex-end', color:'#A91D3A', borderColor:'#A91D3A', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.78rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', textDecoration:'none', borderBottom:'1px solid #A91D3A', paddingBottom:2 }}>
              View All →
            </Link>
          </div>
          <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'4px', scrollbarWidth:'none' }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setActive(c.id)} className={`cat-tab ${active===c.id?'active':''}`}>{c.label}</button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} className="product-grid" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}>
          {filtered.map((p, i) => (
            <div key={p.id} style={{ background:'#fff' }}>
              <ProductCard p={p} index={i} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div style={{ padding:'clamp(32px, 6vw, 48px) clamp(16px, 4vw, 32px)', textAlign:'center', borderTop:'1px solid #E0E0E0' }}>
        <p style={{ fontFamily:"'Inter',sans-serif", color:'#888', fontSize:'0.9rem', marginBottom:'20px' }}>Don&apos;t see what you&apos;re looking for? We do custom orders.</p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/shop" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', background:'#A91D3A', color:'#fff', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.78rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none' }}>
            Shop All Products
          </Link>
          <a href="https://wa.me/917976521214" target="_blank" rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 32px', background:'transparent', color:'#151515', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.78rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #151515' }}>
            Custom Order via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
