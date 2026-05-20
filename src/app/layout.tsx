import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'डोर Creation — Premium Indian Ethnic Wear',
  description: 'Premium handcrafted Indian ethnic wear. Kurtas, Kurta Sets, Lehengas, Sarees & Co-ord Sets curated from India\'s finest artisans. Free delivery across India.',
  keywords: ['kurta', 'kurta set', 'indian ethnic wear', 'lehenga', 'saree', 'indian fashion', 'dorcreation', 'डोर creation'],
  icons: {
    icon: '/dor-creation-logo.png',
    shortcut: '/dor-creation-logo.png',
    apple: '/dor-creation-logo.png',
  },
};

import GlobalLayoutClient from '@/components/GlobalLayoutClient';
import AuthProvider from '@/components/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <GlobalLayoutClient>{children}</GlobalLayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}
