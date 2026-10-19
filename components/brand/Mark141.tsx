import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { cx } from "@/components/ui/primitives";

/**
 * "141" framed by the two brackets of the Level141 symbol.
 * The numerals are optically centred: the text box is trimmed to the digit
 * height and the negative tracking is compensated so the glyphs sit on the
 * true centre of the bracket frame. Decorative (aria-hidden).
 */
export function Mark141({
  className,
  textClassName,
  closeClassName = "text-gold",
  openClassName = "text-current opacity-40",
}: {
  className?: string;
  textClassName?: string;
  closeClassName?: string;
  openClassName?: string;
}) {
  return (
    <div aria-hidden className={cx("relative aspect-square", className)}>
      <BracketClose className={cx("absolute right-0 top-0 size-[30%]", closeClassName)} />
      <BracketOpen className={cx("absolute bottom-0 left-0 size-[30%]", openClassName)} />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={cx(
            "block font-display font-medium leading-none tracking-[-0.06em] [margin-right:-0.06em] [text-box:trim-both_cap_alphabetic]",
            textClassName,
          )}
        >
          141
        </span>
      </span>
    </div>
  );
}
