'use client';

import dynamic from 'next/dynamic';
import Hero            from '@/components/Hero';
import ProductsSection from '@/components/WorkSection';
import ProcessSection  from '@/components/ProcessSection';
import AboutSection    from '@/components/AboutSection';
import ContactSection  from '@/components/ContactSection';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });

export default function Home() {
  return (
    <>
      <ScrollProgress />
      {/* paddingTop = announcement bar (40) + nav (64) = 104px */}
      <main style={{ paddingTop: '104px' }}>
        <Hero />
        <ProcessSection />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
