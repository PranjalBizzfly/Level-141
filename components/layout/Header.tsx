"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cx, onPhoto } from "@/components/ui/primitives";
import { mainNav, routes, site } from "@/lib/site";

/** Pages that open on a dark hero, where the bar can sit clear over it. */
const darkHeroes: string[] = [routes.home, routes.personalBrand, routes.growth, routes.how, routes.about, routes.insights, routes.blog];

/** The photograph that answers each menu link. */
const menuPhotos: Record<string, string> = {
  [routes.home]: "/images/client-hero-skyline-opening.webp",
  [routes.personalBrand]: "/images/client-executive-portrait-woman.webp",
  [routes.growth]: "/images/client-executive-dubai-window.webp",
  [routes.how]: "/images/client-executive-contemplation.webp",
  [routes.lq]: "/images/client-mentorship-conversation.webp",
  [routes.insights]: "/images/client-keynote-auditorium.webp",
  [routes.blog]: "/images/client-executive-library.webp",
  [routes.about]: "/images/client-executive-city-lounge.webp",
  [routes.contact]: "/images/client-walk-toward-skyline.webp",
};
const menuDefault = "/images/client-lone-executive-skyline.webp";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes (state adjusted during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = !open && (scrolled || !darkHeroes.includes(pathname));

  return (
    <header
      // Clear over the dark hero and the open menu, solid once scrolled.
      data-solid={solid ? "" : undefined}
      style={solid ? undefined : onPhoto}
      className={cx(
        "on-dark fixed inset-x-0 top-0 z-50 border-b text-paper transition-colors duration-500",
        solid ? "border-paper/10 bg-ink/92 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-black/70 to-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <div
        className={cx(
          "container-x flex items-center justify-between gap-6 transition-[height] duration-300 ease-[var(--ease-architect)]",
          scrolled ? "h-14 sm:h-16" : "h-14 sm:h-[4.5rem] lg:h-20",
        )}
      >
        <Link href="/" aria-label="Level141 — Home" className="relative z-10 flex min-h-11 shrink-0 items-center">
          <LogoLockup className="h-[1.15rem] w-auto sm:h-5" title="Level141" />
        </Link>


        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle className="relative z-10 shrink-0" />
          <Link
            href={site.primaryCta.href}
            className={cx(
              "group hidden min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gold px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-gold-soft sm:inline-flex",
              open && "!hidden",
            )}
          >
            {site.primaryCta.label}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 grid size-11 place-items-center rounded-full border border-paper/20 transition-colors hover:border-gold"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        // Full-screen menu, black in both themes, fading in behind the bar.
        className="fixed inset-0 -z-10 flex animate-fade flex-col overflow-y-auto bg-[#000] pb-10 pt-28 text-[#fff] [animation-duration:0.6s] sm:pt-36"
      >
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          {open
            ? [menuDefault, ...Object.values(menuPhotos)].map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  sizes="50vw"
                  quality={90}
                  className={cx(
                    "object-cover grayscale transition-opacity duration-1000 ease-[var(--ease-architect)]",
                    src === (preview ?? menuDefault) ? "opacity-100" : "opacity-0",
                  )}
                />
              ))
            : null}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000] via-[#000]/30 to-transparent" />
        </div>
        <nav aria-label="Mobile" className="container-x relative my-auto flex flex-col">
          <ul className="group/menu w-fit" onMouseLeave={() => setPreview(null)}>
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="animate-fade [animation-duration:0.8s]" style={{ animationDelay: `${i * 60}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setPreview(menuPhotos[item.href] ?? null)}
                    onFocus={() => setPreview(menuPhotos[item.href] ?? null)}
                    className={cx(
                      "inline-flex min-h-12 items-center gap-4 py-0.5 text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] font-light leading-tight tracking-[-0.02em] transition-[opacity,transform] duration-700 ease-[var(--ease-architect)] hover:translate-x-3 hover:!opacity-100 focus-visible:translate-x-3 group-hover/menu:opacity-40",
                      active ? "opacity-100" : "opacity-70",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-12">
            <Link
              href={site.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#fff] px-6 text-sm font-medium text-[#000]"
            >
              {site.primaryCta.label}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
