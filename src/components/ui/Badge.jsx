export default function Badge({ children, className = '', ...rest }) {
  return (
    <span
      className={['inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
}
