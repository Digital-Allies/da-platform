/* @ds-bundle: {"format":4,"namespace":"AtomicFindsATXDesignSystem_01147c","components":[{"name":"CuratorCard","sourcePath":"components/cards/CuratorCard.jsx"},{"name":"ProductCard","sourcePath":"components/cards/ProductCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"InspectionStamp","sourcePath":"components/feedback/InspectionStamp.jsx"}],"sourceHashes":{"components/cards/CuratorCard.jsx":"86a52e8370da","components/cards/ProductCard.jsx":"b412e72e0d7e","components/core/Button.jsx":"0877e79bf4a4","components/core/Tag.jsx":"c2575aaf56be","components/feedback/InspectionStamp.jsx":"f0c93f779e31"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AtomicFindsATXDesignSystem_01147c = window.AtomicFindsATXDesignSystem_01147c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/CuratorCard.jsx
try { (() => {
function CuratorCard({
  name,
  role,
  bio,
  quote,
  stampSrc
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      background: 'var(--surface-card)',
      border: '3px solid var(--ink-900)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)',
      padding: 20,
      fontFamily: 'var(--font-body)',
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10
    }
  }, stampSrc ? /*#__PURE__*/React.createElement("img", {
    src: stampSrc,
    alt: name,
    style: {
      width: 56,
      height: 56,
      objectFit: 'contain'
    }
  }) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      color: 'var(--burnt-orange-600)',
      fontSize: 22
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--olive-teal-700)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, role))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      margin: '0 0 10px'
    }
  }, bio), quote ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-script)',
      color: 'var(--avocado-600)',
      fontSize: 20,
      margin: 0
    }
  }, "\u201C", quote, "\u201D") : null);
}
Object.assign(__ds_scope, { CuratorCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CuratorCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled
}) {
  const palette = {
    primary: {
      bg: 'var(--brand-primary)',
      hoverBg: 'var(--brand-primary-hover)',
      fg: 'var(--text-inverse)'
    },
    secondary: {
      bg: 'var(--brand-secondary)',
      hoverBg: 'var(--brand-secondary-hover)',
      fg: 'var(--text-inverse)'
    },
    ghost: {
      bg: 'transparent',
      hoverBg: 'var(--cream-200)',
      fg: 'var(--ink-900)'
    }
  }[variant];
  const pad = size === 'sm' ? '8px 16px' : size === 'lg' ? '16px 32px' : '12px 22px';
  const fontSize = size === 'sm' ? 'var(--text-body-sm)' : size === 'lg' ? 'var(--text-body-lg)' : 'var(--text-body-md)';
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize,
      padding: pad,
      borderRadius: 'var(--radius-pill)',
      border: variant === 'ghost' ? '2px solid var(--ink-900)' : '2px solid var(--ink-900)',
      background: hover && !disabled ? palette.hoverBg : palette.bg,
      color: palette.fg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      letterSpacing: '0.01em',
      transition: 'background 0.15s ease, transform 0.1s ease',
      transform: hover && !disabled ? 'translateY(-1px)' : 'none'
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.1em',
      lineHeight: 0
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  tone = 'cream'
}) {
  const tones = {
    cream: {
      bg: 'var(--cream-200)',
      fg: 'var(--ink-900)'
    },
    mustard: {
      bg: 'var(--mustard-500)',
      fg: 'var(--ink-900)'
    },
    avocado: {
      bg: 'var(--avocado-600)',
      fg: 'var(--text-inverse)'
    },
    orange: {
      bg: 'var(--burnt-orange-600)',
      fg: 'var(--text-inverse)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      padding: '6px 14px',
      borderRadius: 'var(--radius-pill)',
      border: '2px solid var(--ink-900)',
      background: tones.bg,
      color: tones.fg
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProductCard.jsx
try { (() => {
function ProductCard({
  image,
  name,
  era,
  materials,
  price,
  status = 'available',
  curator
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      background: 'var(--surface-card)',
      border: '3px solid var(--ink-900)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 190,
      background: 'var(--cream-200)',
      overflow: 'hidden',
      borderBottom: '3px solid var(--ink-900)'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      color: 'var(--avocado-600)',
      fontSize: 22
    }
  }, name), /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: status === 'sold' ? 'orange' : 'mustard'
  }, status === 'sold' ? 'Sold' : 'Available')), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 10px',
      fontSize: 13,
      color: 'var(--olive-teal-700)'
    }
  }, "Circa ", era, " \xB7 ", materials), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 18
    }
  }, price), curator ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontStyle: 'italic',
      color: 'var(--burnt-orange-700)'
    }
  }, "Curated by ", curator) : null)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/InspectionStamp.jsx
try { (() => {
function InspectionStamp({
  inspector = 'Milo',
  label = 'Atomic Inspection Team',
  passed = true,
  size = 96
}) {
  const artMap = {
    Milo: '../../assets/inspection-team/stamp-milo.png',
    Daisy: '../../assets/inspection-team/stamp-daisy.png',
    Malibu: '../../assets/inspection-team/stamp-malibu.png',
    Tatiana: '../../assets/inspection-team/stamp-tatiana.png'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      color: 'var(--burnt-orange-700)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: artMap[inspector] || artMap.Milo,
    alt: `${inspector} inspection stamp`,
    style: {
      width: size,
      height: size,
      objectFit: 'contain',
      filter: passed ? 'none' : 'grayscale(1) opacity(0.5)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, passed ? 'Passed' : 'Pending', " \xB7 ", label));
}
Object.assign(__ds_scope, { InspectionStamp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/InspectionStamp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CuratorCard = __ds_scope.CuratorCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.InspectionStamp = __ds_scope.InspectionStamp;

})();
