"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Button from './Button';
import { useMagneticEffect } from './hooks/useMagneticEffect';

export default function MagneticButton(props) {
  const ref = useRef(null);

  // Attach the refined magnetic effect (opts tuned for subtlety)
  useMagneticEffect(ref, { radius: 90, strength: 0.26 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onEnter = () => gsap.to(el, { scale: 1.03, duration: 0.18, ease: 'power3.out' });
    const onLeave = () => gsap.to(el, { scale: 1, duration: 0.28, ease: 'power3.out' });

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { scale: 1 });
    };
  }, []);

  // Render the underlying Button but manage magnetic via the ref (do not pass magnetic prop)
  return <Button ref={ref} {...props} magnetic={false} />;
}
