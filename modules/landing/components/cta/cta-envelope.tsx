"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import back from "../../assets/cta/back.webp";
import flapOpen from "../../assets/cta/flap-open.webp";
import letter from "../../assets/cta/letter.webp";
import photo from "../../assets/cta/photo.webp";
import seal from "../../assets/cta/seal.webp";

/*
 * Motion values (seconds) from the envelope prototype's defaults
 * (crossword-cta-envelope-demo). Two flaps make one swing: the closed flap
 * lifts until it is edge-on (90°), then the open flap takes over from edge-on
 * and lands. Edge-on, both are a line with no height, so the handover can't be
 * seen and no layer reorders.
 */
const P = {
  /**
   * Tied to scrolling, so it opens on the way down and closes again on the way back up, every
   * time: from the envelope's top at scrollFrom % of the viewport until the seal (64% down the
   * envelope) is at scrollTo %. scrub = seconds the animation takes to catch up with the scroll.
   */
  trigger: { scrollFrom: 80, scrollTo: 45, scrub: 0.6 },
  seal: { pressScale: 0.94, pressDur: 0.14, releaseDur: 0.42, bounce: 3 },
  closed: { start: 0.26, dur: 0.42, ease: "power2.in", shadowFade: 0.3 },
  open: { ease: "power2.out" },
  perspective: 2200,
  letter: { delay: 0.37, dur: 0.95, ease: "power3.out", fromY: 100, fromRotate: -0.6 },
  photo: { delay: 0.12, dur: 1.05, ease: "back.out(1.3)", fromY: 62, fromRotate: -10 },
  /** Hovering the letter or photo lifts it; leaving settles it back. Both ways ease out. */
  hover: { y: -36, dur: 0.6, ease: "power3.out" },
};
/** Open flap length ÷ closed flap length: the open flap turns this much slower so its tip keeps speed ("match tip speed"). */
const FLAP_RATIO = 355 / 245;

const layer = "pointer-events-none absolute block max-w-none select-none";
const flap = "left-0 w-full backface-visible will-change-transform";
/**
 * Letter and photo fill still hover boxes at their resting place: the card moves inside its
 * box (the rise and the hover lift), so the pointer never slips off a lifting card and flickers it.
 */
const card = "pointer-events-none absolute inset-0 block size-full max-w-none select-none will-change-transform";

const pocketStroke = { stroke: "#714d11", strokeOpacity: 0.25, strokeWidth: 1.4692 };
const flapPath =
  "M0 0H1389.72L731.365 228.323A40 40 0 0 1 718.263 230.53H671.737A40 40 0 0 1 658.634 228.323Z";

