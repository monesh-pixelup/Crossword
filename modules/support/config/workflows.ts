export type WorkflowStep = {
  title: string;
  body: string;
  /** `stuck`: the step that fails; `human`: the step a person takes over. */
  state?: "stuck" | "human";
};

export type WorkflowLane = { label: string; steps: WorkflowStep[] };

/**
 * The doc asks for “Normal workflow” and “API didn’t work, hands it over to human”, with a
 * refund as the example. TODO: confirm the step wording with the Crossword team.
 */
export const workflowLanes: WorkflowLane[] = [
  {
    label: "The usual path",
    steps: [
      { title: "Request", body: "A customer asks to return an order and get their money back." },
      { title: "Eligibility", body: "Crossword checks the order against your return window and policy." },
      { title: "Return", body: "It starts the return and sends the prepaid label." },
      { title: "Refund", body: "The refund is issued and the customer hears about it first." },
    ],
  },
  {
    label: "When a step breaks",
    steps: [
      { title: "Request", body: "A customer asks to return an order and get their money back." },
      { title: "Eligibility", body: "Crossword checks the order against your return window and policy." },
      { title: "No response", body: "The refund partner’s API doesn’t answer, so Crossword stops.", state: "stuck" },
      { title: "Your team", body: "A person overrides the step, finishes the refund and takes it from there.", state: "human" },
    ],
  },
];
