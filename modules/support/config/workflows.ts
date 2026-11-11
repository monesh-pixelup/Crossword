import type { Icon } from "@phosphor-icons/react";
import { FlowArrowIcon, UserSwitchIcon } from "@phosphor-icons/react/ssr";

/** The two workflows, as Figma's Node diagram: the usual path and the hand-over to a person. */
export const workflows: { /** Its Phosphor glyph (phosphoricons.com). */ icon: Icon; title: string; body: string }[] = [
  {
    icon: FlowArrowIcon,
    title: "Normal workflow",
    body: "Crossword follows the workflows you define, so returns, refunds, and support issues are handled consistently and in the right order.",
  },
  {
    icon: UserSwitchIcon,
    title: "Human override",
    body: "When a situation falls outside the rules, a human can step in, override the workflow, and take it from there.",
  },
];
