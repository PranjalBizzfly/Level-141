"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cx } from "@/components/ui/primitives";
import { mainNav, routes, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <header
      data-solid={scrolled || open || pathname === routes.contact ? "" : undefined}
      className={cx(
        "on-dark fixed inset-x-0 top-0 z-50 text-paper transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open || pathname === routes.contact
          ? "border-b border-paper/10 bg-ink/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
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

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5 2xl:gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative block whitespace-nowrap rounded-full px-1.5 py-2 text-[0.8rem] tracking-[0.005em] transition-colors duration-300 2xl:px-3.5 2xl:text-[0.875rem]",
                      active ? "text-paper" : "text-paper-muted hover:text-paper",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span aria-hidden className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gold 2xl:inset-x-3" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle className="relative z-10 shrink-0" />
          <Link
            href={site.primaryCta.href}
            className="group hidden min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gold px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-gold-soft sm:inline-flex xl:hidden 2xl:inline-flex"
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
            className="relative z-10 grid size-10 place-items-center sm:size-11 rounded-full border border-paper/20 transition-colors hover:border-gold xl:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className={cx(
          "absolute inset-x-0 top-full overflow-y-auto bg-ink xl:hidden",
          scrolled ? "h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)]" : "h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4.5rem)] lg:h-[calc(100dvh-5rem)]",
        )}
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between pb-10 pt-6">
          <ul className="divide-y divide-paper/10 border-y border-paper/10">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="animate-rise" style={{ animationDelay: `${i * 45}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex items-baseline gap-5 py-4 text-2xl tracking-[-0.02em] transition-colors sm:text-3xl",
                      active ? "text-gold" : "text-paper hover:text-gold",
                    )}
                  >
                    <span className="eyebrow w-6 text-paper-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 animate-fade [animation-delay:300ms]">
            <Link
              href={site.primaryCta.href}
              className="flex min-h-14 items-center justify-between rounded-full bg-gold px-6 text-lg font-medium text-ink"
            >
              {site.primaryCta.label}
              <ArrowRight aria-hidden className="size-5" />
            </Link>
            <p className="eyebrow mt-8 text-paper-muted">{site.brandLine}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
