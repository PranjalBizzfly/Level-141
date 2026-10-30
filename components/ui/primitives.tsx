import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { imageAlts } from "@/lib/image-alts";
import { focusStyle } from "@/lib/image-focus";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ Reveal */

type RevealProps = {
  as?: "div" | "section" | "li" | "article" | "p" | "span" | "header" | "figure" | "ul" | "ol";
  delay?: number;
  variant?: "rise" | "fade";
  className?: string;
  children: ReactNode;
  id?: string;
  /** Soft cursor-following glow (dark surfaces, fine pointers only). */
  spotlight?: boolean;
};

export function Reveal({ as: Tag = "div", delay = 0, variant = "rise", className, children, id, spotlight }: RevealProps) {
  return (
    <Tag
      id={id}
      data-reveal={variant}
      data-spotlight={spotlight ? "" : undefined}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------- Buttons */

type ButtonVariant = "solid" | "gold" | "outline" | "outline-light" | "ghost" | "ghost-light" | "link";

const buttonStyles: Record<ButtonVariant, string> = {
  solid: "bg-ink text-paper hover:bg-ink-3",
  gold: "bg-gold text-ink hover:bg-gold-soft",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/30 text-paper hover:border-gold hover:bg-gold hover:text-ink",
  ghost: "border border-line-strong text-ink hover:border-ink",
  "ghost-light": "border border-paper/25 text-paper hover:border-paper/60",
  // Quiet secondary action beside a solid button: text and arrow, no pill.
  link: "!px-2 text-current underline-offset-[6px] decoration-current/40 hover:underline",
};

export const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-center text-[0.95rem] sm:whitespace-nowrap font-normal transition-[background-color,color,border-color] duration-500 ease-[var(--ease-architect)]";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
};

export function ButtonLink({ variant = "solid", className, children, external, ...props }: ButtonLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Link
      data-magnetic={variant === "gold" || variant === "solid" ? "" : undefined}
      className={cx(buttonBase, buttonStyles[variant], className)}
      {...props}
    >
      <span>{children}</span>
      <Icon
        aria-hidden
        className="size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-architect)] group-hover:translate-x-1"
      />
    </Link>
  );
}

/* ----------------------------------------------------------------- Layout */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string; index?: string }) {
  return (
    <p className={cx("eyebrow flex items-center gap-3", className)}>
      <span>{children}</span>
    </p>
  );
}

type SectionProps = {
  id?: string;
  tone?: "paper" | "paper-2" | "ink" | "white";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
};

const tones = {
  paper: "grain bg-paper text-ink",
  "paper-2": "grain bg-paper text-ink",
  white: "grain bg-surface text-ink",
  ink: "on-dark bg-ink text-paper",
};

export function Section({ id, tone = "paper", className, children, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx("relative py-28 sm:py-40 lg:py-56", tones[tone], className)}>
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  id?: string;
  eyebrow: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "split" | "stack";
  className?: string;
};

/** Consistent section opener: eyebrow + headline, optional intro beside (split) or below (stack). */
export function SectionHeader({ id, eyebrow, index, title, intro, dark, align = "split", className }: SectionHeaderProps) {
  return (
    <header
      className={cx(
        align === "split" ? "grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16" : "max-w-4xl",
        className,
      )}
    >
      {/* With no intro beside it, the headline takes the full width so it sets in two lines. */}
      <Reveal className={align === "split" ? (intro ? "lg:col-span-7" : "lg:col-span-12 lg:max-w-[68rem]") : undefined}>
        <Eyebrow index={index} className={dark ? "text-gold" : "text-gold-ink"}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)] sm:mt-8">
          <span data-mask className="block">
            {title}
          </span>
        </h2>
      </Reveal>
      {intro ? (
        <Reveal
          delay={120}
          className={cx(
            "measure text-base leading-[1.85] sm:text-lg",
            dark ? "text-paper/75" : "text-muted",
            align === "split" ? "lg:col-span-5 lg:self-end" : "mt-8",
          )}
        >
          {intro}
        </Reveal>
      ) : null}
    </header>
  );
}

/* --------------------------------------------------------------- Brackets */

/**
 * Frames content with the two corner brackets from the Level141 symbol
 * (logo 3/4) — used as the brand's quotation / emphasis device.
 */
