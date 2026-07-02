/**
 * SectionLabel
 * ------------
 * Small editorial index label used at the top of each section.
 * Matches the team's existing pattern: "01 // HERO", "02 // ABOUT", etc.
 *
 * Props:
 *   index    — number or string, e.g. "01"
 *   title    — section name, e.g. "ABOUT"
 *   dark     — boolean; render white text for dark backgrounds (default: false)
 *   className — additional classes
 */

export default function SectionLabel({ index, title, dark = false, className = '' }) {
  const colour = dark ? 'text-white/20' : 'text-black/25';

  return (
    <span
      className={[
        'font-mono font-bold uppercase',
        colour,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ fontSize: '11px', letterSpacing: '0.25em' }}
      aria-label={`Section ${index}: ${title}`}
    >
      {String(index).padStart(2, '0')} // {title}
    </span>
  );
}
