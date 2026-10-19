"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cx } from "@/components/ui/primitives";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by lib/theme.ts.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerTheme = (): Theme | null => null;

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, getServerTheme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cx(
        "relative grid size-10 place-items-center rounded-full border sm:size-11 border-paper/20 text-paper transition-colors duration-300 hover:border-gold hover:text-gold",
        className,
      )}
    >
      <Sun aria-hidden className={cx("size-[1.1rem] transition-[opacity,transform] duration-500", theme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0")} />
      <Moon aria-hidden className={cx("absolute size-[1.05rem] transition-[opacity,transform] duration-500", theme === "dark" ? "rotate-90 opacity-0" : "rotate-0 opacity-100")} />
    </button>
  );
}
