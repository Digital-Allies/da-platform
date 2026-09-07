// Reference only — rename CardRef to Card in your target codebase.
/**
 * Card — Feature or product card container
 * @kind component
 */
function CardRef({
  children,
  ...props
}) {
  return (
    <div
      {...props}
      style={{
        background: 'var(--bg-card)',
        border: 'var(--border-1)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        transition: 'all var(--dur-base) var(--ease-out)',
        cursor: 'pointer',
        ...props.style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(245,200,66,0.5)';
        e.currentTarget.style.boxShadow = '0 0 28px rgba(245,200,66,0.28)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(245,200,66,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </div>
  );
}
