'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';

function addToCart(p: (typeof products)[0], qty: number, size: string) {
  const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
  const idx = cart.findIndex((i: {id:string;selectedSize?:string}) => i.id === p.id && i.selectedSize === size);
  if (idx > -1) cart[idx].qty += qty;
  else cart.push({ ...p, qty, selectedSize: size });
  localStorage.setItem('dc_cart', JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart_update'));
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= Math.round(rating) ? '#A91D3A' : 'none'} stroke="#A91D3A" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </span>
  );
}

function ProductArt({ bgColor, icon, view }: { bgColor: string; icon: string; view: number }) {
  const configs = [
    { bg: `linear-gradient(160deg, ${bgColor}dd 0%, ${bgColor}66 100%)`, iconOp: 0.15, scale: 4 },
    { bg: `linear-gradient(135deg, ${bgColor}99 0%, ${bgColor}33 100%)`, iconOp: 0.2, scale: 3 },
    { bg: `linear-gradient(200deg, ${bgColor}bb 0%, ${bgColor}44 80%)`, iconOp: 0.12, scale: 5 },
    { bg: '#F5F0EB', iconOp: 0.25, scale: 3.5 },
  ];
  const c = configs[view] || configs[0];
  return (
    <div style={{ width: '100%', height: '100%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 6px)` }} />
      <span style={{ fontSize: `${c.scale * 40}px`, opacity: c.iconOp, userSelect: 'none', position: 'absolute' }}>{icon}</span>
      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.3)', marginBottom: 12 }} />
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
          DORCREATION
        </p>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeErr, setSizeErr] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  useEffect(() => {
    if (!product) return;
    const w = JSON.parse(localStorage.getItem('dc_wishlist') || '[]');
    setWishlist(w.includes(product.id));
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) return (
    <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: '#888' }}>Product not found</p>
      <Link href="/shop" style={{ color: '#A91D3A', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', letterSpacing: '0.1em' }}>← Back to Shop</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeErr(true); setTimeout(() => setSizeErr(false), 2000); return; }
    addToCart(product, qty, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    window.dispatchEvent(new CustomEvent('toggle_cart'));
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeErr(true); setTimeout(() => setSizeErr(false), 2000); return; }
    addToCart(product, qty, selectedSize);
    window.dispatchEvent(new CustomEvent('toggle_cart'));
  };

  const toggleWishlist = () => {
    const w = JSON.parse(localStorage.getItem('dc_wishlist') || '[]');
    const newW = wishlist ? w.filter((id: string) => id !== product.id) : [...w, product.id];
    localStorage.setItem('dc_wishlist', JSON.stringify(newW));
    setWishlist(!wishlist);
  };

  const accordionData = [
    { id: 'desc', label: 'Product Description', content: product.longDescription },
    { id: 'fabric', label: 'Fabric & Care', content: product.careInstructions.join(' · ') },
    { id: 'delivery', label: 'Delivery & Returns', content: 'Free delivery on orders above ₹1,999. Standard delivery in 3–7 business days. Easy 7-day returns on unworn items with original tags.' },
    { id: 'sizing', label: 'Size & Fit', content: 'Our ethnic wear is designed for a relaxed, comfortable fit. We recommend checking the size chart. If you are between sizes, size up. Custom stitching available on request — WhatsApp us.' },
  ];

  return (
    <div style={{ paddingTop: 104, minHeight: '100vh', background: '#fff', fontFamily: "'Inter',sans-serif" }}>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar" style={{ background: '#FAFAFA', borderBottom: '1px solid #E0E0E0', padding: '12px 32px' }}>
        <div className="container" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {[['Home','/'],['Shop','/shop'],[product.category.replace('-',' ').replace(/\b\w/g,c=>c.toUpperCase()),`/shop?category=${product.category}`],[product.name,'']].map(([label, href], i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i < arr.length - 1 ? (
                <Link href={href} style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', color:'#888', textDecoration:'none' }}>{label}</Link>
              ) : (
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', color:'#151515' }}>{label}</span>
              )}
              {i < arr.length - 1 && <span style={{ color:'#CCC', fontSize:'0.7rem' }}>›</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Main product layout */}
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="product-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>

          {/* LEFT: Image Gallery */}
          <div className="product-gallery" style={{ display: 'flex', gap: 12 }}>
            {/* Thumbnails */}
            <div className="product-thumbs" style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              {[0,1,2,3].map(i => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{ width: 72, height: 90, border: `2px solid ${activeImg === i ? '#A91D3A' : '#E0E0E0'}`, background: 'none', cursor: 'none', overflow: 'hidden', padding: 0 }}>
                  <ProductArt bgColor={product.bgColor} icon={product.icon} view={i} />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div style={{ flex: 1, aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
              <ProductArt bgColor={product.bgColor} icon={product.icon} view={activeImg} />
              {product.tag && (
                <div style={{ position: 'absolute', top: 16, left: 16, background: '#A91D3A', color: '#fff', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.62rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', padding:'4px 10px' }}>
                  {product.tag}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'#A91D3A', marginBottom:8 }}>DORCREATION · {product.fabric}</p>
              <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:400, lineHeight:1.1, margin:'0 0 12px' }}>{product.name}</h1>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <StarRating rating={product.rating} />
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.78rem', color:'#888' }}>{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div style={{ display:'flex', alignItems:'baseline', gap:12, paddingBottom:16, borderBottom:'1px solid #F0F0F0' }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:500, color:'#151515' }}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && <>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'1rem', color:'#bbb', textDecoration:'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.82rem', fontWeight:600, color:'#2E7D32' }}>{discount}% OFF</span>
              </>}
            </div>

            {/* Color */}
            {product.colors.length > 1 && (
              <div>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.75rem', fontWeight:500, marginBottom:10 }}>
                  Color: <strong>{product.colors[selectedColor]?.name}</strong>
                </p>
                <div style={{ display:'flex', gap:10 }}>
                  {product.colors.map((c, i) => (
                    <button key={i} onClick={() => c.available && setSelectedColor(i)}
                      title={c.name}
                      style={{ width:32, height:32, borderRadius:'50%', background:c.hex, border:`3px solid ${selectedColor===i?'#A91D3A':'transparent'}`, outline:`2px solid ${c.hex}`, cursor:c.available?'none':'not-allowed', opacity:c.available?1:0.4, transition:'border 0.2s' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.75rem', fontWeight:500, color: sizeErr ? '#A91D3A' : '#151515' }}>
                  {sizeErr ? '⚠ Please select a size' : 'Select Size'}
                </p>
                <button onClick={() => {}} style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.65rem', color:'#A91D3A', background:'none', border:'none', cursor:'none', textDecoration:'underline', letterSpacing:'0.05em' }}>
                  Size Guide ↗
                </button>
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {product.sizes.map(sz => (
                  <button key={sz} onClick={() => setSelectedSize(sz)}
                    style={{ padding:'8px 16px', border:`1.5px solid ${selectedSize===sz?'#A91D3A':'#E0E0E0'}`, background:selectedSize===sz?'#A91D3A':'transparent', color:selectedSize===sz?'#fff':'#151515', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.75rem', fontWeight:500, cursor:'none', transition:'all 0.2s' }}>
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.75rem', fontWeight:500 }}>Quantity</p>
              <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #E0E0E0' }}>
                <button onClick={() => qty > 1 && setQty(q => q-1)} style={{ width:36, height:36, background:'none', border:'none', cursor:'none', fontSize:'1.2rem', color:'#A91D3A' }}>−</button>
                <span style={{ width:36, textAlign:'center', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.85rem' }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{ width:36, height:36, background:'none', border:'none', cursor:'none', fontSize:'1.2rem', color:'#A91D3A' }}>+</button>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={toggleWishlist}
                  style={{ width:48, height:48, border:'1.5px solid #E0E0E0', background:'transparent', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'border-color 0.2s' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist?'#A91D3A':'none'} stroke="#A91D3A" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <button onClick={handleAddToCart}
                  style={{ flex:1, padding:'14px', background: added?'#2E7D32':'#A91D3A', color:'#fff', border:'none', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.82rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'none', transition:'background 0.25s' }}>
                  {added ? '✓ Added to Cart' : '+ Add to Cart'}
                </button>
              </div>
              <button onClick={handleBuyNow}
                style={{ width:'100%', padding:'14px', background:'transparent', color:'#A91D3A', border:'2px solid #A91D3A', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.82rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'none', transition:'all 0.25s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='#A91D3A';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#A91D3A';}}>
                Buy Now
              </button>
              <a href={`https://wa.me/917976521214?text=Hi%2C+I%27d+like+to+order+${encodeURIComponent(product.name)}+Size:+${selectedSize||'TBD'}+Qty:+${qty}`}
                target="_blank" rel="noreferrer"
                style={{ width:'100%', padding:'13px', background:'#25D366', color:'#fff', border:'none', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Order via WhatsApp
              </a>
            </div>

            {/* Delivery badges */}
            <div className="delivery-badges" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[['🚚','Free Delivery','Orders above ₹1,999'],['↩️','Easy Returns','7-day return policy'],['✋','Handcrafted','By Indian artisans'],['🔒','Secure Pay','Razorpay / COD']].map(([icon,title,sub])=>(
                <div key={title} style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'10px 12px', background:'#FAFAFA', border:'1px solid #F0F0F0' }}>
                  <span style={{ fontSize:'1.1rem' }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.7rem', fontWeight:600, margin:0 }}>{title}</p>
                    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.65rem', color:'#888', margin:0 }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div style={{ borderTop:'1px solid #E0E0E0' }}>
              {accordionData.map(a => (
                <div key={a.id} style={{ borderBottom:'1px solid #E0E0E0' }}>
                  <button onClick={() => setOpenAccordion(openAccordion===a.id?null:a.id)}
                    style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', background:'none', border:'none', cursor:'none', fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.78rem', fontWeight:500, color:'#151515' }}>
                    {a.label}
                    <span style={{ fontSize:'1.2rem', color:'#A91D3A', transform:`rotate(${openAccordion===a.id?45:0}deg)`, transition:'transform 0.2s', display:'inline-block' }}>+</span>
                  </button>
                  {openAccordion===a.id && (
                    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.85rem', color:'#555', lineHeight:1.7, paddingBottom:16, margin:0 }}>
                      {a.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop:80, paddingTop:60, borderTop:'1px solid #E0E0E0' }}>
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.68rem', color:'#A91D3A', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:8 }}>You May Also Like</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.5rem', fontWeight:300, marginBottom:32 }}>Similar Styles</h2>
            <div className="related-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'#E0E0E0' }}>
              {related.map(p => (
                <Link key={p.id} href={`/product/${p.slug}`} style={{ textDecoration:'none', background:'#fff', display:'block' }}>
                  <div style={{ aspectRatio:'3/4', overflow:'hidden' }}>
                    <ProductArt bgColor={p.bgColor} icon={p.icon} view={0} />
                  </div>
                  <div style={{ padding:'12px 14px' }}>
                    <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.6rem', color:'#A91D3A', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>{p.fabric}</p>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#151515', marginBottom:6, lineHeight:1.3 }}>{p.name}</p>
                    <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.82rem', color:'#151515', fontWeight:500 }}>₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div style={{ marginTop:80, paddingTop:60, borderTop:'1px solid #E0E0E0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32, flexWrap:'wrap', gap:16 }}>
            <div>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.68rem', color:'#A91D3A', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:8 }}>Customer Reviews</p>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'3.5rem', fontWeight:300, lineHeight:1 }}>{product.rating}</span>
                <div>
                  <StarRating rating={product.rating} size={20} />
                  <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.75rem', color:'#888', marginTop:4 }}>Based on {product.reviewCount} reviews</p>
                </div>
              </div>
            </div>
            <a href={`https://wa.me/917976521214?text=I'd like to share a review for ${encodeURIComponent(product.name)}`}
              target="_blank" rel="noreferrer"
              style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.72rem', color:'#A91D3A', textDecoration:'none', border:'1px solid #A91D3A', padding:'10px 20px', letterSpacing:'0.08em', textTransform:'uppercase' }}>
              Write a Review
            </a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:20 }}>
            {product.reviews.map(r => (
              <div key={r.id} style={{ padding:24, border:'1px solid #F0F0F0', background:'#FAFAFA' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                  <div>
                    <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.82rem', fontWeight:600, margin:0 }}>{r.name}</p>
                    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.72rem', color:'#888', margin:'2px 0 0' }}>{r.location} · {r.date}</p>
                  </div>
                  {r.verified && <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'0.6rem', color:'#2E7D32', background:'#E8F5E9', padding:'2px 8px', borderRadius:2, height:'fit-content' }}>✓ Verified</span>}
                </div>
                <StarRating rating={r.rating} size={14} />
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.85rem', color:'#555', lineHeight:1.6, marginTop:8 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .product-main-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .related-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
