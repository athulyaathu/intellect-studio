/**
 * Divider
 * -------
 * Horizontal rule with optional centred label, used between sections or
 * inside layout blocks (e.g. footer columns).
 *
 * Props:
 *   label    — optional text to render mid-line
 *   dark     — boolean; use white tones for dark backgrounds
 *   className — additional classes on the wrapper
 */

export default function Divider({ label, dark = false, className = '' }) {
  const lineColour = dark ? 'border-white/10' : 'border-black/8';
  const textColour = dark ? 'text-white/20' : 'text-black/25';

  if (!label) {
    return (
      <hr
        className={['border-t', lineColour, className].filter(Boolean).join(' ')}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={['flex items-center gap-4', className].filter(Boolean).join(' ')}
      role="separator"
      aria-label={label}
    >
      <span className={['flex-1 border-t', lineColour].join(' ')} aria-hidden="true" />
      <span
        className={['font-mono uppercase tracking-widest', textColour].join(' ')}
        style={{ fontSize: '9px', letterSpacing: '0.2em' }}
      >
        {label}
      </span>
      <span className={['flex-1 border-t', lineColour].join(' ')} aria-hidden="true" />
    </div>
  );
}
