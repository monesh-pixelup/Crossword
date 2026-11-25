# Crossword

The marketing site for Crossword, an AI shopper assistant ("the concierge desk for your brand"): the home page, the
product pages, pricing, the blog and the privacy policy. Built with Next.js (App Router), React, Tailwind CSS v4 and
Sanity for the blog.

- **Deployed site:** https://crossword-orcin.vercel.app
- **Blog editing (Sanity Studio):** `/studio` on the site, or https://crossword-website.sanity.studio
- **Design language and tokens:** [DESIGN.md](DESIGN.md)
- **Blog content and Sanity setup:** [sanity/README.md](sanity/README.md)

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript |
| Styling | Tailwind CSS v4 (`app/globals.css` holds the theme tokens and the site's own utilities) |
| Content | Sanity (project `mb4vhjft`, "Crossword Website", dataset `production`), read with `next-sanity` |
| Motion | GSAP and Lenis (scroll), Three.js (the home hero's concierge), plus the ported motion visuals (see below) |
| Icons | Phosphor |
| Hosting | Vercel |

> This Next.js version differs from older ones in APIs and conventions. Before changing framework-level code, read
> the relevant guide in `node_modules/next/dist/docs/` (see [AGENTS.md](AGENTS.md)).

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run studio:deploy` | Builds and deploys the Sanity Studio to crossword-website.sanity.studio |

### Environment variables

Set these in `.env.local` for local work and in Vercel (Project → Settings → Environment Variables). `.env*` files are
not committed.

| Variable | Needed | Purpose |
| --- | --- | --- |
| `SANITY_REVALIDATE_SECRET` | Yes, for instant blog updates | Signs the Sanity webhook that refreshes the blog (`app/api/revalidate`). Must match the secret set on the webhook. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Overrides the Sanity project. Defaults to `mb4vhjft` in `sanity/env.ts`. |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Overrides the dataset. Defaults to `production`. |

## Pages

| Route | Page | Code |
| --- | --- | --- |
| `/` | Home | `modules/landing` |
| `/conversational-interface` | Conversational Interface (`/sell` redirects here) | `modules/sell` |
| `/dynamic-landing-pages` | Dynamic Landing Pages | `modules/dynamic-landing-pages` |
| `/retain` | Retain | `modules/retain` |
| `/support` | Support | `modules/support` |
| `/ai-assistants` | AI Assistants | `modules/ai-assistants` |
| `/personal-agents` | Personal Agents | `modules/personal-agents` |
| `/managed-launch` | Managed Launch | `modules/managed-launch` |
| `/pricing` | Pricing and the ROI calculator | `modules/pricing` |
| `/blog`, `/blog/[slug]` | The journal and its posts | `modules/blog` |
| `/privacy` | Privacy policy | `modules/legal` |
| `/studio` | Sanity Studio (blog editing) | `app/studio`, `sanity.config.ts` |
| `/api/revalidate` | Sanity webhook endpoint | `app/api/revalidate/route.ts` |

## Project structure

```
app/                  Routes only: each page composes sections from its module
  (marketing)/        Home, pricing, blog, privacy (share the site shell)
  (product)/          The product pages (same shell)
  studio/             The embedded Sanity Studio
  api/revalidate/     Webhook that refreshes the blog
  globals.css         Tailwind theme, responsive tokens, site-wide utilities and rules
  layout.tsx          Root layout: fonts, smooth scroll, two small inline checks (see Browser notes)
components/ui/        Shared building blocks: SectionTitle, Eyebrow, StampButton, TextLink, DividerBand, ...
lib/                  Fonts (self-hosted), class helper, autoplay-tabs hook
modules/<page>/       One folder per page: components/, config/ (copy and data), assets/
modules/marketing/    Site shell: header, footer, page rails, hero curtain, mobile menu
modules/shared/       Assets and motion pieces used by more than one page
public/images/        Images referenced by URL from the ported motion bundles
sanity/               Schema, client, seed content and the blog's setup notes
```

Conventions worth knowing:

- **Copy lives in config files.** Section text, lists and step data are in each module's `config/` folder, not in the
  components.
- **Breakpoints** follow the original Webflow build: `xs` 480px, `md` 768px, `lg` 992px (plus Tailwind's `xl` 1280px).
  Page padding, section spacing and heading sizes are CSS variables on `:root` in `globals.css` that step at those
  widths.
- **Section headlines** use `components/ui/section-title`. They are drawn at the 60px desktop size and scaled with
  the breakpoint (`--h2-scale`); below 768px they keep one size and wrap instead of shrinking.
- **Fixed-size compositions** (mock-ups, diagrams) are drawn at their Figma size and scaled to their container with
  the `fit-to-container`, `scale-to-container` and `cover-container` utilities in `globals.css`.
- **Fonts** are self-hosted through `next/font/local` (`lib/fonts.ts`), not fetched from Google at build time.

## Motion visuals

The animated product illustrations come from separate "motion visual" source projects and are brought into the site
per page:

- `modules/landing/components/motion/home-v2`, `modules/sell/components/motion-v2`,
  `modules/support/components/motion-v3`, `modules/ai-assistants/components/motion` and
  `modules/dynamic-landing-pages/components/motion` each hold a compiled bundle (`*.js`) with its stylesheet. They are
  the source's own build, edited by hand only where the site needs it; those edits are marked `// Site:`.
- `modules/retain`, `modules/personal-agents` and `modules/managed-launch` hold the visuals as TypeScript components.
- `modules/shared/motion/scene-panel.tsx` (`ScenePanel`) draws a visual at its design size and scales it to the panel
  it sits in. A visual plays while it is on screen and the tab is focused.
- Every visual's script runs on a shared timeline hook (`useChatTimeline`, one copy per bundle). On phones the scripts
  run at 80% of their desktop duration.
- Brand logos shown inside the visuals live in `modules/shared/assets/motion/brands/logomarks/` (used by Retain and
  Personal Agents) and, for the compiled bundles, in `public/images/shared/` under the bundle's hashed file names. When
  a logo changes, replace it in both places. The editable SVG sources are in `logomarks/abstract/`.

## Blog (Sanity)

Posts, categories and authors are edited in the Sanity Studio and read by `modules/blog/lib/posts.ts`. Blog pages are
cached and refresh when Sanity's webhook calls `/api/revalidate`; without the webhook they refresh about an hour after
a change.

Setting up a fresh Sanity project needs, in sanity.io/manage:

1. **CORS origins** (API → CORS origins), each with "Allow credentials": `http://localhost:3000` and the live site's
   address. The Studio at `/studio` cannot sign in without them.
2. **Webhook** (API → Webhooks): POST to `https://<live site>/api/revalidate`, dataset `production`, on create, update
   and delete, filter `_type in ["post", "category"]`, with a secret equal to `SANITY_REVALIDATE_SECRET`.
3. **Content:** `npx sanity dataset import sanity/seed/blog.ndjson --dataset production` loads the original four posts
   and their categories.

Full details, including how to write a post, are in [sanity/README.md](sanity/README.md).

## Browser notes

The site is checked against Chrome and Safari, including iPhone Safari. A few things in the code exist only for
browser differences, and are easy to break without knowing why they are there:

- **Scaling formula.** The fit utilities compute a zoom from a ratio of two lengths. Safari 18 gets the usual
  `tan(atan2())` form wrong when a container unit is involved, so where plain length division is supported it is used
  instead (`globals.css`, the fit utilities).
- **Small text in scaled mock-ups.** Safari 18 and earlier will not draw zoomed text below 9px. An inline script in
  `app/layout.tsx` detects this and marks `<html data-zoom-clamps>`; below 992px the mock-ups and `ScenePanel` then
  scale with a transform instead of `zoom`.
- **iPhone text sizing.** Elements that set `zoom` take `-webkit-text-size-adjust: auto` on iOS, without which text
  inside them ignores the zoom.
- **Home hero first paint.** An inline script in `<head>` marks the home page (`<html data-dark-top>`) so the top of
  the page is black before the hero has loaded, rather than flashing the cream page background.
- **Hero clipping.** The home hero is clipped top and bottom with a `clip-path` rather than a one-axis overflow clip,
  which desktop Safari applied sideways too.

## Deployment

The site is hosted on Vercel. After changing the Sanity project or its environment variables, redeploy so the new
values are picked up. The hosted Studio is deployed separately with `npm run studio:deploy`.
