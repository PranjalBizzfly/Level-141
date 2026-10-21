"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Home-page interactions (scroll-linked, all in the brand's black and white):
 *
 * - Layers: sections stack like sheets. Each holds still once its end is on
 *   screen while the next slides over it; every arrival has its own pattern
 *   (app/home-layers.css).
 * - BeliefDeck: the section pins for a while and its cards
 *   turn over one at a time as you scroll.
 *
 * Reduced motion: no pinning, no 3D; everything is shown in its final state.
 * All text stays in the DOM, so it reads with or without the motion.
 */

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
export function useReducedMotion() {
  return useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const n2 = (i: number) => String(i + 1).padStart(2, "0");

/** Calls fn on every animation frame in which the page scrolled or resized. */
export function useScrollFrame(fn: () => void, enabled: boolean) {
  const cb = useRef(fn);
  useEffect(() => {
    cb.current = fn;
  });
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const run = () => {
      frame = 0;
      cb.current();
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [enabled]);
}

/** 0 → 1 while a tall track scrolls past its pinned, one-screen stage. */
export function usePinProgress(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const run = r.height - window.innerHeight;
    setP(run > 0 ? clamp(-r.top / run) : 0);
  }, enabled);
  return [ref, p] as const;
}

/* ----------------------------------------------------------------- Layers */

/**
 * Every arrival pattern (app/home-layers.css). Strict rule: across the whole
 * site no pattern is used twice. Home picks its eight by name; every other
 * page owns its own block of the rest, sized to its section count, so no two
 * pages can draw the same pattern.
 */
const HOME_PATTERNS = ["tilt", "curtain", "depth", "split", "doors", "slide", "turn", "zoom"] as const;
const PAGE_PATTERNS = [
  // about (6)
  "cube", "lens", "hinge", "frame", "sweep", "cornertl",
  // growth-architecture (12)
  "rise", "irisl", "pivot", "box", "fold", "diamond", "orbit", "wipe", "tumble", "chevron", "focus", "blinds",
  // how-we-architect-growth (8)
  "flipup", "iris", "lean", "slant", "spiral", "frame3d", "drift", "louvre",
  // personal-brand-architecture (15)
  "cubeup", "corner", "swing", "peel", "telescope", "diagonal", "roll", "irisb", "stretch", "skew", "driftr", "reveal", "bloom", "swoop", "recline",
  // insights (3)
  "spin", "cornerbl", "mist",
  // an insight article (2)
  "shear", "squeeze",
  // spare
  "cornerbr", "mistl", "heel", "swoopr", "vortex", "float", "arrow",
] as const;
export type LayerPattern = (typeof HOME_PATTERNS)[number] | (typeof PAGE_PATTERNS)[number];

// Guard the rule: no pattern may appear twice across home and the pages.
if (process.env.NODE_ENV !== "production") {
  const all: readonly string[] = [...HOME_PATTERNS, ...PAGE_PATTERNS];
  const twice = all.filter((p, i) => all.indexOf(p) !== i);
  if (twice.length) console.error(`Layers: 3D patterns listed twice: ${twice.join(", ")}`);
}

/** Sections per page, in the order of PAGE_PATTERNS: each page's block starts where the last ended. */
const PAGE_SIZES = { about: 6, growth: 12, how: 8, personal: 15, insights: 3, article: 2 } as const;
export type LayerPage = keyof typeof PAGE_SIZES;
function pageBlock(page: LayerPage) {
  let start = 0;
  for (const [k, n] of Object.entries(PAGE_SIZES)) {
    if (k === page) return PAGE_PATTERNS.slice(start, start + n);
    start += n;
  }
  return [];
}

/** One sheet in the stack, with the way it arrives over the one before. */
export function Layer({ pattern, children }: { pattern?: LayerPattern; children: ReactNode }) {
  return (
    <div className="layer" data-pattern={pattern}>
      {children}
    </div>
  );
}

/**
 * Give each child its pattern: on home, each <Layer pattern> names its own;
 * on any other page, children are wrapped in Layers that take the page's
 * block in order.
 */
function assignPatterns(children: ReactNode, page?: LayerPage) {
  const kids = Children.toArray(children).filter(isValidElement);
  const block: readonly LayerPattern[] = page ? pageBlock(page) : [];
  if (process.env.NODE_ENV !== "production" && page && kids.length > block.length) {
    console.error(`Layers: page "${page}" has ${kids.length} sections but a block of ${block.length} patterns.`);
  }
  return kids.map((c, i) => {
    // A Layer element passed from a server page arrives as a client reference, so its
    // type cannot be compared; a Layer is recognised by the pattern it names.
    const named = (c.props as { pattern?: unknown }).pattern;
    if (typeof named === "string") return c;
    const inner = c;
    return (
      <Layer key={c.key ?? i} pattern={block[i]}>
        {inner}
      </Layer>
    );
  });
}

