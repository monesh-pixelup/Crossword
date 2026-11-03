import type { CSSProperties } from "react";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Button } from "../../components/ill/Button";
import { Icon } from "../../components/ill/Icon";
import { Rating } from "../../components/ill/Rating";
import { Tag } from "../../components/ill/Tag";
import { ContentFade } from "../../components/ill/ContentFade";
import { BrandMark } from "../../brands/BrandIdentity";
import { Nav } from "../AiSearch/AiSearch";
import { comparisonTitle, pdpProduct, brand, domain, landing, products, rows, serp, steps, takeaway } from "./data";

// Sell: Comparison tools. Five static frames on the AI Search storefront
// recipe (738x680 crimson canvas, 550x520 window, kit browser chrome; the
// .ais root supplies all of it). Follows the SuperMush vs OLLY reference:
//   01 → 02  the sponsored Goodwell result is picked: it takes the selected
//            card treatment, the products row above recedes
//   02 → 03  the window navigates to Goodwell's comparison page: PDP
//            left (wide), comparison right (narrow column) (heads + first two rows; the rest are
//            skeleton bars in their exact row slots)
//   03 → 04  the remaining rows resolve in place
//   04 → 05  the insight drops in above the table, pushing it down as one
//            block; the Melatonin row takes the gold highlight
// Groups carry data-name (Serp, Sponsored products, Sponsored result,
// Product, Insight, Comparison, Row / <label>) for the motion pass.
export type Step = 1 | 2 | 3 | 4 | 5;

