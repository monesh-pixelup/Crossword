/*
 * The HoloMosaic shaders, verbatim from the hero parallax export: a full-screen quad, a low-res
 * fragmentation field (where the figure breaks up), and the main pass that tiles, shifts and
 * flickers the photo wherever the field is up.
 */

export const vertexShader = `
in vec3 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const noise = `
// Dave Hoskins' sine-free hashes — stable across GPUs, unlike fract(sin()).
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec4 hash42(vec2 p) {
  vec4 p4 = fract(vec4(p.xyxy) * vec4(0.1031, 0.1030, 0.0973, 0.1099));
  p4 += dot(p4, p4.wzxy + 33.33);
  return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x),
    mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p = p * 2.03 + 17.1;
    a *= 0.5;
  }
  return s / 0.9375;
}
`;

const cursor = `
float cursorWeight(vec2 px) {
  if (uWarp <= 0.0) return 0.0;
  float r = uCurR * (0.8 + 0.4 * vnoise(px / (uCurR * 0.5) + uTime * 0.8));
  float w = 1.0 - smoothstep(0.0, r, length(px - uCur));
  return w * w * uWarp;
}
// Row-banded horizontal tears plus a slight wave, px units.
vec2 cursorOffset(vec2 px, float w, float unit) {
  float stepT = floor(uTime * 14.0);
  float band = floor(px.y / (3.0 * unit));
  float tear = (hash12(vec2(band, stepT)) - 0.5) * 2.0 * step(0.55, hash12(vec2(band * 1.7, stepT + 3.1)));
  return vec2(tear * 14.0 * unit * w + sin(px.y * 0.12 + uTime * 10.0) * 2.0 * w, 0.0);
}
`;

export const fieldShader = `
precision highp float;
${noise}
in vec2 vUv;
out vec4 outColor;

uniform float uIntensity;
uniform float uSeed;
uniform float uStepTime;   // time quantized to ~12fps: the mask jumps, never glides
uniform float uSweep;      // 1 → 0, top of figure to bottom (uv y is up)
uniform float uSweepAmt;
uniform float uAspect;     // image w / h, keeps blobs round
uniform vec2  uMouse;      // cursor in field uv
uniform float uMouseR;     // radius in uv-y units
uniform float uMouseAmt;

void main() {
  vec2 p = vUv;
  vec2 q = vec2(p.x * uAspect, p.y) * 2.8 + uSeed * 13.7;
  float n1 = fbm(q + vec2(0.0, -uStepTime * 0.45));
  float n2 = fbm(q * 2.4 + vec2(uStepTime * 0.6, 7.1));
  float f = n1 * 0.68 + n2 * 0.32;

  // The sweep band is warped by the same noise, so its leading edge is
  // ragged and the fragmentation creeps across the body unevenly.
  float d = abs(p.y - uSweep + (n2 - 0.5) * 0.3);
  float band = 1.0 - smoothstep(0.0, 0.32, d);
  f = mix(f, f * 0.6 + band * 0.55, uSweepAmt);

  // Intensity lowers the threshold: 0 → nothing passes, ~0.5 → isolated
  // patches, 1 → near-total dematerialization.
  // The ramp is narrow so low intensities give a few *fully* glitched
  // patches rather than a faint shimmer everywhere.
  // Cursor adds a local intensity with a ragged, soft falloff; the same
  // threshold then breaks the figure up exactly as a glitch would.
  float local = uIntensity;
  if (uMouseAmt > 0.0) {
    float dm = length(vec2((p.x - uMouse.x) * uAspect, p.y - uMouse.y));
    float r = uMouseR * (0.75 + 0.5 * n1);
    float w = 1.0 - smoothstep(0.0, r, dm);
    local = max(local, w * w * uMouseAmt);
  }
  // Fade everything out toward the image box, so neither the glitch nor the
  // cursor ever stops on a hard rectangle where the cutout meets its bounds.
  vec2 e = min(p, 1.0 - p) * vec2(uAspect, 1.0);
  local *= smoothstep(0.0, 0.12, min(e.x, e.y));
  float th = 0.95 - local * 0.85;
  float m = smoothstep(th, th + 0.12, f) * step(0.0001, local);
  outColor = vec4(m, 0.0, 0.0, 1.0);
}
`;

export const mainShader = `
precision highp float;
precision highp int;
${noise}
out vec4 outColor;

