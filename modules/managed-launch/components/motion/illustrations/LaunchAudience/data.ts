import { demandDiscovery } from "../WidgetLandscape/data";
import margotCutoutImage from "@/modules/managed-launch/assets/motion/scenarios/retain/handbag-viewed-cutout.png";
import islaCutoutImage from "@/modules/managed-launch/assets/motion/scenarios/retain/handbag-alt-1-cutout.png";
import noorCutoutImage from "@/modules/managed-launch/assets/motion/scenarios/retain/handbag-alt-2-cutout.png";

const margotCutout = margotCutoutImage.src;
const islaCutout = islaCutoutImage.src;
const noorCutout = noorCutoutImage.src;

// Retain 11 — "Turn customer patterns into your audience". Dialogue is the
// demandDiscovery brief verbatim (WidgetLandscape/data.ts). Like that
// scenario, no audience count is given, so none is invented here.
export const launchAudience = {
  query: demandDiscovery.brandRequest,
  reply: demandDiscovery.reply,
  approval: demandDiscovery.approval,
  thought: "Thought for 6s",
  card: {
    title: `Launch audience · ${demandDiscovery.brand} new arrivals`,
    headline: demandDiscovery.audience.label,
    source: demandDiscovery.audience.source.toLowerCase(),
    // The brief's three conditions, as the Segment story's label/value tags.
    criteria: [
      { label: "Asked for", value: "An unavailable product" },
      { label: "Matches", value: "This week’s new arrivals" },
      { label: "Excluded", value: "Bought a suitable alternative" },
    ],
    productsLabel: "Matched to this week’s new arrivals",
    // Each launch with one past request it now answers. Only the first
    // request comes from the brief's data; the other two are placeholders
    // in the same voice — replace with real scenario data.
    products: [
      { ...demandDiscovery.arrivals[0], image: margotCutout, request: demandDiscovery.audience.example.request },
      { ...demandDiscovery.arrivals[1], image: islaCutout, request: "“Do you have a slouchy shoulder bag in tan?”" },
      { ...demandDiscovery.arrivals[2], image: noorCutout, request: "“Any small top-handle bags for evenings?”" },
    ],
  },
  saved: [
    "Find visitors who keep reaching cart or checkout but don't buy.",
    "Create a segment of visitors who reach checkout on Subscribe & Save but never buy.",
  ],
  recent: [
    { text: "Who's most likely to buy this week?", age: "1d" },
    { text: "Who should hear first about our new arrivals?", age: "3d" },
  ],
};
