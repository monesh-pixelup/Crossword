// Turns the Notion Testimonials database into content/testimonials.yml, and its photos into ready-to-serve files.
//
//   node scripts/blog/testimonials-sync.mjs <snapshot.json> --media-out <dir>
//
// The snapshot is every row of Testimonials (through the Notion connector), plus each photo the run downloaded:
//   { "rows": [ { "pageId": "424f90cd-…", "properties": { "Name", "Quote", "Role", "Company", "Card colour",
//                 "Show on", "Order", "Status", … }, "photo": "/local/file" | null } ] }
//
// Which rows go in the file, by Status:
//   Review, Approved: as they are in Notion now (Review rows are in the preview; nothing ships while any row is in Review).
//   Live: as they were last shipped (the file's copy), so editing a Live row changes nothing until it goes back to Review.
//         A Live row the file doesn't have yet is left out with a warning: it has to go through Review first.
//   Draft, Off site: left out (Off site takes a slide down).
// Prints a JSON report: { status: "updated" | "unchanged", inReview, approved, media, warnings, errors }.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import YAML from "yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const file = join(root, "content/testimonials.yml");
const args = process.argv.slice(2);
const snapshotPath = args.find((a) => !a.startsWith("--"));
const mediaOut = args[args.indexOf("--media-out") + 1];
if (!snapshotPath || !args.includes("--media-out") || !mediaOut) {
  console.error("usage: node scripts/blog/testimonials-sync.mjs <snapshot.json> --media-out <dir>");
  process.exit(2);
}

const snap = JSON.parse(readFileSync(snapshotPath, "utf8"));
const source = readFileSync(file, "utf8");
const header = source.split("\n").filter((l) => l.startsWith("#")).join("\n") + "\n";
const current = YAML.parse(source) ?? [];
const warnings = [];
const errors = [];
const media = [];

const normId = (id) => String(id ?? "").replace(/-/g, "").replace(/^.*([0-9a-f]{32}).*$/i, "$1").toLowerCase();
const text = (v) => (v == null ? "" : String(v).trim());
const list = (v) => {
  if (Array.isArray(v)) return v;
  try {
    const parsed = JSON.parse(v ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return text(v) ? [text(v)] : [];
  }
};
const pageKeys = { "Home and Blog": "home", "Conversational Interface": "sell", Support: "support", Retain: "retain" };
const colors = { Maroon: "#7d0034", "Forest green": "#00331a", Green: "#004c27" };
const byPage = new Map(current.map((t) => [normId(t.notionPage), t]));

async function processPhoto(localPath, name) {
  // The portrait fills the card's 314 x 317 notched panel; twice that for sharp screens.
  const out = await sharp(readFileSync(localPath)).rotate().resize({ width: 628, height: 634, fit: "cover" }).webp({ quality: 82, effort: 5 }).toBuffer();
  const stem = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "testimonial";
  const out_name = `${stem}-${createHash("sha256").update(out).digest("hex").slice(0, 10)}.webp`;
  mkdirSync(join(mediaOut, "testimonials"), { recursive: true });
  writeFileSync(join(mediaOut, "testimonials", out_name), out);
  media.push(`testimonials/${out_name}`);
  return `/media/testimonials/${out_name}`;
}

const next = [];
let inReview = 0;
let approved = 0;
for (const row of snap.rows ?? []) {
  const p = row.properties ?? {};
  const id = normId(row.pageId);
  const status = text(p.Status) || "Draft";
  const name = text(p.Name);
  if (status === "Draft" || status === "Off site") continue;
  if (status === "Live") {
    const shipped = byPage.get(id);
    if (shipped) next.push(shipped);
    else warnings.push(`"${name}" is Live in Notion but was never shipped; move it to Review first`);
    continue;
  }
  if (status === "Review") inReview++;
  if (status === "Approved") approved++;
  const where = `"${name || "(no name)"}"`;
  const quote = text(p.Quote);
  if (!name) errors.push(`a ${status} testimonial has no Name`);
  if (!quote) errors.push(`${where} has no Quote`);
  const pages = list(p["Show on"]).map((s) => pageKeys[s]).filter(Boolean);
  if (!pages.length) errors.push(`${where}: pick at least one page in "Show on"`);
  if (quote.split(/\s+/).length > 55) warnings.push(`${where}: the quote is ${quote.split(/\s+/).length} words; about 40 reads best`);
  const entry = {
    name,
    quote: quote.replace(/^["“]|["”]$/g, ""),
    role: text(p.Role),
    company: text(p.Company),
    ...(colors[text(p["Card colour"])] && { cardColor: colors[text(p["Card colour"])] }),
    pages,
    ...(Number.isFinite(Number(p.Order)) && text(p.Order) !== "" && { order: Number(p.Order) }),
    notionPage: row.pageId,
  };
  if (row.photo) entry.photo = await processPhoto(row.photo, name);
  next.push(entry);
}

if (!errors.length) {
  const out = header + YAML.stringify(next, { lineWidth: 0 });
  const changed = out !== source;
  if (changed) writeFileSync(file, out);
  report(changed ? "updated" : "unchanged");
} else report("error");

function report(status) {
  process.stdout.write(JSON.stringify({ status, inReview, approved, media, warnings, errors }, null, 2) + "\n");
  process.exit(errors.length ? 1 : 0);
}
