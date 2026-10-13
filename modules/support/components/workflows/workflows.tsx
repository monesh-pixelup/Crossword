import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { type WorkflowLane, type WorkflowStep, workflowLanes } from "../../config/workflows";

const laneLabel = "font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] text-label-olive uppercase";

/**
 * The marker on the timeline (web kit `.wk-tl .rail`: a 10px gold dot): a maroon ring where the
 * step breaks, and a forest dot where a person steps in.
 */
function Marker({ state }: { state: WorkflowStep["state"] }) {
  if (state === "stuck") return <span className="size-2.5 shrink-0 rounded-full shadow-[inset_0_0_0_1.5px_var(--color-maroon)]" />;
  if (state === "human") return <span className="size-2.5 shrink-0 rounded-full bg-forest" />;
  return <span className="size-2.5 shrink-0 rounded-full bg-gold" />;
}

/** The rule from one marker to the next: a 1px dashed gold border, or dashed maroon at half strength after the stuck step. */
function Rule({ state }: { state: WorkflowStep["state"] }) {
  return <span aria-hidden className={cn("flex-1 border-t border-dashed", state === "stuck" ? "border-maroon/50" : "border-gold")} />;
}

function Lane({ lane }: { lane: WorkflowLane }) {
  return (
    <div className="flex flex-col gap-8">
      <p className={laneLabel}>{lane.label}</p>
      <ol className="grid gap-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
        {lane.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-4">
            <span aria-hidden className="flex items-center">
              <Marker state={step.state} />
              <Rule state={step.state} />
            </span>
            <span className="font-script text-[28px] leading-none tracking-[-1px] text-ink">0{i + 1}</span>
            <span className="flex flex-col gap-3">
              <span className="flex items-center gap-2">
                <span className={cn("font-serif text-[22px] leading-[1.15] tracking-[-0.03em]", step.state === "stuck" ? "text-maroon" : "text-ink")}>
                  {step.title}
                </span>
                {/* A square tag, as the web kit's numbered-panel tags (sand, engraved hairline, olive caps). */}
                {step.state === "human" && (
                  <span className="bg-sand px-2 py-1 font-sans text-[11px] leading-[1.3] tracking-[0.06em] text-label-olive uppercase shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
                    Human
                  </span>
                )}
              </span>
              <span className="max-w-[280px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Layout/Process, Timeline variant: centred eyebrow, headline and line of copy, then the steps on
 * a dashed gold rule with script numerals. Two timelines here, the usual path and the one where a
 * step breaks and a person takes over, split by a hairline.
 */
export function Workflows() {
  return (
    <section aria-labelledby="workflows-title" className="relative pb-(--section-pad)">
      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Workflows</Eyebrow>
          <SectionTitle
            id="workflows-title"
            initial="W"
            firstLine="orkflows with room"
            secondLine="for human judgment"
            width={560}
            variant="centered"
          />
          <p className="max-w-[640px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
            Crossword follows the workflows you define, so returns, refunds, and support issues are handled consistently
            and in the right order. When a situation falls outside the rules, a human can step in, override the
            workflow, and take it from there.
          </p>
        </div>

        <div className="flex w-full flex-col gap-14">
          {workflowLanes.map((lane, i) => (
            <div key={lane.label} className={cn(i > 0 && "border-t-[0.5px] border-black/20 pt-14")}>
              <Lane lane={lane} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
