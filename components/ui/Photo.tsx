import Image from "next/image";
const cx = (...p: Array<string | false | undefined>) => p.filter(Boolean).join(" ");

/**
 * Warm architectural & editorial photography (optimised into /public/images).
 * Every image illustrates a specific line of the approved website copy —
 * see the `alt` text at each use.
 */

/** A framed editorial photo panel. */
export function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <div data-wipe className={cx("relative overflow-hidden rounded-[2rem] bg-ink-2", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-architect)] hover:scale-[1.02]"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/**
 * Decorative hero backdrop on the right of a hero, fading out behind the
 * headline. All site photography is muted-tone, so it is shown with a normal
 * blend (soft in light mode, stronger in dark mode); `colour={false}` restores
 * the faint multiplied treatment for a pure black-and-white image.
 */
export function HeroBackdrop({
  src,
  position = "right center",
  colour = true,
}: {
  src: string;
  position?: string;
  /** Muted-colour photo: shown with a normal blend so its tones survive in light mode. */
  colour?: boolean;
}) {
  return (
    <div
      aria-hidden
      data-parallax
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full [mask-image:linear-gradient(to_left,black_35%,transparent_95%)] lg:w-[62%]"
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 62vw, 100vw"
        className={cx(
          "object-cover",
          colour
            ? "opacity-55 dark:opacity-75"
            : "opacity-35 dark:opacity-65",
        )}
        style={{ objectPosition: position }}
      />
    </div>
  );
}
