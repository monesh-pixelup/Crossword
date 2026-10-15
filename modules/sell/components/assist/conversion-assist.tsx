import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/hero/decor/rail-accent.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { AssistList } from "./assist-list";

export function ConversionAssist() {
  return (
    <section aria-labelledby="assist-title" className="relative section-pad">
      <Image
        src={railAccent}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[103.49px] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="content-width">
        <AssistList
          header={
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>Conversion assistance</Eyebrow>
              <SectionTitle
                id="assist-title"
                initial="E"
                firstLine="very hesitation, answered"
                secondLine="before it becomes a lost sale."
                width={553.133}
                variant="assist"
              />
            </div>
          }
        />
      </div>
    </section>
  );
}
