"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
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
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label="Level141 — Home" className="relative z-10 shrink-0 py-2">
          <LogoLockup className="h-[1.15rem] w-auto sm:h-5" title="Level141" />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative block rounded-full px-3 py-2 text-[0.82rem] tracking-[0.01em] transition-colors duration-300",
                      active ? "text-gold" : "text-paper/75 hover:text-paper",
                    )}
                  >
                    <span className="2xl:hidden">{item.short ?? item.label}</span>
                    <span className="hidden 2xl:inline">{item.label}</span>
                    {active ? (
                      <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-px bg-gold" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={site.primaryCta.href}
            className="group hidden min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-gold-soft sm:inline-flex"
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
            className="relative z-10 grid size-11 place-items-center rounded-full border border-paper/20 transition-colors hover:border-gold xl:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto bg-ink lg:h-[calc(100dvh-5rem)] xl:hidden"
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
                    <span className="eyebrow w-6 text-paper/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
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
            <p className="eyebrow mt-8 text-paper/45">{site.brandLine}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
