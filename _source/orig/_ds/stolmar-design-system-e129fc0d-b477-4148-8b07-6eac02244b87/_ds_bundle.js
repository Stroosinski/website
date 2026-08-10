/* @ds-bundle: {"format":3,"namespace":"STOLMARDesignSystem_e129fc","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"ProjectTile","sourcePath":"components/surfaces/ProjectTile.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"c2187f8425ed","components/core/Button.jsx":"a502496ae299","components/core/IconButton.jsx":"dd33c4962e5a","components/core/Tag.jsx":"130e4f7414f9","components/forms/Input.jsx":"b26a5522b82d","components/surfaces/Card.jsx":"d5d112e9e3fb","components/surfaces/ProjectTile.jsx":"b92edf101300","ui_kits/website/Chrome.jsx":"25b78cc82094","ui_kits/website/Contact.jsx":"2cde5af31e49","ui_kits/website/Home.jsx":"e4b5e9459002","ui_kits/website/Studio.jsx":"a01289ee9b50","ui_kits/website/Work.jsx":"c0b9771200b4","ui_kits/website/data.js":"0e6dbd0ed905","ui_kits/website/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.STOLMARDesignSystem_e129fc = window.STOLMARDesignSystem_e129fc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * STOLMAR Badge — status / state indicator with a leading marker dot.
 * Status is carried by weight and a small yellow dot, not by many colors.
 */
function Badge({
  children,
  tone = "neutral",
  onDark = false,
  dot = true,
  style,
  ...rest
}) {
  const dotColor = {
    neutral: onDark ? "var(--ink-400)" : "var(--ink-500)",
    active: "var(--signal-yellow)",
    done: onDark ? "var(--paper-000)" : "var(--ink-900)"
  }[tone] || "var(--ink-500)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      height: 22,
      padding: "0 4px",
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: onDark ? "var(--text-body-on-dark)" : "var(--ink-900)",
      lineHeight: 1,
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "var(--radius-pill)",
      background: dotColor,
      flex: "0 0 auto"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * STOLMAR Button — machined, square-cornered, uppercase.
 * Monochrome by default; `accent` is the single yellow signal CTA.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sizes = {
    sm: {
      padding: "0 14px",
      height: 34,
      fontSize: 11,
      gap: 8
    },
    md: {
      padding: "0 20px",
      height: 44,
      fontSize: 12,
      gap: 10
    },
    lg: {
      padding: "0 28px",
      height: 54,
      fontSize: 13,
      gap: 12
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      bg: "var(--ink-900)",
      bgHover: "var(--ink-700)",
      fg: "var(--paper-000)",
      border: "transparent"
    },
    accent: {
      bg: "var(--signal-yellow)",
      bgHover: "var(--signal-yellow-deep)",
      fg: "var(--ink-900)",
      border: "transparent"
    },
    secondary: {
      bg: "transparent",
      bgHover: "var(--ink-900)",
      fg: "var(--ink-900)",
      fgHover: "var(--paper-000)",
      border: "var(--ink-900)"
    },
    ghost: {
      bg: "transparent",
      bgHover: "rgba(10,10,10,0.06)",
      fg: "var(--ink-900)",
      border: "transparent"
    }
  };
  const p = palettes[variant] || palettes.primary;
  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: s.fontSize,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    border: `1px solid ${p.border === "transparent" ? "transparent" : p.border}`,
    borderRadius: "var(--radius-sm)",
    background: hover && !disabled ? p.bgHover : p.bg,
    color: hover && !disabled && p.fgHover ? p.fgHover : p.fg,
    opacity: disabled ? 0.4 : 1,
    transform: press && !disabled ? "translateY(1px)" : "none",
    transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
    userSelect: "none",
    whiteSpace: "nowrap",
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: base
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      fontSize: "1.1em"
    }
  }, icon) : null, children ? /*#__PURE__*/React.createElement("span", null, children) : null, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      fontSize: "1.1em"
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * STOLMAR IconButton — square icon control. Pass an icon node as children.
 */
