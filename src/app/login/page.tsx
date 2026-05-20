'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push('/admin'); // Redirect to admin for now if they are admin, or profile later
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF8F5', paddingTop: 104, padding: '104px 16px 32px' }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#fff', padding: 'clamp(24px, 5vw, 40px)', border: '1px solid #EDD8CC', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', textAlign: 'center', marginBottom: 24, color: '#151515' }}>Sign In</h1>
        
        {error && (
          <div style={{ background: '#FFEBEE', color: '#B71C1C', padding: 12, marginBottom: 20, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', marginBottom: 8, color: '#555' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input" 
              required 
              style={{ padding: '10px 12px', border: '1px solid #E0E0E0', width: '100%', outline: 'none' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', marginBottom: 8, color: '#555' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input" 
              required 
              style={{ padding: '10px 12px', border: '1px solid #E0E0E0', width: '100%', outline: 'none' }} 
            />
          </div>
          
          <button type="submit" disabled={loading} style={{ background: '#A91D3A', color: '#fff', border: 'none', padding: '14px', marginTop: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
