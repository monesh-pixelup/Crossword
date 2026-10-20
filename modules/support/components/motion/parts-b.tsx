"use client";

import { type ReactNode, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AttributeRow, Button, Chip, IconButton, Skeleton } from "@/modules/sell/components/motion/primitives";
import handoffBg from "../../assets/motion/handoff-bg.webp";

/*
 * Scene-local building blocks used by the second group of support scenes
 * (merchant insight, guardrails, human takeover, merchant approval, whisper
 * to agent). Ported from the scene chunk of the "Support V3 — Motion" build;
 * markup and class names match the original so scenes.css applies unchanged.
 * Minified names: M SceneFrame (always with `hideBackground` here), Re
 * useSkeletonShapes, B SupportPanel, be HelpdeskHeader, bs ChatBreaker,
 * ys InsightHighlight; HumanLoopFrame is the backdrop the last three scenes
 * repeat inline.
 */

/**
 * The 738 × 680 scene frame the human-in-the-loop scenes sit in, centred.
 * Those scenes pass `hideBackground`, so the frame draws nothing itself (no
 * notched background or texture): it's transparent around its content.
 */
export function SceneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="ill-scene-frame-scale">
      <div className="ill-scene-frame">
        <div className="ill-scene-frame__content">{children}</div>
      </div>
    </div>
  );
}

type SkeletonShape = { kind: "block" | "outline" | "bar"; x: number; y: number; w: number; h: number; r: number };

/** Elements drawn as one solid skeleton block. */
const blockSelector =
  ".ill-chip, .ill-button, .ill-thumbnail, .ill-support-step__marker, .ill-support-shade__swatch, svg, img";

/**
 * Traces the content of `ref` (skipping elements with class `skip`) into
 * skeleton shapes while `active`: chips, buttons, images and the like become
 * blocks, filled/bordered containers become outlines, and each line of text
 * becomes a bar 80% of its font size tall. Re-traced on resize and once the
 * fonts are ready.
 */
function useSkeletonShapes(ref: RefObject<HTMLElement | null>, skip: string, active: boolean) {
  const [shapes, setShapes] = useState<SkeletonShape[]>([]);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!active || !root) return;
    const trace = () => {
      const box = root.getBoundingClientRect();
      const left = box.left + root.clientLeft;
      const top = box.top + root.clientTop;
      const found: SkeletonShape[] = [];
      const add = (rect: DOMRect, kind: SkeletonShape["kind"], r: number, inset = 0) =>
        found.push({ kind, x: rect.left - left, y: rect.top - top + inset, w: rect.width, h: rect.height - inset * 2, r });
      const visit = (el: Element) => {
        if (el.classList.contains(skip)) return;
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return;
        const radius = parseFloat(style.borderTopLeftRadius) || 0;
        if (el.matches(blockSelector)) {
          add(el.getBoundingClientRect(), "block", radius);
          return;
        }
        const channels = style.backgroundColor.match(/[\d.]+/g);
        const filled = !!channels && (channels.length < 4 || parseFloat(channels[3]) > 0);
        if ((parseFloat(style.borderTopWidth) > 0 || filled) && el.children.length > 0) {
          add(el.getBoundingClientRect(), "outline", radius);
        }
        const textNodes = [...el.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
        if (textNodes.length) {
          const barHeight = Math.round(parseFloat(style.fontSize) * 0.8);
          const lines = new Map<number, DOMRect>();
          for (const node of textNodes) {
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const rect of range.getClientRects()) {
              const key = Math.round(rect.top);
              const line = lines.get(key);
              lines.set(
                key,
                line
                  ? new DOMRect(
                      Math.min(line.left, rect.left),
                      line.top,
                      Math.max(line.right, rect.right) - Math.min(line.left, rect.left),
                      line.height,
                    )
                  : rect,
              );
            }
          }
          for (const line of lines.values()) {
            const inset = Math.max((line.height - barHeight) / 2, 0);
            add(line, "bar", 4, inset);
          }
        }
        for (const child of el.children) visit(child);
      };
      for (const child of root.children) visit(child);
      setShapes(found);
    };
    trace();
    const observer = new ResizeObserver(trace);
    observer.observe(root);
    document.fonts?.ready.then(trace);
    return () => observer.disconnect();
  }, [ref, skip, active]);
  return shapes;
}

