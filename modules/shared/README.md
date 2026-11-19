# Shared assets

`assets/` holds images used by more than one page's motion visuals (the illustration kit copied into Managed launch,
Personal agents and Retain, and Sell's product cutouts). Each file is kept once here and imported as
`@/modules/shared/assets/...`, instead of a copy per page.

The built motion bundles' images that several pages share live the same way in `public/images/shared/` (Home v2,
Sell v2, AI Assistants v3, Dynamic v2 and Support v3 point there). A few images stay in their page's own
`public/images/...` folder because their path is built at runtime (e.g. `asset("stride-tempo-glide")`), so keep those
where they are.

When a new design handoff brings an image already here, point its import at this copy rather than adding another.
