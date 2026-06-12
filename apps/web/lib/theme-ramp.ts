/**
 * Derive the full GlassKit accent ramp from one hex — the theming contract
 * (styles.css token block) computed instead of hand-picked. Calibrated so the
 * derived steps land within a few hex points of the four hand-tuned presets:
 * lightness moves in OKLab (perceptually even across hues), chroma falls off
 * toward the dark end so deep steps don't clip to neon.
 */

export type Ramp = {
  active: string;
  accent: string;
  muted: string;
  faint: string;
  gradHi: string;
  gradLo: string;
  glow: string;
};

type Oklch = { L: number; C: number; h: number };

const srgb2lin = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const lin2srgb = (c: number) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;

export function hexToOklch(hex: string): Oklch {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) =>
    srgb2lin(v / 255),
  ) as [number, number, number];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(a, bb), h: Math.atan2(bb, a) };
}

export function oklchToHex({ L, C, h }: Oklch): string {
  const a = C * Math.cos(h);
  const bb = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * bb) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * bb) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * bb) ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const ch = (v: number) =>
    Math.round(Math.max(0, Math.min(1, lin2srgb(v))) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${ch(r)}${ch(g)}${ch(b)}`;
}

export function deriveRamp(accent: string): Ramp {
  const { L, C, h } = hexToOklch(accent);
  const lo = oklchToHex({ L: L * 0.84, C: C * 0.88, h });
  const n = parseInt(lo.slice(1), 16);
  return {
    active: oklchToHex({ L: Math.min(1, L + 0.12), C: C * 0.82, h }),
    accent,
    muted: oklchToHex({ L: L * 0.75, C: C * 0.68, h }),
    faint: oklchToHex({ L: L * 0.47, C: C * 0.42, h }),
    gradHi: oklchToHex({ L: Math.min(1, L + 0.045), C: C * 0.95, h }),
    gradLo: lo,
    glow: `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, 0.6)`,
  };
}

/** The CSS block consumers paste — the entire theming contract. */
export function rampCss(ramp: Ramp): string {
  return `.glass-viewport {
  --accent-active: ${ramp.active};
  --accent: ${ramp.accent};
  --accent-muted: ${ramp.muted};
  --accent-faint: ${ramp.faint};
  --accent-grad-hi: ${ramp.gradHi};
  --accent-grad-lo: ${ramp.gradLo};
  --accent-glow: ${ramp.glow};
}`;
}
