import {
  BODY,
  type Box,
  type CardState,
  DOTS,
  FILL,
  FRAME_ORDER,
  type FrameKey,
  GLOW,
  GRAPH_H as H,
  GRAPH_W as W,
  HOLD,
  INTENT,
  KEY,
  LINES,
  type LinePoints,
  NODES,
  type Rect,
  SPRITE,
  STATES,
  TRANS,
  TRANS_HOVER,
} from "../../config/intel";

/*
 * Drives the memory graph: glides between the storyboard frames on a loop
 * while the graph is on screen. The outgoing card shrinks back into its block;
 * the next block grows into its card, which springs in. Staggered pop-in on
 * first view, mouse parallax on the blocks and a small magnetic lean on the
 * focus card. Hovering (or tapping) one of the four blocks that has a card
 * turns it into that card; the open card holds while the cursor is on it.
 *
 * The markup's static styles show the Memory frame, so without JS (or with
 * reduced motion) the graph is the storyboard's first frame.
 */

// ---- easing -------------------------------------------------------------------------------

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const a = (p: number, q: number) => 1 - 3 * q + 3 * p;
  const b = (p: number, q: number) => 3 * q - 6 * p;
  const c = (p: number) => 3 * p;
  const f = (t: number, p: number, q: number) => ((a(p, q) * t + b(p, q)) * t + c(p)) * t;
  const d = (t: number, p: number, q: number) => 3 * a(p, q) * t * t + 2 * b(p, q) * t + c(p);
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = f(t, x1, x2) - x;
      if (Math.abs(e) < 1e-5) break;
      const dd = d(t, x1, x2);
      if (Math.abs(dd) < 1e-6) break;
      t -= e / dd;
    }
    return f(t, y1, y2);
  };
}

const easeGraph = bezier(0.65, 0, 0.35, 1); // smooth in-out for the layout glide
const easeOut = bezier(0.22, 1, 0.36, 1);
const easeSpring = bezier(0.34, 1.56, 0.64, 1); // Shopify's card transform curve
const easeGrow = bezier(0.3, 1.12, 0.45, 1); // block -> card: quick start, soft landing with a hint of spring
const easeShrink = bezier(0.6, 0, 0.25, 1); // card -> block: gentle start, smooth settle

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => {
  v = clamp(v);
  return v * v * (3 - 2 * v);
};
const seg = (t: number, start: number, dur: number) => clamp((t - start) / dur);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

const nodeData = Object.fromEntries(NODES.map((n) => [n.id, n]));
const lineData = Object.fromEntries(LINES.map((l) => [l.id, l]));
const glowData = Object.fromEntries(GLOW.map((g) => [g.id, g]));

/** The block each card grows out of and collapses back into. */
const OWNER_OF = {} as Record<FrameKey, string>;
/** The card each owning block turns into. */
const OWNS: Record<string, FrameKey> = {};
for (const n of NODES) {
  if (n.own) {
    OWNER_OF[KEY[n.own]] = n.id;
    OWNS[n.id] = KEY[n.own];
  }
}

/** Each element's box in a frame, filling frames where it is absent (at opacity 0). */
export function boxFor(id: string, k: FrameKey): Box {
  const node = nodeData[id];
  const d = node.frames[k];
  if (d) return d;
  if (node.own && KEY[node.own] === k) {
    const b = BODY[node.own];
    return [b[0], b[1], b[2], b[3], 0];
  }
  const i = FRAME_ORDER.indexOf(k);
  for (let step = 1; step < 4; step++) {
    const p = node.frames[FRAME_ORDER[(i - step + 4) % 4]];
    if (p) return [p[0], p[1], p[2], p[3], 0];
  }
  return [0, 0, 0, 0, 0];
}

export function lineFor(id: string, k: FrameKey): { p: LinePoints; o: number } {
  const frames = lineData[id].frames;
  const d = frames[k];
  if (d) return { p: d, o: 1 };
  const i = FRAME_ORDER.indexOf(k);
  for (let step = 1; step < 4; step++) {
    const p = frames[FRAME_ORDER[(i - step + 4) % 4]];
    if (p) return { p, o: 0 };
  }
  return { p: [0, 0, 0, 0], o: 0 };
}

export function pathOf(p: LinePoints) {
  return p.length === 8
    ? `M${p[0]} ${p[1]}C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}`
    : `M${p[0]} ${p[1]}L${p[2]} ${p[3]}`;
}

