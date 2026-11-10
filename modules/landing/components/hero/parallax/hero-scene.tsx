"use client";

import type { StaticImageData } from "next/image";
import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import overlay from "../../../assets/hero/parallax/overlay.webp";
import { type GlitchSettings, GlitchFigure } from "./glitch-figure";
import "./hero-parallax.css";

export type SceneLayer = {
  src: StaticImageData;
  /** x, y, width, height on the layer canvas. */
  box: [number, number, number, number];
  /** The concierge: drawn as a HoloMosaic rather than an image. */
  glitch?: boolean;
};

/** The frame the scene is designed in, and the width below which it switches to the compact layout. */
const FRAME_W = 1440;
const FRAME_H = 863;
const COMPACT_BELOW = 760;

/**
 * Held (see `holdHeight`): how wide the cards and the conversation run across the 1440px UI layer, with a margin
 * either side (the cards from about 128px in, the conversation out to about 1312px). On a narrower page they're
 * zoomed down, about UI_ORIGIN, to fit it.
 */
const UI_SPAN = 1240;
/** The point the held UI is zoomed about: the frame's centre across, and above its middle so it rises off the copy. */
const UI_ORIGIN: [number, number] = [FRAME_W / 2, 300];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * The UI layer's transform (from its top-left corner) on a frame `width` wide: zoomed to the frame's width, or, past
 * `max`, drawn `max` wide and centred on the frame across and down.
 */
function uiTransform(width: number, max = Infinity) {
  const uiW = Math.min(width, max);
  const s = uiW / FRAME_W;
  const x = (width - uiW) / 2;
  const y = ((width - uiW) * FRAME_H) / FRAME_W / 2;
  return x > 0 ? `translate(${x}px, ${y}px) scale(${s})` : `scale(${s})`;
}

/** Held on a page `pageW` wide: the UI layer zoomed down about UI_ORIGIN so its cards and conversation fit the page. */
function heldUiTransform(pageW: number) {
  const u = Math.min(1, pageW / UI_SPAN);
  if (u === 1) return undefined;
  const [ox, oy] = UI_ORIGIN;
  return `translate(${ox * (1 - u)}px, ${oy * (1 - u)}px) scale(${u})`;
}

/** The frame width (null until measured on the client) and whether the compact layout is on. */
export type SceneState = { width: number | null; compact: boolean };

type HeroSceneProps = {
  className?: string;
  /** Keeps the whole frame on screen: no wider than the viewport's height allows. */
  fitHeight?: boolean;
  layers: SceneLayer[];
  /** The layer canvas (layers are boxed on it; it spans the frame's width). */
  layerSize: [number, number];
  glitch?: Partial<GlitchSettings>;
  /** Below this root width (down to the compact layout), the scene keeps this width's layout and is scaled down to fit (exposed as --scene-scale). */
  scaleBelow?: number;
  /**
   * From `scaleBelow` down to the compact layout, keep the frame at its full 1440 × 863 size (so the hero stays as
   * tall as on a wide screen, as sierra.ai's does) instead of scaling it down: it's centred on the page, its sides
   * cropped, and only the UI layer is zoomed down (see UI_SPAN) so the cards and the conversation stay on the page.
   */
  holdHeight?: boolean;
  /** Unscaled content above the frame. */
  aboveFrame?: (state: SceneState) => ReactNode;
  /** Unscaled content over the photo, under the UI. */
  overlayContent?: (state: SceneState) => ReactNode;
  /**
   * The widest the UI layer is drawn: on a frame wider than this it stops growing and is centred on the frame (across
   * and down), so the cards and conversation keep to a centred column while the photo runs the full width.
   */
  uiMaxWidth?: number;
  /** The 1440 × 863 UI layer, zoomed with the frame (laid out as a column when compact). */
  children: (state: SceneState) => ReactNode;
};

/**
 * The hero photo as layers: the 1440 × 863 frame (or, compact, the phone stack: the cards,
 * the concierge centred in the photo, the conversation, then the copy), the layers boxed on their canvas, the
 * concierge as a glitching mosaic, the multiply vignette over all of it, and the UI on top, zoomed
 * with the frame.
 */
