import { useEffect, useRef, type CSSProperties } from "react";
import { BrandMark, BrandName, BrandWordmark } from "../../brands/BrandIdentity";
import { catalog } from "../../brands/catalog";
import campaignImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/goodwell-campaign/goodwell-social-ad-v1.png";
import addressImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/address.svg";
import moreImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-more.svg";
import chevronImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-chevron.svg";
import adLineImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/line-ad-store.svg";
import dropLineImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/line-store-drop.svg";
import contextLostImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/tile-context-lost.svg";
import dropOffImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/tile-drop-off.svg";

const campaign = campaignImage.src;
const address = addressImage.src;
const more = moreImage.src;
const chevron = chevronImage.src;
const adLine = adLineImage.src;
const dropLine = dropLineImage.src;
const contextLost = contextLostImage.src;
const dropOff = dropOffImage.src;

const products = [catalog.goodwellSleep60, catalog.goodwellEnergy, catalog.goodwellFocus, catalog.goodwellCalm];
const delay = (ms: number) => ({ "--d": `${ms}ms` } as CSSProperties);

export function RoasGap({ motion = false }: { motion?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!motion || !el || !("IntersectionObserver" in window)) return;
    el.classList.add("is-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-playing");
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motion]);

  return (
    <div ref={ref} className="roas roas--wellness">
      <section className="stage stage--ad">
        <article className="shell ig fx fx--fade" style={delay(0)}>
          <header className="ig__head fx" style={delay(100)}>
            <div className="ig__profile">
              <BrandMark brand="Goodwell" className="ig__avatar" />
              <div className="ig__name"><BrandName brand="Goodwell" /><small>Sponsored</small></div>
            </div>
            <img className="ig__more" src={more} alt="" />
          </header>
          <div className="ig__media fx" style={delay(210)}>
            <img src={campaign} alt="Goodwell Daily Sleep, Calm Mood and Daily Focus gummies" />
          </div>
          <div className="ig__cta fx" style={delay(320)}>Shop now <span className="ig__cta-end"><img src={chevron} alt="" /></span></div>
          <p className="ig__caption fx" style={delay(430)}><b><BrandName brand="Goodwell" /></b> Better sleep. No melatonin. Find your evening routine. <span className="ig__tags">#melatoninfree #sleep</span></p>
        </article>
      </section>

      <section className="stage stage--store">
        <article className="shell store fx fx--fade" style={delay(1800)}>
          <div className="ill-browser-chrome fx" style={delay(1880)}>
            <div className="ill-browser-chrome__dots"><span /><span /><span /></div>
            <div className="ill-browser-chrome__address"><img src={address} width="10" height="11" alt="" /><span>goodwell.com</span></div>
          </div>
          <nav className="nav fx" style={delay(1960)}>
            <span className="nav__logo"><BrandWordmark brand="Goodwell" /></span>
            <span className="nav__links">{[40, 52, 36, 46].map((width) => <i key={width} className="bar" style={{ width }} />)}</span>
            <span className="nav__icons"><i className="bar" /><i className="bar" /></span>
          </nav>
          <div className="hero fx" style={delay(2010)}>
            <div className="hero__img">{products.slice(0, 3).map((p) => <img key={p.id} src={p.image} alt={p.title} />)}</div>
            <div className="hero__copy"><h2>Everyday wellness</h2><span className="btn">Shop All</span></div>
          </div>
          <div className="shelf fx" style={delay(2120)}>Best sellers <i className="bar" /></div>
          <div className="grid">
            {products.map((p, i) => (
              <div className="card fx" key={p.id} style={delay(2230 + i * 110)}>
                <div className="media"><img src={p.image} alt={`${p.brand} ${p.title}, ${p.size}`} /></div>
                <div className="card__meta"><div className="card__top"><h4>{p.title}</h4><span className="card__price">{p.price}</span></div><div className="card__sub">{p.size}</div></div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <img className="line line--ad fx-line" style={{ "--d1": "640ms", "--d2": "1380ms" } as CSSProperties} src={adLine} alt="" />
      <img className="line line--drop fx-line fx-line--full" style={{ "--d1": "2920ms" } as CSSProperties} src={dropLine} alt="" />
      <div className="marker marker--lost">
        <div className="tile"><img className="fx" style={delay(1030)} src={contextLost} alt="" /></div>
        <div><h3 className="fx" style={delay(1140)}>Context lost</h3><p className="fx" style={{ width: 132, ...delay(1250) }}>The ad's intent and context don't carry over.</p></div>
      </div>
      <div className="marker marker--drop">
        <div className="tile"><img className="fx" style={delay(3230)} src={dropOff} alt="" /></div>
        <div><h3 className="fx" style={delay(3340)}>Drop-off</h3><p className="fx" style={delay(3450)}>Interest fades. Fewer shoppers convert.</p></div>
      </div>
    </div>
  );
}
