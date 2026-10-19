"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LogoWordHalf } from "@/components/brand/Logo";

/**
 * "Next level" logo motion. The wordmark starts as it is set — LEVEL 141 on
 * one baseline. Then a frame opens between the two words and grows upward one
 * step at a time, lifting 141 a level with every step and showing a new image
 * at each level, before settling back onto the baseline. The glyphs are the
 * official paths and are never distorted; only the space between them moves.
 */

/** Frame width and height per level, in em (1em = wordmark cap height). */
const levels = [
  { w: 0.32, h: 0 },
  { w: 2.4, h: 1 },
  { w: 2.4, h: 2.1 },
  { w: 2.4, h: 3.2 },
] as const;

const images = [
  "/images/home-strategist-compass.webp",
  "/images/pba-leader-skyline.webp",
  "/images/about-dubai-terrace.webp",
];

const HOLD = 1700;

export function LogoWindow({ caption }: { caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reduced motion: the wordmark simply rests on its baseline.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % levels.length), step === 0 ? 1400 : HOLD);
    return () => window.clearTimeout(t);
  }, [visible, step]);

  const l = levels[step];
  // While settling back, keep the top image so the frame closes with content.
  const shown = step === 0 ? images.length - 1 : step - 1;

  return (
    <section aria-label="Level141" className="overflow-hidden bg-black text-white">
      <div
        ref={ref}
        className="container-x flex min-h-[70svh] flex-col items-center justify-center py-24 sm:min-h-[86svh]"
      >
        <div aria-hidden className="flex items-end pt-[3.2em] text-[clamp(1.6rem,5.2vw,4.75rem)]">
          <LogoWordHalf part="level" className="h-[1em] w-auto shrink-0" />
          <div className="logo-window__frame relative mx-[0.12em] shrink-0 overflow-hidden" style={{ width: `${l.w}em`, height: `${l.h}em` }}>
            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
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
        {caption ? <p className="mt-16 text-sm text-white/55">{caption}</p> : null}
      </div>
    </section>
  );
}
