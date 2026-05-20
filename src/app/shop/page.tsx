'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, categories } from '@/data/products';

function ProductArt({ bgColor, icon }: { bgColor: string; icon: string }) {
  return (
    <div style={{ width:'100%', height:'100%', background:`linear-gradient(160deg, ${bgColor}cc 0%, ${bgColor}44 100%)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(0,0,0,0.015) 3px,rgba(0,0,0,0.015) 6px)` }}/>
      <span style={{ fontSize:'6rem', opacity:0.12, userSelect:'none' }}>{icon}</span>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 32000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedId, setAddedId] = useState<string|null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem('dc_wishlist') || '[]'));
  }, []);

  const toggleWishlist = (id: string) => {
    const w = JSON.parse(localStorage.getItem('dc_wishlist') || '[]');
    const newW = w.includes(id) ? w.filter((x: string) => x !== id) : [...w, id];
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

  const allSizes = ['XS','S','M','L','XL','XXL','One Size'];

  let filtered = products.filter(p => activeCategory === 'all' || p.category === activeCategory);
  if (selectedSizes.length > 0) filtered = filtered.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
  filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
  filtered = [...filtered].sort((a,b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'new') return (b.tag === 'New' ? 1 : 0) - (a.tag === 'New' ? 1 : 0);
    return b.reviewCount - a.reviewCount;
  });

  return (
    <div style={{ paddingTop:104, minHeight:'100vh', background:'#fff' }}>
      {/* Header */}
      <div className="page-hero" style={{ background:'linear-gradient(160deg,#1A0008,#A91D3A)', padding:'48px 32px', textAlign:'center' }}>
        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.68rem', color:'rgba(255,255,255,0.6)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:8 }}>Dorcreation</p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,5vw,4.5rem)', fontWeight:300, color:'#fff', margin:0 }}>Our Collection</h1>
        <p style={{ fontFamily:"'Inter',sans-serif", color:'rgba(255,255,255,0.6)', marginTop:12, fontSize:'0.9rem' }}>Handcrafted Indian ethnic wear — {filtered.length} styles</p>
      </div>

      <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
        <div className="shop-layout" style={{ display:'grid', gridTemplateColumns:'240px 1fr', gap:40 }}>

          {/* Mobile filter toggle */}
          <button
            type="button"
            className="show-mobile"
            onClick={() => setFiltersOpen(o => !o)}
            style={{
              gridColumn: '1 / -1', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 8,
              padding: '12px 16px', background: '#fff', border: '1px solid #E0E0E0',
              fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.72rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A91D3A', cursor: 'pointer',
            }}
          >
            {filtersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Sidebar filters */}
          <div className={`shop-sidebar${filtersOpen ? ' shop-sidebar--open' : ''}`} style={{ position:'sticky', top:120, alignSelf:'start' }}>
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'#A91D3A', marginBottom:20 }}>Filters</p>

            {/* Category */}
            <div style={{ marginBottom:28, paddingBottom:28, borderBottom:'1px solid #F0F0F0' }}>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', fontWeight:600, marginBottom:12 }}>Category</p>
              {categories.map(c => (
                <button key={c.id} onClick={() => setActiveCategory(c.id)}
                  style={{ display:'flex', width:'100%', alignItems:'center', gap:8, padding:'6px 0', background:'none', border:'none', cursor:'none', fontFamily:"'Inter',sans-serif", fontSize:'0.85rem', color: activeCategory===c.id?'#A91D3A':'#555', fontWeight:activeCategory===c.id?600:400 }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:activeCategory===c.id?'#A91D3A':'#E0E0E0', display:'inline-block' }}/>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Price */}
            <div style={{ marginBottom:28, paddingBottom:28, borderBottom:'1px solid #F0F0F0' }}>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', fontWeight:600, marginBottom:12 }}>Price Range</p>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.8rem', color:'#888', marginBottom:8 }}>₹{priceRange[0].toLocaleString('en-IN')} – ₹{priceRange[1].toLocaleString('en-IN')}</p>
              <input type="range" min={0} max={32000} step={500} value={priceRange[1]}
                onChange={e => setPriceRange([0, +e.target.value])}
                style={{ width:'100%', accentColor:'#A91D3A' }}/>
            </div>

            {/* Size */}
            <div style={{ marginBottom:28 }}>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', fontWeight:600, marginBottom:12 }}>Size</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {allSizes.map(s => (
                  <button key={s} onClick={() => setSelectedSizes(ss => ss.includes(s) ? ss.filter(x=>x!==s) : [...ss,s])}
                    style={{ padding:'4px 10px', border:`1.5px solid ${selectedSizes.includes(s)?'#A91D3A':'#E0E0E0'}`, background:selectedSizes.includes(s)?'#A91D3A':'transparent', color:selectedSizes.includes(s)?'#fff':'#555', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.7rem', cursor:'none', transition:'all 0.2s' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(activeCategory !== 'all' || selectedSizes.length > 0 || priceRange[1] < 32000) && (
              <button onClick={() => { setActiveCategory('all'); setSelectedSizes([]); setPriceRange([0,32000]); }}
                style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.7rem', color:'#A91D3A', background:'none', border:'1px solid #A91D3A', padding:'8px 16px', cursor:'none', letterSpacing:'0.08em', textTransform:'uppercase' }}>
                Clear Filters
              </button>
            )}
          </div>

          {/* Product grid */}
          <div>
            {/* Sort bar */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, paddingBottom:16, borderBottom:'1px solid #F0F0F0', flexWrap:'wrap', gap:12 }}>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.85rem', color:'#888' }}>{filtered.length} products</p>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', color:'#888' }}>Sort:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', border:'1px solid #E0E0E0', padding:'6px 12px', background:'#fff', color:'#151515', cursor:'none', outline:'none' }}>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="new">New Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'80px 0' }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', color:'#888', fontWeight:300 }}>No products found</p>
                <button onClick={() => { setActiveCategory('all'); setSelectedSizes([]); setPriceRange([0,32000]); }}
                  style={{ marginTop:16, fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', color:'#A91D3A', background:'none', border:'1px solid #A91D3A', padding:'10px 20px', cursor:'none', letterSpacing:'0.08em' }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="shop-product-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'#E0E0E0' }}>
                {filtered.map(p => {
                  const disc = p.originalPrice ? Math.round(((p.originalPrice-p.price)/p.originalPrice)*100) : 0;
                  return (
                    <div key={p.id} style={{ background:'#fff', position:'relative' }}>
                      <Link href={`/product/${p.slug}`} style={{ textDecoration:'none', display:'block' }}>
                        <div style={{ aspectRatio:'3/4', overflow:'hidden', position:'relative' }}>
                          <ProductArt bgColor={p.bgColor} icon={p.icon} />
                          {p.tag && <div style={{ position:'absolute', top:12, left:12, background:'#A91D3A', color:'#fff', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.58rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', padding:'3px 8px' }}>{p.tag}</div>}
                          {disc>0 && <div style={{ position:'absolute', top:12, right:12, fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.6rem', fontWeight:700, color:'#A91D3A' }}>-{disc}%</div>}
                        </div>
                        <div style={{ padding:'12px 14px' }}>
                          <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.58rem', color:'#A91D3A', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>{p.fabric}</p>
                          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#151515', lineHeight:1.3, marginBottom:6 }}>{p.name}</p>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.85rem', fontWeight:500 }}>₹{p.price.toLocaleString('en-IN')}</span>
                            {p.originalPrice && <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', color:'#bbb', textDecoration:'line-through' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>}
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:4 }}>
                            <span style={{ color:'#A91D3A', fontSize:'0.72rem' }}>{'★'.repeat(Math.round(p.rating))}</span>
                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.68rem', color:'#888' }}>({p.reviewCount})</span>
                          </div>
                        </div>
                      </Link>
                      {/* Wishlist + Quick Add */}
                      <button onClick={() => toggleWishlist(p.id)}
                        style={{ position:'absolute', top:12, right:40, background:'rgba(255,255,255,0.9)', border:'none', width:30, height:30, borderRadius:'50%', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlist.includes(p.id)?'#A91D3A':'none'} stroke="#A91D3A" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                      <button onClick={() => addToCart(p)}
                        style={{ position:'absolute', bottom:0, left:0, right:0, background: addedId===p.id?'#2E7D32':'#A91D3A', color:'#fff', border:'none', padding:'10px', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', cursor:'none', transition:'background 0.2s', opacity:0 }}
                        className="quick-add-btn">
                        {addedId===p.id?'✓ Added':'+ Quick Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        div:hover > .quick-add-btn { opacity: 1 !important; transition: opacity 0.2s !important; }
        @media (max-width: 768px) {
          .shop-sidebar { display: none; position: static !important; }
          .shop-sidebar.shop-sidebar--open { display: block; }
        }
      `}</style>
    </div>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div style={{paddingTop:200,textAlign:'center'}}>Loading...</div>}><ShopContent /></Suspense>;
}
