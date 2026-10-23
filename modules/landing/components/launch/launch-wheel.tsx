"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useEffect, useRef } from "react";
import panelTexture from "../../assets/launch/panel-texture.webp";
import stampConfigure from "../../assets/launch/stamp-configure.webp";
import stampConnect from "../../assets/launch/stamp-connect.webp";
import stampImprove from "../../assets/launch/stamp-improve.webp";
import stampLaunch from "../../assets/launch/stamp-launch.webp";
import stampTest from "../../assets/launch/stamp-test.webp";
import stampWatch from "../../assets/launch/stamp-watch.webp";
import stud from "../../assets/launch/stud.svg";

const studs = [
  { left: 300.047, top: 9.688 },
  { left: 300.047, top: 292.016 },
  { left: 9.758, top: 9.688 },
  { left: 9.758, top: 292.016 },
];

/** "Simply tell us…" → we do the rest. */
/** The homepage doc's six steps. */
const homeSteps = ["We connect the systems.", "Configure the experience.", "Test it.", "Launch it.", "Watch it.", "Improve it."];
/** One stamp per step (Figma "Stamp icons · Managed launch steps", 3106:668), in step order. */
const homeStamps = [stampConnect, stampConfigure, stampTest, stampLaunch, stampWatch, stampImprove];

/** Server markup is Figma's still frame: the middle step active, its neighbours muted, the ends fading out. */
function stillState(i: number, n: number) {
  const rel = i - Math.floor(n / 2);
  if (rel === 0) return "active";
  if (rel === -2) return "fade-top";
  if (rel === 2) return "fade-bottom";
  return "muted";
}

const DURATION = 1300; // ms per step
const ROLL = 465; // ms for the steps to roll to the new step
const DROP = 750; // ms for a stamp to fall, land and settle
const PILE = 3; // stamps kept on the pile at rest
const LAND = 0.72; // point of DROP where the stamp touches the pile
const ROTATIONS = [0, 17, 7, 24, -6]; // degrees per step, added to the art's own tilt
const EASE_ROLL = "cubic-bezier(.645, .045, .355, 1)"; // ease-in-out-cubic: already on screen
const EASE_DROP = "cubic-bezier(.215, .61, .355, 1)"; // ease-out-cubic: entering the panel
const EASE_PRESS = "cubic-bezier(.25, .46, .45, .94)"; // ease-out-quad
const SHADOW_REST = "drop-shadow(0 2px 4px rgba(24, 8, 36, 0.35))";
const SHADOW_AIR = "drop-shadow(0 20px 14px rgba(24, 8, 36, 0.3))";

type Item = HTMLLIElement & { _roll?: Animation | null };
type Stamp = HTMLImageElement & { _leaving?: boolean; _falling?: boolean };

/**
 * Every DURATION ms the next step rolls to the centre of the list and its
 * stamp (`templates[step]`, or the only one) drops from the top of the aubergine panel onto the pile. Clicking a
 * step rolls to it and drops its stamp. Autoplay starts when the row is in
 * view and pauses off-screen, while the mouse is over the steps, on keyboard
 * focus and while the tab is hidden. With reduced motion there is no autoplay
 * and nothing moves: a click swaps the step and its stamp appears in place.
 */
