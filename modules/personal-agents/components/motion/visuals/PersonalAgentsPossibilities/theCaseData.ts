import { bags } from "./data";

// Personal Agents → The Case. Grok Bot shops Trailwell on its own: it
// finishes the task, and skips everything the brand set up. Same line-up
// and offers as the rest of the page (Roam Pro $219 as in 08; the bundle
// at the 3-cube price used in 03 and 10).
export const theCase = {
  ask: "Find me a black carry-on under $200.",
  url: { home: "trailwell.com", search: "trailwell.com/search?q=black+carry-on&max=200" },
  steps: {
    open: "Opening trailwell.com",
    search: "Searched “black carry-on”, under $200",
    found: "Found Roam 40L, Charcoal · $189",
  },
  results: [
    { bag: bags.roam, color: "Charcoal", match: true },
    { bag: bags.weekender, color: "Forest", match: false },
    { bag: bags.overnight, color: "Sand", match: false },
  ],
  pick: bags.roam,
  answer: "Done. The Roam 40L in Charcoal is black and $189, under your budget.",
  missed: {
    promo: { title: "Fall Getaway", detail: "15% off select carry-ons · ends Nov 30", where: "Homepage" },
    bundle: { title: "Roam + 3 packing cubes", price: 209, was: 233, where: "Product page" },
    premium: { title: "Roam Pro 40L", price: 219, detail: "A pound lighter · lifetime warranty", image: bags.roam.image, where: "Collection page" },
  },
};
