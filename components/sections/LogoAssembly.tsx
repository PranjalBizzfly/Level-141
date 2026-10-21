"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LogoGlyph } from "@/components/brand/Logo";
import { altFor } from "@/lib/image-alts";

/** Per-column start offsets: each column travels a different distance. */
const from = ["62%", "28%", "78%", "40%", "56%"];

/** Bottom row: 141 sits under the last three columns (as BA sits under AC). */
const bottom = [null, null, 5, 6, 7] as const;

const sets = [
  ["/images/pba-hero-speaker.webp", "/images/home-strategist-compass.webp", "/images/about-dubai-terrace.webp", "/images/home-team-table.webp", "/images/pba-leader-skyline.webp"],
  ["/images/about-meeting-room.webp", "/images/home-person-notebook.webp", "/images/about-atrium-levels-muted.webp", "/images/contact-corridor-warm.webp", "/images/how-strategy-table-muted.webp"],
];

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
  const [set, setSet] = useState(0);

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
        else {
          setSet((s) => (s + 1) % sets.length);
          setOpen(true);
        }
      },
      open ? 2600 : 1300,
    );
    return () => window.clearTimeout(t);
  }, [visible, open]);

  const imgs = sets[set];

  return (
    <section aria-label="Level141" className="overflow-hidden bg-black py-20 sm:py-20 lg:py-36">
      <div ref={ref} data-open={open ? "" : undefined} className="container-x">
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
                  src={imgs[i]}
                  alt={altFor(imgs[i])}
                  fill
                  sizes="20vw"
                  className="object-cover grayscale"
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