/**
 * A card in the thread (optional heading and status chip). While `loading`,
 * its content is hidden and a skeleton traced from it shows instead; when
 * loading ends the skeleton fades out and the content is revealed.
 */
export function SupportPanel({
  heading,
  status,
  children,
  className,
  loading = false,
}: {
  heading?: ReactNode;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
  loading?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const shapes = useSkeletonShapes(ref, "ill-support-panel__skeleton-overlay", loading);
  const wasLoading = useRef(loading);
  const showOverlay = loading || wasLoading.current;
  const revealing = !loading && wasLoading.current;
  useEffect(() => {
    wasLoading.current = loading;
  }, [loading]);
  const state = loading ? "ill-support-panel--content-hidden" : revealing ? "ill-support-panel--content-reveal" : "";
  return (
    <section ref={ref} className={["ill-support-panel", state, className].filter(Boolean).join(" ")}>
      {(heading || status) && (
        <header className="ill-support-panel__header">
          {heading && <div className="ill-support-panel__heading">{heading}</div>}
          {status && <Chip size="sm">{status}</Chip>}
        </header>
      )}
      {children}
      {showOverlay && (
        <div
          className={`ill-support-panel__skeleton-overlay${loading ? "" : " ill-support-panel__skeleton-overlay--hidden"}`}
        >
          {shapes.map((shape, i) => (
            <div
              key={i}
              className={`ill-support-panel__skeleton-shape${shape.kind === "outline" ? " ill-support-panel__skeleton-shape--outline" : ""}`}
              style={{ left: shape.x, top: shape.y, width: shape.w, height: shape.h, borderRadius: shape.r }}
            >
              {shape.kind !== "outline" && <Skeleton width="100%" height="100%" radius={shape.r} />}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** Chat header with the brand and a "Helpdesk" badge in the middle; `gold` uses the gold icons. */
export function HelpdeskHeader({ brand, tone = "default" }: { brand: ReactNode; tone?: "default" | "gold" }) {
  const gold = tone === "gold";
  return (
    <header className="ill-chat-header">
      <div className="ill-chat-header__group">
        <IconButton icon={gold ? "historyGold" : "history"} label="History" variant="outline" />
        <IconButton icon={gold ? "addGold" : "add"} label="New conversation" variant="outline" />
      </div>
      <div className="ill-helpdesk-header__center">
        <span className="ill-helpdesk-header__brand">{brand}</span>
        <span className="ill-helpdesk-header__badge">
          <span className="ill-helpdesk-header__badge-text">Helpdesk</span>
        </span>
      </div>
      <div className="ill-chat-header__group">
        <IconButton icon={gold ? "expandGold" : "expand"} label="Expand" variant="outline" />
        <IconButton icon={gold ? "closeGold" : "close"} label="Close" variant="outline" />
      </div>
    </header>
  );
}

/** A centred system line between hairlines ("Connected with a support agent…"). */
export function ChatBreaker({ text }: { text: string }) {
  return (
    <p className="ill-chat-breaker">
      <span>{text}</span>
    </p>
  );
}

/** A highlighted statement as a button, with an optional attribute row and call to action. */
export function InsightHighlight({
  statement,
  footnote,
  cta,
}: {
  statement: ReactNode;
  footnote?: { label: ReactNode; value: ReactNode };
  cta?: ReactNode;
}) {
  return (
    <div className="ill-insight-highlight">
      <div className="ill-insight-highlight__cta">
        <Button appearance="primary" label={statement} />
      </div>
      {footnote && <AttributeRow label={footnote.label} value={footnote.value} />}
      {cta && (
        <div className="ill-insight-highlight__cta">
          <Button appearance="primary" label={cta} />
        </div>
      )}
    </div>
  );
}

/**
 * The human-in-the-loop scenes' ground: the 355 × 402 aubergine handoff
 * backdrop, centred in the (transparent) 738 × 680 scene frame, with the
 * chat widget on top.
 */
export function HumanLoopFrame({ children }: { children: ReactNode }) {
  return (
    <SceneFrame>
      <div className="ill-human-loop-backdrop">
        {/* eslint-disable-next-line @next/next/no-img-element -- drawn as-is, like the source */}
        <img className="ill-human-loop-backdrop__bg" src={handoffBg.src} alt="" aria-hidden="true" />
        {children}
      </div>
    </SceneFrame>
  );
}