function IconButton({
  children,
  variant = "ghost",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dims = {
    sm: 34,
    md: 44,
    lg: 54
  }[size] || 44;
  const palettes = {
    solid: {
      bg: "var(--ink-900)",
      bgHover: "var(--ink-700)",
      fg: "var(--paper-000)",
      border: "transparent"
    },
    accent: {
      bg: "var(--signal-yellow)",
      bgHover: "var(--signal-yellow-deep)",
      fg: "var(--ink-900)",
      border: "transparent"
    },
    outline: {
      bg: "transparent",
      bgHover: "rgba(10,10,10,0.06)",
      fg: "var(--ink-900)",
      border: "var(--ink-900)"
    },
    ghost: {
      bg: "transparent",
      bgHover: "rgba(10,10,10,0.06)",
      fg: "var(--ink-900)",
      border: "transparent"
    }
  };
  const p = palettes[variant] || palettes.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dims,
      height: dims,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${p.border}`,
      borderRadius: "var(--radius-sm)",
      background: hover && !disabled ? p.bgHover : p.bg,
      color: p.fg,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transition: "background var(--dur-fast) var(--ease-standard)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * STOLMAR Tag — small uppercase classifier. Use for materials, locations, categories.
 * `marker` adds the yellow underline; `solid` fills.
 */
function Tag({
  children,
  variant = "outline",
  onDark = false,
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    height: 24,
    padding: "0 10px",
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderRadius: "var(--radius-pill)",
    whiteSpace: "nowrap",
    lineHeight: 1
  };
  const variants = {
    outline: {
      background: "transparent",
      color: onDark ? "var(--text-body-on-dark)" : "var(--ink-900)",
      border: `1px solid ${onDark ? "var(--ink-600)" : "var(--paper-300)"}`
    },
    solid: {
      background: onDark ? "var(--paper-000)" : "var(--ink-900)",
      color: onDark ? "var(--ink-900)" : "var(--paper-000)",
      border: "1px solid transparent"
    },
    accent: {
      background: "var(--signal-yellow)",
      color: "var(--ink-900)",
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...(variants[variant] || variants.outline),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * STOLMAR Input — underlined field, square frame. Label sits above as an uppercase eyebrow.
 * Focus brings the yellow marker. Works on light surfaces and the dark stage (onDark).
 */
function Input({
  label,
  hint,
  value,
  defaultValue,
  placeholder,
  type = "text",
  multiline = false,
  rows = 3,
  disabled = false,
  onDark = false,
  id,
  onChange,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  const fg = onDark ? "var(--text-strong-on-dark)" : "var(--text-strong)";
  const labelColor = onDark ? "var(--text-muted-on-dark)" : "var(--text-muted)";
  const lineIdle = onDark ? "var(--ink-600)" : "var(--paper-300)";
  const fieldStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focus ? "var(--signal-yellow)" : lineIdle}`,
    borderRadius: 0,
    padding: "10px 0",
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: 15,
    color: fg,
    outline: "none",
    transition: "border-color var(--dur-base) var(--ease-standard)",
    resize: multiline ? "vertical" : undefined,
    opacity: disabled ? 0.45 : 1
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: focus ? onDark ? "var(--signal-yellow)" : "var(--ink-900)" : labelColor,
      transition: "color var(--dur-base) var(--ease-standard)"
    }
  }, label) : null, multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    rows: rows,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: fieldStyle
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: fieldStyle
  }, rest)), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: labelColor,
      letterSpacing: "0.02em"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * STOLMAR Card — flat, square-cornered container bounded by a hairline.
 * Elevation is a seam, not a float. Optional eyebrow + title header and a yellow rule.
 */
function Card({
  children,
  eyebrow,
  title,
  rule = false,
  onDark = false,
  padding = "var(--space-5)",
  style,
  ...rest
}) {
  const bg = onDark ? "var(--surface-stage-raised)" : "var(--surface-card)";
  const border = onDark ? "var(--border-hair-on-dark)" : "var(--border-hair)";
  const titleColor = onDark ? "var(--text-strong-on-dark)" : "var(--text-strong)";
  const eyebrowColor = onDark ? "var(--text-muted-on-dark)" : "var(--text-muted)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: "var(--radius-sm)",
      padding,
      position: "relative",
      ...style
    }
  }, rest), rule ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 40,
      height: 2,
      background: "var(--signal-yellow)"
    }
  }) : null, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: eyebrowColor,
      marginBottom: 8
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: "-0.01em",
      color: titleColor,
      marginBottom: children ? 12 : 0,
      lineHeight: 1.1
    }
  }, title) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ProjectTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * STOLMAR ProjectTile — the signature "veil".
 * Work is never shown outright: the tile stays concealed (redacted bars + faint emblem),
 * and reveals its title + materials on hover/focus. Built for the enigmatic portfolio.
 */
