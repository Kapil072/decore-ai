'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FDF8F5', paddingTop: 80 }}>
      {/* Sidebar */}
      <aside style={{ width: 250, background: '#fff', borderRight: '1px solid #EDD8CC', padding: '32px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', color: '#151515', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Panel</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Link href="/admin" style={{ padding: '12px 24px', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: pathname === '/admin' ? '#A91D3A' : '#555', background: pathname === '/admin' ? '#FFEBEE' : 'transparent', textDecoration: 'none', borderRight: pathname === '/admin' ? '3px solid #A91D3A' : '3px solid transparent' }}>
            Dashboard
          </Link>
          <Link href="/admin/products" style={{ padding: '12px 24px', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: pathname?.startsWith('/admin/products') ? '#A91D3A' : '#555', background: pathname?.startsWith('/admin/products') ? '#FFEBEE' : 'transparent', textDecoration: 'none', borderRight: pathname?.startsWith('/admin/products') ? '3px solid #A91D3A' : '3px solid transparent' }}>
            Products
          </Link>
          <Link href="/admin/orders" style={{ padding: '12px 24px', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: pathname?.startsWith('/admin/orders') ? '#A91D3A' : '#555', background: pathname?.startsWith('/admin/orders') ? '#FFEBEE' : 'transparent', textDecoration: 'none', borderRight: pathname?.startsWith('/admin/orders') ? '3px solid #A91D3A' : '3px solid transparent' }}>
            Orders
          </Link>
        </nav>

        <div style={{ padding: '0 24px', marginTop: 'auto' }}>
          <button onClick={() => signOut({ callbackUrl: '/' })} style={{ background: 'none', border: 'none', color: '#B71C1C', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
