import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { MediaSlot } from "@/components/ui/MediaSlot";

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

type ButtonVariant = "solid" | "gold" | "outline" | "outline-light" | "ghost" | "ghost-light";

const buttonStyles: Record<ButtonVariant, string> = {
  solid: "bg-ink text-paper hover:bg-ink-3",
  gold: "bg-gold text-ink hover:bg-gold-soft",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/30 text-paper hover:border-gold hover:bg-gold hover:text-ink",
  ghost: "border border-line-strong text-ink hover:border-ink",
  "ghost-light": "border border-paper/25 text-paper hover:border-paper/60",
};

export const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-center text-[0.95rem] sm:whitespace-nowrap font-medium tracking-[-0.005em] transition-[background-color,color,border-color] duration-300 ease-[var(--ease-architect)]";

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
        className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-architect)] group-hover:translate-x-1"
      />
    </Link>
  );
}

/* ----------------------------------------------------------------- Layout */

export function Eyebrow({ children, className, index }: { children: ReactNode; className?: string; index?: string }) {
  return (
    <p className={cx("eyebrow flex items-center gap-3", className)}>
      {/* Section index is decorative; the heading order carries the structure. */}
      {index ? (
        <span aria-hidden className="tabular-nums">
          {index}
        </span>
      ) : null}
      {index ? <span aria-hidden data-rule className="h-px w-8 bg-current opacity-50" /> : null}
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
  "paper-2": "grain bg-paper-2 text-ink",
  white: "grain bg-surface text-ink",
  ink: "on-dark bg-ink text-paper",
};

export function Section({ id, tone = "paper", className, children, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx("relative py-20 sm:py-24 lg:py-24", tones[tone], className)}>
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
        align === "split" ? "grid gap-8 lg:gap-x-16 sm:gap-8 lg:grid-cols-12 lg:gap-16" : "max-w-4xl",
        className,
      )}
    >
      <Reveal className={align === "split" ? "lg:col-span-7" : undefined}>
        <Eyebrow index={index} className={dark ? "text-gold" : "text-gold-ink"}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className="display mt-6 text-[2rem] sm:mt-6 sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.625rem]">
          <span data-split className="block">
            {title}
          </span>
        </h2>
      </Reveal>
      {intro ? (
        <Reveal
          delay={120}
          className={cx(
            "measure text-base leading-relaxed sm:text-lg",
            dark ? "text-paper/75" : "text-muted",
            align === "split" ? "lg:col-span-5 lg:self-end" : "mt-10",
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
  const color = { gold: "text-gold", ink: "text-ink", paper: "text-paper" }[tone];
  const s = { sm: "size-4", md: "size-6 sm:size-8", lg: "size-8 sm:size-12" }[size];
  const pad = { sm: "px-6 py-7", md: "px-8 py-10 sm:px-12 sm:py-12", lg: "px-10 py-12 sm:px-16 sm:py-14" }[size];
  return (
    <div className={cx("relative", pad, className)}>
      <BracketClose className={cx("absolute right-0 top-0", s, color)} />
      <BracketOpen className={cx("absolute bottom-0 left-0", s, color)} />
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- Page hero */

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  /** Optional decorative backdrop photo (see HeroBackdrop). */
  image?: string;
  /** True when `image` is a muted-colour photo. */
  imageColour?: boolean;
}) {
  return (
    <section className="recede on-dark relative bg-ink text-paper">
      {/* Reference layout: a centred eyebrow, title and intro in a quiet field, the
          page's actions, then a full-width media frame. The aside follows below. */}
      <div className="container-x flex flex-col items-center pb-14 pt-36 text-center sm:pb-16 sm:pt-44 lg:pt-48">
        <p className="eyebrow animate-fade text-paper-muted">{eyebrow}</p>
        <h1 data-split="load" className="display mt-8 max-w-[18ch] text-[clamp(2.5rem,5.6vw,5.75rem)] leading-[0.98] sm:mt-8">
          {title}
        </h1>
        {intro ? <div className="mt-10 max-w-2xl animate-rise text-paper/75 [animation-delay:400ms]">{intro}</div> : null}
        {children ? <div className="mt-12 flex animate-rise justify-center [animation-delay:520ms]">{children}</div> : null}
      </div>
      {/* Media only when the page has it — an empty placeholder never ships. */}
      <div className={cx("container-x", image || aside ? "pb-20 sm:pb-28" : "pb-10")}>
        {image ? (
          <div data-rise>
            <MediaSlot
              src={image}
              label={`Page film or image — ${eyebrow}`}
              className="aspect-[16/10] sm:aspect-[16/7]"
              sizes="(min-width: 1408px) 1300px, 100vw"
              priority
            />
          </div>
        ) : null}
        {aside ? <div className="mx-auto mt-12 max-w-2xl animate-fade [animation-delay:400ms]">{aside}</div> : null}
      </div>
    </section>
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
