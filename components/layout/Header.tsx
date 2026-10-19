"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { LogoLockupSplit } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cx } from "@/components/ui/primitives";
import { mainNav, routes, site } from "@/lib/site";

/** Large links in the menu; the other pages sit in the small row beneath. */
const primaryMenu: string[] = [routes.personalBrand, routes.growth, routes.how];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Header after the luxury reference: logo left, a quiet outlined action and a
 * two-line menu icon right. The menu is a full-screen black overlay with large
 * centred page links (all seven documented pages).
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  // Close the menu whenever the route changes (state adjusted during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Transparent at the top; hides while scrolling down, returns on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 120);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
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
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = (scrolled || pathname === routes.contact) && !open;

  return (
    <>
      <header
        data-solid={solid ? "" : undefined}
        data-menu-open={open ? "" : undefined}
        className={cx(
          "on-dark fixed inset-x-0 top-0 z-50 text-paper transition-[background-color,border-color,backdrop-filter,translate] duration-500 ease-[var(--ease-architect)]",
          hidden && !open && "-translate-y-full",
          solid ? "border-b border-paper/10 bg-ink/92 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link href="/" aria-label="Level141 — Home" className="logo-split relative z-10 flex min-h-11 shrink-0 items-center">
            <LogoLockupSplit className="h-[30px] w-auto overflow-visible" title="Level141" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle className="relative z-10 shrink-0" />
            <Link
              href={site.primaryCta.href}
              className="hidden min-h-10 items-center rounded-full border border-paper/40 px-4 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors hover:bg-paper hover:text-ink sm:inline-flex"
            >
              {site.primaryCta.label}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="group relative z-10 grid size-11 place-items-center"
            >
              {/* Two-line icon that folds into a cross when open. */}
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={cx(
                    "absolute left-0 h-[1.5px] w-6 bg-current transition-[top,rotate] duration-500 ease-[var(--ease-architect)]",
                    open ? "top-[5px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cx(
                    "absolute left-0 h-[1.5px] w-6 bg-current transition-[top,rotate] duration-500 ease-[var(--ease-architect)]",
                    open ? "top-[5px] -rotate-45" : "top-[10px]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu (outside <header> so its backdrop filter cannot trap it). */}
      {/* Curtain: slides down from the top to open and back up to close. */}
      <div
        id="site-menu"
        ref={panelRef}
        data-open={open ? "" : undefined}
        aria-hidden={!open}
        inert={!open}
        className="menu-curtain fixed inset-0 z-40 flex flex-col bg-black text-white"
      >
        <nav aria-label="Menu" className="container-x flex flex-1 flex-col items-center justify-center pt-20">
          {/* Reference menu: three large links, then a quiet row of the rest (all seven pages). */}
          <ul className="flex flex-col items-center gap-2 text-center sm:gap-3">
            {mainNav.filter((item) => primaryMenu.includes(item.href)).map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="menu-item" style={{ "--d": `${250 + i * 90}ms` } as React.CSSProperties}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "font-display block py-1 text-[clamp(1.9rem,3.6vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.035em] transition-colors duration-300",
                      active ? "text-white" : "text-white/50 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div
            className="menu-item mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            style={{ "--d": "620ms" } as React.CSSProperties}
          >
            <Link
              href={site.primaryCta.href}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black"
            >
              {site.primaryCta.label}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            {mainNav.filter((item) => !primaryMenu.includes(item.href)).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cx(
                  "text-sm transition-colors",
                  isActive(pathname, item.href) ? "text-white" : "text-white/60 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="container-x flex flex-col gap-2 pb-8 text-sm text-white/55 sm:flex-row sm:justify-between">
          <p>{site.brandLine}</p>
          <p>
            Part of the {site.ecosystem} ecosystem, headquartered in {site.headquarters}
          </p>
        </div>
      </div>
    </>
  );
}