export function HeroScene({
  className,
  fitHeight = false,
  layers,
  layerSize,
  glitch,
  scaleBelow,
  holdHeight = false,
  aboveFrame,
  overlayContent,
  uiMaxWidth,
  children,
}: HeroSceneProps) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  // Unknown until measured on the client: the frame then fills the width (up to the viewport's height) and the UI waits.
  const [width, setWidth] = useState<number | null>(null);
  // The scene root spans the page (the frame can be narrower, centred in it): exposed as --scene-page-w so content can line up with the page.
  const [pageWidth, setPageWidth] = useState<number | null>(null);
  // With `scaleBelow`, a root narrower than that keeps the scene laid out at that width and scales it down to fit.
  const [scale, setScale] = useState(1);
  // With `holdHeight`, the page width (narrower than the frame) the full-size frame is held and cropped to.
  const [held, setHeld] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    const measure = () => {
      const rootW = el.clientWidth;
      if (holdHeight && scaleBelow && rootW >= COMPACT_BELOW && rootW < scaleBelow) {
        setScale(1);
        setHeld(rootW);
        setWidth(FRAME_W);
        setPageWidth(rootW);
        return;
      }
      setHeld(null);
      // Phones get the compact layout at their own width rather than the scaled-down frame.
      const s = scaleBelow && rootW >= COMPACT_BELOW && rootW < scaleBelow ? rootW / scaleBelow : 1;
      const layoutW = s < 1 ? scaleBelow! : rootW;
      setScale(s);
      setWidth(fitHeight ? Math.min(layoutW, (window.innerHeight * FRAME_W) / FRAME_H / s) : layoutW);
      setPageWidth(layoutW);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [fitHeight, scaleBelow, holdHeight]);

  const compact = width !== null && width < COMPACT_BELOW;
  const state = { width, compact };

  const scaled = scale < 1;
  const pageVar = {
    "--scene-page-w": pageWidth === null ? "100%" : `${pageWidth}px`,
    "--scene-scale": scale,
    // Scaled, the content inside keeps the full-size page's tokens (its padding and heading size) too.
    ...(scaled && { "--page-pad": "80px", "--h2-scale": 1 }),
  } as CSSProperties;
  const frameStyle = compact
    ? pageVar
    : {
        ...pageVar,
        width: width ?? (fitHeight ? `min(100%, ${(100 * FRAME_W) / FRAME_H}vh)` : "100%"),
        aspectRatio: `${FRAME_W} / ${FRAME_H}`,
        // Scaled: drawn at full size from the root's top-left corner, shrunk to the root's width.
        ...(scaled && { flexShrink: 0, alignSelf: "flex-start", transform: `scale(${scale})`, transformOrigin: "0 0" }),
        // Held: drawn at full size, centred on the narrower root (which crops its sides).
        ...(held !== null && { flexShrink: 0 }),
      };
  // A transform doesn't shrink the layout box, so the root takes the scaled frame's height itself.
  const rootStyle: CSSProperties | undefined =
    held !== null
      ? { overflow: "hidden", justifyContent: "center" }
      : scaled && width !== null
      ? // Top-aligned: centred (the root's justify-content), the full-size frame would overflow it evenly, top and bottom.
        { height: (width * FRAME_H * scale) / FRAME_W, overflow: "hidden", justifyContent: "flex-start" }
      : undefined;

  return (
    <div
      ref={root}
      className={["hero-scene", compact && "hero-scene--compact", className].filter(Boolean).join(" ")}
      style={rootStyle}
    >
      {aboveFrame?.(state)}
      <div ref={frame} className="hero-scene__frame" style={frameStyle}>
        <div className="hero-scene__photo">
          <div
            className="hero-scene__stack"
            style={{ aspectRatio: `${layerSize[0]} / ${layerSize[1]}` }}
            role="img"
            aria-label="Crossword concierge"
          >
            {layers.map((layer, i) => {
              const [x, y, w, h] = layer.box;
              const style = {
                left: pct(x, layerSize[0]),
                top: pct(y, layerSize[1]),
                width: pct(w, layerSize[0]),
                height: pct(h, layerSize[1]),
              };
              return layer.glitch ? (
                <GlitchFigure
                  key={layer.src.src}
                  src={layer.src.src}
                  alt="Crossword concierge"
                  className="hero-scene__crop"
                  style={style}
                  frame={frame}
                  settings={glitch}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- scene layers, positioned by hand
                <img
                  key={layer.src.src}
                  className="hero-scene__crop"
                  src={layer.src.src}
                  alt=""
                  style={style}
                  decoding="async"
                  // The scene photo is the largest paint: fetch it first.
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              );
            })}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- full-frame multiply vignette */}
          <img className="hero-scene__layer hero-scene__overlay" src={overlay.src} alt="" />
        </div>
        {overlayContent?.(state)}
        <div
          className="hero-scene__ui"
          style={
            compact
              ? undefined
              : held !== null
                ? { transform: heldUiTransform(held) }
                : { transform: uiTransform(width ?? FRAME_W, uiMaxWidth), visibility: width === null ? "hidden" : undefined }
          }
        >
          {children(state)}
        </div>
      </div>
    </div>
  );
}
