"use client";

import { type ComponentType, type ReactNode, useEffect, useRef, useState } from "react";
import { MotionRoot } from "./primitives";

export type SceneEntry = {
  Component: ComponentType<{ play?: boolean }>;
  /** What the scene shows, for assistive tech (the scene itself is decorative). */
  label: string;
  /** The scene's drawn size. */
  width: number;
  height: number;
  /** How long the script takes to settle, in ms. */
  duration: number;
};

type ScenePanelProps = {
  scene: SceneEntry;
  /** Whether this scene is the one showing (a tab's); it plays only while active and on screen. */
  active?: boolean;
  /** Room kept clear around the scene inside the panel, in panel pixels. */
  padding?: number;
  /** Cap on the zoom, so a scene never grows past its drawn size (or past this). */
  maxScale?: number;
  /** Props passed through to the scene (e.g. a storefront scene's `bare`). */
  sceneProps?: Record<string, unknown>;
  /** The CSS scope the scene renders in: the Sell scenes' MotionRoot unless another page passes its own. */
  root?: ComponentType<{ children: ReactNode }>;
  /**
   * Scale with a transform instead of `zoom`. Zoom scales the scene's computed font sizes, and
   * browsers clamp tiny text up to their minimum font size, so a wide scene shrunk far (on a phone)
   * would overflow its own boxes; a transform scales the drawn scene instead.
   */
  transform?: boolean;
  className?: string;
};

/**
 * A motion scene drawn at its fixed size and zoomed to fit (contain) the panel it fills,
 * centred. The scene plays while `active` and at least 30% on screen, as the source build
 * did; leaving and coming back restarts it.
 */
export function ScenePanel({
  scene,
  active = true,
  padding = 0,
  maxScale = 1,
  sceneProps,
  root: Root = MotionRoot,
  transform = false,
  className,
}: ScenePanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth - padding * 2;
      const h = el.clientHeight - padding * 2;
      setScale(Math.max(0, Math.min(maxScale, w / scene.width, h / scene.height)));
    };
    fit();
    const resize = new ResizeObserver(fit);
    resize.observe(el);
    const view = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    view.observe(el);
    return () => {
      resize.disconnect();
      view.disconnect();
    };
  }, [scene.width, scene.height, padding, maxScale]);

  const { Component } = scene;
  const content = (
    <Root>
      <Component play={active && inView} {...sceneProps} />
    </Root>
  );
  return (
    <div ref={ref} role="img" aria-label={scene.label} className={className ?? "absolute inset-0"}>
      {/* Centred by flex rather than translate, which `zoom` would scale along with the scene. */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {transform ? (
          // A box the scaled scene's size holds its place; the scene is drawn full size inside it and scaled from the corner.
          <div
            className="relative shrink-0"
            style={{ width: scene.width * scale, height: scene.height * scale, visibility: scale ? undefined : "hidden" }}
          >
            <div
              inert
              className="absolute top-0 left-0 origin-top-left"
              style={{ width: scene.width, height: scene.height, transform: `scale(${scale})` }}
            >
              {content}
            </div>
          </div>
        ) : (
          <div
            inert
            className="shrink-0"
            style={{ width: scene.width, height: scene.height, zoom: scale || undefined, visibility: scale ? undefined : "hidden" }}
          >
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
