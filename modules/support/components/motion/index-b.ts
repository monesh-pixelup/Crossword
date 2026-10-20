import type { SceneEntry } from "@/modules/sell/components/motion/scene-panel";
import { Guardrails } from "./guardrails";
import { HumanTakeover } from "./human-takeover";
import { MerchantApproval } from "./merchant-approval";
import { MerchantInsight } from "./merchant-insight";
import { WhisperToAgent } from "./whisper-to-agent";

/*
 * Support scenes 08–12. Each renders at its native size and must be wrapped
 * in <SupportMotionRoot>. `duration` is how long after `play` turns true the
 * scene takes to settle, from the beat timings (average typing speed);
 * typing jitter moves it by up to ±100ms.
 *
 * The human-in-the-loop scenes (human-takeover, merchant-approval,
 * whisper-to-agent) are drawn in the source's 738 × 680 scene frame, which is
 * transparent there: the visible card (handoff backdrop + chat) is 355 × 402,
 * centred (at 191.5, 139). The source gallery's cream (#ece6da) is the page
 * body, not part of the scene.
 */

export const supportScenesB = {
  "merchant-insight": {
    Component: MerchantInsight,
    label:
      "A merchant asks the helpdesk assistant what's happening with their customer conversations. It reads the customer's history and summarises a delayed refund, then, asked for more, explains the refund is approved but not yet with the payment processor and offers to draft a reply.",
    width: 687,
    height: 586,
    // Then a 2s hold on the last reply (no visible change).
    duration: 5000,
  },
  guardrails: {
    Component: Guardrails,
    label:
      "The merchant's guardrails (refund policy, tone of voice, escalation) connect to the assistant's chat. Checking the refund policy, the assistant declines to override the return window, offers to flag a specialist, and marks the policy as respected.",
    width: 1280,
    height: 498,
    duration: 5900,
  },
  "human-takeover": {
    Component: HumanTakeover,
    label:
      "A shopper asks for help from a person. The assistant brings in someone from the team, passing along the conversation, and a team member joins with the full context.",
    width: 738,
    height: 680,
    duration: 6700,
  },
  "merchant-approval": {
    Component: MerchantApproval,
    label:
      "A shopper asks for 20% off. The assistant privately asks the team for approval, the merchant approves 15%, and the assistant offers 15% off the order.",
    width: 738,
    height: 680,
    duration: 7200,
  },
  "whisper-to-agent": {
    Component: WhisperToAgent,
    label:
      "A disappointed shopper writes in. A team member privately whispers to the assistant that this is a premium customer and to keep it warm, and the assistant replies with a warm, personal apology.",
    width: 738,
    height: 680,
    duration: 5900,
  },
} satisfies Record<string, SceneEntry>;
