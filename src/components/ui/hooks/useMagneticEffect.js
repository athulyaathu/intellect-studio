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
import { gsap } from 'gsap';

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

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      if (Math.hypot(dx, dy) < radius) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      // Reset position on unmount
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, radius, strength]);
}
