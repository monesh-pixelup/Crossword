# Crossword

The marketing site for Crossword, an AI shopper assistant ("the concierge desk for your brand"): the home page, the
product pages, pricing, the blog and the privacy policy. Built with Next.js (App Router), React and Tailwind CSS v4.
Blog posts and testimonials are written in Notion and copied into the repo by a scheduled sync.

- **Deployed site:** moving from Vercel (https://crossword-orcin.vercel.app) to Cloudflare Workers at crossword.ai
- **Blog and testimonial editing:** Notion, Content Hub (Articles, Authors, Testimonials); see its Content Guide
- **Design language and tokens:** [DESIGN.md](DESIGN.md)
- **Blog sync from Notion:** [content/blog/SYNC.md](content/blog/SYNC.md)

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript |
| Styling | Tailwind CSS v4 (`app/globals.css` holds the theme tokens and the site's own utilities) |
| Content | Markdown and YAML in `content/`, written from Notion by the blog sync, built into JSON at build time |
| Motion | GSAP and Lenis (scroll), Three.js (the home hero's concierge), plus the ported motion visuals (see below) |
| Icons | Phosphor |
| Hosting | Cloudflare Workers, through the OpenNext adapter (`@opennextjs/cloudflare`) |

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
| `npm run cf:preview` | Builds for Cloudflare and runs the Worker locally at http://localhost:8787 |
| `npm run cf:deploy` | Builds and deploys the Worker to Cloudflare |
| `npm run cf:upload` | Builds and uploads a new Worker version without sending traffic to it (preview) |
| `npm run blog:build` | Checks `content/` and writes the JSON the blog and testimonials read (runs before dev, lint and build) |

### Environment variables

The site needs no environment variables. `NEXT_PUBLIC_SITE_URL` (default `https://crossword.ai`) sets the address
used in canonical links, the sitemap and structured data.

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
| `/media/...` | Blog and testimonial images from the R2 bucket `crossword-website-media` | `app/media/[...path]/route.ts` |
| `/sitemap.xml` | Sitemap (pages and posts not hidden from search) | `app/sitemap.ts` |

## Project structure

```
app/                  Routes only: each page composes sections from its module
  (marketing)/        Home, pricing, blog, privacy (share the site shell)
  (product)/          The product pages (same shell)
  media/              Serves /media/... from R2
  globals.css         Tailwind theme, responsive tokens, site-wide utilities and rules
  layout.tsx          Root layout: fonts, smooth scroll, two small inline checks (see Browser notes)
components/ui/        Shared building blocks: SectionTitle, Eyebrow, StampButton, TextLink, DividerBand, ...
lib/                  Fonts (self-hosted), class helper, autoplay-tabs hook
modules/<page>/       One folder per page: components/, config/ (copy and data), assets/
modules/marketing/    Site shell: header, footer, page rails, hero curtain, mobile menu
modules/shared/       Assets and motion pieces used by more than one page
public/images/        Images referenced by URL from the ported motion bundles
content/              Blog posts, authors, categories and testimonials (from Notion), plus the sync runbook
scripts/blog/         Notion to Markdown, the content build, and the one-time Sanity export
sanity/               The old Sanity schema and seed data, kept frozen for reference (not used by the site)
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

## Blog and testimonials (Notion)

Writers draft in the Notion Content Hub: **Articles** (posts), **Authors** (bylines) and **Testimonials** (carousel
slides). Scheduled "Blog sync" tasks follow [content/blog/SYNC.md](content/blog/SYNC.md): they fill empty SEO fields,
turn each page into `content/blog/posts/<slug>.md` on a branch `ai/issue-<n>`, copy images to R2 (branch `blog-media`,
uploaded by the Blog media workflow, served at `/media/...`), and post a preview on the issue and the Notion card.
Notion is the source of truth: never edit those files by hand, since the next sync overwrites them.

`scripts/blog/build.mjs` checks every post and writes the JSON the site reads (posts, slugs, redirects for renamed
slugs, testimonials) before every dev, lint and build. A broken post fails the build with the file and field named.

Approving a post (moving its card to Scheduled, or `approved` on its issue) waits for its publish time (Blog
publishing, every 10 minutes), merges it, and then **Blog ship** sends production only that post's files on top of
what production already runs, without the rest of staging. A change that touches code still needs `ship it`.

Sanity was dropped on 2026-11-26. Its four posts and twelve testimonials were copied over word for word; `sanity/`
keeps its schema and seed data for reference.

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

The site runs on Cloudflare Workers through the OpenNext adapter. `wrangler.jsonc` names the Worker and its bindings;
`open-next.config.ts` sets where Next's cache lives:

| Binding | Cloudflare resource | Holds |
| --- | --- | --- |
| `NEXT_INC_CACHE_R2_BUCKET` | R2 bucket `crossword-website-opennext-cache` | Cached pages |
| `NEXT_TAG_CACHE_D1` | D1 database `crossword-website-tag-cache` | Cache tags |
| `MEDIA` | R2 bucket `crossword-website-media` | Blog and testimonial images, served at `/media/...` |
| `IMAGES` | Cloudflare Images | `next/image` resizing |

The R2 buckets and the D1 database live in the Inscripts Cloudflare account (`wrangler.jsonc` holds the D1 ID). The
deploy workflows create the media bucket if it is missing.

GitHub Actions does every deploy (`.github/workflows/`), with the repository secrets `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID`. Each target is its own Worker with its own cache prefix:

| When | Workflow | Worker | Address |
| --- | --- | --- | --- |
| Push to `ai/issue-<n>` | Preview | `crossword-website-issue-<n>` | https://issue-&lt;n&gt;.preview.crossword.ai |
| Issue closed | Preview cleanup | deletes that Worker | |
| Comment `approved` on the issue | Issue commands, then Deploy | `crossword-website` | https://staging.crossword.ai |
| Comment `ship it` on the issue | Issue commands, then Promote to production | `crossword-website-production` | routes in the `PRODUCTION_ROUTES` variable |
| A blog-post issue merges | Blog ship | `crossword-website-production` | only that issue's content files |
| Push to `blog-media` | Blog media | R2 bucket `crossword-website-media` | `/media/...` |
| By hand | Roll back production | `crossword-website-production` | |

`approved` merges `ai/issue-<n>` into `main` and deploys staging. `ship it` sends the staging build that contains that
merge to production, without rebuilding. Production gets everything on staging at once, so if staging also holds other
issues that aren't live yet, `ship it` lists them all and waits for a second `ship it` on the same issue within 30
minutes. Once the build is live it closes every issue it shipped. It finds those issues from the commits between the
`production` tag (moved by Promote to production) and the staging build: each commit whose first line ends in `(#N)`.
The comment must be just the command, and only people with write access can use them. A push to `main` also deploys
staging. While `PRODUCTION_ROUTES` is empty the production
Worker has no address.

The Worker must stay under Cloudflare's size limit (3 MiB compressed on the free plan, 10 MiB on paid).
