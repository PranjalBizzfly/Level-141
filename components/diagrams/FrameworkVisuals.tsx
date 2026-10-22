import type { CSSProperties } from "react";
import { lqDomains } from "@/lib/content";

/**
 * LQ™ — "First, know your level". The twelve audit domains read as the floors
 * of a building: 01 is the ground floor and each domain sits one level higher.
 * A stepped bar on every floor fills as it scrolls into view, so the list
 * rises like an elevation; hovering a floor lights it.
 */
export function LqLevels() {
  return (
    <ol className="lq mt-12 flex flex-col-reverse border-b border-line sm:mt-16">
      {lqDomains.map((d, i) => (
        <li
          key={d.name}
          className="lq-floor group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 border-t border-line py-6 sm:grid-cols-12 sm:items-center sm:gap-6"
          style={{ "--i": i, "--w": `${((i + 1) / lqDomains.length) * 100}%` } as CSSProperties}
        >
          <span className="text-sm tabular-nums text-muted sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-medium sm:col-span-3">{d.name}</span>
          <span className="col-start-2 text-sm text-muted sm:col-span-5 sm:col-start-auto">{d.q}</span>
          <span aria-hidden className="col-start-2 h-2 sm:col-span-3 sm:col-start-auto">
            <span className="lq-bar block h-full" />
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Functions the Growth Architecture document says are often run independently. */
const functions = ["Branding", "Social media", "Websites", "Paid media", "PR", "Sales", "CRM", "Content"];

const pos = functions.map((_, i) => {
  const a = (i / functions.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 38 };
});

const links: [number, number][] = [];
for (let a = 0; a < functions.length; a++) for (let b = a + 1; b < functions.length; b++) links.push([a, b]);

const igfCss = functions
  .map(
    (_, k) =>
      `.igf:has([data-node="${k}"]:hover) .igf-link:not([data-a="${k}"]):not([data-b="${k}"]){opacity:.12}` +
      `.igf:has([data-node="${k}"]:hover) .igf-link:is([data-a="${k}"],[data-b="${k}"]){stroke-width:2.2;opacity:1}`,
  )
  .join("");

/**
 * IGF™ — "Connect the growth engine". The functions start as separate points
 * on a ring; as the section scrolls in, the connections between every pair
 * draw themselves, so isolated activities become one system. Hovering a
 * function isolates its connections.
 */
export function IgfConnect() {
  return (
    <figure className="igf relative mx-auto mt-12 aspect-square w-full max-w-[34rem] sm:mt-16" aria-label="IGF™ connects branding, social media, websites, paid media, PR, sales, CRM and content into one growth engine">
      <style>{igfCss}</style>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
        {links.map(([a, b], i) => (
          <line
            key={`${a}-${b}`}
            data-a={a}
            data-b={b}
            className="igf-link"
            x1={pos[a].x}
            y1={pos[a].y}
            x2={pos[b].x}
            y2={pos[b].y}
            pathLength={1}
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.61rem,4vw,2.2rem)] font-medium tracking-[-0.03em]">
        IGF™
      </span>
      {functions.map((f, i) => (
        <span
          key={f}
          data-node={i}
          tabIndex={0}
          className="igf-node absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-black/20 bg-white px-3 py-1.5 text-xs font-medium text-black outline-none sm:text-sm dark:border-white/25 dark:bg-black dark:text-white"
          style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
        >
          {f}
        </span>
      ))}
    </figure>
  );
}
