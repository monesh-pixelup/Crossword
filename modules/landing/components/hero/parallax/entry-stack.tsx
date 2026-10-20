"use client";

import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { type Entry, entries as defaultEntries, type Move, moves } from "./journeys";

type Slot = { y: number; scale: number; opacity: number; blur: number };

/** Where each card sits by its offset from the active one (-4 above … 3 below), at desktop size. */
const slots: Record<number, Slot> = {
  [-4]: { y: -196, scale: 0.6, opacity: 0, blur: 3 },
  [-3]: { y: -159.5, scale: 0.653, opacity: 0.36, blur: 2.5 },
  [-2]: { y: -112.3, scale: 0.749, opacity: 0.48, blur: 1.5 },
  [-1]: { y: -57.8, scale: 0.837, opacity: 0.62, blur: 0.5 },
  0: { y: 0, scale: 1, opacity: 1, blur: 0 },
  1: { y: 57.7, scale: 0.837, opacity: 0.62, blur: 1.5 },
  2: { y: 112.3, scale: 0.749, opacity: 0.48, blur: 2.5 },
  3: { y: 156, scale: 0.68, opacity: 0, blur: 3 },
};

/** The compact (phone) stack: only one card either side shows. */
const compactSlots: Record<number, Slot> = {
  ...slots,
  [-4]: { y: -130, scale: 0.6, opacity: 0, blur: 3 },
  [-3]: { y: -112, scale: 0.653, opacity: 0, blur: 2.5 },
  [-2]: { y: -96, scale: 0.749, opacity: 0, blur: 1.5 },
  2: { y: 96, scale: 0.749, opacity: 0, blur: 2.5 },
  3: { y: 112, scale: 0.68, opacity: 0, blur: 3 },
};

const FIRST = -4;
const LAST = 3;
/** The centre card before it's highlighted (on load): dimmed like a neighbour. */
const idle: Slot = { ...slots[0], opacity: 0.62, blur: 0.5 };
/** How long the cards' entrance animation runs. */
const ENTER_MS = 1200;

const clampOffset = (o: number) => Math.min(LAST, Math.max(FIRST, o));
const wrap = <T,>(list: T[], i: number) => list[((i % list.length) + list.length) % list.length];

type EntryStackProps = {
  cursor: number;
  highlighted: boolean;
  entries?: Entry[];
  move?: Move;
  compact?: boolean;
  onSelect?: (cursor: number, entry: Entry) => void;
  selectable?: (entry: Entry) => boolean;
};

/**
 * The entry-point cards, stacked around the active one like a wheel: cards above and below shrink,
 * fade and blur by their distance. Moving the cursor slides the wheel (rendering the cards it passes,
 * then dropping them once it lands), and nearby cards can be picked, by click or the arrow keys.
 */
export function EntryStack({
  cursor,
  highlighted,
  entries = defaultEntries,
  move = "final",
  compact = false,
  onSelect,
  selectable = () => false,
}: EntryStackProps) {
  const root = useRef<HTMLDivElement>(null);
  const [entering, setEntering] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setEntering(false), ENTER_MS);
    return () => window.clearTimeout(t);
  }, []);

  const cards = useRef(new Map<number, HTMLButtonElement>());
  // `shown` follows the cursor a frame later (so new cards mount in place, then move); `settled` once the move has run.
  const [shown, setShown] = useState(cursor);
  const [settled, setSettled] = useState(cursor);

  useEffect(() => {
    if (cursor === shown) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => (inner = requestAnimationFrame(() => setShown(cursor))));
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [cursor, shown]);

  useEffect(() => {
    if (shown === settled) return;
    const t = window.setTimeout(() => setSettled(shown), moves[move].ms);
    return () => window.clearTimeout(t);
  }, [shown, settled, move]);

  useEffect(() => {
    if (root.current?.contains(document.activeElement)) cards.current.get(shown)?.focus({ preventScroll: true });
  }, [shown]);

  const table = compact ? compactSlots : slots;
  const reach = compact ? 1 : 2;

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!step || !onSelect) return;
    e.preventDefault();
    for (let i = cursor + step; Math.abs(i - cursor) <= entries.length; i += step) {
      if (selectable(wrap(entries, i))) return onSelect(i, wrap(entries, i));
    }
  };

  const items = [];
  const from = Math.min(cursor, shown, settled) + FIRST;
  const to = Math.max(cursor, shown, settled) + LAST;
  for (let i = from; i <= to; i++) {
    const offset = clampOffset(i - shown);
    const entry = wrap(entries, i);
    const active = i === cursor && highlighted;
    const slot = offset === 0 && !active ? (highlighted ? table[0] : idle) : table[offset];
    const pickable = !!onSelect && !active && Math.abs(offset) <= reach && selectable(entry);
    items.push(
      <EntryCard
        key={i}
        cardRef={(el) => {
          if (el) cards.current.set(i, el);
          else cards.current.delete(i);
        }}
        entry={entry}
        slot={slot}
        order={LAST - 1 - offset}
        move={move}
        active={active}
        focusable={!!onSelect && (pickable || active)}
        onClick={pickable ? () => onSelect(i, entry) : undefined}
      />,
    );
  }

  return (
    <div
      ref={root}
      className="entry-stack"
      data-entering={entering || undefined}
      role={onSelect ? "group" : undefined}
      aria-label={onSelect ? "Entry points" : undefined}
      onKeyDown={onKeyDown}
    >
      {items}
    </div>
  );
}

type EntryCardProps = {
  entry: Entry;
  slot: Slot;
  order: number;
  move: Move;
  active: boolean;
  focusable: boolean;
  onClick?: () => void;
  cardRef: (el: HTMLButtonElement | null) => void;
};

function EntryCard({ entry, slot, order, move, active, focusable, onClick, cardRef }: EntryCardProps) {
  const { platform } = entry;
  const style = {
    transform: `translate(-50%, -50%) translateY(${slot.y}px) scale(${slot.scale})`,
    "--o": slot.opacity,
    filter: slot.blur > 0 ? `blur(${slot.blur / slot.scale}px)` : "none",
    "--move-ms": `${moves[move].ms}ms`,
    "--move-ease": moves[move].easing,
    "--order": Math.max(0, order),
  } as CSSProperties;

  return (
    <button
      ref={cardRef}
      type="button"
      className="entry-card"
      data-active={active}
      data-interactive={!!onClick}
      style={style}
      tabIndex={focusable ? undefined : -1}
      aria-hidden={focusable ? undefined : !active || undefined}
      aria-current={(focusable && active) || undefined}
      aria-label={focusable ? `${platform.label}: ${entry.query}` : undefined}
      onClick={onClick}
    >
      <div className="entry-card__fill entry-card__fill--inactive" aria-hidden="true" />
      <div className="entry-card__fill entry-card__fill--active" aria-hidden="true" />
      <div className="entry-card__content">
        <div className="entry-card__pill">
          <span className="entry-card__icon" style={{ width: platform.box[0], height: platform.box[1] }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- a few-pixel SVG glyph, nothing to optimize */}
            <img
              src={platform.icon.src}
              alt=""
              width={platform.glyph[0]}
              height={platform.glyph[1]}
              style={{
                width: platform.glyph[0],
                height: platform.glyph[1],
                left: platform.inset?.[0] ?? 0,
                top: platform.inset?.[1] ?? 0,
              }}
            />
          </span>
          <span className="entry-card__label">{platform.label}</span>
        </div>
        <p className="entry-card__query">{entry.query}</p>
      </div>
    </button>
  );
}
