"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LogoWordHalf } from "@/components/brand/Logo";
import { altFor } from "@/lib/image-alts";

/**
 * "Next level" logo intro, driven by scroll.
 *
 * The section is a tall track with a full-screen stage pinned inside it. As
 * the visitor scrolls through the track, the wordmark plays its climb: a frame
 * opens between LEVEL and 141 and grows a level at a time (with an image per
 * level), holds, then settles back onto the baseline. Only then is the stage
 * released: it lifts away, uncovering the next section stacked beneath it
 * (".stack-under" in motion.css). Because it is ordinary scrolling — no locking, no forced
 * jumps — wheel, trackpad, touch and keyboard all work, scrolling back simply
 * reverses it, and the next section can never appear early.
 *
 * Reduced motion: no track and no pinning; the wordmark rests on its baseline.
 * The glyphs are the official paths and are never distorted.
 */

/** Frame width and height per level, in em (1em = wordmark cap height). */
const levels = [
  { w: 0, h: 0 },
  { w: 2.8, h: 1 },
  { w: 2.8, h: 2.1 },
  { w: 2.8, h: 3.2 },
] as const;

const images = [
  "/images/home-strategist-compass.webp",
  "/images/pba-leader-skyline.webp",
  "/images/about-dubai-terrace.webp",
];

/** The climb plays by itself once the stage is in view: ms per level, then a hold before it settles. */
const STEP_MS = 1100;
const HOLD_MS = 1600;
/** Pause on the settled logo before the page glides on to the next section. */
const REST_MS = 500;

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/**
 * Glide the page to the point where the next section has fully opened out of
 * the logo window — only if the visitor is still on the pinned stage (not
 * already past it, and not just passing above it).
 */
function openNext(el: HTMLElement | null) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const h = (el.firstElementChild as HTMLElement | null)?.offsetHeight || window.innerHeight;
  const target = window.scrollY + r.top + (r.height - 2 * h) + h;
  const onStage = r.top <= h * 0.25 && window.scrollY < target - 4;
  if (!onStage) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: { duration?: number }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else window.scrollTo({ top: target, behavior: "smooth" });
}

export function LogoWindow({ caption }: { caption?: string }) {
  const track = useRef<HTMLElement>(null);
  const reduced = useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);
  const [progress, setProgress] = useState(0);
  // The climb: 0 = on the baseline, 1–3 = the frame's levels. It plays on a timer
  // when the stage comes into view (no scrolling per level), once per visit.
  const [climb, setClimb] = useState(0);
  const [inView, setInView] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      // Leaving the section resets it, so the climb plays again on the next visit.
      if (!e.isIntersecting) {
        setPlayed(false);
        setClimb(0);
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Plays on its own: climb the three levels, hold, settle onto the baseline,
  // then glide the page on so the next section opens out of the logo window —
  // no scrolling needed. Any scroll by the visitor simply takes over.
  // (Tracked in a ref too, so marking it played doesn't cancel the timers still to run.)
  const playedRef = useRef(false);
  useEffect(() => {
    if (!inView) playedRef.current = false;
    if (reduced || !inView || playedRef.current) return;
    playedRef.current = true;
    const timers = [1, 2, 3].map((lvl, i) => window.setTimeout(() => setClimb(lvl), 150 + i * STEP_MS));
    const settle = 150 + 3 * STEP_MS + HOLD_MS;
    timers.push(window.setTimeout(() => { setClimb(0); setPlayed(true); }, settle));
    timers.push(window.setTimeout(() => openNext(track.current), settle + REST_MS));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      playedRef.current = false;
    };
  }, [inView, reduced]);

  // Scrolling on to the reveal skips the rest of the climb, so nobody has to wait for it.
  const skipped = progress >= 1;

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // The stage is one large-viewport (lvh) tall.
      const h = (el.firstElementChild as HTMLElement | null)?.offsetHeight || window.innerHeight;
      // The last pinned screen is kept for the opening, so the climb runs over the rest.
      const run = r.height - 2 * h;
      setProgress(run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0);
      // 0 → 1 over that last screen: the next section opens out of the centre of the stage.
      const open = Math.min(1, Math.max(0, (-r.top - run) / h));
      const under = el.nextElementSibling as HTMLElement | null;
      if (under?.classList.contains("stack-under")) {
        under.style.setProperty("--open", open.toFixed(4));
        // It opens from the logo window (the gap between LEVEL and 141). Both layers are
        // pinned at the top while it opens, so the frame's screen position is the origin.
        const frameEl = el.querySelector(".logo-window__frame");
        const f = frameEl?.getBoundingClientRect();
        if (f && open > 0 && open < 1) {
          // Centre on the letters' mid-height (the frame itself is closed onto the baseline).
          const cap = (frameEl?.previousElementSibling as HTMLElement | null)?.getBoundingClientRect().height ?? 0;
          under.style.setProperty("--ox", `${Math.round(f.left + f.width / 2)}px`);
          under.style.setProperty("--oy", `${Math.round(f.bottom - cap / 2 - Math.min(0, r.top + r.height - h))}px`);
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const step = reduced || skipped ? 0 : climb;
  const l = levels[step];
  // While settling back, keep the top image so the frame closes with content.
  const shown = step === 0 ? images.length - 1 : step - 1;

  return (
    <section
      ref={track}
      aria-label="Level141"
      className={reduced ? "bg-black text-white" : "relative z-10 h-[220lvh]"}
    >
      <div
        className={
          reduced
            ? "flex flex-col items-center justify-center py-14 sm:py-16 lg:py-24"
            : "sticky top-0 flex h-[100lvh] flex-col items-center justify-center overflow-hidden bg-black text-white"
        }
      >
        <div className="container-x flex flex-col items-center">
          <div aria-hidden className="flex items-end pt-[1.2em] text-[clamp(1.75rem,min(8.6vw,14lvh),9rem)]">
            <LogoWordHalf part="level" className="h-[1em] w-auto shrink-0" />
            <div
              className="logo-window__frame relative shrink-0 overflow-hidden"
              style={{ width: l.w ? `min(${l.w}em, 30vw)` : 0, height: `${l.h}em`, marginInline: l.w ? "0.12em" : "0.385em" }}
            >
              {images.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={altFor(src)}
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className={"object-cover grayscale transition-opacity duration-500 " + (i === shown ? "opacity-100" : "opacity-0")}
                />
              ))}
            </div>
            <span className="logo-window__climb shrink-0" style={{ translate: `0 -${l.h}em` }}>
              <LogoWordHalf part="141" className="block h-[1em] w-auto" />
            </span>
          </div>
          {caption ? <p className="mt-12 text-sm text-white/55 sm:mt-16">{caption}</p> : null}
        </div>

        {/* Scroll cue: fades out as soon as the climb begins. */}
        {!reduced ? (
          <div
            aria-hidden
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-white/50 transition-opacity duration-500"
            style={{ opacity: !played && climb === 0 && progress < 0.5 ? 1 : 0 }}
          >
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[l141-cue_1.8s_ease-in-out_infinite] bg-white" />
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
