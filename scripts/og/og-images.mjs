// Draws each page's share image (app/**/opengraph-image.png, 1200x630): the page's headline on the forest-green
// ground, in the site's own type (Crimson Pro, the Parisienne swash initial, Geist for the eyebrow).
//
//   node scripts/og/og-images.mjs        (needs Playwright with Chromium; run from the repo root)
//
// Change a page's words in PAGES below and run it again. Blog posts use their own social or cover image, or else
// the journal's (public/og/journal.png).
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Playwright is not a dependency of the site; this takes whichever copy is installed where the script runs.
const { chromium } = createRequire(import.meta.url)("playwright");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const font = (f) => `data:font/woff2;base64,${fs.readFileSync(path.join(root, "lib/fonts", f)).toString("base64")}`;
const mark = `<img alt="" src="data:image/svg+xml;base64,${fs.readFileSync(path.join(root, "modules/marketing/assets/crossword-mark-light.svg")).toString("base64")}">`;

// dir: the route segment the image goes in. initial + rest: the headline, its first letter drawn as the swash.
const PAGES = [
  { dir: "app", eyebrow: "AI shopper assistant", initial: "Y", rest: "our brand’s AI agent", sub: "Your best hire, yet." },
  { dir: "app/(product)/conversational-interface", eyebrow: "Conversational Interface", initial: "E", rest: "very shopper gets a reason to buy" },
  { dir: "app/(product)/dynamic-landing-pages", eyebrow: "Dynamic Landing Pages", initial: "E", rest: "very page, built for the person on it" },
  { dir: "app/(product)/retain", eyebrow: "Retain", initial: "G", rest: "ood to see you again" },
  { dir: "app/(product)/support", eyebrow: "Support", initial: "M", rest: "ost support tickets aren’t complicated, they’re just slow" },
  { dir: "app/(product)/ai-assistants", eyebrow: "AI Assistants", initial: "Y", rest: "our customers are already asking ChatGPT about you" },
  { dir: "app/(product)/personal-agents", eyebrow: "Personal Agents", initial: "Y", rest: "our next shopper might never see your website" },
  { dir: "app/(product)/managed-launch", eyebrow: "Managed Launch", initial: "A", rest: "I shouldn’t become another thing on your to-do list" },
  { dir: "app/(marketing)/pricing", eyebrow: "Pricing", initial: "S", rest: "tart free. Scale when you’re ready" },
  { dir: "app/(marketing)/blog", eyebrow: "The journal", initial: "N", rest: "otes on conversational commerce and AI shopping" },
  { dir: "app/(marketing)/privacy", eyebrow: "Legal", initial: "P", rest: "rivacy policy" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = (p) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Crimson;src:url(${font("crimson-pro-normal-200-900.woff2")});font-weight:200 900}
@font-face{font-family:Swash;src:url(${font("parisienne-swash.woff2")})}
@font-face{font-family:Geist;src:url(${font("geist-normal-100-900.woff2")});font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#00331a;color:#fff9ea;font-family:Crimson,Georgia,serif;position:relative;overflow:hidden}
.glow{position:absolute;inset:0;background:radial-gradient(900px 500px at 85% 110%,#004c27 0%,transparent 70%)}
.frame{position:absolute;inset:28px;border:1.5px solid #e0be60;opacity:.85}
.frame2{position:absolute;inset:36px;border:1px solid #e0be6066}
.top{position:absolute;left:84px;top:78px;display:flex;align-items:center;gap:16px}
.top img{width:46px;height:46px}
.word{font-size:34px;font-weight:500;letter-spacing:-.5px}
.eyebrow{position:absolute;left:84px;top:190px;font-family:Geist,sans-serif;font-size:20px;font-weight:500;letter-spacing:3.2px;text-transform:uppercase;color:#e0be60}
h1{position:absolute;left:84px;right:110px;top:232px;font-weight:400;font-size:${p.rest.length > 40 ? 66 : 76}px;line-height:1.08;letter-spacing:-1.6px}
h1 .i{font-family:Swash;font-weight:400;color:#f7c849;font-size:1.32em;line-height:0;letter-spacing:0;margin-right:.02em}
.sub{position:absolute;left:84px;bottom:84px;font-size:30px;font-style:italic;color:#dfe3d2}
.url{position:absolute;right:84px;bottom:84px;font-family:Geist,sans-serif;font-size:20px;letter-spacing:1.5px;color:#869d88}
</style></head><body><div class="glow"></div><div class="frame"></div><div class="frame2"></div>
<div class="top">${mark}<span class="word">Crossword</span></div>
<div class="eyebrow">${esc(p.eyebrow)}</div>
<h1><span class="i">${esc(p.initial)}</span>${esc(p.rest)}</h1>
${p.sub ? `<div class="sub">${esc(p.sub)}</div>` : ""}<div class="url">crossword.ai</div>
</body></html>`;

{
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const p of PAGES) {
    await page.setContent(html(p));
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(root, p.dir, "opengraph-image.png");
    await page.screenshot({ path: out });
    fs.writeFileSync(path.join(root, p.dir, "opengraph-image.alt.txt"), `Crossword · ${p.eyebrow}: ${p.initial}${p.rest}`);
    console.log("wrote", path.relative(root, out));
    // Blog posts without a cover or social image of their own share the journal's (app/(marketing)/blog/[slug]/page.tsx).
    if (p.dir.endsWith("/blog")) {
      fs.mkdirSync(path.join(root, "public/og"), { recursive: true });
      fs.copyFileSync(out, path.join(root, "public/og/journal.png"));
      console.log("wrote public/og/journal.png");
    }
  }
  await browser.close();
}
