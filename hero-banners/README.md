# Crossword hero banner assets

These assets were prepared from the live pages at https://crossword-orcin.vercel.app/ on 11 November 2026. The deployment was not modified.

| Page | Desktop asset | Mobile asset |
| --- | --- | --- |
| Home | `desktop/home-3000.webp` | `mobile/home-mobile.webp` |
| Conversational Interface | `desktop/conversational-interface-3000.webp` | `mobile/conversational-interface-mobile.webp` |
| Dynamic Landing Pages | `desktop/dynamic-landing-pages-3000.webp` | `mobile/dynamic-landing-pages-mobile.webp` |
| Support | `desktop/support-3000.webp` | `mobile/support-mobile.webp` |
| Retain | `desktop/retain-3000.webp` | `mobile/retain-mobile.webp` |
| AI Assistants | `desktop/ai-assistants-3000.webp` | `mobile/ai-assistants-mobile.webp` |
| Personal Agents | `desktop/personal-agents-3000.webp` | `mobile/personal-agents-mobile.webp` |
| Managed Launch | `desktop/managed-launch-3000.webp` | `mobile/managed-launch-mobile.webp` |

Each desktop image is 3000px wide and retains its source height (928px for six platform pages, 927px for Managed Launch, 1730px for Home). The original source pixels are preserved exactly in the center. The left extensions include page-specific architectural detail blended into the source wall. A dark fade at both outer edges softens the image on wide screens. Generated architecture fills the right extension. The desktop WebP files are lossless so the original center remains intact.

Each mobile image is 780 × 1688px, sized for a 390 × 844px hero at 2× density. The crop centers the page's photographic subject and has a bottom dark gradient for white hero text. These are ready to use as the mobile image in a `<picture>` element or equivalent responsive media rule. Keep hero copy as HTML text above the image.

Home currently uses layered scene, concierge and overlay files in its live animation. `home-3000.webp` and `home-mobile.webp` are flattened scene alternatives; retaining the animation requires adapting its layer coordinates and applying the bottom gradient in CSS.

The `source/` folder contains the downloaded originals, `outpaint-details/` contains the generated edge references, and `build_assets.py` records the exact crop and compositing settings. Pricing and Blog have typographic heroes, so they have no banner image to export.