/**
 * The stack. Each layer is sticky at "top: screen height − its own height",
 * so it holds once its end is on screen and the next layer slides over it.
 * It writes --in (0 → 1, the layer arriving) and --out (0 → 1, the layer
 * being covered) on each layer for the CSS patterns.
 */
export function Layers({ children, page }: { children: ReactNode; page?: LayerPage }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Inner pages don't stack: each section scrolls normally and plays its own
  // arrival as it comes into view (the stacked sheets are kept for home).
  const flat = !!page;
  useScrollFrame(() => {
    const root = ref.current;
    if (!root) return;
    const vh = window.innerHeight;
    const layers = Array.from(root.children) as HTMLElement[];
    if (flat) {
      layers.forEach((el, i) => {
        // Earlier sections stay in front, so an arriving one turns in from behind them.
        el.style.zIndex = String(layers.length - i);
        // Lands by the time its top edge reaches the middle of the screen (no long, empty in-between).
        const inn = clamp((vh - el.getBoundingClientRect().top) / (vh * 0.55));
        el.style.setProperty("--in", inn.toFixed(4));
        el.toggleAttribute("data-landed", inn >= 0.999);
      });
      return;
    }
    layers.forEach((el, i) => {
      const h = el.offsetHeight;
      el.style.top = `${Math.min(0, vh - h)}px`;
      // How far this layer has come up over the previous one (top edge: bottom of screen → top).
      const top = layerTop(layers, i);
      const inn = clamp(1 - top / vh);
      el.style.setProperty("--in", inn.toFixed(4));
      el.toggleAttribute("data-landed", inn >= 0.999);
      if (i > 0) layers[i - 1].style.setProperty("--out", inn < 1 ? inn.toFixed(4) : "1");
    });
    layers.at(-1)?.style.setProperty("--out", "0");
  }, !reduced);
  return (
    <div ref={ref} className={flat ? "layers layers--flat" : "layers"}>
      {assignPatterns(children, page)}
    </div>
  );
}

/** A layer's natural top on screen (its own sticky offset would hide it). */
function layerTop(layers: HTMLElement[], i: number) {
  const el = layers[i];
  const prev = layers[i - 1];
  if (!prev) return el.getBoundingClientRect().top;
  // Layers are in normal flow: this one starts right where the previous one ends.
  const root = el.parentElement!.getBoundingClientRect().top;
  let y = root;
  for (let k = 0; k < i; k++) y += layers[k].offsetHeight;
  return y;
}

/* ------------------------------------------------------------- BeliefDeck */

/**
 * The belief statements as a deck: the section pins and the cards turn over
 * into place one by one, like pages, until the set is complete.
 */
export function BeliefDeck({ items, head, foot }: { items: readonly string[]; head?: ReactNode; foot?: ReactNode }) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = items.length;
  // Leave the last fifth of the pin to rest on the completed set.
  const q = clamp(p / 0.8);

  return (
    <div ref={ref} style={reduced ? undefined : { height: `${100 + n * 35}lvh` }}>
      <div className={reduced ? "py-20 sm:py-20" : "sticky top-0 flex h-[100lvh] flex-col justify-center"}>
        <div className="container-x">
          {head}
          <ul className="mt-8 grid grid-cols-2 gap-2 [perspective:1600px] sm:mt-12 sm:gap-3 lg:grid-cols-3">
            {items.map((t, i) => {
              const k = reduced ? 1 : clamp(q * n - i);
              const e = 1 - Math.pow(1 - k, 3);
              return (
                // The slot shows faintly where each card will land, so the deck reads as a set.
                <li key={t} className="rounded-[1.25rem] border border-dashed border-current/15 [transform-style:preserve-3d] sm:rounded-[1.5rem]">
                  <div
                    className="deck-card flex h-full min-h-[clamp(7.5rem,20vh,13rem)] flex-col justify-between rounded-[1.25rem] border border-current/15 bg-[color-mix(in_oklab,currentColor_4%,var(--color-ink))] p-4 sm:rounded-[1.5rem] sm:p-7"
                    style={{
                      transform: reduced ? undefined : `rotateY(${(1 - e) * -100}deg) translateZ(${(1 - e) * -120}px)`,
                      opacity: reduced ? 1 : Math.min(1, e * 1.6),
                      transformOrigin: "0% 50%",
                    }}
                  >
                    <span aria-hidden className="text-xs tabular-nums opacity-55 sm:text-sm">{n2(i)}</span>
                    <h3 className="font-display text-[clamp(1rem,2.2vw,1.85rem)] font-medium leading-[1.12] tracking-[-0.03em]">{t}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
          {foot ? <div className="mt-8 sm:mt-10">{foot}</div> : null}
        </div>
      </div>
    </div>
  );
}