uniform sampler2D uTex;      // premultiplied, mipmapped, 1:1 with device px
uniform sampler2D uField;
uniform vec2  uImgPx;        // displayed image size, CSS px
uniform float uPadPx;        // canvas padding per side, device px
uniform float uDpr;          // device px per CSS px (texture texels per CSS px)
uniform float uSeed;
uniform float uTime;
uniform float uIntensity;
uniform float uTileScale;
uniform float uShift;        // tile displacement, 0..1 (1 = up to ~0.48 cell)
uniform float uErase;        // how much of the base photo active regions lose
uniform float uVanish;       // chance an active tile drops out entirely
uniform float uFlicker;
uniform float uEdge;
uniform float uWarm;
uniform float uScanAmt;
uniform vec3  uTint;
uniform vec2  uCur;          // cursor, image CSS px, y up
uniform float uCurR;
uniform float uWarp;

// Exact source pixel — no filtering. At rest this is the <img>, bit for bit.
vec4 texel(vec2 ppx) {
  ivec2 size = textureSize(uTex, 0);
  ivec2 p = ivec2(floor(ppx * uDpr));
  if (any(lessThan(p, ivec2(0))) || any(greaterThanEqual(p, size))) return vec4(0.0);
  return texelFetch(uTex, p, 0);
}
vec4 imgLod(vec2 uv, float lod) {
  if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) return vec4(0.0);
  return textureLod(uTex, uv, lod);
}
float field(vec2 uv) {
  return texture(uField, clamp(uv, 0.0, 1.0)).r;
}
${cursor}
vec4 over(vec4 src, vec4 dst) {
  return src + dst * (1.0 - src.a);
}

// Displacement direction for a tile centred at uv: a smooth, seeded flow
// field shared by neighbouring tiles (so regions slip together), plus a small
// fixed per-tile variation. Nothing here depends on time — only the
// *strength* changes, driven by the fragmentation field.
vec2 tileDir(vec2 uv, vec2 h) {
  vec2 q = vec2(uv.x * uImgPx.x / uImgPx.y, uv.y) * 2.2 + uSeed * 7.3;
  vec2 flow = clamp((vec2(vnoise(q), vnoise(q + 31.7)) * 2.0 - 1.0) * 1.8, -1.0, 1.0);
  return flow * 0.75 + (h * 2.0 - 1.0) * 0.25;
}

