import Image from "next/image";

const cx = (...p: Array<string | false | undefined>) => p.filter(Boolean).join(" ");

/**
 * A reserved place for photography or video, as the reference sites use.
 * - With `src` (image) or `video`, it shows the media with the scroll wipe.
 * - Without, it shows a quiet placeholder naming what belongs there, so the
 *   layout is final and media can be dropped in later without redesign.
 */
export function MediaSlot({
  src,
  video,
  alt = "",
  label,
  className,
  sizes = "100vw",
  priority,
}: {
  src?: string;
  video?: string;
  alt?: string;
  /** What should go here, shown only while the slot is empty. */
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (video) {
    return (
      <div data-wipe className={cx("relative overflow-hidden rounded-[1.25rem] bg-ink-2", className)}>
        <video className="absolute inset-0 size-full object-cover" src={video} autoPlay muted loop playsInline aria-hidden />
      </div>
    );
  }
  if (src) {
    return (
      <div data-wipe className={cx("relative overflow-hidden rounded-[1.25rem] bg-ink-2", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${label}`}
      className={cx(
        "relative grid place-items-center overflow-hidden rounded-[1.25rem] border border-dashed border-line-strong bg-paper-2",
        className,
      )}
    >
      <span className="px-6 text-center text-sm text-muted">
        <span className="eyebrow block">Media</span>
        <span className="mt-1 block">{label}</span>
      </span>
    </div>
  );
}