/**
 * Card in the shape of a block: uniform scale to the block's width, cropped to
 * its height, so the content shrinks and folds into the block instead of
 * squashing. w = how far into the block.
 */
function cardToBox(st: CardState, box: Rect | Box, w: number, ppu: number) {
  const b = BODY[st];
  const sp = SPRITE[st];
  const bw = lerp(b[2], box[2], w);
  const bh = lerp(b[3], box[3], w);
  const cx = lerp(b[0] + b[2] / 2, box[0] + box[2] / 2, w);
  const cy = lerp(b[1] + b[3] / 2, box[1] + box[3] / 2, w);
  const sc = bw / b[2];
  const visH = Math.min(b[3], bh / sc);
  const cY = b[1] + b[3] / 2;
  const top = ((cY - visH / 2 - sp[1]) / sp[3]) * 100;
  const bot = ((sp[1] + sp[3] - (cY + visH / 2)) / sp[3]) * 100;
  const left = ((b[0] - sp[0]) / sp[2]) * 100;
  const right = ((sp[0] + sp[2] - b[0] - b[2]) / sp[2]) * 100;
  const k = smooth(w * 3); // crop in quickly so the label and glow tuck away early
  return {
    sc,
    fx: (cx - (b[0] + b[2] / 2)) * ppu,
    fy: (cy - cY) * ppu,
    clip:
      w < 0.001
        ? "none"
        : `inset(${(top * k).toFixed(2)}% ${(right * k).toFixed(2)}% ${(bot * k).toFixed(2)}% ${(left * k).toFixed(2)}% round ${(8 * k).toFixed(1)}px)`,
  };
}

type Cached = HTMLElement | SVGElement;
const styleCache = new WeakMap<Cached, Record<string, string>>();
const attrCache = new WeakMap<Element, Record<string, string>>();

function setStyle(el: Cached, prop: string, v: string) {
  let c = styleCache.get(el);
  if (!c) styleCache.set(el, (c = {}));
  if (c[prop] !== v) {
    c[prop] = v;
    el.style.setProperty(prop, v);
  }
}

function setAttr(el: Element, name: string, v: string) {
  let c = attrCache.get(el);
  if (!c) attrCache.set(el, (c = {}));
  if (c[name] !== v) {
    c[name] = v;
    el.setAttribute(name, v);
  }
}

