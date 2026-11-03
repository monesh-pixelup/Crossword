import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { ContentFade } from "../../components/ill/ContentFade";
import { browserUrl } from "./data";

// Flat-color placeholder card, scoped to this scenario — per review
// feedback on Figma node 2745:36229, every shape on the page content
// switched from the shared CommerceProductCardSkeleton's diagonal-sheen
// gradient (ILL/Module/Product/Card-Commerce's own loading state) to a
// single solid fill (var(--color-sand, #f3e9d4)), so the background
// doesn't read as "still loading" — it's meant to sit there, subtle,
// behind the widget. Geometry is unchanged from that skeleton node.
function PageCard() {
  return (
    <article className="ill-page-card">
      <div className="ill-page-card__media" />
      <div className="ill-page-card__meta">
        <div className="ill-page-card__meta-row">
          <div className="ill-page-card__brand" />
          <div className="ill-page-card__rating-icons" />
        </div>
        <div className="ill-page-card__title" />
        <div className="ill-page-card__rating" />
      </div>
      <div className="ill-page-card__cta" />
    </article>
  );
}

// The shared "browser container" all three placement states sit inside.
// Reuses ILL/Module/Browser/Chrome as-is for the window frame. The page
// content below it is deliberately generic — a flat placeholder card,
// not a real product mockup — so the page reads as "some retailer"
// without competing for attention with the widget — per the brief, the
// browser content stays subtle and the widget stays the focus. Fixed
// width/height (BrowserScene.css) so all three states share one
// identical viewport.
// `pageLayer` is an overlay aligned to the product cards' own box (the
// page row minus its padding), for a widget pinned to the cards rather
// than to the viewport — it lines up with them by layout, not by a
// measured offset.
// `url` is opt-in (the Storybook-mapped pilot shows the Aurelia store);
// unset, the scene shows the scenario's own placeholder address.
export function BrowserScene({
  children,
  pageLayer,
  url = browserUrl,
}: {
  children?: React.ReactNode;
  pageLayer?: React.ReactNode;
  url?: string;
}) {
  return (
    <div className="ill-browser-scene">
      <BrowserChrome url={url} />
      <div className="ill-browser-scene__nav">
        <span className="ill-browser-scene__logo" />
        <div className="ill-browser-scene__nav-links">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="ill-browser-scene__page">
        <PageCard />
        <PageCard />
        {pageLayer && <div className="ill-browser-scene__page-layer">{pageLayer}</div>}
      </div>
      {/* ILL/Module/Overlay/Content-Fade, reused as-is — fades the page
          content into the viewport's own bottom edge. Painted before the
          widget layer below (DOM order), so it sits behind the launcher/
          composer and never dims them. */}
      <ContentFade />
      <div className="ill-browser-scene__widget-layer">{children}</div>
    </div>
  );
}
