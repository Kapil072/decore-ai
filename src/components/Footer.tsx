'use client';

export function WaFloat() {
  return (
    <a
      href="https://wa.me/917976521214?text=Hi%2C+I%27m+interested+in+ordering+from+Dorcreation"
      target="_blank" rel="noreferrer"
      className="wa-float" aria-label="WhatsApp"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default function Footer() {
  const cols = [
    { t: 'Shop', ls: ['New In', 'Kurta Sets', 'Lehengas', 'Sarees', 'Co-ord Sets', 'Indo-Western'] },
    { t: 'Information', ls: ['About Us', 'Shipping Policy', 'Return Policy', 'Privacy Policy', 'Contact'] },
    {
      t: 'Contact Us',
      links: [
        { label: '📞 +91-7976521214', href: 'tel:+917976521214' },
        { label: '📞 +91-9039174549', href: 'tel:+919039174549' },
        { label: '📸 @dor_creation_indore', href: 'https://www.instagram.com/dor_creation_indore' },
        { label: '💬 WhatsApp Order', href: 'https://wa.me/917976521214' },
        { label: 'Mon–Sun 10am–9pm IST', href: null },
      ],
    },
  ];

  return (
    <footer style={{ background: '#151515', color: '#fff', borderTop: '1px solid #2A2A2A' }}>
      {/* Brand accent strip */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #7A0020, #A91D3A, #C73659, #A91D3A, #7A0020)' }} />
      <div className="container" style={{ padding: '64px 32px 32px' }}>
        {/* Top */}
        <div style={{
          display: 'grid', gap: '48px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          marginBottom: '64px',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, letterSpacing: '0.12em', margin: 0, color: '#A91D3A' }}>
                डोर CREATION
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '4px 0 0' }}>
                Indore · Indian Ethnic Wear
              </p>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.7 }}>
              Premium handcrafted ethnic wear from the heart of Indore. Suits, Lehengas, Sarees, Bridal Wear & more. Wholesale · Retail · Customisation.
            </p>
            {/* Newsletter */}
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Subscribe for new arrivals
              </p>
              <div style={{ display: 'flex', gap: 0 }}>
                <input type="email" placeholder="your@email.com" style={{
                  flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                  borderRight: 'none', padding: '10px 14px', color: '#fff',
                  fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', outline: 'none',
                }} />
                <button style={{
                  background: '#A91D3A', border: '1px solid #A91D3A',
                  color: '#fff', padding: '10px 16px',
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'none',
                }}>
                  Join
                </button>
              </div>
            </div>
          </div>

          {cols.map(col => (
            <div key={col.t}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
                {col.t}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {'links' in col && col.links
                  ? col.links.map(l => (
                      l.href
                        ? <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                            style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', cursor: 'none', transition: 'color 0.2s', textDecoration: 'none' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#C73659')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                          >{l.label}</a>
                        : <span key={l.label} style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>{l.label}</span>
                    ))
                  : (col.ls ?? []).map((l: string) => (
                      <span key={l} style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', cursor: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                      >{l}</span>
                    ))
                }
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
            © 2025 Dorcreation · Indore · Made with ❤️ in India
          </p>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, background: '#4CAF50', borderRadius: '50%' }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>24hr dispatch available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
