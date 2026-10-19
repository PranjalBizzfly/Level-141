/**
 * Official Level141 marks, traced 1:1 from the supplied Illustrator files
 * (Docs/logo-1…6.pdf). Paths are unmodified; only the colour is inherited
 * via currentColor so the same mark serves the black and white variants.
 */

type MarkProps = { className?: string; title?: string };

const SYMBOL_D =
  "M752.183 527.580L717.677 527.580L717.677 447.120L639.999 447.120L639.999 412.656L752.183 412.656ZM639.999 662.014L527.817 662.014L527.817 547.050L562.321 547.050L562.321 627.509L639.999 627.509ZM451.953 725.382L828.048 725.382L828.048 349.288L451.953 349.288Z";

const LOCKUP_D = [
  "M366.975 534.439L356.734 534.439L356.734 510.559L333.679 510.559L333.679 500.329L366.975 500.329ZM333.679 574.339L300.383 574.339L300.383 540.218L310.624 540.218L310.624 564.098L333.679 564.098ZM277.866 593.147L389.491 593.147L389.491 481.522L277.866 481.522Z",
  "M464.854 502.269L454.188 502.269L454.188 572.394L499.027 572.394L499.027 562.615L464.854 562.615Z",
  "M527.966 541.975L561.744 541.975L561.744 532.493L527.966 532.493L527.966 512.048L562.928 512.048L562.928 502.269L517.300 502.269L517.300 572.394L563.718 572.394L563.718 562.615L527.966 562.615Z",
  "M614.088 560.544L593.445 502.270L582.087 502.270L607.373 572.395L620.706 572.395L646.089 502.270L634.731 502.270Z",
  "M674.729 541.975L708.507 541.975L708.507 532.493L674.729 532.493L674.729 512.048L709.691 512.048L709.691 502.269L664.063 502.269L664.063 572.394L710.481 572.394L710.481 562.615L674.729 562.615Z",
  "M744.754 502.269L734.088 502.269L734.088 572.394L778.927 572.394L778.927 562.615L744.754 562.615Z",
  "M859.717 503.259L849.644 503.259L835.618 516.394L835.618 528.542L849.644 515.505L850.038 515.505L850.038 563.307L835.716 563.307L835.716 572.394L872.852 572.394L872.852 563.307L859.717 563.307Z",
  "M922.135 547.308L900.703 547.308L922.135 515.407ZM932.109 503.259L919.271 503.259L890.726 546.813L890.726 555.405L922.035 555.505L922.035 572.394L932.109 572.394L932.109 555.505L941.591 555.505L941.591 547.405L932.109 547.405Z",
  "M988.999 563.308L988.999 503.260L978.925 503.260L964.900 516.395L964.900 528.543L978.925 515.505L979.320 515.505L979.320 563.308L964.998 563.308L964.998 572.395L1002.134 572.395L1002.134 563.308Z",
];

function Svg({ viewBox, className, title, children }: MarkProps & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Logo 1 / 2 — symbol + wordmark lockup. */
export function LogoLockup({ className, title = "Level141" }: MarkProps) {
  return (
    <Svg viewBox="276.87 480.52 726.27 113.63" className={className} title={title}>
      {LOCKUP_D.map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
    </Svg>
  );
}

/** Logo 3 / 4 — the bracket symbol. */
export function LogoSymbol({ className, title }: MarkProps) {
  return (
    <Svg viewBox="450.95 348.29 378.1 378.09" className={className} title={title}>
      <path d={SYMBOL_D} />
    </Svg>
  );
}

/**
 * Lockup with its parts grouped (symbol / LEVEL / 141) so the halves can part
 * on hover (.logo-split). Paths are the official ones, unmodified.
 */
export function LogoLockupSplit({ className, title = "Level141" }: MarkProps) {
  return (
    <Svg viewBox="276.87 480.52 726.27 113.63" className={className} title={title}>
      <g className="lk-symbol">
        <path d={LOCKUP_D[0]} />
      </g>
      <g className="lk-level">
        {LOCKUP_D.slice(1, 6).map((d) => (
          <path key={d.slice(0, 16)} d={d} />
        ))}
      </g>
      <rect className="lk-gap" x="801" y="503" width="5" height="70" />
      <g className="lk-141">
        {LOCKUP_D.slice(6).map((d) => (
          <path key={d.slice(0, 16)} d={d} />
        ))}
      </g>
    </Svg>
  );
}

/** Glyph boxes (x, width) inside the lockup, for single-letter use. */
const GLYPHS = [
  [454.19, 44.84],
  [517.3, 46.42],
  [582.09, 64.0],
  [664.06, 46.42],
  [734.09, 44.84],
  [835.62, 37.24],
  [890.73, 50.86],
  [964.9, 37.24],
] as const;

/** One official letterform of the wordmark (0–4 = L E V E L, 5–7 = 1 4 1). */
export function LogoGlyph({ index, className }: { index: number; className?: string }) {
  const [x, w] = GLYPHS[index];
  return (
    <Svg viewBox={`${x} 501.27 ${w} 72.13`} className={className}>
      <path d={LOCKUP_D[index + 1]} />
    </Svg>
  );
}

/** "LEVEL" or "141" alone, from the official wordmark. */
export function LogoWordHalf({ part, className }: { part: "level" | "141"; className?: string }) {
  const level = part === "level";
  return (
    <Svg viewBox={level ? "453.19 501.27 326.74 72.13" : "834.62 501.27 168.51 72.13"} className={className}>
      {(level ? LOCKUP_D.slice(1, 6) : LOCKUP_D.slice(6)).map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
    </Svg>
  );
}

/** Logo 5 / 6 — wordmark only (shares glyphs with the lockup). */
export function LogoWordmark({ className, title = "Level141" }: MarkProps) {
  return (
    <Svg viewBox="453.19 501.27 549.95 72.13" className={className} title={title}>
      {LOCKUP_D.slice(1).map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
    </Svg>
  );
}

/**
 * The two corner brackets of the symbol, used on their own as the brand's
 * quotation/framing motif. Geometry is lifted from the symbol unchanged.
 */
export function BracketOpen({ className }: { className?: string }) {
  // bottom-left bracket, normalised to its own box (112.18 × 114.96)
  return (
    <svg viewBox="0 0 112.18 114.96" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d="M112.18 114.96H0V0h34.5v80.46h77.68z" />
    </svg>
  );
}

export function BracketClose({ className }: { className?: string }) {
  // top-right bracket, normalised to its own box (112.18 × 114.92)
  return (
    <svg viewBox="0 0 112.18 114.92" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d="M0 0h112.18v114.92H77.68V34.46H0z" />
    </svg>
  );
}
