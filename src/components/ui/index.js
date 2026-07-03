/**
 * src/components/ui/index.js
 * --------------------------
 * Barrel export for all reusable UI primitives.
 * Import from 'components/ui' instead of individual files.
 *
 * Example:
 *   import { Button, Container, SectionLabel, Divider } from '@/components/ui';
 */

export { default as Button } from './Button';
export { default as Container } from './Container';
export { default as Badge } from './Badge';
export { default as SectionLabel } from './SectionLabel';
export { default as Divider } from './Divider';
export { useMagneticEffect } from './hooks/useMagneticEffect';
export { useRevealAnimation } from './hooks/useRevealAnimation';
export { default as MagneticButton } from './MagneticButton';
