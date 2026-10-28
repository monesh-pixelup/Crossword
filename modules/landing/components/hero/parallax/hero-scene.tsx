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

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

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
  /** Unscaled content above the frame. */
  aboveFrame?: (state: SceneState) => ReactNode;
  /** Unscaled content over the photo, under the UI. */
  overlayContent?: (state: SceneState) => ReactNode;
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
  aboveFrame,
  overlayContent,
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

  useLayoutEffect(() => {
    const el = root.current!;
    const measure = () => {
      const rootW = el.clientWidth;
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
  }, [fitHeight, scaleBelow]);

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
      };
  // A transform doesn't shrink the layout box, so the root takes the scaled frame's height itself.
  const rootStyle: CSSProperties | undefined =
    scaled && width !== null
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
              : { transform: `scale(${(width ?? FRAME_W) / FRAME_W})`, visibility: width === null ? "hidden" : undefined }
          }
        >
          {children(state)}
        </div>
      </div>
    </div>
  );
}
