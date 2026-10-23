import { gsap } from "gsap";

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