// One tile layer. Displacement is capped below half a cell, so the only
// tiles that can cover this pixel are its own cell and the three neighbours
// on the side it's nearest to — a 2×2 search instead of 3×3.
vec4 tileLayer(vec2 ppx, vec2 cellPx, float thr, float detail, float salt) {
  vec2 g = ppx / cellPx;
  vec2 c = floor(g);
  vec2 f = g - c;
  vec2 side = vec2(f.x < 0.5 ? -1.0 : 1.0, f.y < 0.5 ? -1.0 : 1.0);

  float bestZ = -1.0;
  vec2 bCell = vec2(0.0);
  vec2 bLocal = vec2(0.0);
  float bM = 0.0;
  float bK = 0.0;
  vec4 bH = vec4(0.0);

  for (int i = 0; i < 4; i++) {
    vec2 n = c + vec2(float(i & 1), float(i >> 1)) * side;
    vec4 h = hash42(n + salt);
    vec2 centerUv = (n + 0.5) * cellPx / uImgPx;
    float m = field(centerUv);
    // Per-tile jitter on the threshold gives the active region a stochastic,
    // stair-stepped edge rather than a clean contour of the noise.
    // Floored above 0 so that a zero field means zero presence, always.
    float t = max(thr + (h.x - 0.5) * 0.4, 0.02);
    // Presence: 0 → the tile is indistinguishable from the photo underneath
    // (no offset, no contribution); 1 → fully broken out. Everything a tile
    // does is scaled by it, so tiles ease back to their exact origin instead
    // of popping off when the field recedes.
    float k = smoothstep(t, t + 0.12, m);
    if (k <= 0.0) continue;

    vec2 off = tileDir(centerUv, hash42(n + salt + 71.3).xy) * vec2(0.48, 0.26) * uShift * m * k;
    vec2 l = g - n - off;
    if (any(lessThan(l, vec2(0.0))) || any(greaterThanEqual(l, vec2(1.0)))) continue;

    if (h.y > bestZ) {
      bestZ = h.y;
      bCell = n;
      bLocal = l;
      bM = m;
      bK = k;
      bH = h;
    }
  }
  if (bestZ < 0.0) return vec4(0.0);

  vec2 sizeUv = cellPx / uImgPx;
  vec2 cellUv = bCell * sizeUv;
  // The tile keeps showing the photo from where it *came from*, wherever it
  // has drifted to. avg = the cell's mean colour (mip level ≈ cell size),
  // det = the actual photographic texture of that region.
  float lod = log2(max(cellPx.x, cellPx.y) * uDpr);
  vec4 avg = imgLod(cellUv + 0.5 * sizeUv, lod);
  vec4 det = imgLod(cellUv + bLocal * sizeUv, 0.0);
  vec4 col = mix(avg, det, detail * (0.55 + 0.45 * bH.z));

  // Warm lift: restrained amber, scaled by how far gone this tile is.
  col.rgb = mix(col.rgb, col.rgb * uTint * 1.18, uWarm * bM);

  float op = mix(0.62, 1.0, bH.z);
  // Dropouts — the background shows through where the tile should be.
  if (bH.w < uVanish * bM) op *= 0.08;
  // Localized flicker: a few tiles blink each frame-step.
  float fl = hash12(bCell + salt * 3.1 + floor(uTime * 24.0));
  if (fl < uFlicker * bM) op *= 0.18;
  else if (fl > 1.0 - uFlicker * 0.35 * bM) col.rgb *= 1.25;

  // Tile-edge illumination: ~1 CSS px amber rim, only where there's figure.
  vec2 e2 = min(bLocal, 1.0 - bLocal) * cellPx;
  float edge = 1.0 - smoothstep(0.0, 1.1, min(e2.x, e2.y));
  col.rgb += uTint * edge * uEdge * col.a * (0.3 + 0.7 * bH.x) * bM;

  return col * op * bK;
}

void main() {
  vec2 ppx = (gl_FragCoord.xy - uPadPx) / uDpr;

  float cw = cursorWeight(ppx);
  if (cw > 0.0) ppx += cursorOffset(ppx, cw, uTileScale);

  vec2 iuv = ppx / uImgPx;
  float m = field(iuv);
  vec4 col = texel(ppx);
  if (cw > 0.0) {
    vec2 sp = vec2(5.0 * uTileScale * cw, 0.0);
    vec4 cr = texel(ppx + sp);
    vec4 cb = texel(ppx - sp);
    col = vec4(cr.r, col.g, cb.b, max(col.a, max(cr.a, cb.a)));
  }
  col *= 1.0 - smoothstep(0.12, 0.9, m) * uErase;

  // Coarse (rectangular) → mid → fine. Coarse blocks only survive in the
  // core of a dematerialized region; fine tiles fringe out around it.
  float s = uTileScale;
  col = over(tileLayer(ppx, vec2(22.0, 14.0) * s, 0.62, 0.18, 11.0), col);
  col = over(tileLayer(ppx, vec2(10.0, 10.0) * s, 0.36, 0.3, 47.0), col);
  col = over(tileLayer(ppx, vec2(5.0, 5.0) * s, 0.14, 0.45, 93.0), col);

  // Fine scanlines inside active regions.
  float sl = step(0.5, fract(ppx.y / (3.0 * s)));
  col.rgb *= 1.0 - 0.05 * m * sl * uScanAmt;

  outColor = col;
}
`;
