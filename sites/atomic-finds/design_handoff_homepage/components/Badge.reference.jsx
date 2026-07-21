// Reference only — rename BadgeRef to Badge in your target codebase.
/**
 * Badge — Status indicator pill
 * @kind component
 */
function BadgeRef({
  children,
  variant = 'instock',
  ...props
}) {
  const variantStyles = {
    instock: {
      background: 'var(--celestial-yellow)',
      color: '#1E1E1E',
      boxShadow: 'var(--glow-sm)',
    },
    featured: {
      background: 'var(--amber-orange)',
      color: '#1E1E1E',
      boxShadow: 'var(--glow-amber)',
    },
    out: {
      background: 'transparent',
      color: 'var(--woven-moss)',
      border: '1px solid var(--woven-moss)',
      boxShadow: 'none',
    },
    eco: {
      background: 'var(--woven-moss)',
      color: 'var(--bone-white)',
      boxShadow: 'none',
    },
  };

  return (
    <span
      {...props}
      style={{
        display: 'inline-block',
        padding: '6px 14px',
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wide)',
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
}
