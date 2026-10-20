"use client";

import type { StaticImageData } from "next/image";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import overlay from "../../../assets/hero/parallax/overlay.webp";
import { type GlitchSettings, GlitchFigure } from "./glitch-figure";
import { ParallaxCamera, type ParallaxLook } from "./motion";
import "./hero-parallax.css";

export type SceneLayer = {
  src: StaticImageData;
  /** x, y, width, height on the layer canvas. */
  box: [number, number, number, number];
  /** How far the layer moves with the camera, in canvas px at full tilt (negative: against it). */
  depth: { x: number; y: number };
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
  parallax?: Partial<ParallaxLook>;
  glitch?: Partial<GlitchSettings>;
  /** Unscaled content above the frame. */
  aboveFrame?: (state: SceneState) => ReactNode;
  /** Unscaled content over the photo, under the UI. */
  overlayContent?: (state: SceneState) => ReactNode;
  /** The 1440 × 863 UI layer, zoomed with the frame (laid out as a column when compact). */
  children: (state: SceneState) => ReactNode;
};

/**
 * The hero photo as parallax layers: the 1440 × 863 frame (or, compact, the full-height phone frame
 * with the photo centred in it), the layers boxed on their canvas and shifted by the camera, the
 * concierge as a glitching mosaic, the multiply vignette over all of it, and the UI on top, zoomed
 * with the frame.
 */
export function HeroScene({
  className,
  fitHeight = false,
  layers,
  layerSize,
  parallax,
  glitch,
  aboveFrame,
  overlayContent,
  children,
}: HeroSceneProps) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const [camera, setCamera] = useState<ParallaxCamera | null>(null);
  // Unknown until measured on the client: the frame then fills the width (up to the viewport's height) and the UI waits.
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    const measure = () =>
      setWidth(fitHeight ? Math.min(el.clientWidth, (window.innerHeight * FRAME_W) / FRAME_H) : el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [fitHeight]);

  const compact = width !== null && width < COMPACT_BELOW;
  const state = { width, compact };

  useEffect(() => {
    const el = stack.current;
    if (!el) return;
    const depths = [...el.querySelectorAll<HTMLElement>(".hero-scene__depth")];
    const cam = new ParallaxCamera(
      frame.current!,
      el,
      layerSize[0],
      layers.map((layer, i) => ({ el: depths[i], depth: layer.depth })),
    );
    setCamera(cam);
    return () => cam.dispose();
  }, [layers, layerSize]);

  const { intensity, follow, release } = parallax ?? {};
  useEffect(() => {
    camera?.setLook({
      ...(intensity !== undefined && { intensity }),
      ...(follow !== undefined && { follow }),
      ...(release !== undefined && { release }),
    });
  }, [camera, intensity, follow, release]);

  const frameStyle = compact
    ? undefined
    : {
        width: width ?? (fitHeight ? `min(100%, ${(100 * FRAME_W) / FRAME_H}vh)` : "100%"),
        aspectRatio: `${FRAME_W} / ${FRAME_H}`,
      };

  return (
    <div ref={root} className={["hero-scene", compact && "hero-scene--compact", className].filter(Boolean).join(" ")}>
      {aboveFrame?.(state)}
      <div ref={frame} className="hero-scene__frame" style={frameStyle}>
        <div className="hero-scene__photo">
          <div
            ref={stack}
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
              const moves = layer.depth.x !== 0 || layer.depth.y !== 0;
              return layer.glitch ? (
                <GlitchFigure
                  key={layer.src.src}
                  src={layer.src.src}
                  alt="Crossword concierge"
                  className="hero-scene__crop hero-scene__depth"
                  style={style}
                  frame={frame}
                  settings={glitch}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- parallax layers, positioned and moved by hand
                <img
                  key={layer.src.src}
                  className="hero-scene__crop hero-scene__depth"
                  data-moves={moves || undefined}
                  src={layer.src.src}
                  alt=""
                  style={style}
                  // The back wall is the largest paint: fetch it first.
                  fetchPriority={i === 0 ? "high" : undefined}
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
