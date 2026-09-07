// Reference only — rename IconRef to Icon in your target codebase.
// Icon component — custom Atomic Finds icon library (PNG only)
// Usage: <Icon name="leaf" size={48} />

function IconRef({ name = 'leaf', size = 48, className = '', style = {} }) {
  // Support both .svg and .png — pass ext to override (default: svg for known vector icons, else png)
  const pngOnly = ['About','Cart','Contact','Filter','Home','Made in Austin','Search','Shop','Sustainability','Wishlist','bamboo-swing','bamboo-table','delivery','leaf-2','restoration','star-2','woven-pattern','atomic','star','sun','crescent','planet','shooting-star','constellation','bamboo-chair','woven-basket','bamboo-lamp','stool','bamboo-shelf','bamboo','leaf'];
  const ext = pngOnly.includes(name) ? 'png' : 'svg';
  const iconPath = `../assets/icons/${name}.${ext}`;
  
  return (
    <img
      src={iconPath}
      alt={name}
      width={size}
      height={size}
      className={className}
      style={{
        display: 'inline-block',
        objectFit: 'contain',
        ...style,
      }}
    />
  );
}

Object.assign(window, { IconRef });

export { IconRef };