// 01–02 · Google results page, rebuilt from the reference screenshot as
// plain elements (Google's own type and colors, not the kit's): logo +
// search bar, tabs, Sponsored Products carousel, Sponsored Results.
const G_ICONS = {
  close: <path d="M6 6l12 12M18 6L6 18" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" />,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" fill="#4285f4" /><path d="M6 11a6 6 0 0012 0M12 17v4" stroke="#34a853" strokeWidth="2" fill="none" strokeLinecap="round" /></>,
  lens: <><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="#4285f4" strokeWidth="2" strokeDasharray="6 4" /><circle cx="12" cy="12" r="3" fill="#ea4335" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="#4285f4" strokeWidth="2.4" /><path d="M15 15l5 5" stroke="#4285f4" strokeWidth="2.4" strokeLinecap="round" /></>,
  next: <path d="M10 6l6 6-6 6" stroke="#1a73e8" strokeWidth="2" fill="none" strokeLinecap="round" />,
  caret: <path d="M7 10l5 5 5-5z" fill="#5f6368" />,
  dots: <><circle cx="12" cy="5" r="1.8" fill="#5f6368" /><circle cx="12" cy="12" r="1.8" fill="#5f6368" /><circle cx="12" cy="19" r="1.8" fill="#5f6368" /></>,
  up: <path d="M6 15l6-6 6 6" stroke="#5f6368" strokeWidth="2" fill="none" strokeLinecap="round" />,
};
function G({ name, size = 16 }: { name: keyof typeof G_ICONS; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>{G_ICONS[name]}</svg>;
}
const LOGO = [["G", "#4285f4"], ["o", "#ea4335"], ["o", "#fbbc05"], ["g", "#4285f4"], ["l", "#34a853"], ["e", "#ea4335"]];

export function Serp({ picked }: { picked: boolean }) {
  return (
    <div className={picked ? "gs gs--picked" : "gs"} data-name="Serp">
      <header className="gs-head" data-name="Search header">
        <span className="gs-logo">{LOGO.map(([c, col], i) => <span key={i} style={{ color: col }}>{c}</span>)}</span>
        <div className="gs-bar">
          <span className="gs-bar__q">{serp.query}</span>
          <G name="close" size={14} />
          <i className="gs-bar__sep" />
          <G name="mic" /><G name="lens" /><G name="search" />
        </div>
      </header>
      <nav className="gs-tabs">
        {serp.tabs.map((t) => (
          <span key={t} className={t === "All" ? "gs-tab gs-tab--active" : "gs-tab"}>{t}{(t === "More" || t === "Tools") && <G name="caret" size={12} />}</span>
        ))}
      </nav>
      <section className="gs-products" data-name="Sponsored products">
        <p className="gs-h">{serp.productsLabel} <G name="dots" size={12} /></p>
        <div className="gs-carousel">
          {serp.products.map((g) => (
            <article key={g.id} className="gs-card" data-name={`Card / ${g.name} ${g.variant}`}>
              <div className="gs-card__media"><img src={g.image} alt="" /></div>
              <p className="gs-card__name"><span>{g.name}</span><span>{g.variant}</span></p>
              <p className="gs-card__price">{g.price}</p>
              <p className="gs-card__seller">{brand}</p>
            </article>
          ))}
          <span className="gs-next"><G name="next" size={14} /></span>
        </div>
      </section>
      <section className="gs-results">
        <p className="gs-h gs-h--rule">{serp.resultsLabel}</p>
        <article className="gs-ad" data-name="Sponsored result">
          <div className="gs-ad__source">
            <BrandMark brand={brand} className="gs-ad__logo" />
            <span><b>{brand}</b><small>https://www.{domain}</small></span>
            <G name="dots" size={12} />
          </div>
          <p className="gs-ad__title">{serp.ad.title}</p>
          <p className="gs-ad__desc">{serp.ad.description}</p>
          <p className="gs-ad__links">{serp.ad.sitelinks.map((l, i) => <span key={l}>{i > 0 && " · "}<a>{l}</a></span>)}</p>
        </article>
        <span className="gs-hide">Hide sponsored results <G name="up" size={12} /></span>
      </section>
    </div>
  );
}

// Product card (supporting column): image + preview strip, name, price + rating,
// truncated description, one primary CTA. No size options on
// the comparison page; those live on the full PDP.
function Pdp() {
  const p = pdpProduct;
  return (
    <section className="cmp-hero" data-name="Product">
      <div className="cmp-hero__gallery">
        <div className="cmp-hero__media"><img src={p.image} alt={`${p.name}, ${p.variant}`} /></div>
        {/* Media previews under the main image; the first is the one shown. */}
        <div className="cmp-hero__thumbs">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={i === 0 ? "ais-gallery__thumb cmp-hero__thumb cmp-hero__thumb--active" : "ais-gallery__thumb cmp-hero__thumb"}>
              <img src={p.image} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="ais-details">
        <div className="ais-details__head">
          <h2>{p.name}</h2>
          <div className="ais-details__meta">
            <span className="ais-details__price">{p.price}<span className="cmp-variant"> · {p.variant}</span></span>
            <Rating value={p.rating} count={p.reviews} />
          </div>
        </div>
        <p className="cmp-desc">{landing.description}<span className="cmp-desc__more">{landing.seeMore}</span></p>
        <Button appearance="primary" label={landing.cta} className="ais-details__cta" />
      </div>
    </section>
  );
}

// Comparison module (Figma 1941:14353, as built in SponsoredComparison):
// "Powered by Crossword" tag on the top edge, insight-mark title row,
// favored-column band on Goodwell's cells, plain bordered rows. In 05 the
// title row becomes the insight.
// Opt-in for the motion: the insight's words as spans carrying their
// stream index (--w), so CSS can play Storybook's word stream.
function Words({ text, from = 0 }: { text: string; from?: number }) {
  return <>{text.split(" ").map((w, i) => <span key={i} className="cmp-word" style={{ "--w": from + i } as CSSProperties}>{i > 0 && " "}{w}</span>)}</>;
}

const CELLS = ["label", "value-a", "value-b"];
const cx = (...n: (string | false | undefined)[]) => n.filter(Boolean).join(" ");

function Comparison({ step, stream = false }: { step: 3 | 4 | 5; stream?: boolean }) {
  return (
    <section className={step === 5 ? "cmp-module cmp-module--focus" : "cmp-module"} data-name="Comparison">
      <span className="cmp-module__tag"><Tag /></span>
      <div className="cmp-module__title" data-name={step === 5 ? "Insight" : "Title"}>
        <Icon name="insight" />
        <div>
          <p>{step === 5 ? (stream ? <Words text={takeaway.headline} /> : takeaway.headline) : comparisonTitle}</p>
          {step === 5 && <p className="cmp-module__body">{stream ? <Words text={takeaway.body} from={takeaway.headline.split(" ").length} /> : takeaway.body}</p>}
        </div>
      </div>
      <div className="cmp-module__head">
        <span />
        {products.map((p) => <span key={p.id} data-name={`Product / ${p.name}`}>{p.name}</span>)}
      </div>
      {rows.map((r, i) => {
        const loading = step === 3 && i >= 2;
        return (
          // One markup for both states, so a loading row resolves in place
          // (the motion crossfades each cell's bone to its text). The real
          // text stays in the cell while loading, so the row keeps its 04
          // height; the bone is a rounded bar laid over it.
          <div
            key={r.id}
            className={cx("cmp-row", i >= 2 && "cmp-row--late", loading && "cmp-row--skeleton", r.highlight && step === 5 && "cmp-row--highlight")}
            data-name={`Row / ${r.label}`}
            aria-hidden={loading || undefined}
          >
            <div className="ill-comparison-row">
              {[r.label, ...r.values].map((t, c) => (
                <div key={c} className={`ill-comparison-row__cell ill-comparison-row__${CELLS[c]}`}>
                  <span className="cmp-text">{t}</span>
                  <i className="cmp-bone" style={{ "--len": t.length } as CSSProperties} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export function Landing({ step, stream }: { step: 3 | 4 | 5; stream?: boolean }) {
  return (
    <div className="ais-page">
      <Nav searching={false} />
      <div className="ais-body">
        <div className="cmp-landing">
          <Pdp />
          <Comparison step={step} stream={stream} />
        </div>
        <ContentFade />
      </div>
    </div>
  );
}

export function ComparisonToolsFrame({ step }: { step: Step }) {
  const onSerp = step <= 2;
  return (
    <div className="ais cmp">
      <article className="ais-store">
        <BrowserChrome url={onSerp ? serp.url : landing.path} />
        <div className="ais-viewport">
          {onSerp ? <Serp picked={step === 2} /> : <Landing step={step as 3 | 4 | 5} />}
        </div>
      </article>
    </div>
  );
}

export function ComparisonTools() {
  return (
    <section className="cmp-section">
      {([1, 2, 3, 4, 5] as Step[]).map((s) => (
        <figure className="cmp-figure" key={s} data-name={`Comparison / 0${s}`}>
          <figcaption className="app-stage__tile-label">Comparison / 0{s} — {steps[s - 1]}</figcaption>
          <ComparisonToolsFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
