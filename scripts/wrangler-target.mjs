// Writes a Wrangler config for one deploy target (an issue preview, staging or production) to stdout, starting from
// wrangler.jsonc. Each target is its own Worker with its own address and its own folder in the shared R2 page cache.
//
//   node scripts/wrangler-target.mjs --name crossword-website-issue-4 --domain issue-4.preview.crossword.ai \
//     --cache-prefix issue-4 > wrangler.target.jsonc
//
// --domain attaches a Cloudflare custom domain (Cloudflare creates its DNS record and certificate).
// --route adds a zone route such as crossword.ai/* (zone crossword.ai); routes leave more specific ones, like the
// /docs Worker's, in charge of their paths. Both may repeat. With neither, the Worker gets no address.
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const all = (flag) => args.flatMap((a, i) => (a === flag ? [args[i + 1]] : []));
const one = (flag) => all(flag)[0];

const name = one("--name");
if (!name || !/^[a-z0-9-]{1,63}$/.test(name)) {
  console.error("--name must be a Worker name: lowercase letters, digits and hyphens");
  process.exit(1);
}

// wrangler.jsonc allows // comments on their own lines; drop them before parsing.
const base = JSON.parse(
  readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8")
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n"),
);

const routes = [
  ...all("--domain").map((pattern) => ({ pattern, custom_domain: true })),
  ...all("--route").map((pattern) => ({ pattern, zone_name: "crossword.ai" })),
];

const config = {
  ...base,
  name,
  workers_dev: false,
  preview_urls: false,
  routes,
  // Paths in wrangler.jsonc are relative to the repo root; this file is written there too.
  services: (base.services ?? []).map((s) => (s.binding === "WORKER_SELF_REFERENCE" ? { ...s, service: name } : s)),
  vars: { ...(base.vars ?? {}), NEXT_INC_CACHE_R2_PREFIX: `incremental-cache/${one("--cache-prefix") ?? name}` },
};

process.stdout.write(JSON.stringify(config, null, 2) + "\n");
