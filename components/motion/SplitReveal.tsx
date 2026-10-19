"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Word-split headline reveal (the "lines, words" pattern): every element
 * marked [data-split] has its words wrapped in masks; each word then rises out
 * of its mask in a short stagger. Hero headlines play on load; section
 * headlines play when their [data-reveal] block becomes visible.
 * Runs after hydration on static headings only; skipped for reduced motion,
 * and content is fully readable before and after.
 */
export function SplitReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll<HTMLElement>("[data-split]:not([data-split-done])");
    els.forEach((el) => {
      let i = 0;
      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent ?? "";
          if (!text.trim()) return;
          const frag = document.createDocumentFragment();
          text.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              return;
            }
            const mask = document.createElement("span");
            mask.className = "sw";
            const word = document.createElement("span");
            word.textContent = part;
            word.style.setProperty("--w", String(i++));
            mask.appendChild(word);
            frag.appendChild(mask);
          });
          node.parentNode?.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE && !(node as Element).hasAttribute("aria-hidden")) {
          Array.from(node.childNodes).forEach(walk);
        }
      };
      Array.from(el.childNodes).forEach(walk);
      el.setAttribute("data-split-done", "");
    });
  }, [pathname]);

  return null;
}
