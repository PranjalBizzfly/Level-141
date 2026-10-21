/**
 * One accurate description per photograph, used as its alt text wherever it
 * appears. Descriptions say only what is visible — no places, names or claims.
 * (about-meeting-room and home-cards-grid-muted are copies of the terrace and
 * compass photographs, so they share those descriptions.)
 */
export const imageAlts: Record<string, string> = {
  "/images/about-atrium-levels-muted.webp": "Looking up through a multi-level atrium towards a glass dome",
  "/images/about-dubai-terrace.webp": "Two colleagues talking on a terrace overlooking a city skyline",
  "/images/about-meeting-room.webp": "Two colleagues talking on a terrace overlooking a city skyline",
  "/images/contact-corridor-warm.webp": "A quiet stone corridor leading towards daylight",
  "/images/ga-hero-structural-node-muted.webp": "Steel beams meeting at a structural joint inside a glass tower",
  "/images/ga-prioritised-bridge-muted.webp": "A curved bridge walkway linking two levels inside a modern building",
  "/images/home-cards-grid-muted.webp": "A hand using drafting compasses on a sketched plan in a notebook",
  "/images/home-fragmented-to-integrated-muted.webp": "Scattered wooden blocks beside blocks assembled into one structure",
  "/images/home-hero-staircase-muted.webp": "A floating staircase rising towards the light",
  "/images/home-hero-terrace-skyline.webp": "A man in a suit on a terrace looking out over a city skyline",
  "/images/home-person-notebook.webp": "A woman thinking at a desk with an open notebook",
  "/images/home-strategist-compass.webp": "A hand using drafting compasses on a sketched plan in a notebook",
  "/images/home-team-table-muted.webp": "A team seen from above, working around one shared plan on a table",
  "/images/home-team-table.webp": "Three colleagues discussing a model at a meeting table by a window",
  "/images/how-strategy-table-muted.webp": "Two colleagues reviewing architectural drawings at a table",
  "/images/pba-hero-speaker.webp": "A leader in a suit speaking across a meeting table",
  "/images/pba-leader-skyline.webp": "A leader in a suit standing at a window overlooking a city skyline",
};

/** The alt text for a photograph (falls back to empty, i.e. decorative, for unknown files). */
export function altFor(src: string | undefined | null) {
  return (src && imageAlts[src]) || "";
}