function startWheel(row: HTMLElement, list: HTMLOListElement, pile: HTMLElement, templates: HTMLImageElement[]) {
  const items = Array.from(list.querySelectorAll<Item>("[data-step]"));
  const buttons = items.map((item) => item.querySelector("button")!);
  const n = items.length;
  const half = Math.floor(n / 2);
  const maxRel = n - 1 - half;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motion = () => !reduce.matches;
  let active = 0;
  let pitch = 0;
  let started = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let due = 0;
  let remaining = DURATION;
  let inView = false;
  let hovering = false;
  let focused = false;
  const timeouts = new Set<ReturnType<typeof setTimeout>>();
  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };

  // ---- Steps wheel: the active step sits in the middle slot, the others wrap around it ----
  const relOf = (i: number, a: number) => {
    const r = (((i - a) % n) + n) % n;
    return r > maxRel ? r - n : r;
  };
  const yFor = (i: number, rel: number) => (half + rel - i) * pitch;
  const cancelRoll = (item: Item) => {
    item._roll?.cancel();
    item._roll = null;
  };
  function measure() {
    // Sub-pixel distance between steps in their natural layout.
    for (const item of items) {
      cancelRoll(item);
      item.style.transform = "none";
    }
    pitch = (items[n - 1].getBoundingClientRect().top - items[0].getBoundingClientRect().top) / (n - 1);
  }
  function currentY(el: Element) {
    const m = /matrix(3d)?\(([^)]+)\)/.exec(getComputedStyle(el).transform);
    if (!m) return 0;
    const v = m[2].split(",");
    return parseFloat(m[1] ? v[13] : v[5]) || 0;
  }
  function place() {
    items.forEach((item, i) => {
      cancelRoll(item);
      item.style.transform = `translateY(${yFor(i, relOf(i, active))}px)`;
    });
  }
  function paint() {
    items.forEach((item, i) => {
      const on = i === active;
      item.dataset.state = on ? "active" : "muted";
      if (on) buttons[i].setAttribute("aria-current", "step");
      else buttons[i].removeAttribute("aria-current");
    });
  }
  function roll(from: number, to: number) {
    const shift = relOf(to, from); // slots the wheel moves; every step's slot drops by this
    items.forEach((item, i) => {
      const target = relOf(i, to);
      const straight = relOf(i, from) - shift;
      const start = currentY(item);
      const end = yFor(i, target);
      cancelRoll(item);
      item.style.transform = `translateY(${end}px)`;
      if (!motion() || Math.abs(start - end) < 0.5) return;
      let frames: Keyframe[];
      if (straight === target) {
        frames = [{ transform: `translateY(${start}px)` }, { transform: `translateY(${end}px)` }];
      } else {
        // Wrapping: leave past one edge (masked out), re-enter from the other.
        const up = straight < target;
        const exitY = yFor(i, up ? -half - 1 : maxRel + 1);
        const enterY = yFor(i, up ? maxRel + 1 : -half - 1);
        const d1 = Math.abs(exitY - start);
        const d2 = Math.abs(end - enterY);
        const at = d1 / (d1 + d2 || 1);
        frames = [
          { transform: `translateY(${start}px)`, offset: 0 },
          { transform: `translateY(${exitY}px)`, offset: at },
          { transform: `translateY(${enterY}px)`, offset: at },
          { transform: `translateY(${end}px)`, offset: 1 },
        ];
      }
      const anim = item.animate(frames, { duration: ROLL, easing: EASE_ROLL });
      item._roll = anim;
      anim.onfinish = () => {
        if (item._roll === anim) item._roll = null;
      };
    });
  }

  // ---- Stamp pile ----
  const live = () => (Array.from(pile.children) as Stamp[]).filter((el) => !el._leaving);
  function trim() {
    live()
      .slice(0, Math.max(0, live().length - PILE))
      .forEach((el) => {
        el._leaving = true;
        if (!motion()) return el.remove();
        el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, easing: "ease" }).onfinish = () => el.remove();
      });
  }
  function drop(step: number) {
    const stamp = templates[step % templates.length].cloneNode(false) as Stamp;
    const rest = `rotate(${ROTATIONS[step % ROTATIONS.length]}deg)`;
    stamp.removeAttribute("id");
    stamp.loading = "eager";
    stamp.style.display = "";
    stamp.style.transform = rest;
    const ready = stamp.decode ? stamp.decode().catch(() => {}) : Promise.resolve();
    Promise.race([ready, new Promise((r) => later(() => r(null), 700))]).then(() => {
      if (!row.isConnected) return;
      const below = live();
      pile.appendChild(stamp);
      if (!motion()) {
        stamp.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: "ease" });
        trim();
        return;
      }
      const dist = pile.clientHeight / 2 + stamp.offsetHeight * 1.2; // starts fully above the panel
      const tilt = `rotate(${ROTATIONS[step % ROTATIONS.length] + (step % 2 ? -12 : 12)}deg)`;
      stamp._falling = true;
      stamp.animate(
        [
          { transform: `translateY(${-dist}px) ${tilt} scale(1.16)`, filter: SHADOW_AIR, easing: EASE_DROP },
          { transform: `translateY(0px) ${rest} scale(1)`, filter: SHADOW_REST, offset: LAND, easing: EASE_PRESS },
          { transform: `translateY(0px) ${rest} scale(0.97)`, filter: SHADOW_REST, offset: LAND + (1 - LAND) / 2, easing: EASE_PRESS },
          { transform: `translateY(0px) ${rest} scale(1)`, filter: SHADOW_REST },
        ],
        { duration: DROP },
      ).onfinish = () => {
        stamp._falling = false;
      };
      for (const el of below) {
        // The pile gives a little under the impact; a stamp still in the air keeps its own animation.
        if (el._falling) continue;
        const r = el.style.transform;
        el.animate([{ transform: `${r} scale(1)` }, { transform: `${r} scale(0.985)` }, { transform: `${r} scale(1)` }], {
          duration: 200,
          delay: DROP * LAND,
          easing: "ease-out",
        });
      }
      later(trim, DROP * LAND);
    });
  }

  // ---- Selection and autoplay ----
  function select(i: number) {
    if (i === active) return;
    const from = active;
    active = i;
    paint();
    roll(from, i);
    drop(i);
  }
  const playable = () => inView && !hovering && !focused && !document.hidden && !reduce.matches;
  function update() {
    if (playable()) {
      if (!started) {
        started = true;
        drop(active);
      }
      if (!timer) {
        due = Date.now() + remaining;
        timer = setTimeout(advance, remaining);
      }
    } else if (timer) {
      clearTimeout(timer);
      timer = null;
      remaining = Math.max(400, due - Date.now());
    }
  }
  function advance() {
    timer = null;
    remaining = DURATION;
    select((active + 1) % n);
    update();
  }
  function restart() {
    if (timer) clearTimeout(timer);
    timer = null;
    remaining = DURATION;
    update();
  }

  // ---- Setup ----
  const onClicks = buttons.map((button, i) => {
    const onClick = () => {
      if (i !== active) {
        select(i);
        restart();
      }
    };
    button.addEventListener("click", onClick);
    return onClick;
  });
  const shown = templates.map((template) => template.style.display);
  for (const template of templates) template.style.display = "none";
  list.dataset.wheel = "";
  measure();
  paint();
  place();
  if (reduce.matches) {
    started = true;
    drop(active);
  }

  const onEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      hovering = true;
      update();
    }
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      hovering = false;
      update();
    }
  };
  const onFocusIn = (e: FocusEvent) => {
    focused = (e.target as Element).matches(":focus-visible");
    update();
  };
  const onFocusOut = (e: FocusEvent) => {
    if (!list.contains(e.relatedTarget as Node | null)) {
      focused = false;
      update();
    }
  };
  const onMotionChange = () => {
    place();
    update();
  };
  let frame = 0;
  let width = window.innerWidth;
  const onResize = () => {
    // Width only: mobile URL bars resize the height.
    if (window.innerWidth === width) return;
    width = window.innerWidth;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      measure();
      place();
    });
  };
  list.addEventListener("pointerenter", onEnter);
  list.addEventListener("pointerleave", onLeave);
  list.addEventListener("focusin", onFocusIn);
  list.addEventListener("focusout", onFocusOut);
  document.addEventListener("visibilitychange", update);
  reduce.addEventListener("change", onMotionChange);
  window.addEventListener("resize", onResize);

  // Fetch the stamp art a viewport ahead, so the first drop doesn't wait on the network.
  const warm = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      warm.disconnect();
      for (const template of templates) {
        const img = new window.Image();
        img.sizes = template.sizes;
        img.srcset = template.srcset;
        img.src = template.src;
      }
    },
    { rootMargin: "100% 0px" },
  );
  warm.observe(row);
  const seen = new IntersectionObserver(
    ([entry]) => {
      inView = entry.intersectionRatio >= 0.34;
      update();
    },
    { threshold: [0, 0.35] },
  );
  seen.observe(row);

  return () => {
    if (timer) clearTimeout(timer);
    timeouts.forEach(clearTimeout);
    cancelAnimationFrame(frame);
    warm.disconnect();
    seen.disconnect();
    buttons.forEach((button, i) => button.removeEventListener("click", onClicks[i]));
    list.removeEventListener("pointerenter", onEnter);
    list.removeEventListener("pointerleave", onLeave);
    list.removeEventListener("focusin", onFocusIn);
    list.removeEventListener("focusout", onFocusOut);
    document.removeEventListener("visibilitychange", update);
    reduce.removeEventListener("change", onMotionChange);
    window.removeEventListener("resize", onResize);
    pile.replaceChildren();
    templates.forEach((template, i) => (template.style.display = shown[i]));
    items.forEach(cancelRoll);
  };
}

