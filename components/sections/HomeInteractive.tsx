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
/** How much extra progress per second the steps gain while the visitor is scrolling. */
const AUTO_RATE = 0.12;
/** The visitor counts as "scrolling" for this long after their last scroll. */
const ACTIVE_MS = 350;

/**
 * Progress (0 → 1) through a pinned, step-based section. While the visitor is
 * actively scrolling forward inside it, the steps also glide ahead on their
 * own (never moving the page); when they stop, the glide pauses on the step
 * in view, and it resumes when they scroll on. Scrolling back simply follows
 * the scroll, and leaving the section resets the glide.
 */
export function usePinProgress(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const scrollP = useRef(0);
  const auto = useRef(0);
  const lastScroll = useRef(0);
  const lastY = useRef(0);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const run = r.height - window.innerHeight;
    const s = run > 0 ? clamp(-r.top / run) : 0;
    const y = window.scrollY;
    const dy = y - lastY.current;
    lastY.current = y;
    scrollP.current = s;
    // Outside the pin, or scrolling back: progress simply follows the scroll.
    if (s <= 0 || s >= 1 || dy < 0) auto.current = s;
    setP(Math.max(s, auto.current));
  }, enabled);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // "Still scrolling" comes from the visitor's own input (wheel, touch, keys),
    // so the smooth-scroll easing after a stopped gesture never counts.
    const touchY = { v: 0 };
    const mark = () => (lastScroll.current = performance.now());
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) mark();
    };
    const onTouchStart = (e: TouchEvent) => (touchY.v = e.touches[0]?.clientY ?? 0);
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (y < touchY.v) mark();
      touchY.v = y;
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) mark();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    let raf = 0;
    let prev = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - prev) / 1000);
      prev = t;
      const s = scrollP.current;
      const active = t - lastScroll.current < ACTIVE_MS;
      if (active && s > 0 && s < 1) {
        const next = Math.min(1, Math.max(auto.current, s) + AUTO_RATE * dt);
        if (next !== auto.current) {
          auto.current = next;
          setP(Math.max(s, next));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);

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
  // A Layer element passed from a server page arrives as a client reference, so its
  // type cannot be compared; a Layer is recognised by the pattern it names. Named
  // layers (sections brought over from home with their own pattern) keep it and
  // don't take a slot, so the page's own sections keep their patterns in order.
  const isNamed = (c: (typeof kids)[number]) => typeof (c.props as { pattern?: unknown }).pattern === "string";
  const unnamed = kids.filter((c) => !isNamed(c)).length;
  if (process.env.NODE_ENV !== "production" && page && unnamed > block.length) {
    console.error(`Layers: page "${page}" has ${unnamed} sections but a block of ${block.length} patterns.`);
  }
  let slot = 0;
  return kids.map((c, i) => {
    if (isNamed(c)) return c;
    return (
      <Layer key={c.key ?? i} pattern={block[slot++]}>
        {c}
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
  // Sections already on screen when the page opens start settled, so the
  // first look is never caught mid-turn; every later section still plays.
  const settled = useRef<WeakSet<HTMLElement> | null>(null);
  useScrollFrame(() => {
    const root = ref.current;
    if (!root) return;
    const vh = window.innerHeight;
    const layers = Array.from(root.children) as HTMLElement[];
    if (flat) {
      if (!settled.current) {
        settled.current = new WeakSet(layers.filter((el) => el.getBoundingClientRect().top < vh));
      }
      layers.forEach((el, i) => {
        // Earlier sections stay in front, so an arriving one turns in from behind them.
        el.style.zIndex = String(layers.length - i);
        // Lands by the time its top edge reaches the middle of the screen (no long, empty in-between).
        // Measured from the layout, not the layer's own (transformed) box: its arrival turn
        // moves that box, which would feed back into --in and make it flicker frame to frame.
        const inn = settled.current?.has(el) ? 1 : clamp((vh - layerTop(layers, i)) / (vh * 0.55));
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

/**
 * A layer's natural top on screen, from the layout: its own box is moved by
 * its sticky offset and by its arrival transform, so it is never measured.
 */
function layerTop(layers: HTMLElement[], i: number) {
  const el = layers[i];
  // Layers are in normal flow: each starts right where the previous one ends.
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
      <div className={reduced ? "py-24 sm:py-32 lg:py-40" : "sticky top-0 flex h-[100lvh] flex-col justify-center"}>
        <div className="container-x">
          {head}
          <ul className="mt-10 grid grid-cols-2 gap-2 [perspective:1600px] sm:mt-12 sm:gap-3 lg:grid-cols-3">
            {items.map((t, i) => {
              const k = reduced ? 1 : clamp(q * n - i);
              const e = 1 - Math.pow(1 - k, 3);
              return (
                // The slot shows faintly where each card will land, so the deck reads as a set.
                <li key={t} className="[transform-style:preserve-3d]">
                  <div
                    className="deck-card flex h-full min-h-[clamp(7.5rem,20vh,13rem)] flex-col justify-between rounded-[1.25rem] border border-current/15 bg-[color-mix(in_oklab,currentColor_6%,transparent)] p-4 sm:rounded-[1.25rem] sm:p-7"
                    style={{
                      // Every card is always on the table: it waits slightly turned and quiet,
                      // then turns to face you as it is reached — never an empty slot.
                      transform: reduced ? undefined : `rotateY(${(1 - e) * -18}deg) translateZ(${(1 - e) * -40}px)`,
                      opacity: reduced ? 1 : 0.85 + 0.15 * e,
                      transformOrigin: "0% 50%",
                    }}
                  >
                    <span aria-hidden className="text-sm tabular-nums opacity-75 sm:text-sm">{n2(i)}</span>
                    <h3 className="font-display text-[clamp(1rem,1.98vw,1.67rem)] font-medium leading-[1.12] tracking-[-0.03em]">{t}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
          {foot ? <div className="mt-10 sm:mt-10">{foot}</div> : null}
        </div>
      </div>
    </div>
  );
}

