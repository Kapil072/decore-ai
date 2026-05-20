import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();
  const userCount = await prisma.user.count();

  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#151515', marginBottom: 8 }}>Dashboard Overview</h1>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#555', marginBottom: 40 }}>
        Welcome back, {session?.user?.name || 'Admin'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
        <div style={{ background: '#fff', padding: 24, border: '1px solid #EDD8CC', borderRadius: 8 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>Total Products</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '2rem', color: '#151515', fontWeight: 600 }}>{productCount}</p>
        </div>
        
        <div style={{ background: '#fff', padding: 24, border: '1px solid #EDD8CC', borderRadius: 8 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>Total Orders</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '2rem', color: '#151515', fontWeight: 600 }}>{orderCount}</p>
        </div>

        <div style={{ background: '#fff', padding: 24, border: '1px solid #EDD8CC', borderRadius: 8 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>Total Customers</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '2rem', color: '#151515', fontWeight: 600 }}>{userCount}</p>
        </div>
      </div>
    </div>
  );
}
