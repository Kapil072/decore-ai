'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    setEnabled(!coarse);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.06, ease: 'none' });
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
      raf = requestAnimationFrame(tick);
    };
    tick();

    const addH = (e: Event) => {
      ring?.classList.add('hovering');
      // Check if hovering over dark background
      const el = e.target as HTMLElement;
      if (el.closest('[data-dark]')) {
        ring?.classList.add('inverted');
        dot?.classList.add('inverted');
      }
    };
    const rmH = () => {
      ring?.classList.remove('hovering');
      ring?.classList.remove('inverted');
      dot?.classList.remove('inverted');
    };

    const bindAll = () => {
      document.querySelectorAll('a, button, .product-card, .cat-tab, .btn-primary, .btn-secondary, .wa-float')
        .forEach(el => {
          el.addEventListener('mouseenter', addH);
          el.addEventListener('mouseleave', rmH);
        });
    };
    bindAll();

    const obs = new MutationObserver(bindAll);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
