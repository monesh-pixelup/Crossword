# Site content (Sanity): the blog and the testimonials

The blog's posts and categories live in Sanity (project `mb4vhjft`, "Crossword Website", dataset `production`) and are edited in the
Sanity Studio the site serves at **/studio** (`app/studio/[[...tool]]/page.tsx`, configured in `sanity.config.ts`).

| What | Where |
| --- | --- |
| Post / category / table fields | `sanity/schemaTypes/` |
| Queries and caching | `modules/blog/lib/posts.ts` |
| Journal (`/blog`) and posts (`/blog/<slug>`) | `app/(marketing)/blog/` |
| Home page Blog section | `modules/landing/config/blog.ts` |
| Refresh on publish (webhook) | `app/api/revalidate/route.ts` |
| The original four posts, for import | `sanity/seed/blog.ndjson` |

## Writing a post

1. Open `/studio` and sign in with your Sanity account.
2. **Blog posts → +**. Fill in the title, click **Generate** next to URL, then choose a category, date and summary.
3. Write the article. Text before the first **Section heading** is the introduction; each Section heading starts a
   part, listed in the post's Index. Use **+ → Table** for a table (its first row is the header).
4. Optionally add a cover image, or tick **Feature on the home page** to put the post in the home page's large card.
5. **Publish**. The site updates within seconds (with the webhook below), or within an hour without it.

Categories (the journal's filters) are under **Categories**; "Position in the filters" sets their order.

## Testimonials

The testimonial carousels (home and blog, Conversational Interface, Support, Retain) are edited under **Testimonials**
in the Studio (`sanity/schemaTypes/testimonial.ts`; read by `modules/landing/lib/testimonials.ts`).

1. **Testimonials → +**. Fill in the quote (no quotation marks), the name, and the role and company.
2. Optionally add a **Photo**: it fills the tilted portrait card. Without one the card shows the site's own photograph.
3. Choose the **Portrait card colour** and, under **Show on**, the pages whose carousel includes it.
4. **Position in the carousel** orders a page's testimonials (1 first). The carousel opens on the second one.
5. **Publish**.

A page with no testimonials in Sanity shows the site's built-in placeholders (`modules/landing/config/testimonials.ts`).
The stamp on each card is fixed artwork, not editable. The twelve the site started with are in
`sanity/seed/testimonials.ndjson`.

## One-time setup

- **Import the existing posts:** `npx sanity login`, then
  `npx sanity dataset import sanity/seed/blog.ndjson production --replace`.
- **CORS origins** (sanity.io/manage → project → API → CORS origins): add `http://localhost:3000` and the live site's
  address, each with **Allow credentials** ticked, so the Studio can sign in from them.
- **Webhook** (sanity.io/manage → API → Webhooks → Create): URL `https://<live site>/api/revalidate`, dataset
  `production`, trigger on create / update / delete, filter `_type in ["post", "category", "author", "testimonial"]`, HTTP method POST, and a
  **Secret** equal to `SANITY_REVALIDATE_SECRET`.
- **Vercel** (Project → Settings → Environment Variables): `SANITY_REVALIDATE_SECRET`, the same value. Locally it is in
  `.env.local` (not committed).
