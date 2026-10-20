import { gsap } from "gsap";

/** The parallax intensity's upper bound (the export's tuning range). */
export const MAX_INTENSITY = 3;

/** Soft-clips the pointer's -1…1 position, so the camera eases off toward the frame's edges. */
const CURVE = 1.4;
const curve = (v: number) => Math.tanh(CURVE * v) / Math.tanh(CURVE);

type Vec = { x: number; y: number };
export type ParallaxLayer = { el: HTMLElement; depth: Vec };
export type ParallaxLook = { intensity: number; follow: number; release: number };

/**
 * The cursor-driven camera orbit: the pointer's position over the frame sets a target, a critically
 * damped spring chases it (faster while inside, `follow`; slower on the way back, `release`), and
 * each layer shifts by its depth × the spring × the stack's zoom. Off with reduced motion and touch.
 */
export class ParallaxCamera {
  look: ParallaxLook = { intensity: 1, follow: 0.5, release: 1.2 };
  private reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  private target: Vec = { x: 0, y: 0 };
  private pos: Vec = { x: 0, y: 0 };
  private vel: Vec = { x: 0, y: 0 };
  private inside = false;
  private unit = 1;
  private rect: DOMRect;
  private running = false;
  private observer: ResizeObserver;

  constructor(
    private frame: HTMLElement,
    private stack: HTMLElement,
    private canvasW: number,
    private layers: ParallaxLayer[],
  ) {
    this.rect = frame.getBoundingClientRect();
    this.observer = new ResizeObserver(this.measure);
    this.observer.observe(frame);
    this.observer.observe(stack);
    window.addEventListener("scroll", this.measure, { passive: true, capture: true });
    frame.addEventListener("pointermove", this.onMove);
    frame.addEventListener("pointerleave", this.onLeave);
    this.reduced.addEventListener("change", this.onReducedChange);
  }

  private measure = () => {
    this.rect = this.frame.getBoundingClientRect();
    this.unit = this.stack.clientWidth / this.canvasW;
    this.render();
  };

  private onReducedChange = () => {
    if (!this.reduced.matches) return;
    this.stop();
    this.target = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.render();
  };

  private onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch" || this.reduced.matches) return;
    const r = this.rect;
    const x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    const y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    this.inside = true;
    this.target = { x: -curve(x), y: -curve(y) };
    this.start();
  };

  private onLeave = () => {
    this.inside = false;
    this.target = { x: 0, y: 0 };
    this.start();
  };

  private tick = (_time: number, deltaMs: number) => {
    const dt = Math.min(0.05, deltaMs / 1000);
    const omega = 5.8 / Math.max(0.05, this.inside ? this.look.follow : this.look.release);
    const steps = Math.ceil(dt / 0.008);
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      for (const k of ["x", "y"] as const) {
        this.vel[k] += (omega * omega * (this.target[k] - this.pos[k]) - 2 * omega * this.vel[k]) * h;
        this.pos[k] += this.vel[k] * h;
      }
    }
    if (
      Math.abs(this.target.x - this.pos.x) + Math.abs(this.target.y - this.pos.y) < 1e-4 &&
      Math.abs(this.vel.x) + Math.abs(this.vel.y) < 0.001
    ) {
      this.pos = { ...this.target };
      this.vel = { x: 0, y: 0 };
      this.stop();
    }
    this.render();
  };

  setLook(look: Partial<ParallaxLook>) {
    Object.assign(this.look, look);
    this.render();
  }

  dispose() {
    this.stop();
    this.observer.disconnect();
    window.removeEventListener("scroll", this.measure, { capture: true });
    this.frame.removeEventListener("pointermove", this.onMove);
    this.frame.removeEventListener("pointerleave", this.onLeave);
    this.reduced.removeEventListener("change", this.onReducedChange);
  }

  private start() {
    if (this.running || this.reduced.matches) return;
    this.running = true;
    gsap.ticker.add(this.tick);
  }

  private stop() {
    this.running = false;
    gsap.ticker.remove(this.tick);
  }

  private render() {
    const scale = this.look.intensity * this.unit;
    for (const { el, depth } of this.layers) {
      const x = this.pos.x * depth.x * scale;
      const y = this.pos.y * depth.y * scale;
      el.style.transform = x || y ? `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` : "";
    }
  }
}

export type CursorLook = { radius: number; strength: number; rest: number; motion: number; warp: number };

/**
 * The pointer as the glitch sees it: a smoothed position, an amount that rises with speed (from
 * `rest` while hovering still) and decays after leaving, and an entry pulse that fades out.
 */
export class GlitchCursor {
  x = 0;
  y = 0;
  look: CursorLook = { radius: 140, strength: 1, rest: 0.55, motion: 1, warp: 1 };
  private amt = 0;
  private pulse = 0;
  private inside = false;
  private tx = 0;
  private ty = 0;
  private vel = 0;
  private last = 0;
  private frame = -1;
  private placed = false;
  private listeners = new Set<() => void>();

  setLook(look: Partial<CursorLook>) {
    Object.assign(this.look, look);
  }

  onActivate(listener: () => void) {
    this.listeners.add(listener);
    return () => void this.listeners.delete(listener);
  }

  move(x: number, y: number) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    this.tx = x;
    this.ty = y;
    if (!this.placed || this.amt < 0.01) {
      this.x = x;
      this.y = y;
      this.vel = 0;
    }
    if (!this.inside) this.pulse = 1;
    this.placed = true;
    this.inside = true;
    this.listeners.forEach((l) => l());
  }

  leave() {
    this.inside = false;
  }

  get active() {
    return this.inside || this.amt > 0 || this.pulse > 0;
  }

  get level() {
    return Math.min(1, (this.amt + this.pulse * 0.4) * this.look.strength);
  }

  get warp() {
    return Math.min(1, (this.pulse * 0.9 + this.amt * 0.2) * this.look.warp);
  }

  /** Advances once per ticker frame, however many mosaics read it. */
  update() {
    if (gsap.ticker.frame === this.frame) return;
    this.frame = gsap.ticker.frame;
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0.001, (now - (this.last || now)) / 1000));
    this.last = now;
    const look = this.look;
    const k = 1 - Math.exp(-dt * 20);
    const dx = (this.tx - this.x) * k;
    const dy = (this.ty - this.y) * k;
    this.x += dx;
    this.y += dy;
    this.vel += (Math.hypot(dx, dy) / dt - this.vel) * (1 - Math.exp(-dt * 6));
    const goal = this.inside ? look.rest + (1 - look.rest) * Math.min(1, (this.vel / 900) * look.motion) : 0;
    this.amt += (goal - this.amt) * (1 - Math.exp(-dt * (this.inside ? 8 : 5)));
    if (!this.inside && this.amt < 0.003) this.amt = 0;
    this.pulse *= Math.exp(-dt * 3.5);
    if (this.pulse < 0.01) this.pulse = 0;
  }
}
