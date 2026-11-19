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
  /**
   * With `transform`, scale with it only below this viewport width (px), and with `zoom` from there up. A transform
   * scales the scene after it's laid out, so its 0.5–1px hairlines (frames, card borders) land part-way through
   * screen pixels and fade or vanish on standard-density screens; `zoom` lays them out at the new size, keeping each
   * a whole pixel. The minimum-font-size clamp only bites far down, on phones, which are high-density anyway.
   * Defaults to 768px (TRANSFORM_BELOW); pass Infinity to scale with the transform at every width.
   */
  transformBelow?: number;
  /**
   * Fill the panel instead (cover, not contain): the scene is scaled to cover it and centred, its
   * overflow cropped. For a panel whose shape follows the layout rather than the scene's.
   */
  cover?: boolean;
  /** Leave the scene clickable (Human mode's chapter list); by default it's decorative and inert. */
  interactive?: boolean;
  className?: string;
};

/** Whether the viewport is narrower than `width` (always true without one, and before it's measured). */
/**
 * By default a `transform` panel scales with the transform only on phones (below 768px) and with `zoom` from there
 * up. Scaled with a transform, a scene is laid out at its drawn size and then shrunk, and once its animated parts are
 * composited the browser shrinks their painted text as a bitmap: at desktop sizes the small UI text came out harsh,
 * letters running into each other, and only looked clear zoomed in. `zoom` lays the scene out at its new size, so its
 * text is drawn at the size it shows.
 */
const TRANSFORM_BELOW = 768;

function useNarrow(width: number | undefined) {
  const [narrow, setNarrow] = useState(true);
  useEffect(() => {
    if (width === undefined) return;
    const query = window.matchMedia(`(width < ${width}px)`);
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [width]);
  return narrow;
}

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
  transform: transformProp = false,
  transformBelow = TRANSFORM_BELOW,
  cover = false,
  interactive = false,
  className,
}: ScenePanelProps) {
  const narrow = useNarrow(transformProp ? transformBelow : undefined);
  const transform = transformProp && narrow;
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth - padding * 2;
      const h = el.clientHeight - padding * 2;
      setScale(Math.max(0, cover ? Math.max(w / scene.width, h / scene.height) : Math.min(maxScale, w / scene.width, h / scene.height)));
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
  }, [scene.width, scene.height, padding, maxScale, cover]);

  const { Component } = scene;
  // The scene mounts only once the panel has its scale: a scene that measures itself on mount (the camera demos fit
  // their zoom to their frame's measured size, once) would otherwise measure itself at scale 0 and never zoom.
  const content = scale > 0 && (
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
              inert={!interactive}
              className="absolute top-0 left-0 origin-top-left"
              style={{ width: scene.width, height: scene.height, transform: `scale(${scale})` }}
            >
              {content}
            </div>
          </div>
        ) : (
          <div
            inert={!interactive}
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
