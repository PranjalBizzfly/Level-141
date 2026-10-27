import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { BracketClose, BracketOpen } from "@/components/brand/Logo";

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
    <section id={id} aria-labelledby={labelledBy} className={cx("relative py-24 sm:py-32 lg:py-40", tones[tone], className)}>
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
        align === "split" ? "grid gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12" : "max-w-4xl",
        className,
      )}
    >
      <Reveal className={align === "split" ? "lg:col-span-7" : undefined}>
        <Eyebrow index={index} className={dark ? "text-gold" : "text-gold-ink"}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className="display mt-5 text-[2.25rem] sm:mt-7 sm:text-5xl lg:text-[3.75rem]">
          <span data-mask className="block">
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

/* --------------------------------------------------------------- Page hero */

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink pb-20 pt-32 text-paper sm:pb-24 sm:pt-40 lg:pb-32 lg:pt-44">
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <p className="eyebrow animate-fade text-gold">{eyebrow}</p>
          <h1 className="display mt-6 animate-rise text-[2.6rem] [animation-delay:80ms] sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]">
            {title}
          </h1>
          {intro ? (
            <div className="mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-paper/75 sm:mt-8 [animation-delay:200ms] sm:text-xl">
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
