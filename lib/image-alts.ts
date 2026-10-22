/**
 * One accurate description per photograph, used as its alt text wherever it
 * appears. Descriptions say only what is visible — no places, names or claims.
 * (about-meeting-room and home-cards-grid-muted are copies of the terrace and
 * compass photographs, so they share those descriptions.)
 */
export const imageAlts: Record<string, string> = {
  "/images/client-hero-skyline-opening.webp": "Light falling through a tall opening in a stone interior, framing the Dubai skyline",
  "/images/client-mentorship-conversation.webp": "A senior leader in conversation with two younger colleagues",
  "/images/client-executive-library.webp": "An executive in glasses seated in a library, deep in thought",
  "/images/client-executive-portrait-woman.webp": "A composed woman in a dark suit seated in a leather chair",
  "/images/client-executive-study-woman.webp": "A thoughtful woman in a study holding a pen, looking into the distance",
  "/images/client-keynote-monochrome.webp": "A speaker presenting to a large conference audience",
  "/images/client-walk-through-crowd.webp": "A confident woman walking through a busy concourse",
  "/images/client-executive-in-motion.webp": "A man in a suit striding through a crowd",
  "/images/client-ceo-portrait.webp": "Close portrait of an executive in a suit, hand at his chin",
  "/images/client-speaker-conference-stage.webp": "A speaker on stage addressing a full conference audience",
  "/images/client-walk-toward-skyline.webp": "A man in a suit walking across a terrace towards a city skyline",
  "/images/client-executive-dubai-window.webp": "An executive standing at a floor-to-ceiling window overlooking the Dubai skyline",
  "/images/client-executive-city-lounge.webp": "An executive seated in a lounge chair, looking out over the Dubai skyline",
  "/images/client-executive-study-portrait.webp": "A thoughtful executive in glasses seated in a study, holding a pen to his chin",
  "/images/client-keynote-auditorium.webp": "A woman giving a keynote to a packed auditorium",
  "/images/client-lone-executive-skyline.webp": "An executive standing alone at a tall window looking out over a city skyline",
  "/images/client-executive-contemplation.webp": "An executive seated at a desk, deep in thought",
  "/images/client-mentorship.webp": "An experienced leader talking with two younger colleagues",
  "/images/client-visionaries-horizon.webp": "Three leaders looking out from a high terrace towards a misty horizon",
  "/images/about-atrium-levels-muted.webp": "Looking up through a multi-level atrium towards a glass dome",
  "/images/about-dubai-terrace.webp": "Two colleagues talking on a terrace overlooking a city skyline",
  "/images/about-meeting-room.webp": "Two colleagues talking on a terrace overlooking a city skyline",
  "/images/contact-corridor-warm.webp": "A quiet stone corridor leading towards daylight",
  "/images/ga-hero-structural-node-muted.webp": "Steel beams meeting at a structural joint inside a glass tower",
  "/images/ga-prioritised-bridge-muted.webp": "A curved bridge walkway linking two levels inside a modern building",
  "/images/home-cards-grid-muted.webp": "A hand using drafting compasses on a sketched plan in a notebook",
  "/images/home-fragmented-to-integrated-muted.webp": "Scattered wooden blocks beside blocks assembled into one structure",
  "/images/ga-hero-stair-light.webp": "A dark stone staircase rising towards a tall opening of light",
  "/images/insights-hero-light-shaft.webp": "A shaft of light falling between dark concrete walls onto still water",
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
