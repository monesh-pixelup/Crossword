"use client";

import texture from "@/modules/sell/assets/motion/texture.webp";
import type { ReactNode } from "react";

/*
 * Scene-local helpers of the storefront scenes (not part of the shared
 * layer). Markup and class names match the source one-for-one so scenes.css
 * applies unchanged.
 */

/** Native size of the storefront scenes (`.ill-channel-container`). */
export const channelContainerSize = { width: 413, height: 402 };

/**
 * The 413 × 402 aubergine panel with the damask texture; the texture image
 * carries the straight gold frame (`V2`). Children are centred.
 */
export function ChannelContainer({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={["ill-channel-container", className].filter(Boolean).join(" ")}>
      {/* eslint-disable-next-line @next/next/no-img-element -- drawn at its source pixels, like the original */}
      <img className="ill-channel-container__texture" src={texture.src} alt="" aria-hidden="true" />
      {children}
    </div>
  );
}

/**
 * A `maxWidth` × `maxHeight` box with `children` laid out at
 * `contentWidth` × `contentHeight` and scaled (about the centre) to fit (`g0`).
 */
export function FitBox({
  contentWidth,
  contentHeight,
  maxWidth,
  maxHeight,
  children,
}: {
  contentWidth: number;
  contentHeight: number;
  maxWidth: number;
  maxHeight: number;
  children: ReactNode;
}) {
  const scale = Math.min(maxWidth / contentWidth, maxHeight / contentHeight);
  return (
    <div style={{ position: "relative", width: maxWidth, height: maxHeight }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: contentWidth,
          height: contentHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Wraps the scene in the container unless `bare` (then the content stands alone at its own size). */
export function MaybeContainer({ bare, children }: { bare: boolean; children: ReactNode }) {
  return bare ? children : <ChannelContainer>{children}</ChannelContainer>;
}
