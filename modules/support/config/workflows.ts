import type { StaticImageData } from "next/image";
import handoffIcon from "../assets/workflows/handoff-icon.svg";
import workflowIcon from "../assets/workflows/workflow-icon.svg";

/** The two workflows, as Figma's Node diagram: the usual path and the hand-over to a person. */
export const workflows: { icon: StaticImageData; title: string; body: string }[] = [
  {
    icon: workflowIcon,
    title: "Normal workflow",
    body: "Crossword follows the workflows you define, so returns, refunds, and support issues are handled consistently and in the right order.",
  },
  {
    icon: handoffIcon,
    title: "API didn’t work, hands it over to Human",
    body: "When a situation falls outside the rules, a human can step in, override the workflow, and take it from there.",
  },
];
