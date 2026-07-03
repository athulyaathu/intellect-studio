/**
 * useMagneticEffect
 * -----------------
 * Attaches a magnetic cursor-pull effect to a DOM element via a React ref.
 * The element follows the cursor proportionally when it enters a proximity
 * radius, and springs back elastically on leave.
 *
 * Usage:
 *   const btnRef = useRef(null);
 *   useMagneticEffect(btnRef, { radius: 80, strength: 0.35 });
 *   return <button ref={btnRef}>...</button>;
 */

import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * @param {React.RefObject<HTMLElement>} ref - Ref attached to the target element.
 * @param {object} [options]
 * @param {number} [options.radius=80]    - Proximity radius in px.
 * @param {number} [options.strength=0.35] - Pull strength (0 = none, 1 = full).
 */
export function useMagneticEffect(ref, { radius = 80, strength = 0.35 } = {}) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    // Respect reduced motion and touch pointers
    const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // Ignore on touch devices where magnetic cursors aren't useful
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.28,
          ease: 'power3.out',
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.32, ease: 'power3.out' });
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, radius, strength]);
}
