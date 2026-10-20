"use client";

import { type CSSProperties, type RefObject, useEffect, useRef, useState } from "react";
import { HoloMosaic } from "./holo-mosaic";
import { GlitchCursor } from "./motion";

export type GlitchSettings = {
  /** Glitch on its own, every `interval` seconds (±30%), up to `peak`. */
  auto: boolean;
  interval: number;
  peak: number;
  /** How far the cursor's glitch is calmed over the face (0 none … 1 fully). */
  faceCalm: number;
  cursor: { radius: number; strength: number; rest: number; motion: number; warp: number };
};

export const defaultGlitch: GlitchSettings = {
  auto: true,
  interval: 2.6,
  peak: 0.6,
  cursor: { radius: 110, strength: 1, rest: 0.55, motion: 1, warp: 0.8 },
  faceCalm: 0.6,
};

/** The concierge's mosaic look. */
const LOOK = { tileSize: 1.2, shift: 0.75, erase: 0.72, vanish: 0.2, flicker: 0.16, scan: 1, edge: 0.22, warm: 0.12, tint: "#ffc875" };

/** The face's centre in the cutout (fractions of its box), and the calm's inner and outer radius (of its height). */
const FACE = { x: 0.539, y: 0.385 };
const FACE_INNER = 0.13;
const FACE_OUTER = 0.3;

/** The hit mask: the cutout's alpha at half size, over 96, grown by 4px. */
const MASK_SCALE = 0.5;
const MASK_ALPHA = 96;
const MASK_GROW = 4;

type Mask = { w: number; h: number; bits: Uint8Array };

async function loadMask(src: string): Promise<Mask> {
  const img = new Image();
  img.src = src;
  await img.decode();
  const w = Math.max(1, Math.round(img.naturalWidth * MASK_SCALE));
  const h = Math.max(1, Math.round(img.naturalHeight * MASK_SCALE));
  const ctx = Object.assign(document.createElement("canvas"), { width: w, height: h }).getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const solid = new Uint8Array(w * h);
  for (let i = 0; i < solid.length; i++) solid[i] = data[i * 4 + 3] > MASK_ALPHA ? 1 : 0;
  const r = Math.ceil(MASK_GROW * MASK_SCALE);
  const bits = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let hit = 0;
      for (let dy = -r; dy <= r && !hit; dy++) {
        for (let dx = -r; dx <= r && !hit; dx++) {
          const px = x + dx;
          const py = y + dy;
          if (px >= 0 && py >= 0 && px < w && py < h) hit = solid[py * w + px];
        }
      }
      bits[y * w + x] = hit;
    }
  }
  return { w, h, bits };
}

const smoothstep = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

type GlitchFigureProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** The element whose pointer moves drive the cursor glitch (the scene's frame). */
  frame: RefObject<HTMLElement | null>;
  settings?: Partial<GlitchSettings>;
};

/**
 * The concierge cutout as a HoloMosaic: it glitches on a timer, and breaks up under the cursor
 * wherever the pointer is over the figure itself (not its transparent box), calmer over the face.
 */
export function GlitchFigure({ src, alt, className, style, frame, settings }: GlitchFigureProps) {
  const host = useRef<HTMLDivElement>(null);
  const mosaic = useRef<HoloMosaic | null>(null);
  const [cursor] = useState(() => new GlitchCursor());
  const s = { ...defaultGlitch, ...settings, cursor: { ...defaultGlitch.cursor, ...settings?.cursor } };
  const { auto, interval, peak, faceCalm } = s;
  const { radius, strength, rest, motion, warp } = s.cursor;

  useEffect(() => {
    const m = new HoloMosaic(host.current!, src, { alt, cursor });
    m.setLook(LOOK);
    mosaic.current = m;
    return () => {
      m.dispose();
      mosaic.current = null;
    };
    // The mosaic is built once; a new source is swapped in below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = mosaic.current;
    if (m && m.img.getAttribute("src") !== src) m.setSource(src);
  }, [src]);

  useEffect(() => {
    cursor.setLook({ radius, rest, motion });
  }, [cursor, radius, rest, motion]);

  useEffect(() => {
    if (!auto) return;
    let cancelled = false;
    let timer = 0;
    const run = async () => {
      await mosaic.current?.glitch({ peak });
      if (!cancelled) timer = window.setTimeout(run, interval * 1000 * (0.7 + Math.random() * 0.6));
    };
    timer = window.setTimeout(run, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [auto, interval, peak]);

  useEffect(() => {
    const target = frame.current;
    const el = host.current;
    if (!target || !el) return;
    let mask: Mask | null = null;
    let alive = true;
    loadMask(src).then((m) => {
      if (alive) mask = m;
    });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !mask) return;
      const box = el.getBoundingClientRect();
      const u = (e.clientX - box.left) / box.width;
      const v = (e.clientY - box.top) / box.height;
      const mx = Math.floor(u * mask.w);
      const my = Math.floor(v * mask.h);
      if (!(mx >= 0 && my >= 0 && mx < mask.w && my < mask.h && mask.bits[my * mask.w + mx] === 1)) return cursor.leave();
      const toFace = Math.hypot((u - FACE.x) * (box.width / box.height), v - FACE.y);
      const calm = faceCalm * (1 - smoothstep(FACE_INNER, FACE_OUTER, toFace));
      cursor.setLook({ strength: strength * (1 - calm), warp: warp * (1 - calm) });
      cursor.move(e.clientX, e.clientY);
    };
    const onLeave = () => cursor.leave();
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerleave", onLeave);
    return () => {
      alive = false;
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      cursor.leave();
    };
  }, [frame, src, cursor, strength, warp, faceCalm]);

  return <div ref={host} className={className} style={style} />;
}