export function CtaEnvelope() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const q = (name: string) => section.querySelector<HTMLElement | SVGElement>(`[data-cta="${name}"]`);
    const el = {
      envelope: q("envelope"),
      seal: q("seal"),
      shadow: q("shadow"),
      closed: q("closed"),
      open: q("open"),
      letter: q("letter"),
      photo: q("photo"),
      letterHover: q("letter-hover"),
      photoHover: q("photo-hover"),
    };
    if (Object.values(el).some((n) => !n)) return;

    const handover = P.closed.start + P.closed.dur;
    const openDur = P.closed.dur * FLAP_RATIO;
    const letterAt = Math.max(0, handover + P.letter.delay);
    const photoAt = Math.max(0, letterAt + P.photo.delay);

    let ctx: gsap.Context | undefined;
    let cancelled = false;
    const cleanups: (() => void)[] = [];

    const build = () => {
      ctx = gsap.context(() => {
        gsap.set(el.closed, { transformOrigin: "50% 0%", transformPerspective: P.perspective });
        gsap.set(el.open, { transformOrigin: "50% 99.7237%", transformPerspective: P.perspective });

        // FromTo rows hold their from-values before the scroll range (the closed envelope).
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el.envelope,
              start: `top ${P.trigger.scrollFrom}%`,
              end: `64% ${P.trigger.scrollTo}%`,
              scrub: P.trigger.scrub,
            },
          })
          .to(el.seal, { scale: P.seal.pressScale, duration: P.seal.pressDur, ease: "power2.out" }, 0)
          .to(el.seal, { scale: 1, duration: P.seal.releaseDur, ease: `back.out(${P.seal.bounce})` }, P.seal.pressDur)
          .fromTo(el.shadow, { opacity: 1 }, { opacity: 0, duration: P.closed.shadowFade, ease: "power1.out" }, P.closed.start)
          .fromTo(el.closed, { rotationX: 0 }, { rotationX: 90, duration: P.closed.dur, ease: P.closed.ease }, P.closed.start)
          .fromTo(el.open, { rotationX: -90 }, { rotationX: 0, duration: openDur, ease: P.open.ease }, handover)
          .fromTo(
            el.letter,
            { yPercent: P.letter.fromY, rotation: P.letter.fromRotate },
            { yPercent: 0, rotation: 0, duration: P.letter.dur, ease: P.letter.ease },
            letterAt,
          )
          .fromTo(
            el.photo,
            { yPercent: P.photo.fromY, rotation: P.photo.fromRotate },
            { yPercent: 0, rotation: 0, duration: P.photo.dur, ease: P.photo.ease },
            photoAt,
          );

        // Hover lifts, listened for on the still boxes. Each way is a fresh ease-out tween from
        // wherever the card is, so a quick in-out never snaps (reversing would turn the drop into
        // an ease-in). `y` stacks with the rise's yPercent, so hover and scroll never fight.
        for (const [box, item] of [
          [el.letterHover, el.letter],
          [el.photoHover, el.photo],
        ]) {
          const to = (y: number) => () =>
            gsap.to(item, { y, duration: P.hover.dur, ease: P.hover.ease, overwrite: "auto" });
          // Only once this card is (nearly) out of the envelope: before that its box is empty
          // space above the pocket. Checked on the card itself, not the scroll progress.
          const lift = to(P.hover.y);
          const enter = () => Number(gsap.getProperty(item!, "yPercent")) < 20 && lift();
          const leave = to(0);
          box!.addEventListener("pointerenter", enter);
          box!.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            box!.removeEventListener("pointerenter", enter);
            box!.removeEventListener("pointerleave", leave);
          });
        }
      }, section);
    };

    // Build now so the envelope waits closed (the layers load lazily).
    build();

    // The envelope is the last section, so anything above that changes height (fonts, lazy
    // images, the animated sections) moves its trigger: re-measure whenever the page resizes.
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const pageResize = new ResizeObserver(() => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => !cancelled && ScrollTrigger.refresh(), 150);
    });
    pageResize.observe(document.body);
    document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());

    return () => {
      cancelled = true;
      clearTimeout(refreshTimer);
      pageResize.disconnect();
      cleanups.forEach((fn) => fn());
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} aria-labelledby="cta-title" className="relative isolate overflow-hidden">
      {/* The envelope runs from frame line to frame line (Figma: x 25 → 1415 at 1440). */}
      <div className="@container relative mx-[25px] max-md:mx-[13px] max-[480px]:mx-[9px]">
        <div data-cta="envelope" className="relative aspect-[1390/920] w-full" aria-hidden>
          <Image src={back} alt="" sizes="(min-width: 1440px) 1390px, 100vw" className={`${layer} top-[43.4188%] left-0 z-1 h-[21.8478%] w-full`} />
          <Image
            data-cta="open"
            src={flapOpen}
            alt=""
            sizes="(min-width: 1440px) 1390px, 100vw"
            className={`${layer} ${flap} top-[4.9406%] z-2 h-[38.587%] origin-[50%_99.7237%]`}
          />
          <div data-cta="letter-hover" className="absolute top-[28.412%] left-[3.8129%] z-3 h-[40.163%] w-[68.8129%]">
            <Image data-cta="letter" src={letter} alt="" sizes="(min-width: 1440px) 957px, 69vw" className={card} />
          </div>
          <div data-cta="photo-hover" className="absolute top-[34.1304%] left-[63.9245%] z-4 h-[42.2283%] w-[28.2374%]">
            <Image data-cta="photo" src={photo} alt="" sizes="(min-width: 1440px) 393px, 29vw" className={card} />
          </div>

          {/*
            Front pocket: Figma's Rectangle 14 and two side flaps, in section units (0 0 1440 1065).
            Its shapes take the pointer, so the parts of the cards tucked behind it don't trigger the hover lift.
          */}
          <svg className={`${layer} top-0 left-[-1.7986%] z-6 h-[115.7609%] w-[103.5971%] overflow-visible`} viewBox="0 0 1440 1065" preserveAspectRatio="none" focusable="false">
            <defs>
              <filter id="cta-pocket-shadow-lg" x="-3%" y="-8%" width="106%" height="116%" colorInterpolationFilters="sRGB">
                <feDropShadow dx="0" dy="-7.3005" stdDeviation="14.6009" floodColor="#000" floodOpacity=".12" />
              </filter>
              <filter id="cta-pocket-shadow-sm" x="-3%" y="-8%" width="106%" height="116%" colorInterpolationFilters="sRGB">
                <feDropShadow dx="0" dy="-7.3005" stdDeviation="3.6502" floodColor="#000" floodOpacity=".12" />
              </filter>
            </defs>
            <g filter="url(#cta-pocket-shadow-lg)">
              <rect x="26.5078" y="594.3438" width="1388.4911" height="470.5293" fill="#f3e9d4" pointerEvents="fill" />
              {/* Inside stroke; no bottom edge (only phones reach it, where the extension continues the pocket). */}
              <path d="M27.2424 1064.1385V595.0784H1414.2643V1064.1385" fill="none" {...pocketStroke} />
            </g>
            <path
              d="M24.965 404.6 636.08 595.251 24.965 1064.989Z"
              fill="#f3e9d4"
              pointerEvents="fill"
              {...pocketStroke}
              filter="url(#cta-pocket-shadow-sm)"
            />
            <path
              d="M1414.72 404.6 804.063 595.286 1414.72 1064.978Z"
              fill="#f3e9d4"
              pointerEvents="fill"
              {...pocketStroke}
              filter="url(#cta-pocket-shadow-sm)"
            />
          </svg>

          {/* Closed flap (Figma only shows the envelope open). x from the envelope's left edge, y from the fold. */}
          <svg
            data-cta="shadow"
            className={`${layer} top-[43.4209%] left-0 z-8 h-[26.6304%] w-full overflow-visible opacity-0`}
            viewBox="0 0 1390 245"
            preserveAspectRatio="none"
            focusable="false"
          >
            <defs>
              <filter id="cta-flap-blur" x="-4%" y="0" width="108%" height="130%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>
            <path d={flapPath} transform="translate(0 5)" fill="#000" fillOpacity=".16" filter="url(#cta-flap-blur)" />
          </svg>
          <svg
            data-cta="closed"
            className={`${layer} ${flap} top-[43.4209%] z-9 h-[26.6304%] origin-top overflow-visible [transform:rotateX(90deg)]`}
            viewBox="0 0 1390 245"
            preserveAspectRatio="none"
            focusable="false"
          >
            <path d={flapPath} fill="#f3e9d4" />
            <path
              d="M1389.72 0 731.365 228.323A40 40 0 0 1 718.263 230.53H671.737A40 40 0 0 1 658.634 228.323L0 0"
              fill="none"
              {...pocketStroke}
              strokeLinejoin="round"
            />
          </svg>

          <Image data-cta="seal" src={seal} alt="" sizes="139px" className={`${layer} top-[55.7197%] left-[45.0146%] z-10 h-[16.4302%] w-[9.9699%]`} />
        </div>

        {/*
          Phones only: the pocket continues below Figma's envelope to hold the heading,
          repeating its side hairlines and shadow; clip-path drops its top pixel.
        */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[75.5396cqw] bottom-0 z-7 hidden bg-sand shadow-[inset_1px_0_0_rgba(113,77,17,0.25),inset_-1px_0_0_rgba(113,77,17,0.25),0_-0.5252cqw_2.1007cqw_rgba(0,0,0,0.12)] [clip-path:inset(1px_-4cqw_-4cqw_-4cqw)] max-md:block"
        />
        <div className="absolute top-[49.9029cqw] left-1/2 z-11 flex w-[35.7022cqw] -translate-x-1/2 flex-col items-center gap-y-[1.5108cqw] max-md:relative max-md:top-auto max-md:left-auto max-md:mx-auto max-md:mt-[-17.1223cqw] max-md:w-auto max-md:translate-x-0 max-md:gap-y-5 max-md:px-5 max-md:pb-14">
          <h2 id="cta-title" className="m-0 pt-[0.2656em] text-center font-serif text-[3.5019cqw] leading-[1.1] font-normal tracking-[-0.06em] text-[#b4ab9b] [filter:url(#cta-deboss)] max-md:max-w-[11em] max-md:text-[2rem] max-[480px]:text-[1.75rem]">
            <span className="font-script text-[1.4521em] leading-0 tracking-[-0.05em]">E</span>xplore a no strings attached pilot with us today
          </h2>
        </div>
      </div>

      {/* Figma's inner shadow on the heading (0, 0.82, blur 2.47, black 18%): a debossed look. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
        <filter id="cta-deboss" x="-2%" y="-5%" width="104%" height="110%" colorInterpolationFilters="sRGB">
          <feComponentTransfer in="SourceAlpha" result="inverse">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feOffset in="inverse" dy="0.824" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="1.236" result="blur" />
          <feFlood floodColor="#000" floodOpacity=".18" />
          <feComposite in2="blur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" result="inner" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="inner" />
          </feMerge>
        </filter>
      </svg>
    </section>
  );
}
