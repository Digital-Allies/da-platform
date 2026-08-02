// Reference only — rename ButtonRef to Button in your target codebase.
/**
 * Button — Primary interaction control
 * @kind component
 */
function ButtonRef({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) {
  const baseStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-small)',
    fontWeight: 700,
    padding: size === 'sm' ? '10px 20px' : size === 'lg' ? '18px 40px' : '14px 30px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--dur-base) var(--ease-out)',
    letterSpacing: 'var(--tracking-wide)',
    borderRadius: 'var(--radius-pill)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    textDecoration: 'none',
    lineHeight: 1,
    border: 'none',
    opacity: disabled ? 0.45 : 1,
  };

  const variantStyles = {
    solid: {
      background: 'var(--celestial-yellow)',
      color: '#1E1E1E',
      border: '2px solid var(--celestial-yellow)',
      boxShadow: '0 0 18px rgba(245,200,66,0.45)',
    },
    primary: {
      background: 'transparent',
      color: 'var(--celestial-yellow)',
      border: '2px solid var(--celestial-yellow)',
      boxShadow: '0 0 0 rgba(245,200,66,0)',
    },
    amber: {
      background: 'transparent',
      color: 'var(--amber-orange)',
      border: '2px solid var(--amber-orange)',
      boxShadow: '0 0 0 rgba(212,130,42,0)',
    },
  };

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === 'solid') {
            e.currentTarget.style.background = '#ffe07a';
            e.currentTarget.style.boxShadow = '0 0 28px rgba(245,200,66,0.75)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          } else if (variant === 'primary') {
            e.currentTarget.style.background = 'rgba(245,200,66,0.10)';
            e.currentTarget.style.boxShadow = 'var(--glow-md)';
          } else if (variant === 'amber') {
            e.currentTarget.style.background = 'rgba(212,130,42,0.12)';
            e.currentTarget.style.boxShadow = 'var(--glow-amber)';
          }
        }
      }}
      onMouseLeave={(e) => {
        const style = variantStyles[variant];
        Object.assign(e.currentTarget.style, { ...style, transform: 'none' });
      }}
    >
      {children}
    </button>
  );
}
