import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * useRevealAnimation
 * - Accepts an array of refs (or single ref) and an options object describing
 *   per-step animation tweaks. Runs a simple staggered reveal timeline and
 *   respects prefers-reduced-motion.
 *
 * Example:
 *   useRevealAnimation([titleRef, copyRef, actionsRef], {
 *     steps: [ { selector: 'p, h1, h2', y: 30, duration: 0.6 }, {}, {} ]
 *   });
 */
export function useRevealAnimation(targets, options = {}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elems = (Array.isArray(targets) ? targets : [targets]).map((r) => r?.current).filter(Boolean);
    if (!elems.length) return;

    if (reduced) {
      elems.forEach((el) => gsap.set(el, { clearProps: 'all', opacity: 1, y: 0, scale: 1 }));
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: options.ease || 'power3.out' } });

    elems.forEach((el, i) => {
      const step = Array.isArray(options.steps) && options.steps[i] ? options.steps[i] : {};
      const selector = step.selector || (el.querySelectorAll ? null : null);
      const targetsEls = selector ? el.querySelectorAll(selector) : (el.children && el.children.length ? el.children : [el]);
      const fromVars = {
        y: typeof step.y === 'number' ? step.y : i === 0 ? 30 : 18,
        opacity: 0,
        duration: typeof step.duration === 'number' ? step.duration : i === 0 ? 0.6 : 0.45,
      };

      tl.from(targetsEls, { ...fromVars, stagger: typeof step.stagger === 'number' ? step.stagger : 0.08 }, step.at || '>-0.02');
    });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
