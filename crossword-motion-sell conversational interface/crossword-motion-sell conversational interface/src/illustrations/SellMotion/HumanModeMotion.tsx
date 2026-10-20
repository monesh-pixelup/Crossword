import "../../components/ill/tokens.css";
import "../HumanMode/HumanMode.css";
import { KnowsWhenToHelpMotion } from "./KnowsWhenToHelpMotion";
import { KnowsHowToGuideMotion } from "./KnowsHowToGuideMotion";
import { KnowsWhenYoureReadyMotion } from "./KnowsWhenYoureReadyMotion";
import { Enter } from "./parts";

const PANELS = [KnowsWhenToHelpMotion, KnowsHowToGuideMotion, KnowsWhenYoureReadyMotion];

// Motion sibling of HumanMode — same 1280x599 static frame, three
// 327x336 shells side by side. Each shell still runs its own independent
// beat-timeline conversation; on top of that, the three containers
// themselves stagger in on mount (left to right) rather than all three
// popping in at once — reuses the kit's own one-shot turn-enter
// fade+rise+blur (`Enter`, from SellMotion/parts) instead of a new
// keyframe.
export function HumanModeMotion() {
  return (
    <div className="ill-human-mode-frame">
      {PANELS.map((Panel, i) => (
        <Enter key={i} delayMs={i * 150}>
          <Panel />
        </Enter>
      ))}
    </div>
  );
}
