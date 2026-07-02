/**
 * Container
 * ---------
 * Responsive layout container matching the project's standard padding/max-width.
 * Mirrors the `max-w-7xl mx-auto px-6 md:px-12` used consistently across all
 * sections, providing a single source of truth for horizontal rhythm.
 *
 * Props:
 *   as       — HTML element to render (default: 'div')
 *   tight    — boolean; use a narrower max-w-5xl for prose/editorial content
 *   flush    — boolean; remove horizontal padding (for edge-to-edge elements)
 *   className — additional classes
 *   ...rest  — forwarded to the element
 */

export default function Container({
  as: Tag = 'div',
  tight = false,
  flush = false,
  className = '',
  children,
  ...rest
}) {
  const width = tight ? 'max-w-5xl' : 'max-w-7xl';
  const padding = flush ? '' : 'px-6 md:px-12';
  const classes = ['mx-auto w-full', width, padding, className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
