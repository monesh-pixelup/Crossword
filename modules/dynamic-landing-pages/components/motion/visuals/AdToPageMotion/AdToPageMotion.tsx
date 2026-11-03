import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { cx, useFontsReady } from "../sellDynamicMotion";
import { Ad as PcAd, Page as PcPage } from "../PersonalizedContent/PersonalizedContent";
import { domain as pcDomain } from "../PersonalizedContent/data";
import { Ad as OfrAd, Page as OfrPage } from "../Offers/Offers";
import { domain as ofrDomain } from "../Offers/data";

interface Flight {
  from: { x: number; y: number; w: number; h: number };
  to: { x: number; y: number; w: number; h: number };
  src: string;
}

function Scene({
  t,
  variant,
  ad,
  page,
  domain,
  heroImg,
}: {
  t: Timeline;
  variant: "pcx" | "ofr";
  ad: ReactNode;
  page: ReactNode;
  domain: string;
  heroImg: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [moved, setMoved] = useState(false);
  const [landed, setLanded] = useState(t.reducedMotion);
  const store = t.reached("store");

  useLayoutEffect(() => {
    const root = rootRef.current;
    const adEl = root?.querySelector<HTMLElement>(".adj-ig");
    if (!root || !adEl) return;
    const r = adEl.getBoundingClientRect();
    // Back to CSS px: the site zooms each visual to fit its panel, and
    // getBoundingClientRect reports zoomed values. 1 (a no-op) at the
    // visual's drawn size.
    const zoom = root.offsetWidth ? root.getBoundingClientRect().width / root.offsetWidth : 1;
    root.style.setProperty("--atp-ad-w", `${r.width / zoom}px`);
    root.style.setProperty("--atp-ad-h", `${r.height / zoom}px`);
  }, []);

  useLayoutEffect(() => {
    if (!store || t.reducedMotion) return;
    const root = rootRef.current;
    const jar = root?.querySelector<HTMLElement>(".pcx-ad__jar-anchor");
    const hero = root?.querySelector<HTMLImageElement>(heroImg);
    if (!root || !jar || !hero) return;
    const box = root.getBoundingClientRect();
    // Back to the root's own CSS px: the site zooms each visual to fit its
    // panel, and getBoundingClientRect reports zoomed values. 1 (a no-op)
    // at the visual's drawn size.
    const zoom = root.offsetWidth ? box.width / root.offsetWidth : 1;
    const rect = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: (r.left - box.left) / zoom, y: (r.top - box.top) / zoom, w: r.width / zoom, h: r.height / zoom };
    };
    setFlight({ from: rect(jar), to: rect(hero), src: jar.dataset.flightSrc || "" });
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMoved(true)));
    return () => cancelAnimationFrame(raf);
  }, [store, heroImg, t.reducedMotion]);

  const pos = flight && (moved ? flight.to : flight.from);
  return (
    <div
      ref={rootRef}
      className={cx(
        "adj adjm atp",
        `atp--${variant}`,
        t.reached("tap-ad") && "adjm--tap",
        store && "adjm--store",
        store && !landed && "atp--flying",
        t.reached("scroll") && "atp--scrolled",
        t.reached("finish") && "atp--finish",
      )}
    >
      {ad}
      <div className="adjm-plate" />
      <div className={cx("ais pcx atp-store", variant === "ofr" && "ofr")}>
        <article className="ais-store">
          <BrowserChrome url={domain} />
          <div className="ais-viewport">{page}</div>
        </article>
      </div>
      {pos && !landed && (
        <img
          className="atp-flight"
          src={flight.src}
          alt=""
          style={{ left: pos.x, top: pos.y, width: pos.w, height: pos.h }}
          onTransitionEnd={(e) => e.propertyName === "top" && setLanded(true)}
        />
      )}
    </div>
  );
}

function useAdTimeline(beats: Beat[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  return { rootRef, t };
}

const pcBeats: Beat[] = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1100 },
  { id: "read", type: "pause", ms: 1500 },
  { id: "scroll", type: "appear", ms: 1100 },
  { id: "finish", type: "pause", ms: 1600 },
];

export function PersonalizedContentMotion() {
  const { rootRef, t } = useAdTimeline(pcBeats);
  return (
    <div ref={rootRef}>
      <Scene
        key={t.runKey}
        t={t}
        variant="pcx"
        ad={<PcAd />}
        page={<PcPage step={t.reached("scroll") ? 3 : 2} />}
        domain={pcDomain}
        heroImg=".pcx-hero__media img"
      />
    </div>
  );
}

const ofrBeats: Beat[] = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1500 },
  { id: "read", type: "pause", ms: 1300 },
  { id: "scroll", type: "appear", ms: 1300 },
  { id: "finish", type: "pause", ms: 1800 },
];

export function OffersMotion() {
  const { rootRef, t } = useAdTimeline(ofrBeats);
  return (
    <div ref={rootRef}>
      <Scene
        key={t.runKey}
        t={t}
        variant="ofr"
        ad={<OfrAd />}
        page={<OfrPage step={t.reached("scroll") ? 3 : 2} />}
        domain={ofrDomain}
        heroImg=".ofr-hero__media img"
      />
    </div>
  );
}
