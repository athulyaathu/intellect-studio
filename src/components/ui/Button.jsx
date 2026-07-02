/**
 * Button
 * ------
 * Reusable button/link primitive that matches the Intellect Studio aesthetic
 * (sharp corners, mono typography, uppercase tracking).
 *
 * Props:
 *   variant  — 'primary' | 'secondary' | 'ghost'   (default: 'primary')
 *   size     — 'sm' | 'md' | 'lg'                  (default: 'md')
 *   as       — element type: 'button' | 'a' | Link  (default: 'button')
 *   magnetic — boolean; apply magnetic pull effect  (default: false)
 *   dark     — boolean; force dark-theme colours    (default: false)
 *   className — additional Tailwind classes
 *   ...rest  — forwarded to the underlying element (href, onClick, etc.)
 */

'use client';

import { useRef, forwardRef } from 'react';
import Link from 'next/link';
import { useMagneticEffect } from './hooks/useMagneticEffect';

// ---------------------------------------------------------------------------
// Style maps
// ---------------------------------------------------------------------------

const BASE =
  'inline-flex items-center justify-center rounded-none font-mono uppercase tracking-[0.2em] transition-all duration-300 select-none magnetic-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const SIZE = {
  sm: 'px-4 py-2 text-[9px]',
  md: 'px-6 py-3 text-[10px] md:text-[11px]',
  lg: 'px-8 py-4 text-xs md:text-sm',
};

const VARIANT_LIGHT = {
  primary:   'bg-cyan-600 text-white hover:bg-cyan-700 focus-visible:ring-cyan-600',
  secondary: 'border border-slate-300 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 focus-visible:ring-cyan-500',
  ghost:     'text-slate-500 hover:text-cyan-600 focus-visible:ring-cyan-500',
};

const VARIANT_DARK = {
  primary:   'bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-white',
  secondary: 'border border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-400 focus-visible:ring-cyan-400',
  ghost:     'text-slate-400 hover:text-white focus-visible:ring-cyan-400',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    as: Tag = 'button',
    magnetic = false,
    dark = false,
    className = '',
    children,
    href,
    ...rest
  },
  externalRef
) {
  const internalRef = useRef(null);
  const resolvedRef = externalRef ?? internalRef;

  // Only attach magnetic effect if requested (opt-in to keep it lightweight)
  useMagneticEffect(magnetic ? resolvedRef : { current: null });

  const variantMap = dark ? VARIANT_DARK : VARIANT_LIGHT;
  const classes = [BASE, SIZE[size] ?? SIZE.md, variantMap[variant] ?? variantMap.primary, className]
    .filter(Boolean)
    .join(' ');

  // Use next/link when href looks like an internal route (not an anchor or mailto)
  const isInternalRoute =
    href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:');

  if (isInternalRoute) {
    return (
      <Link ref={resolvedRef} href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={resolvedRef} href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Tag ref={resolvedRef} className={classes} {...rest}>
      {children}
    </Tag>
  );
});

export default Button;
