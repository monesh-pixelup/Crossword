"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Product, Turn } from "./journeys";

type Status = "live" | "faded" | "gone";

/**
 * Only the newest turn (or the last two, when the newest is the products card, together with the
 * line that introduced it) stays live; the one before it fades; anything older is gone.
 */
function statusOf(index: number, revealed: number, turns: Turn[]): Status {
  const newest = revealed - 1;
  const products = turns[newest]?.kind === "products";
  const firstLive = products ? newest - 1 : newest;
  if (index >= firstLive) return "live";
  if (!products && index === firstLive - 1) return "faded";
  return "gone";
}

/**
 * One journey's conversation: the turns revealed so far in a column that slides up so the visible
 * ones (from the first not-gone turn down) sit centred in the box. `leaving` fades it out as the
 * next journey takes over.
 */
export function Conversation({ turns, revealed, leaving }: { turns: Turn[]; revealed: number; leaving: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    let first = 0;
    while (first < revealed - 1 && statusOf(first, revealed, turns) === "gone") first++;
    const top = items.current[first]?.offsetTop ?? 0;
    const last = items.current[revealed - 1];
    const height = last ? last.offsetTop + last.offsetHeight - top : 0;
    const boxHeight = box.current?.clientHeight ?? 0;
    setOffset(top - Math.max(0, (boxHeight - height) / 2));
  }, [revealed, turns]);

  // The first position is set without a transition; moves after that animate.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={box} className="conversation" data-leaving={leaving}>
      <div
        className="conversation__column"
        style={{ transform: `translateY(${-offset}px)`, transition: animate ? undefined : "none" }}
      >
        {turns.slice(0, revealed).map((turn, i) => (
          <div
            key={i}
            ref={(el) => {
              items.current[i] = el;
            }}
            className="conversation__item"
          >
            <Message turn={turn} status={statusOf(i, revealed, turns)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Message({ turn, status }: { turn: Turn; status: Status }) {
  if (turn.kind === "user") {
    return (
      <div className="msg msg--user" data-status={status}>
        <div className="msg__fill" aria-hidden="true" />
        <p className="msg__text">{turn.text}</p>
      </div>
    );
  }
  if (turn.kind === "assistant") {
    return (
      <div className="msg msg--assistant" data-status={status}>
        <p className="msg__text">{turn.text}</p>
      </div>
    );
  }
  return (
    <div className="msg msg--products" data-status={status}>
      {turn.products.map((product, i) => (
        <ProductRow key={product.title} product={product} index={i} />
      ))}
    </div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  return (
    <div className="product-row" style={{ animationDelay: `${440 + index * 85}ms` }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a 48px thumbnail inside an animated mock-up */}
      <img className="product-row__image" src={product.image.src} alt="" />
      <div className="product-row__info">
        <div className="product-row__titles">
          <p className="product-row__title">{product.title}</p>
          <p className="product-row__subtitle">{product.subtitle}</p>
        </div>
        <p className="product-row__price">{product.price}</p>
      </div>
    </div>
  );
}