/**
 * The stamp panel and the steps wheel of the managed-launch row. Rendered
 * inside the row's positioning box, so both keep their Figma placement.
 * `stamps` holds one stamp per step, or a single stamp every step drops.
 * The Managed Launch page's Journey row passes its own steps, stamp and label, and a `textScale`
 * that sets its longer one-line steps smaller so they stay inside the page.
 */
export function LaunchWheel({
  steps = homeSteps,
  stamps = homeStamps,
  label = "How we launch your concierge",
  textScale = 1,
}: {
  steps?: readonly string[];
  stamps?: readonly StaticImageData[];
  label?: string;
  textScale?: number;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const pileRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLImageElement[]>([]);
  // The still frame shows the middle (active) step's stamp.
  const still = Math.floor(steps.length / 2) % stamps.length;

  useEffect(() => {
    const row = listRef.current?.parentElement;
    const list = listRef.current;
    const pile = pileRef.current;
    const templates = templatesRef.current.filter(Boolean);
    if (!row || !list || !pile || !templates.length) return;
    return startWheel(row, list, pile, templates);
  }, []);

  return (
    <>
      {/* Aubergine damask tile; stamps drop onto it as the steps advance. */}
      {/* Drawn at 316 × 310 and zoomed to its box: the grid's middle column, or up to 316px when stacked. */}
      <div className="@container order-1 w-[316px] max-w-full lg:order-none lg:mt-[7.695%] lg:w-full">
      <div
        aria-hidden
        className="relative h-[310px] w-[316px] overflow-clip bg-[#462160] scale-to-container [--fit-width:316px]"
      >
        <Image
          src={panelTexture}
          alt=""
          sizes="295px"
          className="absolute top-[9.41px] left-[10.61px] h-[291.179px] w-[294.777px] max-w-none"
        />
        {studs.map((pos) => (
          <Image key={`${pos.left}-${pos.top}`} src={stud} alt="" className="absolute size-2" style={pos} />
        ))}
        {/* The still frame's stamp, plus the hidden rest; the wheel keeps them as templates for the stamps it drops. */}
        {stamps.map((stamp, i) => (
          <Image
            key={i}
            ref={(el) => {
              if (el) templatesRef.current[i] = el;
            }}
            src={stamp}
            alt=""
            sizes="99px"
            style={i === still ? undefined : { display: "none" }}
            className="absolute top-[34.677%] left-[34.415%] block h-auto w-[31.171%] max-w-none drop-shadow-[0_2px_4px_rgba(24,8,36,0.35)]"
          />
        ))}
        <div ref={pileRef} className="absolute inset-0" />
      </div>
      </div>

      <ol
        ref={listRef}
        aria-label={label}
        style={{ "--wheel-scale": textScale } as CSSProperties}
        className="group/wheel order-2 flex flex-col items-center gap-[0.1462em] text-center font-serif text-[length:calc(var(--h4-size)*var(--wheel-scale,1))] leading-[1.1] lg:order-none lg:mt-[11.954%] lg:ml-[14.315%] lg:items-start lg:text-left lg:text-[length:calc(min(2.5rem,3.125vw_-_0.3125rem)*var(--wheel-scale,1))] data-[wheel]:[mask-image:linear-gradient(to_bottom,transparent_0,rgba(0,0,0,0.667)_1.1em,#000_1.2462em,#000_calc(100%_-_1.2462em),rgba(0,0,0,0.667)_calc(100%_-_1.1em),transparent_100%)]"
      >
        {steps.map((step, i) => (
          <li
            key={step}
            data-step
            data-state={stillState(i, steps.length)}
            className="group/step font-extralight tracking-[-0.05em] whitespace-nowrap text-ink group-data-[wheel]/wheel:transition-[color,opacity,letter-spacing] group-data-[wheel]/wheel:duration-[330ms] group-data-[wheel]/wheel:ease-[ease] motion-reduce:transition-none data-[state=active]:font-light data-[state=active]:tracking-[-0.04em] data-[state=active]:text-[#002916] data-[state=fade-bottom]:bg-[linear-gradient(0deg,rgba(20,20,20,0)_0.815%,rgba(20,20,20,0.2)_81.289%)] data-[state=fade-bottom]:bg-clip-text data-[state=fade-bottom]:text-transparent data-[state=fade-top]:bg-[linear-gradient(0deg,rgba(20,20,20,0.2)_0.432%,rgba(20,20,20,0)_93.695%)] data-[state=fade-top]:bg-clip-text data-[state=fade-top]:text-transparent data-[state=muted]:opacity-30 data-[state=muted]:group-data-[wheel]/wheel:hover:opacity-60"
          >
            <button
              type="button"
              aria-current={stillState(i, steps.length) === "active" ? "step" : undefined}
              className="cursor-pointer [-webkit-tap-highlight-color:transparent] group-data-[state=active]/step:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
            >
              {step}
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
