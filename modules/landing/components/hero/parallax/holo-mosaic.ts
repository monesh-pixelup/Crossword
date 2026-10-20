import { gsap } from "gsap";
import {
  Color,
  GLSL3,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  NoBlending,
  OrthographicCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
  Texture,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { fieldShader, mainShader, vertexShader } from "./holo-shaders";
import type { GlitchCursor } from "./motion";

export type HoloLook = {
  tileSize: number;
  tileScale: number;
  shift: number;
  erase: number;
  vanish: number;
  flicker: number;
  edge: number;
  warm: number;
  scan: number;
  sweep: number;
  tint: string;
};

export type HoloOptions = Partial<HoloLook> & {
  alt?: string;
  padding?: number;
  maxPixelRatio?: number;
  cursor?: GlitchCursor;
};

const DEFAULT_LOOK = {
  tileSize: 1,
  shift: 0.75,
  erase: 0.72,
  vanish: 0.2,
  flicker: 0.16,
  edge: 0.22,
  warm: 0.12,
  scan: 1,
  sweep: 0,
  tint: "#ffc875",
};

/** The fragmentation field's resolution (its longer side). */
const FIELD = 128;

/** mulberry32: a seeded random, so a glitch's timing can be replayed. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let n = s;
    n = Math.imul(n ^ (n >>> 15), n | 1);
    n ^= n + Math.imul(n ^ (n >>> 7), n | 61);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * HoloMosaic: an <img> with a WebGL canvas over it (padded so tiles can drift past its box). At rest
 * the image shows and the canvas is hidden; a glitch (a GSAP timeline on the field's intensity) or
 * the cursor swaps in the canvas, which redraws the photo pixel for pixel and breaks it into
 * shifting, flickering tiles wherever the noise field passes.
 */
export class HoloMosaic {
  img: HTMLImageElement;
  private canvas: HTMLCanvasElement;
  private ready: Promise<void>;
  private renderer?: WebGLRenderer;
  private scene = new Scene();
  private camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private quad: Mesh<PlaneGeometry, RawShaderMaterial>;
  private fieldMat: RawShaderMaterial;
  private mainMat: RawShaderMaterial;
  private fieldRT: WebGLRenderTarget;
  private texture?: Texture;
  private resizeObserver: ResizeObserver;
  private timeline?: gsap.core.Timeline;
  private held = 0;
  private running = false;
  private t0 = performance.now();
  private padding: number;
  private autoTileScale: boolean;
  private tileSize: number;
  private sizeKey = "";
  private sizeToken = 0;
  private maxPixelRatio: number;
  private cursor?: GlitchCursor;
  private unsubCursor?: () => void;

  constructor(host: HTMLElement, src: string, options: HoloOptions = {}) {
    this.padding = options.padding ?? 48;
    this.cursor = options.cursor;
    this.maxPixelRatio = options.maxPixelRatio ?? 2;
    this.autoTileScale = options.tileScale === undefined;
    this.tileSize = options.tileSize ?? DEFAULT_LOOK.tileSize;

    this.img = document.createElement("img");
    this.img.alt = options.alt ?? "";
    this.img.decoding = "async";
    this.img.crossOrigin = "anonymous";
    this.img.className = "holo-mosaic__img";
    this.img.src = src;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "holo-mosaic__canvas";
    this.canvas.style.visibility = "hidden";
    this.canvas.setAttribute("aria-hidden", "true");
    host.classList.add("holo-mosaic");
    host.append(this.img, this.canvas);

    const look = { ...DEFAULT_LOOK, ...options };
    this.fieldRT = new WebGLRenderTarget(FIELD, FIELD, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: false,
    });
    this.fieldMat = new RawShaderMaterial({
      glslVersion: GLSL3,
      vertexShader,
      fragmentShader: fieldShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uIntensity: { value: 0 },
        uSeed: { value: 0 },
        uStepTime: { value: 0 },
        uSweep: { value: 1 },
        uSweepAmt: { value: look.sweep },
        uAspect: { value: 1 },
        uMouse: { value: new Vector2() },
        uMouseR: { value: 0.15 },
        uMouseAmt: { value: 0 },
      },
    });
    this.mainMat = new RawShaderMaterial({
      glslVersion: GLSL3,
      vertexShader,
      fragmentShader: mainShader,
      blending: NoBlending,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTex: { value: null },
        uField: { value: this.fieldRT.texture },
        uImgPx: { value: new Vector2(1, 1) },
        uPadPx: { value: 0 },
        uDpr: { value: 1 },
        uSeed: this.fieldMat.uniforms.uSeed,
        uTime: { value: 0 },
        uIntensity: this.fieldMat.uniforms.uIntensity,
        uTileScale: { value: options.tileScale ?? 1 },
        uShift: { value: look.shift },
        uErase: { value: look.erase },
        uVanish: { value: look.vanish },
        uFlicker: { value: look.flicker },
        uEdge: { value: look.edge },
        uWarm: { value: look.warm },
        uScanAmt: { value: look.scan },
        uTint: { value: new Color(look.tint) },
        uCur: { value: new Vector2() },
        uCurR: { value: 140 },
        uWarp: { value: 0 },
      },
    });
    this.quad = new Mesh(new PlaneGeometry(2, 2), this.mainMat);
    this.scene.add(this.quad);

    try {
      this.renderer = new WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      this.renderer.setClearColor(0, 0);
    } catch {
      // No WebGL: the plain image stays, without the glitch.
      this.renderer = undefined;
    }

    this.unsubCursor = this.cursor?.onActivate(() => {
      if (this.texture) this.start();
    });
    this.resizeObserver = new ResizeObserver(() => void this.resize());
    this.ready = this.img.decode().then(() => {
      this.resizeObserver.observe(this.img);
      return this.resize();
    });
  }

  private tick = () => {
    const playing = this.timeline?.isActive() ?? false;
    this.updateCursor();
    if (!playing && this.held === 0 && this.intensity <= 0 && !this.cursor?.active) {
      this.stop();
      return;
    }
    this.render();
  };

  get intensity(): number {
    return this.fieldMat.uniforms.uIntensity.value;
  }

  setLook(look: Partial<HoloLook>) {
    const u = this.mainMat.uniforms;
    if (look.tileScale !== undefined) {
      this.autoTileScale = false;
      u.uTileScale.value = look.tileScale;
    }
    if (look.tileSize !== undefined) {
      this.tileSize = look.tileSize;
      if (this.autoTileScale) u.uTileScale.value = this.autoScale();
    }
    if (look.shift !== undefined) u.uShift.value = look.shift;
    if (look.erase !== undefined) u.uErase.value = look.erase;
    if (look.vanish !== undefined) u.uVanish.value = look.vanish;
    if (look.flicker !== undefined) u.uFlicker.value = look.flicker;
    if (look.edge !== undefined) u.uEdge.value = look.edge;
    if (look.warm !== undefined) u.uWarm.value = look.warm;
    if (look.scan !== undefined) u.uScanAmt.value = look.scan;
    if (look.tint !== undefined) u.uTint.value.set(look.tint);
    if (look.sweep !== undefined) this.fieldMat.uniforms.uSweepAmt.value = look.sweep;
  }

  /** One glitch burst: stepped flickers up to `peak`, a held stretch, then a slow settle, swept down or up the figure. */
  glitch({ peak = 0.8, seed }: { peak?: number; seed?: number } = {}): Promise<void> {
    if (!this.renderer || prefersReducedMotion()) return Promise.resolve();
    if (!this.texture) return this.ready.then(() => this.glitch({ peak, seed }));
    this.timeline?.kill();
    this.held = 0;

    const random = seeded(seed ?? Math.floor(Math.random() * 2 ** 32));
    const vary = (t: number) => t * (0.75 + random() * 0.5);
    const intensity = this.fieldMat.uniforms.uIntensity;
    const field = this.fieldMat.uniforms;
    field.uSeed.value = random() * 100;

    const tl = gsap.timeline();
    tl.to(intensity, { value: 0.6 * peak, duration: vary(0.04), ease: "steps(2)" })
      .set(intensity, { value: 0 }, `+=${vary(0.1)}`)
      .to(intensity, { value: 0.75 * peak, duration: vary(0.05), ease: "steps(2)" }, `+=${vary(0.16)}`)
      .to(intensity, { value: 0.15 * peak, duration: vary(0.04), ease: "none" }, `+=${vary(0.12)}`)
      .to(intensity, { value: peak, duration: vary(0.08), ease: "power2.in" }, `+=${vary(0.08)}`);
    for (let i = 0; i < 6; i++) {
      tl.to(intensity, { value: peak * (0.78 + random() * 0.24), duration: vary(0.04), ease: "steps(1)" }, `+=${vary(0.07)}`);
    }
    tl.to(intensity, { value: 0.3 * peak, duration: vary(0.12), ease: "power2.out" })
      .to(intensity, { value: 0.8 * peak, duration: vary(0.04), ease: "steps(2)" }, `+=${vary(0.14)}`)
      .to(intensity, { value: 0, duration: vary(0.5), ease: "power3.out" }, `+=${vary(0.12)}`);

    const total = tl.duration();
    const down = random() < 0.65;
    tl.fromTo(
      field.uSweep,
      { value: down ? 1.15 : -0.15 },
      { value: down ? -0.15 : 1.15, duration: total, ease: "sine.inOut" },
      0,
    );
    this.timeline = tl;
    this.start();
    return new Promise((resolve) => {
      tl.eventCallback("onComplete", () => {
        intensity.value = 0;
        resolve();
      });
      tl.eventCallback("onInterrupt", resolve);
    });
  }

  hold(level: number) {
    if (!this.renderer) return;
    this.timeline?.kill();
    this.timeline = undefined;
    this.held = level;
    this.fieldMat.uniforms.uIntensity.value = level;
    this.fieldMat.uniforms.uSweep.value = 0.5;
    if (level > 0) this.start();
  }

  setSource(src: string) {
    this.img.src = src;
    return this.img.decode().then(() => {
      this.sizeKey = "";
      return this.resize();
    });
  }

  dispose() {
    this.timeline?.kill();
    this.unsubCursor?.();
    gsap.ticker.remove(this.tick);
    this.sizeToken++;
    this.resizeObserver.disconnect();
    this.texture?.dispose();
    this.fieldRT.dispose();
    this.fieldMat.dispose();
    this.mainMat.dispose();
    this.quad.geometry.dispose();
    this.renderer?.dispose();
    this.img.remove();
    this.canvas.remove();
  }

  private autoScale() {
    return Math.max(0.4, (this.mainMat.uniforms.uImgPx.value.y / 560) * this.tileSize);
  }

  /** Re-uploads the image at its displayed device-pixel size (premultiplied, flipped, mipmapped) and pads the canvas round it. */
  private async resize() {
    // Layout size, not the on-screen box: an ancestor transform (the hero scaled down) would shrink the box,
    // and the canvas sized from it would then be scaled again.
    const boxW = this.img.offsetWidth;
    const boxH = this.img.offsetHeight;
    if (!this.renderer || !boxW || !boxH) return;
    const dpr = Math.min(window.devicePixelRatio, this.maxPixelRatio);
    const w = Math.round(boxW * dpr);
    const h = Math.round(boxH * dpr);
    const pad = Math.round(this.padding * dpr);
    const key = `${w}x${h}@${dpr}:${this.img.currentSrc}`;
    if (key === this.sizeKey) return;
    this.sizeKey = key;

    const token = ++this.sizeToken;
    const bitmap = await createImageBitmap(this.img, {
      resizeWidth: w,
      resizeHeight: h,
      resizeQuality: "low",
      premultiplyAlpha: "premultiply",
      colorSpaceConversion: "default",
      imageOrientation: "flipY",
    });
    if (token !== this.sizeToken) {
      bitmap.close();
      return;
    }

    const texture = new Texture(bitmap);
    texture.flipY = false;
    texture.premultiplyAlpha = false;
    texture.generateMipmaps = true;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.needsUpdate = true;
    const previous = this.texture;
    this.texture = texture;
    previous?.dispose();
    (previous?.image as ImageBitmap | undefined)?.close();

    this.renderer.setPixelRatio(1);
    this.renderer.setSize(w + 2 * pad, h + 2 * pad, false);
    const style = this.canvas.style;
    style.width = `${(w + 2 * pad) / dpr}px`;
    style.height = `${(h + 2 * pad) / dpr}px`;
    style.left = style.top = `${-pad / dpr}px`;

    const aspect = w / h;
    this.fieldRT.setSize(Math.round(FIELD * Math.min(aspect, 1)), Math.round(FIELD / Math.max(aspect, 1)));
    this.fieldMat.uniforms.uAspect.value = aspect;

    const u = this.mainMat.uniforms;
    u.uTex.value = texture;
    u.uImgPx.value.set(w / dpr, h / dpr);
    u.uPadPx.value = pad;
    u.uDpr.value = dpr;
    if (this.autoTileScale) u.uTileScale.value = this.autoScale();
    if (this.running) this.render();
  }

  private start() {
    if (this.running) return;
    this.running = true;
    gsap.ticker.add(this.tick);
    this.render();
    this.canvas.style.visibility = "visible";
    this.img.style.visibility = "hidden";
  }

  private stop() {
    this.running = false;
    gsap.ticker.remove(this.tick);
    this.img.style.visibility = "";
    this.canvas.style.visibility = "hidden";
  }

  private updateCursor() {
    const field = this.fieldMat.uniforms;
    const u = this.mainMat.uniforms;
    const cursor = this.cursor;
    if (!cursor) return;
    cursor.update();
    const box = this.img.getBoundingClientRect();
    const size = u.uImgPx.value;
    // Screen px to the image's layout px (they differ under an ancestor transform).
    const x = ((cursor.x - box.left) * size.x) / box.width;
    const y = ((box.bottom - cursor.y) * size.y) / box.height;
    field.uMouse.value.set(x / size.x, y / size.y);
    field.uMouseR.value = cursor.look.radius / size.y;
    field.uMouseAmt.value = cursor.level;
    u.uCur.value.set(x, y);
    u.uCurR.value = cursor.look.radius;
    u.uWarp.value = cursor.warp;
  }

  private render() {
    const renderer = this.renderer;
    if (!renderer || !this.texture) return;
    const t = (performance.now() - this.t0) / 1000;
    this.mainMat.uniforms.uTime.value = t;
    this.fieldMat.uniforms.uStepTime.value = Math.floor(t * 12) / 12;
    this.quad.material = this.fieldMat;
    renderer.setRenderTarget(this.fieldRT);
    renderer.render(this.scene, this.camera);
    this.quad.material = this.mainMat;
    renderer.setRenderTarget(null);
    renderer.render(this.scene, this.camera);
  }
}
