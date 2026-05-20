'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const messages = [
  '📞 +91-7976521214  |  +91-9039174549',
  'Free Delivery on orders above ₹1,999 across India',
  'Custom stitching available — WhatsApp us for details',
  'Follow us on Instagram: @dor_creation_indore',
];

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const iv = setInterval(() => {
      if (!textRef.current) return;
      gsap.to(textRef.current, {
        y: -16, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          setIdx(i => (i + 1) % messages.length);
          gsap.fromTo(textRef.current!, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
        },
      });
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="announce" style={{ overflow: 'hidden', padding: '10px 0', textAlign: 'center' }}>
      <span
        ref={textRef}
        style={{
          display: 'inline-block',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.72rem', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}
      >
        {messages[idx]}
      </span>
    </div>
  );
}
