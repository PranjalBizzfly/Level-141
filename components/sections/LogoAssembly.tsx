"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LogoGlyph, LogoWordmark } from "@/components/brand/Logo";
import { altFor } from "@/lib/image-alts";

/** Per-column start offsets: each column travels a different distance. */
const from = ["62%", "28%", "78%", "40%", "56%"];

/** Bottom row: 141 sits under the last three columns (as BA sits under AC). */
const bottom = [null, null, 5, 6, 7] as const;

/** One photograph sliced across the five windows, so no photo repeats on the About page. */
const photo = "/images/home-strategist-compass.webp";

/**
 * Level staircase: each official letterform sits in its own tall white panel
 * — LEVEL across the top, 141 along the foot of the last three. As the section
 * scrolls in, the panels travel at different speeds and settle as a rising
 * staircase, one level higher per column. Images then rise from the floor of
 * each panel, column by column, and fall away again with new pictures. Glyphs
 * are the unmodified logo paths at one shared cap height.
 */
export function LogoAssembly() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (!e.isIntersecting) setOpen(false);
      },
      { threshold: 0.45 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(
      () => {
        if (open) setOpen(false);
        else setOpen(true);
      },
      open ? 2600 : 1300,
    );
    return () => window.clearTimeout(t);
  }, [visible, open]);

  return (
    <section aria-label="Level141" className="overflow-hidden bg-black py-20 sm:py-20 lg:py-36">
      {/* Mobile: the wordmark set whole on one panel, the photograph revealed beneath it. */}
      <div className="container-x sm:hidden">
        <div className="rounded-[1.25rem] bg-white p-6 text-black">
          <LogoWordmark className="h-auto w-full" />
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[0.75rem]">
            <Image src={photo} alt={altFor(photo)} fill sizes="90vw" className="object-cover grayscale" />
          </div>
        </div>
      </div>
      <div ref={ref} data-open={open ? "" : undefined} className="container-x max-sm:hidden">
        <div className="mx-auto grid max-w-4xl grid-cols-5 items-end gap-2 pt-[14%] sm:gap-3">
          {from.map((f, i) => (
            <div
              key={i}
              aria-hidden
              className="assemble-col flex aspect-[1/2.6] flex-col bg-white p-[9%] [container-type:inline-size]"
              style={{ "--from": f, "--to": `-${i * 7}%`, "--i": i } as React.CSSProperties}
            >
              <LogoGlyph index={i} className="w-auto shrink-0 self-start text-black [height:46cqw]" />
              <div className="panel-window relative my-[9%] flex-1 overflow-hidden">
                <Image
                  src={photo}
                  alt={altFor(photo)}
                  fill
                  sizes="20vw"
                  className="object-cover grayscale"
                  style={{ objectPosition: `${i * 25}% 50%` }}
                />
              </div>
              {bottom[i] !== null ? (
                <LogoGlyph index={bottom[i]} className="w-auto shrink-0 self-start text-black [height:46cqw]" />
              ) : (
                <span className="block shrink-0 [height:46cqw]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
