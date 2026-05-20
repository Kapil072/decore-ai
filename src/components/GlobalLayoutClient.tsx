'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Footer, { WaFloat } from '@/components/Footer';

const CustomCursor   = dynamic(() => import('@/components/CustomCursor'),   { ssr: false });
const CartDrawer     = dynamic(() => import('@/components/CartDrawer'),     { ssr: false });
const SearchOverlay  = dynamic(() => import('@/components/SearchOverlay'),  { ssr: false });

export default function GlobalLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <CartDrawer />
      <SearchOverlay />
      <WaFloat />
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