function ProjectTile({
  eyebrow,
  title,
  materials = [],
  markSrc,
  imageSrc,
  ratio = "4 / 3",
  href,
  revealed: revealedProp,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const revealed = revealedProp != null ? revealedProp : hover;
  const Root = href ? "a" : "div";
  return /*#__PURE__*/React.createElement(Root, _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
    tabIndex: 0,
    style: {
      position: "relative",
      display: "block",
      aspectRatio: ratio,
      background: "var(--surface-stage-raised)",
      border: `1px solid ${revealed ? "var(--signal-yellow)" : "var(--border-hair-on-dark)"}`,
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      cursor: "pointer",
      textDecoration: "none",
      transition: "border-color var(--dur-base) var(--ease-standard)",
      ...style
    }
  }, rest), imageSrc ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: revealed ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.4) blur(7px)",
      transform: revealed ? "scale(1.04)" : "scale(1.08)",
      transition: "filter var(--dur-slow) var(--ease-standard), transform var(--dur-slow) var(--ease-standard)"
    }
  }) : null, imageSrc ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.15) 52%, rgba(17,17,17,0.35) 100%)"
    }
  }) : null, markSrc && !imageSrc ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: -24,
      bottom: -24,
      width: "55%",
      aspectRatio: "1",
      backgroundImage: `url(${markSrc})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right bottom",
      filter: "invert(1)",
      opacity: revealed ? 0.16 : 0.06,
      transition: "opacity var(--dur-slow) var(--ease-standard)"
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      padding: "var(--space-4)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: 10,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--signal-yellow)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("span", {
    style: {
      display: revealed ? "none" : "block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 13,
      width: "68%",
      background: "var(--ink-600)",
      marginBottom: 7
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 9,
      width: "42%",
      background: "var(--ink-700)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: revealed ? "block" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      textTransform: "uppercase",
      color: "var(--paper-000)",
      fontSize: 20,
      lineHeight: 1.04,
      letterSpacing: "-0.01em",
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 10,
      letterSpacing: "0.04em",
      color: "var(--text-muted-on-dark)"
    }
  }, materials.join(" · ")))));
}
Object.assign(__ds_scope, { ProjectTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ProjectTile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
// STOLMAR website — shared chrome (Header, Footer). Exposed on window.
const MARK = "../../assets/logo-mark-invert.png";
const WORDMARK = "../../assets/logo-full.png";
const INSTAGRAM_URL = "https://www.instagram.com/stolmar_manufabryka/";

// Animated Instagram handle badge (Lottie), looping, links out to the profile.
function InstagramBadge() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let anim;
    fetch("../../assets/social-handle.json").then(r => r.json()).then(data => {
      anim = window.lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data
      });
    });
    return () => anim && anim.destroy();
  }, []);
  return /*#__PURE__*/React.createElement("a", {
    href: INSTAGRAM_URL,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "STOLMAR on Instagram",
    style: {
      display: "inline-block",
      width: 110,
      height: "38.6px",
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      width: "100%",
      height: "100%"
    }
  }));
}
function Header({
  active,
  onNav
}) {
  const D = window.STOLMAR_DATA;
  const {
    Button
  } = window.STOLMARDesignSystem_e129fc;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 40px",
      background: "rgba(10,10,10,0.72)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-hair-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav("Home"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: MARK,
    alt: "",
    style: {
      width: "35px",
      height: "35px"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: WORDMARK,
    alt: "STOLMAR",
    style: {
      filter: "invert(1)",
      width: "70px",
      height: "30px"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, D.nav.map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => onNav(n),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: active === n ? "var(--signal-yellow)" : "var(--text-body-on-dark)",
      padding: "6px 0",
      borderBottom: active === n ? "2px solid var(--signal-yellow)" : "2px solid transparent",
      transition: "color var(--dur-base) var(--ease-standard)"
    }
  }, n)), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "sm",
    onClick: () => onNav("Contact")
  }, "Start the project")));
}
function Footer({
  onNav
}) {
  const D = window.STOLMAR_DATA;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border-hair-on-dark)",
      padding: "48px 40px 40px",
      background: "var(--ink-900)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: WORDMARK,
    alt: "STOLMAR",
    style: {
      height: 26,
      filter: "invert(1)",
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.7,
      color: "var(--text-muted-on-dark)",
      letterSpacing: "0.02em"
    }
  }, D.studio.name, /*#__PURE__*/React.createElement("br", null), D.studio.address)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      textAlign: "right",
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      textTransform: "uppercase",
      color: "var(--paper-000)",
      fontSize: "clamp(28px,4vw,46px)",
      lineHeight: 0.98,
      letterSpacing: "-0.02em"
    }
  }, D.hero.lines.join(" ")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--text-body-on-dark)",
      fontWeight: 300
    }
  }, D.hero.standfirst), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "flex",
      alignItems: "center",
      gap: 24,
      justifyContent: "flex-end",
      flexWrap: "wrap",
      fontSize: 12,
      letterSpacing: "0.04em",
      color: "var(--text-body-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, D.studio.email), /*#__PURE__*/React.createElement("span", null, D.studio.phone), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal-yellow)"
    }
  }, D.studio.site), /*#__PURE__*/React.createElement(InstagramBadge, null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      paddingTop: 20,
      borderTop: "1px solid var(--border-hair-on-dark)",
      display: "flex",
      justifyContent: "space-between",
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-muted-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 STOLMAR"), /*#__PURE__*/React.createElement("span", null, "One workshop \u2014 built to be seen")));
}
Object.assign(window, {
  Header,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
// STOLMAR website — Contact / request access (gated).
function Contact() {
  const D = window.STOLMAR_DATA;
  const {
    Input,
    Button,
    Badge
  } = window.STOLMARDesignSystem_e129fc;
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      minHeight: 600
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 40px",
      borderRight: "1px solid var(--border-hair-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--signal-yellow)",
      marginBottom: 24
    }
  }, "Request a quote"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "var(--paper-000)",
      fontSize: "clamp(36px,5vw,68px)",
      lineHeight: 0.98,
      letterSpacing: "-0.02em"
    }
  }, "Tell us what", /*#__PURE__*/React.createElement("br", null), "you're building."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 420,
      marginTop: 28,
      fontWeight: 300,
      fontSize: 16,
      lineHeight: 1.7,
      color: "var(--text-body-on-dark)"
    }
  }, "Send us the scope and we'll come back with a tailored estimate. We work with agencies and brands directly."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--paper-000)",
      fontWeight: 700,
      fontSize: 22,
      textDecoration: "none",
      letterSpacing: "-0.01em"
    }
  }, D.studio.email), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-body-on-dark)",
      fontSize: 14
    }
  }, D.studio.phone), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted-on-dark)",
      fontSize: 13,
      lineHeight: 1.6
    }
  }, D.studio.address))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 40px",
      background: "var(--surface-stage-raised)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "active",
    onDark: true
  }, "Received"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 28,
      color: "var(--paper-000)",
      letterSpacing: "-0.01em"
    }
  }, "We'll be in touch."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-body-on-dark)",
      fontWeight: 300,
      maxWidth: 320
    }
  }, "Expect a reply within two working days with an estimate and next steps.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    onDark: true,
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Company",
    onDark: true,
    placeholder: "Maison / agency"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    onDark: true,
    placeholder: "you@studio.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Brief",
    onDark: true,
    multiline: true,
    rows: 3,
    placeholder: "Scope, timeline, and rough budget?"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Request quote"))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
// STOLMAR website — Home / hero screen.
const HOME_MARK = "../../assets/logo-mark.svg";
function Home({
  onNav,
  scrollCue
}) {
  const D = window.STOLMAR_DATA;
  const {
    Button,
    ProjectTile,
    Tag
  } = window.STOLMARDesignSystem_e129fc;
  const teaser = D.projects.slice(0, 4);
  const cue = scrollCue || "line";
  let cueGlyph;
  if (cue === "mouse") {
    cueGlyph = /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        width: 20,
        height: 32,
        border: "1.5px solid var(--ink-600)",
        borderRadius: 11,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "cue-mouse-dot",
      style: {
        position: "absolute",
        left: "50%",
        top: 6,
        width: 3,
        height: 6,
        marginLeft: -1.5,
        borderRadius: 2,
        background: "var(--signal-yellow)"
      }
    }));
  } else if (cue === "chevrons") {
    cueGlyph = /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3
      }
    }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "cue-chev",
      style: {
        width: 9,
        height: 9,
        borderRight: "2px solid var(--signal-yellow)",
        borderBottom: "2px solid var(--signal-yellow)",
        transform: "rotate(45deg)",
        animationDelay: i * 0.15 + "s"
      }
    })));
  } else if (cue === "dot") {
    cueGlyph = /*#__PURE__*/React.createElement("span", {
      className: "cue-dot",
      style: {
        display: "inline-block",
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "var(--signal-yellow)"
      }
    });
  } else {
    cueGlyph = /*#__PURE__*/React.createElement("span", {
      className: "scroll-cue",
      style: {
        display: "inline-block",
        width: 1,
        height: 34,
        background: "var(--ink-600)",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: 14,
        background: "var(--signal-yellow)"
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      padding: "40px 40px 72px",
      overflow: "hidden",
      minHeight: "calc(100vh - 72px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: HOME_MARK,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: -120,
      top: 80,
      width: 560,
      opacity: 0.1,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: 1100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--signal-yellow)",
      marginBottom: 28
    }
  }, D.hero.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "var(--paper-000)",
      fontSize: "clamp(48px, 8vw, 112px)",
      lineHeight: 0.96,
      letterSpacing: "-0.02em"
    }
  }, D.hero.lines.join(" ")), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 560,
      marginTop: 36,
      fontSize: 18,
      lineHeight: 1.7,
      color: "var(--text-body-on-dark)",
      fontWeight: "300"
    }
  }, D.hero.standfirst), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => onNav("Showcase"),
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Glimpse the work"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav("Capabilities"),
    style: {
      color: "var(--paper-000)",
      borderColor: "var(--ink-600)"
    }
  }, "The studio"))), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 40,
      bottom: 28,
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: "var(--text-muted-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase"
    }
  }, "Scroll"), cueGlyph)), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      borderTop: "1px solid var(--border-hair-on-dark)",
      borderBottom: "1px solid var(--border-hair-on-dark)"
    }
  }, D.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.v,
    style: {
      padding: "36px 40px",
      borderLeft: i ? "1px solid var(--border-hair-on-dark)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      fontSize: 56,
      lineHeight: 1,
      color: "var(--paper-000)",
      letterSpacing: "-0.02em"
    }
  }, s.k), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--text-muted-on-dark)"
    }
  }, s.v)))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 40px 88px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontWeight: 700,
      fontSize: 28,
      color: "var(--paper-000)",
      letterSpacing: "-0.01em"
    }
  }, "Behind closed windows"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted-on-dark)"
    }
  }, "Hover to reveal \xB7 selected glimpses only")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, teaser.map(p => /*#__PURE__*/React.createElement(ProjectTile, {
    key: p.title,
    eyebrow: p.eyebrow,
    title: p.title,
    materials: p.materials,
    markSrc: HOME_MARK,
    imageSrc: p.image,
    ratio: "3 / 4",
    onClick: () => onNav("Showcase")
  })))));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Studio.jsx
try { (() => {
// STOLMAR website — Capabilities (reference-style sections, CSS-driven entrance).
const Y = "var(--signal-yellow)";

// Headline with a yellow ampersand
function AmpTitle({
  text,
  style
}) {
  const parts = text.split("&");
  return /*#__PURE__*/React.createElement("h3", {
    style: style
  }, parts.map((p, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, p, i < parts.length - 1 ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: Y
    }
  }, "&") : null)));
}

// Typewriter-cycle: types out each word in `words` letter by letter, holds,
// deletes, then moves to the next — loops forever. Falls back to a static
// first word (no animation) when the OS asks for reduced motion.
function TypeCycle({
  words
}) {
  const list = words && words.length ? words : [""];
  const reduced = React.useMemo(() => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const [i, setI] = React.useState(0);
  const [sub, setSub] = React.useState(reduced || list.length <= 1 ? list[0].length : 0);
  const [mode, setMode] = React.useState("typing");
  React.useEffect(() => {
    if (reduced || list.length <= 1) return;
    const word = list[i];
    let t;
    if (mode === "typing") {
      if (sub < word.length) t = setTimeout(() => setSub(n => n + 1), 62);else t = setTimeout(() => setMode("deleting"), 1500);
    } else {
      if (sub > 0) t = setTimeout(() => setSub(n => n - 1), 34);else t = setTimeout(() => {
        setI(n => (n + 1) % list.length);
        setMode("typing");
      }, 350);
    }
    return () => clearTimeout(t);
  }, [sub, mode, i, list, reduced]);
  const shown = list[i].slice(0, sub);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, shown, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "type-caret",
    style: {
      display: "inline-block",
      width: "0.06em",
      height: "0.8em",
      marginLeft: "0.09em",
      background: Y,
      verticalAlign: "-0.08em"
    }
  }));
}

// Two-tone glitch hero heading
function GlitchHeading({
  a,
  bWords
}) {
  const layer = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    mixBlendMode: "screen"
  };
  const words = bWords && bWords.length ? bWords : [""];
  return /*#__PURE__*/React.createElement("h1", {
    "aria-label": a + ". " + words[0] + ".",
    style: {
      position: "relative",
      margin: 0,
      fontWeight: 900,
      textTransform: "uppercase",
      fontSize: "clamp(40px,7vw,104px)",
      lineHeight: 0.92,
      letterSpacing: "-0.025em",
      maxWidth: 1180
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "block",
      color: "var(--paper-000)"
    }
  }, a), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "block",
      color: "var(--ink-500)"
    }
  }, /*#__PURE__*/React.createElement(TypeCycle, {
    words: words
  })), /*#__PURE__*/React.createElement("span", {
    className: "glitch-a",
    style: layer,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "#ff2d2d"
    }
  }, a)), /*#__PURE__*/React.createElement("span", {
    className: "glitch-b",
    style: layer,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "#22e0ff"
    }
  }, a)));
}

// ── Animated technical diagrams ────────────────────────────────
// 01 — Storefront window display (POS & visual merchandising)
function WindowViz() {
  // simple one-point perspective: front frame recedes to a back wall
  const F = {
    l: 56,
    r: 344,
    t: 92,
    b: 344
  };
  const B = {
    l: 150,
    r: 250,
    t: 168,
    b: 268
  };
  const edges = [[F.l, F.t, B.l, B.t], [F.r, F.t, B.r, B.t], [F.r, F.b, B.r, B.b], [F.l, F.b, B.l, B.b]];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 400",
    width: "100%",
    height: "100%",
    fill: "none"
  }, edges.map((e, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    className: "rv-stroke",
    x1: e[0],
    y1: e[1],
    x2: e[2],
    y2: e[3],
    stroke: "var(--ink-600)",
    strokeWidth: "1",
    style: {
      animationDelay: 0.5 + i * 0.08 + "s"
    }
  })), /*#__PURE__*/React.createElement("rect", {
    className: "rv-stroke",
    x: B.l,
    y: B.t,
    width: B.r - B.l,
    height: B.b - B.t,
    stroke: "var(--paper-000)",
    strokeWidth: "1.3",
    style: {
      animationDelay: "0.8s"
    }
  }), /*#__PURE__*/React.createElement("rect", {
    className: "rv-stroke",
    x: F.l,
    y: F.t,
    width: F.r - F.l,
    height: F.b - F.t,
    stroke: Y,
    strokeWidth: "1.6",
    style: {
      animationDelay: "0.15s"
    }
  }), /*#__PURE__*/React.createElement("circle", {
    className: "rv-pop",
    cx: "200",
    cy: "226",
    r: "14",
    fill: Y,
    style: {
      animationDelay: "1.05s"
    }
  }));
}

// 02 — Booth floor plan, top-down (retail spaces & exhibitions)
function PlanViz() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 400",
    width: "100%",
    height: "100%",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "70",
    y1: "60",
    x2: "330",
    y2: "60",
    stroke: "var(--ink-600)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "70",
    y1: "54",
    x2: "70",
    y2: "66",
    stroke: "var(--ink-600)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "330",
    y1: "54",
    x2: "330",
    y2: "66",
    stroke: "var(--ink-600)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    className: "rv-stroke",
    d: "M330,310 L240,310 M160,310 L70,310 L70,90 L330,90 L330,310",
    stroke: Y,
    strokeWidth: "1.6",
    style: {
      animationDelay: "0.15s"
    }
  }), /*#__PURE__*/React.createElement("path", {
    className: "rv-stroke",
    d: "M232,90 L232,200 L330,200",
    stroke: "var(--paper-000)",
    strokeWidth: "1.4",
    style: {
      animationDelay: "0.45s"
    }
  }), /*#__PURE__*/React.createElement("path", {
    className: "rv-stroke",
    d: "M160,310 A80,80 0 0 1 160,230",
    stroke: "var(--ink-600)",
    strokeWidth: "1",
    style: {
      animationDelay: "0.7s"
    }
  }), /*#__PURE__*/React.createElement("rect", {
    className: "rv-pop",
    x: "118",
    y: "158",
    width: "62",
    height: "62",
    fill: Y,
    style: {
      animationDelay: "1s"
    }
  }), /*#__PURE__*/React.createElement("rect", {
    className: "rv-pop",
    x: "262",
    y: "230",
    width: "44",
    height: "44",
    fill: "none",
    stroke: "var(--paper-000)",
    strokeWidth: "1.4",
    style: {
      animationDelay: "1.1s"
    }
  }));
}

// 03 — Stage with overhead lighting rig (brand experiences & events)
function StageViz() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 400",
    width: "100%",
    height: "100%",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    className: "rv-stroke",
    x1: "60",
    y1: "92",
    x2: "340",
    y2: "92",
    stroke: "var(--paper-000)",
    strokeWidth: "1.6",
    style: {
      animationDelay: "0.2s"
    }
  }), [96, 165, 235, 304].map((x, i) => /*#__PURE__*/React.createElement("g", {
    key: x
  }, /*#__PURE__*/React.createElement("rect", {
    className: "rv-pop",
    x: x - 7,
    y: "92",
    width: "14",
    height: "12",
    fill: "none",
    stroke: "var(--ink-600)",
    strokeWidth: "1",
    style: {
      animationDelay: 0.5 + i * 0.06 + "s"
    }
  }), /*#__PURE__*/React.createElement("circle", {
    className: "rv-pop",
    cx: x,
    cy: "108",
    r: "3",
    fill: Y,
    style: {
      animationDelay: 0.6 + i * 0.06 + "s"
    }
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M200,104 L150,300 L250,300 Z",
    fill: Y,
    opacity: "0.07"
  }), [120, 200, 280].map(x => /*#__PURE__*/React.createElement("line", {
    key: x,
    x1: "200",
    y1: "110",
    x2: x,
    y2: "300",
    stroke: "var(--ink-600)",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    className: "rv-stroke",
    d: "M64,300 L336,300 L304,346 L96,346 Z",
    stroke: Y,
    strokeWidth: "1.6",
    style: {
      animationDelay: "0.45s"
    }
  }), /*#__PURE__*/React.createElement("circle", {
    className: "rv-pop",
    cx: "200",
    cy: "244",
    r: "13",
    fill: Y,
    style: {
      animationDelay: "1.05s"
    }
  }), /*#__PURE__*/React.createElement("path", {
    className: "rv-pop",
    d: "M186,257 L214,257 L208,300 L192,300 Z",
    fill: Y,
    style: {
      animationDelay: "1.05s"
    }
  }));
}
const VIZ = {
  window: WindowViz,
  plan: PlanViz,
  stage: StageViz
};
function VizFrame({
  kind,
  photo
}) {
  const isPhoto = kind === "photo" && photo;
  const V = isPhoto ? null : VIZ[kind] || WindowViz;
  return /*#__PURE__*/React.createElement("div", {
    className: "cap3-viz-wrap"
  }, isPhoto ? /*#__PURE__*/React.createElement("div", {
    className: "rv-pop",
    style: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      animationDelay: "0.15s"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "grayscale(0.25) contrast(1.06) brightness(0.92)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      boxShadow: "inset 0 0 40px 6px rgba(0,0,0,0.5)"
    }
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 10
    }
  }, /*#__PURE__*/React.createElement(V, null)));
}
function CategoryColumn({
  s,
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cap3-col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "0.1em",
      color: Y,
      marginBottom: 18
    }
  }, "/ ", s.n), /*#__PURE__*/React.createElement(AmpTitle, {
    text: s.t,
    style: {
      margin: 0,
      fontWeight: 700,
      fontSize: "clamp(20px,2vw,26px)",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      color: "var(--paper-000)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontWeight: 300,
      fontSize: 15,
      lineHeight: 1.7,
      color: "var(--text-body-on-dark)"
    }
  }, s.d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, s.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--text-body-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      background: Y,
      flexShrink: 0
    }
  }), it))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(VizFrame, {
    kind: s.viz,
    photo: s.photo
  }), /*#__PURE__*/React.createElement("button", {
    className: "cap3-cta",
    onClick: () => onNav && onNav("Contact")
  }, "Enquire ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2197")));
}
function Studio({
  onNav
}) {
  const D = window.STOLMAR_DATA;
  const H = D.capHero;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 40px 72px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: Y,
      marginBottom: 30
    }
  }, "/ ", H.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      animationDelay: "0.08s"
    }
  }, /*#__PURE__*/React.createElement(GlitchHeading, {
    a: H.headlineA,
    bWords: H.headlineCycle && H.headlineCycle.length ? H.headlineCycle : [H.headlineB]
  })), /*#__PURE__*/React.createElement("p", {
    className: "rv",
    style: {
      maxWidth: 640,
      marginTop: 34,
      fontWeight: 300,
      fontSize: 18,
      lineHeight: 1.7,
      color: "var(--text-body-on-dark)",
      animationDelay: "0.24s"
    }
  }, H.standfirst)), /*#__PURE__*/React.createElement("div", {
    className: "cap3-grid"
  }, D.services.map(s => /*#__PURE__*/React.createElement(CategoryColumn, {
    key: s.n,
    s: s,
    onNav: onNav
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "56px 0 88px",
      borderTop: "1px solid var(--border-hair-on-dark)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--text-muted-on-dark)",
      marginBottom: 28,
      padding: "0 40px"
    }
  }, "Installed on-site across Europe"), /*#__PURE__*/React.createElement("div", {
    className: "marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee-track"
  }, [0, 1].map(dup => /*#__PURE__*/React.createElement("div", {
    key: dup,
    "aria-hidden": dup === 1,
    style: {
      display: "flex",
      gap: "0 12px",
      paddingRight: 12
    }
  }, D.locations.map(l => /*#__PURE__*/React.createElement("span", {
    key: dup + l,
    style: {
      fontWeight: 700,
      fontSize: "clamp(22px,3vw,38px)",
      letterSpacing: "-0.01em",
      color: "var(--paper-000)",
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }
  }, l, /*#__PURE__*/React.createElement("span", {
    style: {
      color: Y
    }
  }, " \xB7")))))))));
}
Object.assign(window, {
  Studio
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Studio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Work.jsx
try { (() => {
// STOLMAR website — Work / concealed project index.
const WORK_MARK = "../../assets/logo-mark-white.png";
function Work() {
  const D = window.STOLMAR_DATA;
  const {
    ProjectTile,
    Tag
  } = window.STOLMARDesignSystem_e129fc;
  const [filter, setFilter] = React.useState("All");
  const tags = ["All", "Production", "Prototype", "Assembly"];
  const shown = filter === "All" ? D.projects : D.projects.filter(p => p.tag === filter);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "72px 40px 88px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--signal-yellow)",
      marginBottom: 20
    }
  }, "Selected projects \xB7 2023\u20142026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "var(--paper-000)",
      fontSize: "clamp(40px,6vw,80px)",
      lineHeight: 0.98,
      letterSpacing: "-0.02em",
      maxWidth: 900
    }
  }, "Most of it stays", /*#__PURE__*/React.createElement("br", null), "quietly out of frame."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 520,
      marginTop: 28,
      fontWeight: 300,
      fontSize: 16,
      lineHeight: 1.7,
      color: "var(--text-body-on-dark)"
    }
  }, "Discretion is part of the craft \u2014 many campaigns launch under wraps before they reach the public. Hover a tile for a glimpse of materials and methods, or get in touch for the full story."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      margin: "36px 0 28px"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setFilter(t),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    onDark: true,
    variant: filter === t ? "accent" : "outline"
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, shown.map(p => /*#__PURE__*/React.createElement(ProjectTile, {
    key: p.title,
    eyebrow: p.eyebrow,
    title: p.title,
    materials: p.materials,
    markSrc: WORK_MARK,
    imageSrc: p.image,
    ratio: "3 / 4"
  }))));
}
Object.assign(window, {
  Work
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Work.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// STOLMAR website — shared content (drawn from the 2026 selected-projects portfolio).
window.STOLMAR_DATA = {
  nav: ["Capabilities", "Showcase", "Contact"],
  hero: {
    eyebrow: "Design · Production · Installation",
    lines: ["Built to be seen."],
    standfirst: "We combine creativity with production versatility"
  },
  stats: [{
    k: "30+",
    v: "Years in production"
  }, {
    k: "9",
    v: "Cities installed, last season"
  }, {
    k: "1",
    v: "Workshop, from concept to installation"
  }],
  projects: [{
    eyebrow: "Window · 2025",
    title: "Anniversary Campaign",
    materials: ["CNC-milled", "latex print", "rotating mechanism"],
    tag: "Prototype",
    image: "../../assets/work/medicine-window-2025.png"
  }, {
    eyebrow: "Event · 2026",
    title: "Event Decoration",
    materials: ["3D printed", "high-gloss metallic"],
    tag: "Production"
  }, {
    eyebrow: "Instore · 2026",
    title: "Showroom",
    materials: ["oak veneer", "solid oak", "leather", "hidden steel"],
    tag: "Production"
  }, {
    eyebrow: "Window · Q4 2025",
    title: "Window Decoration",
    materials: ["UV print on MDF", "3D printed", "hand-painted"],
    tag: "Assembly"
  }, {
    eyebrow: "Worldwide · 2024",
    title: "100 Years Celebration",
    materials: ["pen replicas 15–260cm", "3D print", "high-gloss"],
    tag: "Production"
  }, {
    eyebrow: "Wall · 2025",
    title: "Moss Logo",
    materials: ["stabilized moss", "metal frame", "integrated lighting"],
    tag: "Production"
  }, {
    eyebrow: "Prototype · 2025",
    title: "Miniature Animals",
    materials: ["3D resin", "hand-painted"],
    tag: "Prototype"
  }, {
    eyebrow: "Instore · 2024",
    title: "Holiday Decorations",
    materials: ["fabric", "painted HDF", "felt", "flock"],
    tag: "Production"
  }],
  capHero: {
    eyebrow: "What we do",
    headlineA: "Three disciplines",
    headlineB: "One workshop",
    headlineCycle: ["One workshop", "Every material", "Every technology"],
    standfirst: "Designed, produced and installed under one roof — from a single window display to global retail rollouts."
  },
  services: [{
    n: "01",
    t: "POS Campaigns & Visual Merchandising",
    d: "From seasonal window displays to multi-market rollouts — we design and produce every POS element in-house, delivering brand consistency at any scale.",
    items: ["Window displays", "Seasonal VM campaigns", "Instore installations", "Global rollouts"],
    viz: "photo",
    photo: "../../assets/work/storefront-medicine-optimized.png"
  }, {
    n: "02",
    t: "Retail Spaces & Exhibitions",
    d: "Pop-up stores, exhibition booths, and bespoke retail environments — built to specification, from custom furniture and shop fittings through to full installation.",
    items: ["Pop-up stores", "Exhibition displays", "Custom furniture & shop fittings", "Retail installations"],
    viz: "photo",
    photo: "../../assets/work/manuba-stand.png"
  }, {
    n: "03",
    t: "Brand Experiences & Events",
    d: "Scenography, event props, and temporary brand spaces that turn occasions into brand memories — conceived, built, and installed entirely in-house.",
    items: ["Scenography", "Event props", "Temporary brand spaces", "Brand experience elements"],
    viz: "photo",
    photo: "../../assets/work/event-prasowy.png"
  }],
  inhouse: [{
    icon: "design",
    t: "Design",
    d: "Conceptual & industrial design, from brief to engineering-ready specs."
  }, {
    icon: "tech",
    t: "Technical development",
    d: "Prototyping, model shop, material and method resolved in-house."
  }, {
    icon: "material",
    t: "Wood, metal & plastics",
    d: "CNC routing, structural carpentry, laser cutting, welding, powder coating, acrylic/PVC/PC processing."
  }, {
    icon: "print",
    t: "HP latex printing",
    d: "Large-format, UV-resistant, water-based ink."
  }, {
    icon: "print3d",
    t: "3D printing (FDM/SLA)",
    d: "Prototyping through final-finish production elements."
  }, {
    icon: "paint",
    t: "Dust-free paint shop",
    d: "Lacquering, varnishing and specialty surface finishes."
  }, {
    icon: "craft",
    t: "Handcraft & mixed media",
    d: "Paper mâché, textile and sculptural techniques."
  }, {
    icon: "install",
    t: "Installations",
    d: "From a single installation to a global window-display campaign."
  }],
  locations: ["Düsseldorf", "Berlin KaDeWe", "Hamburg", "Stuttgart", "Baden-Baden", "Frankfurt", "Munich", "Prague", "Vienna", "Paris Printemps"],
  studio: {
    name: "STOLMAR Marian Czajkowski Sp. k.",
    address: "Chmielewskiego 10/1, 81-721 Sopot, PL",
    email: "info@stolmar.co",
    site: "stolmar.co",
    phone: "+48 502 318 152"
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProjectTile = __ds_scope.ProjectTile;

})();
