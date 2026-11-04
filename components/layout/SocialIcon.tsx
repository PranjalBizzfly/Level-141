/** Solid monochrome social marks on a 24px grid; they take the text colour. */
export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const common = { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": true } as const;
  switch (name) {
    case "LinkedIn":
      // Rounded square with the "in" cut out.
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            d="M5 2.5h14A2.5 2.5 0 0 1 21.5 5v14a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 19V5A2.5 2.5 0 0 1 5 2.5Zm2.1 7.2v8.1h2.6V9.7H7.1Zm1.3-1.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3.1 1.2v8.1h2.6v-4.3c0-1.2.5-1.9 1.5-1.9.9 0 1.3.6 1.3 1.8v4.4h2.6v-4.9c0-2.4-1.3-3.4-3-3.4-1.2 0-2 .6-2.4 1.2V9.7h-2.6Z"
          />
        </svg>
      );
    case "YouTube":
      // Rounded screen with the play triangle cut out.
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15.1V8.9l5.2 3.1L10 15.1Z"
          />
        </svg>
      );
    case "Instagram":
      // Camera outline, lens and flash, drawn as filled rings.
      return (
        <svg {...common}>
          <path
            fillRule="evenodd"
            d="M7.5 2.5h9a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5Zm0 1.9a3.1 3.1 0 0 0-3.1 3.1v9a3.1 3.1 0 0 0 3.1 3.1h9a3.1 3.1 0 0 0 3.1-3.1v-9a3.1 3.1 0 0 0-3.1-3.1h-9ZM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.9a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.1-3.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
          />
        </svg>
      );
    case "X":
      return (
        <svg {...common}>
          <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
        </svg>
      );
    default:
      return null;
  }
}
