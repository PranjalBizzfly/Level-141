/**
 * Focal point for each tall photograph, used as `object-position` (and as the
 * origin of the zoom and drift) so wide frames keep the face in view instead
 * of centre-cropping to the torso. Landscape photographs stay centred.
 */
const imageFocus: Record<string, string> = {
  "/images/client-executive-portrait-woman.webp": "50% 2%",
  "/images/client-executive-study-woman.webp": "60% 28%",
  "/images/client-ceo-portrait.webp": "50% 8%",
  "/images/client-executive-study-portrait.webp": "55% 16%",
  "/images/client-executive-in-motion.webp": "50% 15%",
};

/** Inline style that crops `src` around its focal point. */
export function focusStyle(src: string) {
  const position = imageFocus[src] ?? "50% 50%";
  return { objectPosition: position, transformOrigin: position };
}
