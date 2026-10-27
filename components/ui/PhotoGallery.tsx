"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { imageAlts } from "@/lib/image-alts";

/**
 * Swipeable row of photographs. Arrows scroll the row; selecting a photo
 * opens it full screen (arrow keys step through, Escape closes).
 */
export function PhotoGallery({ images, label = "Photo gallery" }: { images: readonly string[]; label?: string }) {
  const rail = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const arrow =
    "grid size-12 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper";

  return (
    <section aria-label={label} className="grain relative bg-paper py-20 text-ink sm:py-24 lg:py-28">
      <div className="container-x flex justify-end gap-3">
        <button type="button" onClick={() => scrollBy(-1)} className={arrow} aria-label="Previous photos">
          <ArrowLeft aria-hidden className="size-4" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} className={arrow} aria-label="Next photos">
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
      <ul
        ref={rail}
        className="container-x mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <li key={src} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 lg:rounded-[1.75rem]"
              aria-label={`View larger: ${imageAlts[src] ?? "photo"}`}
            >
              <Image
                src={src}
                alt={imageAlts[src] ?? ""}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
                quality={85}
                className="object-cover grayscale transition-transform duration-700 ease-[var(--ease-architect)] group-hover:scale-[1.06]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute bottom-4 right-4 grid size-11 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <ArrowRight className="size-4 -rotate-45" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        {open !== null ? (
          <figure className="relative flex h-[100svh] w-screen bg-black flex-col items-center justify-center gap-5 px-4 sm:px-20">
            <div className="relative h-[75svh] w-full max-w-6xl">
              <Image src={images[open]} alt={imageAlts[images[open]] ?? ""} fill sizes="100vw" quality={90} className="object-contain grayscale" />
            </div>
            <figcaption className="max-w-2xl text-center text-sm text-white/75">
              {imageAlts[images[open]]} <span className="ml-2 tabular-nums text-white/50">{open + 1} / {images.length}</span>
            </figcaption>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6">
              <ArrowLeft aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6">
              <ArrowRight aria-hidden className="size-5" />
            </button>
          </figure>
        ) : null}
      </dialog>
    </section>
  );
}
