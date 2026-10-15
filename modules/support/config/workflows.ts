/** The two workflows, as Figma's Node diagram: the usual path and the hand-over to a person. */
export const workflows: { title: string; body: string }[] = [
  {
    title: "Normal workflow",
    body: "Crossword follows the workflows you define, so returns, refunds, and support issues are handled consistently and in the right order.",
  },
  {
    title: "API didn’t work, hands it over to Human",
    body: "When a situation falls outside the rules, a human can step in, override the workflow, and take it from there.",
  },
];
