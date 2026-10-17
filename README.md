# Level141 website

Level141 — Growth by Design. Marketing site built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Configuration

Copy `.env.example` to `.env.local` and fill in what you need.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for canonical links, Open Graph and the sitemap. |
| `RESEND_API_KEY`, `FORM_FROM_EMAIL`, `FORM_TO_EMAIL` | Email delivery of contact and waitlist submissions through Resend. |
| `FORM_WEBHOOK_URL`, `FORM_WEBHOOK_SECRET` | POST each submission as JSON to a webhook (CRM, Zapier, Make…). |

With no delivery method configured, `/api/contact` and `/api/waitlist` respond `503 not_configured`. The forms then
show an error saying the message was **not** sent, so visitors never get a false confirmation.

## Structure

- `app/` holds the routes: `/`, `/personal-brand-architecture`, `/growth-architecture` (waitlist only),
  `/how-we-architect-growth`, `/insights` (plus `/insights/[slug]`), `/about` and `/start-your-next-level`. It also
  holds the API routes, sitemap, robots and OG image.
- `lib/content.ts` holds the site copy, taken from the documents in `Docs/`.
- `lib/insights.ts` is the Insights content model. Add articles with `status: "published"` to make them appear.
- `lib/forms/` contains the shared validation (client and server) and the delivery integrations.
- `components/brand/Logo.tsx` contains the official marks, traced unchanged from `Docs/logo-1…6.pdf`. Static SVGs are in
  `public/brand/`.

## Business rules

- **Growth Architecture™ is waitlist-only** until launch. It offers no booking, purchase or enquiry flow. The contact
  form redirects that interest to the waitlist. When it launches, update `app/growth-architecture/page.tsx`, the home
  page cards and `validateContact` in `lib/forms/validation.ts`.
- Do not add testimonials, statistics, client logos or case studies unless they are real and approved.