export function BracketFrame({
  children,
  className,
  tone = "gold",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "ink" | "paper";
  size?: "sm" | "md" | "lg";
}) {
  // Both brackets always share one tone, so the symbol reads complete.
  const color = { gold: "text-gold", ink: "text-ink", paper: "text-paper" }[tone];
  const s = { sm: "size-4", md: "size-6 sm:size-8", lg: "size-8 sm:size-12" }[size];
  const pad = { sm: "px-6 py-5", md: "px-8 py-8 sm:px-12 sm:py-10", lg: "px-10 py-10 sm:px-16 sm:py-14" }[size];
  return (
    <div className={cx("relative", pad, className)}>
      <BracketClose className={cx("absolute right-0 top-0", s, color)} />
      <BracketOpen className={cx("absolute bottom-0 left-0", s, color)} />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ Photo */

/** Client photograph in a rounded frame; alt text comes from lib/image-alts. */
export function Photo({
  src,
  className,
  sizes = "(min-width: 1280px) 1200px, 100vw",
  priority,
}: {
  src: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cx("group relative overflow-hidden bg-ink-2", className)}>
      <Image
        src={src}
        alt={imageAlts[src] ?? ""}
        style={focusStyle(src)}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className="object-cover grayscale transition-transform duration-[1200ms] ease-[var(--ease-architect)] group-hover:scale-[1.04]"
      />
    </div>
  );
}

/**
 * Full-width photograph between sections, with an optional caption line set
 * beneath it. Gives long pages visual rhythm without adding more cards.
 */
export function PhotoBand({ src, caption, className }: { src: string; caption?: ReactNode; className?: string }) {
  return (
    <figure className={cx("bg-paper", className)}>
      <div>
        {/* Opens from a narrow frame as it arrives, then drifts slowly with the scroll (motion.css §8). */}
        <Reveal variant="fade">
          <div data-unveil>
            <Photo src={src} sizes="100vw" className="photo-drift h-[70svh] !rounded-none !border-0 !shadow-none sm:h-[85svh]" />
          </div>
        </Reveal>
        {caption ? (
          <figcaption className="container-x mt-6 flex items-center gap-4 text-sm text-muted sm:mt-8">
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {caption}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

/** Edge-to-edge photo at the top of a card, carrying its number and status so the card stays short. */
export function CardBanner({ src, index, children }: { src: string; index: string; children: ReactNode }) {
  return (
    <div className="relative aspect-[2/1] overflow-hidden sm:aspect-[21/9]">
      <Image
        src={src}
        alt={imageAlts[src] ?? ""}
        style={focusStyle(src)}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        quality={90}
        className="object-cover grayscale transition-transform duration-[1200ms] ease-[var(--ease-architect)] hover:scale-[1.04]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-6 sm:p-8">
        <span aria-hidden className="eyebrow text-white/85">
          {index}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {children}
        </span>
      </div>
    </div>
  );
}

/** Tokens for a photo hero: white on a dark photograph in both themes. */
export const onPhoto = {
  "--color-ink": "#000",
  "--color-ink-2": "rgb(0 0 0 / 0.45)",
  "--color-paper": "#fff",
  "--color-paper-muted": "#d4d4d4",
  "--color-gold": "#fff",
  "--color-gold-soft": "#d4d4d4",
  "--color-gold-ink": "#fff",
  "--color-line-dark": "rgb(255 255 255 / 0.2)",
  "--color-line-dark-strong": "rgb(255 255 255 / 0.35)",
} as CSSProperties;

/* --------------------------------------------------------------- Page hero */

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
  image,
  portrait,
  size = "md",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  /** Client photograph shown beside the hero text (used when there is no aside). */
  image?: string;
  /** Upright photograph: held in the right half of the hero so the face stays in frame. */
  portrait?: boolean;
  /** "md" for longer two-part headlines, so each part sets in two balanced lines. */
  size?: "lg" | "md";
}) {
  // With a client photograph and no custom aside, the hero becomes a full-screen, cinematic opening.
  if (image && !aside) {
    return (
      <section style={onPhoto} className={cx("relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink pb-20 text-paper sm:pb-24 lg:pb-28", portrait ? "pt-[56svh] lg:pt-40" : "pt-40")}>
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className={cx("hero-photo-in absolute inset-0", portrait && "bottom-auto h-[62svh] lg:bottom-0 lg:left-auto lg:h-auto lg:w-1/2")}>
            <div className="hero-photo absolute inset-0">
              <Image src={image} alt="" fill priority sizes="100vw" quality={90} className={cx("object-cover grayscale", portrait && "object-[50%_12%]")} />
            </div>
          </div>
          <div className={cx("absolute inset-0 bg-gradient-to-t", portrait ? "bottom-auto h-[62svh] from-ink to-transparent to-40% lg:hidden" : "from-ink via-ink/75 to-ink/30")} />
          <div className={cx("absolute inset-0", portrait ? "hidden bg-gradient-to-r from-ink from-50% to-transparent to-[72%] lg:block" : "bg-gradient-to-r from-ink/80 via-ink/30 to-transparent")} />
        </div>
        <div className="container-x relative w-full">
          <div className={portrait ? "max-w-[60rem] lg:max-w-[46%]" : "max-w-[60rem]"}>
            <p className="eyebrow animate-fade text-gold">{eyebrow}</p>
            <h1
              className={cx(
                "display mt-6 animate-rise",
                size === "md"
                  ? "text-[clamp(2.25rem,1.6rem+2.2vw,3.25rem)]"
                  : "text-[clamp(2.5rem,1.7rem+2.8vw,4rem)]",
              )}
            >
              {title}
            </h1>
            {intro ? (
              <div className="mt-8 max-w-xl animate-rise text-base leading-[1.85] text-paper/85 [animation-delay:200ms] sm:text-lg">
                {intro}
              </div>
            ) : null}
            {children ? <div className="mt-10 animate-rise [animation-delay:600ms]">{children}</div> : null}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section style={image ? onPhoto : undefined} className={cx(!image && "on-dark", "relative isolate overflow-hidden bg-ink pb-24 pt-36 text-paper sm:pb-32 sm:pt-44 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-32 lg:pt-44")}>
      {image ? (
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill priority sizes="100vw" quality={90} className="object-cover grayscale" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ) : (
        <div aria-hidden className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      )}
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <p className="eyebrow animate-fade text-gold">{eyebrow}</p>
          <h1
            className={cx(
              "display mt-6 animate-rise [animation-delay:80ms]",
              size === "md"
                ? "text-[clamp(2.25rem,1.6rem+2.2vw,3.25rem)]"
                : "text-[clamp(2.5rem,1.7rem+2.8vw,4rem)]",
            )}
          >
            {title}
          </h1>
          {intro ? (
            <div className="mt-8 max-w-xl animate-rise text-base leading-[1.85] text-paper/75 sm:mt-10 [animation-delay:200ms] sm:text-lg">
              {intro}
            </div>
          ) : null}
          {children ? <div className="mt-10 animate-rise [animation-delay:320ms]">{children}</div> : null}
        </div>
        {aside ? <div className="animate-fade [animation-delay:400ms] lg:col-span-5 lg:pl-6 xl:col-span-4 xl:col-start-9 xl:pl-0">{aside}</div> : null}
      </div>
    </section>
  );
}

/** Full-screen section: text set directly on a client photograph, dark in both themes. */
export function PhotoSection({ src, labelledBy, children }: { src: string; labelledBy?: string; children: ReactNode }) {
  return (
    <section style={onPhoto} aria-labelledby={labelledBy} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={src} alt="" fill sizes="100vw" quality={90} className="object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
      </div>
      <div className="container-x relative w-full">{children}</div>
    </section>
  );
}

/** Quiet split: a tall photograph running to the page edge, text in open space beside it. */
export function SplitFeature({ src, labelledBy, reverse, children }: { src: string; labelledBy?: string; reverse?: boolean; children: ReactNode }) {
  return (
    <section aria-labelledby={labelledBy} className="bg-paper text-ink xl:mb-28 xl:grid xl:min-h-[90svh] xl:grid-cols-12 xl:items-center">
      <Reveal variant="fade" className={cx("relative h-[60svh] overflow-hidden xl:col-span-7 xl:h-[90svh]", reverse && "xl:order-2")}>
        <Image src={src} alt={imageAlts[src] ?? ""} fill sizes="(min-width: 1024px) 58vw, 100vw" quality={90} className="object-cover grayscale" />
      </Reveal>
      <div className={cx("px-5 py-20 sm:px-8 sm:py-28 lg:px-20 xl:col-span-5 xl:py-32", reverse ? "xl:pl-[8vw] xl:pr-16" : "xl:pl-16 xl:pr-[8vw]")}>{children}</div>
    </section>
  );
}

/** Quiet disclosure: long detail stays on the page, one click away. */
export function More({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <details className={cx("group border-y border-line", className)}>
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 text-lg [&::-webkit-details-marker]:hidden">
        {label}
        <span aria-hidden className="text-2xl font-light transition-transform duration-500 group-open:rotate-45">+</span>
      </summary>
      <div className="pb-8">{children}</div>
    </details>
  );
}

/* -------------------------------------------------------------- Expandable */

/**
 * A quiet row that shows only its title; the detail opens on demand. Keeps
 * dense reference content available without filling the page with text.
 */
export function Expandable({
  summary,
  children,
  index,
  dark,
  className,
}: {
  summary: ReactNode;
  children: ReactNode;
  index?: number;
  dark?: boolean;
  className?: string;
}) {
  return (
    <details className={cx("group border-b", dark ? "border-line-dark" : "border-line", className)}>
      <summary className="flex min-h-16 cursor-pointer list-none items-center gap-5 py-7 sm:gap-8 sm:py-9 [&::-webkit-details-marker]:hidden">
        {index !== undefined ? (
          <span aria-hidden className={cx("eyebrow w-8 shrink-0 tabular-nums", dark ? "text-paper-muted" : "text-muted")}>
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
        <span className="flex-1">{summary}</span>
        <span
          aria-hidden
          className={cx(
            "grid size-10 shrink-0 place-items-center rounded-full text-xl font-light leading-none transition-transform duration-500 ease-[var(--ease-architect)] group-open:rotate-45",
            dark ? "bg-paper/8 text-paper" : "bg-ink/5 text-ink",
          )}
        >
          +
        </span>
      </summary>
      <div className={cx("pb-10 sm:pb-12", index !== undefined && "pl-[3.25rem] sm:pl-16")}>{children}</div>
    </details>
  );
}

/* ------------------------------------------------------------------- Lists */

export function DotList({ items, dark, className }: { items: readonly string[]; dark?: boolean; className?: string }) {
  return (
    <ul className={cx("space-y-4", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-4 leading-relaxed">
          <span aria-hidden className={cx("mt-[0.7em] h-px w-4 shrink-0", dark ? "bg-gold" : "bg-gold-ink")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