/** Starts the graph inside `root`; returns a cleanup function. */
export function startMemoryGraph(root: HTMLElement): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const q = <T extends Element>(s: string) => Array.from(root.querySelectorAll<T>(s));

  const nodes = q<HTMLElement>("[data-intel-node]")
    .map((el) => ({ el, id: el.dataset.intelNode!, px: 0, py: 0, depth: 0 }))
    .filter((n) => nodeData[n.id]);
  const lines = q<SVGPathElement>("[data-intel-line]")
    .map((el) => ({ el, id: el.dataset.intelLine!, p: [] as LinePoints }))
    .filter((l) => lineData[l.id]);
  const glows = q<SVGPathElement>("[data-intel-glow]")
    .map((el) => ({ el, id: el.dataset.intelGlow!, grad: root.querySelector(`[data-intel-glow-grad="${el.dataset.intelGlow}"]`) }))
    .filter((g) => glowData[g.id]);
  const dots = q<SVGCircleElement>("[data-intel-dot]");
  const cards = {} as Record<CardState, { el: HTMLElement; mx: number; my: number; ms: number }>;
  q<HTMLElement>("[data-intel-card]").forEach((el) => {
    cards[el.dataset.intelCard as CardState] = { el, mx: 0, my: 0, ms: 1 };
  });
  const linesSvg = root.querySelector<SVGSVGElement>("[data-intel-lines]");
  if (!nodes.length || !cards.memory) return () => {};

  // Cards scale about their body's centre, so a card and its block share one centre while morphing.
  for (const st of STATES) {
    const c = cards[st];
    if (!c) continue;
    const b = BODY[st];
    const sp = SPRITE[st];
    c.el.style.transformOrigin = `${(((b[0] + b[2] / 2 - sp[0]) / sp[2]) * 100).toFixed(3)}% ${(((b[1] + b[3] / 2 - sp[1]) / sp[3]) * 100).toFixed(3)}%`;
  }

  // Depth for parallax: big warm cards move most, small pills least (Shopify: ±6px).
  for (const n of nodes) {
    const d = nodeData[n.id].frames.m || nodeData[n.id].frames.s;
    n.depth = d && d[2] > 250 ? 9 : d && d[2] > 120 ? 6 : 4;
  }

  let from: FrameKey = "m";
  let to: FrameKey = "m";
  let t = 1;
  let entrance = 1;
  let inView = false;
  let started = false;
  let dur = TRANS;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, inside: false, cx: 0, cy: 0 };

  function render() {
    // Read every box first (one layout per frame), then write.
    const rects: Partial<Record<CardState, DOMRect>> = {};
    if (mouse.inside) for (const st of STATES) if (cards[st]) rects[st] = cards[st].el.getBoundingClientRect();
    const changing = from !== to;
    const ppu = changing ? root.getBoundingClientRect().width / W : 1; // px per stage unit
    const gt = easeGraph(seg(t, 0.05, 0.8)); // layout glide of the other blocks and lines
    // Morphs: the closing card and its block move as one shape into the block's place; the
    // opening block and its card grow as one shape into the card. One curve drives box and card.
    const closeP = seg(t, 0, 0.62);
    const openP = seg(t, 0.1, 0.9);
    const mClose = easeShrink(closeP);
    const mOpen = easeGrow(openP);
    const closeId = changing ? OWNER_OF[from] : null;
    const openId = changing ? OWNER_OF[to] : null;
    let closeBox: Rect | null = null;
    let openBox: Rect | null = null;
    let closePar = [0, 0];
    let openPar = [0, 0];
    root.style.setProperty("--intel-card-fill", `rgba(202, 181, 135, ${lerp(FILL[from], FILL[to], gt).toFixed(3)})`);

    for (const [i, n] of nodes.entries()) {
      const a = boxFor(n.id, from);
      const b = boxFor(n.id, to);
      let g = gt;
      let o: number;
      // Each block fades only while the card covers it, so the pair never dips (no blink).
      if (n.id === closeId) {
        g = mClose;
        o = b[4] * smooth(closeP / 0.3);
      } else if (n.id === openId) {
        g = mOpen;
        o = a[4] * (1 - smooth((openP - 0.62) / 0.3));
      } else o = lerp(a[4], b[4], gt);
      const x = lerp(a[0], b[0], g);
      const y = lerp(a[1], b[1], g);
      const w = lerp(a[2], b[2], g);
      const h = lerp(a[3], b[3], g);
      if (n.id === closeId) closeBox = [x, y, w, h];
      if (n.id === openId) openBox = [x, y, w, h];
      // Entrance pop-in: staggered scale + fade.
      const e = entrance < 1 ? easeSpring(seg(entrance, 0.02 * (i % 12), 0.55)) : 1;
      const eo = entrance < 1 ? easeOut(seg(entrance, 0.02 * (i % 12), 0.35)) : 1;
      n.px = lerp(n.px, mouse.tx * n.depth, 0.08);
      n.py = lerp(n.py, mouse.ty * n.depth, 0.08);
      if (n.id === closeId) closePar = [n.px, n.py];
      if (n.id === openId) openPar = [n.px, n.py];
      setStyle(n.el, "left", pct(x, W));
      setStyle(n.el, "top", pct(y, H));
      setStyle(n.el, "width", pct(w, W));
      setStyle(n.el, "height", pct(h, H));
      setStyle(n.el, "opacity", (o * eo).toFixed(3));
      setStyle(n.el, "transform", `translate3d(${n.px.toFixed(2)}px,${n.py.toFixed(2)}px,0) scale(${(0.5 + 0.5 * e).toFixed(4)})`);
    }

    for (const l of lines) {
      const a = lineFor(l.id, from);
      const b = lineFor(l.id, to);
      const p = a.p.map((v, j) => lerp(v, b.p[j], gt));
      setAttr(l.el, "d", pathOf(p));
      const eo = entrance < 1 ? easeOut(seg(entrance, 0.15, 0.5)) : 1;
      setStyle(l.el, "opacity", (lerp(a.o, b.o, gt) * eo).toFixed(3));
      l.p = p;
    }

    for (const g of glows) {
      const line = lines.find((l) => l.id === g.id);
      if (!line) continue;
      setAttr(g.el, "d", pathOf(line.p));
      const p = line.p;
      const { end, frames } = glowData[g.id];
      const n = p.length;
      const gx = end ? p[n - 2] : p[0];
      const gy = end ? p[n - 1] : p[1];
      const fx = end ? p[0] : p[n - 2];
      const fy = end ? p[1] : p[n - 1];
      if (g.grad) {
        setAttr(g.grad, "x1", gx.toFixed(2));
        setAttr(g.grad, "y1", gy.toFixed(2));
        setAttr(g.grad, "x2", fx.toFixed(2));
        setAttr(g.grad, "y2", fy.toFixed(2));
      }
      const eo = entrance < 1 ? easeOut(seg(entrance, 0.3, 0.5)) : 1;
      setStyle(g.el, "opacity", (lerp(frames[from], frames[to], gt) * eo).toFixed(3));
    }

    const dotO = lerp(DOTS[from], DOTS[to], gt) * (entrance < 1 ? easeOut(seg(entrance, 0.45, 0.4)) : 1);
    for (const d of dots) setStyle(d, "opacity", dotO.toFixed(3));
    if (linesSvg) {
      setStyle(linesSvg, "transform", `translate3d(${(mouse.tx * 5).toFixed(2)}px,${(mouse.ty * 5).toFixed(2)}px,0)`);
    }

    for (const st of STATES) {
      const c = cards[st];
      if (!c) continue;
      const k = KEY[st];
      let o = 0;
      let sc = 0.94;
      let fx = 0;
      let fy = 0;
      let clip = "none";
      if (k === to && k === from) {
        o = 1;
        sc = 1;
      } else if (k === to && openBox) {
        // Grows out of the block: shaped like it at first, fades in once it is mostly card-sized.
        const wo = 1 - mOpen;
        const m = cardToBox(st, boxFor(OWNER_OF[to], from), wo, ppu);
        sc = m.sc;
        clip = m.clip;
        fx = m.fx + openPar[0] * wo;
        fy = m.fy + openPar[1] * wo;
        o = smooth((openP - 0.22) / 0.42);
      } else if (k === to) {
        o = smooth((openP - 0.22) / 0.42);
        sc = 0.94 + 0.06 * easeSpring(openP);
      } else if (k === from && closeBox) {
        // Folds into the block: crops to its shape and shrinks into its place, fading once covered.
        const m = cardToBox(st, boxFor(OWNER_OF[from], to), mClose, ppu);
        sc = m.sc;
        clip = m.clip;
        fx = m.fx + closePar[0] * mClose;
        fy = m.fy + closePar[1] * mClose;
        o = 1 - smooth((closeP - 0.18) / 0.5);
      } else if (k === from) {
        o = 1 - smooth(closeP / 0.6);
        sc = 1 - 0.06 * mClose;
      }
      if (entrance < 1 && k === to) {
        const ce = seg(entrance, 0.35, 0.65);
        o *= easeOut(clamp(ce / 0.5));
        sc = 0.9 + 0.1 * easeSpring(ce);
      }
      // Magnetic lean toward the cursor (Shopify: up to ~19px; subtler here).
      const r = rects[st];
      const near = !!r && o > 0.5 && mouse.cx > r.left - 40 && mouse.cx < r.right + 40 && mouse.cy > r.top - 40 && mouse.cy < r.bottom + 40;
      const tx = near && r ? Math.max(-10, Math.min(10, (mouse.cx - (r.left + r.width / 2)) * 0.06)) : 0;
      const ty = near && r ? Math.max(-8, Math.min(8, (mouse.cy - (r.top + r.height / 2)) * 0.06)) : 0;
      c.mx = lerp(c.mx, tx, 0.1);
      c.my = lerp(c.my, ty, 0.1);
      c.ms = lerp(c.ms, near ? 1.015 : 1, 0.1);
      setStyle(c.el, "opacity", o.toFixed(3));
      setStyle(c.el, "clip-path", clip);
      setStyle(c.el, "visibility", o < 0.002 ? "hidden" : "visible");
      setStyle(c.el, "transform", `translate3d(${(c.mx + fx).toFixed(2)}px,${(c.my + fy).toFixed(2)}px,0) scale(${(sc * c.ms).toFixed(4)})`);
    }
  }

  if (reduce) {
    render();
    return () => {};
  }

  entrance = 0; // hidden until the graph first comes into view, then it pops in
  let last: number | null = null;
  let timer = 0;
  let stateIdx = 0;
  let pending: FrameKey | null = null;
  let overCard = false;

  // Hover: the four blocks that have a card turn into it when hovered. While the cursor stays
  // on the open card, autoplay holds; it resumes HOLD ms after it leaves.
  function hitTest(cx: number, cy: number): { state: FrameKey; card: boolean } | null {
    const r = root.getBoundingClientRect();
    const sx = ((cx - r.left) / r.width) * W;
    const sy = ((cy - r.top) / r.height) * H;
    // The open card (its body) counts as the current state's block.
    const b = BODY[STATES[FRAME_ORDER.indexOf(to)]];
    if (sx >= b[0] && sx <= b[0] + b[2] && sy >= b[1] - 30 && sy <= b[1] + b[3]) return { state: to, card: true };
    for (const id in OWNS) {
      if (OWNS[id] === to) continue;
      const x = boxFor(id, to);
      if (x[4] > 0 && sx >= x[0] - 6 && sx <= x[0] + x[2] + 6 && sy >= x[1] - 6 && sy <= x[1] + x[3] + 6) {
        return { state: OWNS[id], card: false };
      }
    }
    return null;
  }

  function goTo(k: FrameKey) {
    if (k === to && t >= 1) return;
    if (t < 1) {
      pending = k; // let the running change finish first
      return;
    }
    from = to;
    to = k;
    t = 0;
    timer = 0;
    dur = TRANS_HOVER;
    stateIdx = FRAME_ORDER.indexOf(k);
  }

  // Hover intent: a block opens its card once the cursor rests on it for INTENT ms, so sweeping
  // across the graph doesn't flip through cards. A tap opens it at once.
  let cand: FrameKey | null = null;
  let candSince = 0;
  function onPointer(e: PointerEvent) {
    if (entrance < 1) return;
    const hit = hitTest(e.clientX, e.clientY);
    overCard = !!hit?.card;
    root.style.cursor = hit ? "pointer" : "";
    const k = hit && !hit.card ? hit.state : null;
    if (e.type === "pointerdown" && k) {
      cand = null;
      goTo(k);
      return;
    }
    if (k !== cand) {
      cand = k;
      candSince = performance.now();
    }
  }

  let frame = 0;
  function tick(now: number) {
    frame = requestAnimationFrame(tick);
    const dt = last === null ? 0 : Math.min(64, now - last);
    last = now;
    mouse.tx = lerp(mouse.tx, mouse.x, 0.08);
    mouse.ty = lerp(mouse.ty, mouse.y, 0.08);
    if (!started) {
      render();
      return;
    }
    if (!inView && entrance >= 1) return; // off-screen: nothing to draw
    if (cand && now - candSince >= INTENT) {
      const c = cand;
      cand = null;
      goTo(c);
    }
    // A card can open under a still cursor, so re-check what the cursor is on every frame.
    if (mouse.inside && entrance >= 1 && t >= 1) overCard = !!hitTest(mouse.cx, mouse.cy)?.card;
    if (entrance < 1) entrance = Math.min(1, entrance + dt / 1600);
    else if (inView) {
      if (t < 1) t = Math.min(1, t + dt / dur);
      else if (pending) {
        const p = pending;
        pending = null;
        goTo(p);
      } else if (overCard)
        timer = 0; // reading the open card: hold it
      else {
        timer += dt;
        if (timer >= HOLD) {
          timer = 0;
          stateIdx = (stateIdx + 1) % 4;
          from = to;
          to = KEY[STATES[stateIdx]];
          t = 0;
          dur = TRANS;
        }
      }
    }
    render();
  }

  const onMove = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    mouse.cx = e.clientX;
    mouse.cy = e.clientY;
    mouse.inside = true;
    onPointer(e);
  };
  const onLeave = () => {
    mouse.x = 0;
    mouse.y = 0;
    mouse.inside = false;
    overCard = false;
    cand = null;
    root.style.cursor = "";
  };
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerdown", onPointer); // touch: tap a block to open its card
  root.addEventListener("pointerleave", onLeave);

  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (inView) started = true;
    },
    { threshold: 0.3 },
  );
  observer.observe(root);

  render();
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerdown", onPointer);
    root.removeEventListener("pointerleave", onLeave);
  };
}
