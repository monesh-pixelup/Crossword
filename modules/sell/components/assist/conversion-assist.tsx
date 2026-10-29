import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/hero/decor/rail-accent.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { AssistList } from "./assist-list";

export function ConversionAssist() {
  return (
    <section aria-labelledby="assist-title" className="relative section-pad">
      <div className="content-width">
        <AssistList
          header={
            <div className="flex flex-col items-start gap-6">
              {/* Placed against the sticky heading (103.49px from the section top, out on the left rail) so it stays pinned with it. */}
              <Image
                src={railAccent}
                alt=""
                aria-hidden
                className="pointer-events-none absolute top-[calc(103.49px-var(--section-pad))] left-[calc(var(--frame-inset)-var(--page-pad)-0.5px)]"
              />
              <Eyebrow>Conversion assistance</Eyebrow>
              <SectionTitle
                id="assist-title"
                initial="E"
                firstLine="very hesitation,"
                secondLine={
                  <>
                    answered before it
                    <br />
                    becomes a lost sale.
                  </>
                }
                width={553.133}
                weight="light"
              />
            </div>
          }
        />
      </div>
    </section>
  );
}
