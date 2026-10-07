import type { CSSProperties } from "react";

const toneColor = {
  clay: "var(--color-clay-600)",
  leaf: "var(--color-leaf-600)",
  sea: "var(--color-sea-600)",
} as const;

export type StampTone = keyof typeof toneColor;

type StampProps = {
  label: string;
  sub: string;
  tone?: StampTone;
  rotate?: number;
  size?: number;
  /** Animate a "press" when it appears. Delay in ms. */
  pressDelay?: number;
  className?: string;
};

/**
 * Circular rubber stamp. The curved ring text and the uneven-ink texture come
 * from shared <defs> rendered once by <StampDefs /> (SVG ids work across all
 * inline SVGs in the same document), so a page full of stamps stays light.
 */
export function Stamp({ label, sub, tone = "clay", rotate = 0, size = 132, pressDelay, className }: StampProps) {
  const style = {
    color: toneColor[tone],
    "--stamp-rotate": `${rotate}deg`,
    transform: `rotate(${rotate}deg)`,
    animationDelay: pressDelay !== undefined ? `${pressDelay}ms` : undefined,
  } as CSSProperties;

  // Keep the label inside the inner ring (r=38) whatever its length.
  const fontSize = label.length <= 4 ? 21 : label.length <= 6 ? 16.5 : 13.5;

  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      role="img"
      aria-label={`${label} stamp, ${sub}`}
      className={`${pressDelay !== undefined ? "animate-stamp" : ""} ${className ?? ""}`}
      style={style}
    >
      <g filter="url(#kelana-ink)" fill="none" stroke="currentColor">
        <circle cx="70" cy="70" r="64" strokeWidth="3" />
        <circle cx="70" cy="70" r="58" strokeWidth="1.2" />
        <circle cx="70" cy="70" r="38" strokeWidth="1.2" />
        <text fill="currentColor" stroke="none" fontFamily="var(--font-mono)" fontSize="8.2" fontWeight="600" letterSpacing="2.4">
          <textPath href="#kelana-ring" startOffset="0">
            KELANA PASSPORT · BALI · CHECKED IN ·
          </textPath>
        </text>
        <text
          x="70"
          y="72"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontFamily="var(--font-display)"
          fontSize={fontSize}
        >
          {label}
        </text>
        <text
          x="70"
          y="88"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="1.5"
        >
          {sub}
        </text>
      </g>
    </svg>
  );
}

/** Render once per page. Holds the ring path and the ink-texture filter. */
export function StampDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <path id="kelana-ring" d="M70,70 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
        <filter id="kelana-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.15 1.3" result="speckle" />
          <feComposite in="SourceGraphic" in2="speckle" operator="in" result="inked" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" seed="3" result="warp" />
          <feDisplacementMap in="inked" in2="warp" scale="1.6" />
        </filter>
      </defs>
    </svg>
  );
}
