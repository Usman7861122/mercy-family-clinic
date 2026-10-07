import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowRight } from "lucide-react";

interface Item {
  year: string;
  title: string;
  text: string;
}

interface Props {
  items: Item[];
  image: string;
  imageAlt: string;
  badge: string;
  /** Intro copy rendered by Astro. It slides in as the first panel. */
  children?: ReactNode;
}

/**
 * Horizontal "Why Mercy" story.
 * The section pins to the screen. Scrolling down slides the track sideways,
 * the line draws itself, and each milestone grows its stem and reveals its text.
 * With reduced motion there is no pin: the track becomes a normal sideways scroller.
 */
export default function Timeline({ items, image, imageAlt, badge, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const shiftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const slot = slotRef.current;
    const intro = introRef.current;
    const shift = shiftRef.current;
    if (!section || !pin || !track || !slot || !intro || !shift) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: gsap.Context | undefined;
    let splits: SplitText[] = [];
    let lastWidth = window.innerWidth;
    let timer: number | undefined;
    let disposed = false;
    let unlisten: (() => void) | undefined;

    const teardown = () => {
      unlisten?.();
      unlisten = undefined;
      ctx?.revert();
      ctx = undefined;
      gsap.set([track, shift], { clearProps: "transform" });
      splits.forEach((s) => s.revert());
      splits = [];
    };

    const build = () => {
      teardown();

      if (reduce) {
        section.style.height = "auto";
        pin.dataset.static = "true";
        pin.tabIndex = 0;
        return;
      }
      pin.dataset.static = "false";
      pin.removeAttribute("tabindex");

      const vw = window.innerWidth;
      const vh = pin.clientHeight;
      const maxScroll = Math.max(0, track.offsetWidth - vw);
      if (maxScroll === 0) return;

      // On wide screens the text and photo start together in the middle of the screen.
      // A short first stretch of scrolling moves them to the left; then the row slides sideways.
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const preroll = wide ? Math.round(vh * 0.6) : 0;

      // A little extra scroll makes the slide feel calm, not rushed.
      section.style.height = `${Math.round(maxScroll * 1.12 + vh + preroll)}px`;

      const lineEl = track.querySelector<HTMLElement>("[data-line]");
      const tipEl = track.querySelector<HTMLElement>("[data-tip]");
      const timelineEl = track.querySelector<HTMLElement>("[data-timeline]");
      const barEl = pin.querySelector<HTMLElement>("[data-bar]");
      const hintEl = pin.querySelector<HTMLElement>("[data-hint]");
      const itemEls = gsap.utils.toArray<HTMLElement>("[data-item]", track);
      if (!lineEl || !timelineEl) return;

      ctx = gsap.context(() => {
        // Measure while the track is still at x = 0.
        const tl0 = timelineEl.getBoundingClientRect();
        const tlLeft = tl0.left;
        const tlWidth = tl0.width;
        const rightGap = vw * 0.08;
        const pct = (n: number) => (n / vw) * 100;
        const geo = itemEls.map((el) => el.getBoundingClientRect().left);

        gsap.set(lineEl, { scaleX: 0, transformOrigin: "left center" });
        if (tipEl) gsap.set(tipEl, { x: 0, opacity: 0 });

        const updateLine = (p: number) => {
          const x = -maxScroll * p;
          const left = tlLeft + x;
          // The tip sits near the middle of the screen, then runs to the end.
          const target = vw * 0.56 + (vw - rightGap - vw * 0.56) * p;
          const s = gsap.utils.clamp(0, 1, (target - left) / tlWidth);
          gsap.set(lineEl, { scaleX: s });
          if (tipEl) gsap.set(tipEl, { x: s * tlWidth, opacity: s > 0.002 && s < 0.999 ? 1 : 0 });
        };

        if (wide) {
          // Centre the intro + photo pair, using where they sit at x = 0.
          const a = intro.getBoundingClientRect();
          const b = slot.getBoundingClientRect();
          const x0 = Math.max(0, (vw - (b.right - a.left)) / 2 - a.left);
          const ease = gsap.parseEase("power2.inOut");
          const apply = (p: number) => {
            gsap.set(shift, { x: x0 * (1 - ease(p)) });
            if (hintEl) hintEl.style.opacity = String(Math.max(0, 1 - p * 5));
          };
          apply(0);
          const intro1 = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `top+=${preroll} top`,
            scrub: true,
            onUpdate: (self) => apply(self.progress),
          });
          // While ScrollTrigger measures the items, the row must sit at its true spot,
          // not shifted to the middle. Otherwise every reveal ends too late.
          const park = () => gsap.set(shift, { x: 0 });
          const restore = () => apply(intro1.progress);
          ScrollTrigger.addEventListener("refreshInit", park);
          ScrollTrigger.addEventListener("refresh", restore);
          unlisten = () => {
            ScrollTrigger.removeEventListener("refreshInit", park);
            ScrollTrigger.removeEventListener("refresh", restore);
          };
        }

        const slide = gsap.to(track, {
          x: -maxScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${preroll} top`,
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
          onUpdate(this: gsap.core.Tween) {
            const p = this.progress();
            updateLine(p);
            if (barEl) gsap.set(barEl, { scaleX: p });
            if (!wide && hintEl) hintEl.style.opacity = String(Math.max(0, 1 - p * 18));
          },
        });
        updateLine(0);

        itemEls.forEach((el, i) => {
          const stem = el.querySelector<HTMLElement>("[data-stem]");
          const dot = el.querySelector<HTMLElement>("[data-dot]");
          const label = el.querySelector<HTMLElement>("[data-label]");
          const title = el.querySelector<HTMLElement>("[data-title]");
          const text = el.querySelector<HTMLElement>("[data-text]");
          if (!stem || !dot || !label || !title || !text) return;

          const fromTop = el.dataset.side === "top";
          const startPct = Math.min(94, pct(geo[i]));
          const finalPct = pct(geo[i] - maxScroll);
          const endPct = Math.max(finalPct, 52);

          const sTitle = new SplitText(title, { type: "lines", mask: "lines" });
          const sText = new SplitText(text, { type: "lines", mask: "lines" });
          splits.push(sTitle, sText);

          // If the item barely moves (very short track), just show it.
          if (endPct > startPct - 10) return;

          gsap.set(stem, { scaleY: 0, transformOrigin: fromTop ? "bottom center" : "top center" });
          gsap.set(dot, { scale: 0 });
          gsap.set(label, { autoAlpha: 0, y: 10 });
          gsap.set([sTitle.lines, sText.lines], { yPercent: 115 });

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: el,
                containerAnimation: slide,
                start: `left ${startPct}%`,
                end: `left ${endPct}%`,
                scrub: true,
              },
            })
            .to(stem, { scaleY: 1, duration: 0.4 })
            .to(dot, { scale: 1, duration: 0.3, ease: "back.out(2)" }, 0.12)
            .to(label, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.3)
            .to(sTitle.lines, { yPercent: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }, 0.38)
            .to(sText.lines, { yPercent: 0, duration: 0.55, stagger: 0.05, ease: "power2.out" }, 0.5);
        });
      }, section);

      ScrollTrigger.refresh();
    };

    const start = () => {
      if (disposed) return;
      build();
    };
    if (document.fonts?.ready) document.fonts.ready.then(start);
    else start();

    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        // Phones fire resize when the address bar moves. Only rebuild on a real width change.
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        build();
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      teardown();
    };
  }, []);

  return (
    <section id="why" ref={sectionRef} className="relative h-[330vh]" aria-label="Why Mercy Family Clinic">
      <div
        ref={pinRef}
        data-static="false"
        role="group"
        className="group sticky top-0 h-svh overflow-hidden data-[static=true]:static data-[static=true]:h-auto data-[static=true]:overflow-x-auto data-[static=true]:py-10"
      >
        <div ref={shiftRef} className="h-full w-max group-data-[static=true]:h-auto">
        <div
          ref={trackRef}
          className="flex h-full w-max items-center gap-12 pl-6 pr-[8vw] pt-20 will-change-transform sm:gap-20 sm:pl-[8vw] group-data-[static=true]:h-auto group-data-[static=true]:pt-0"
        >
          {/* 1. Intro copy from Astro */}
          <div ref={introRef} className="w-[min(86vw,32rem)] shrink-0">{children}</div>

          {/* 2. Photo */}
          <figure
            ref={slotRef}
            className="relative h-[min(30rem,56svh)] w-[min(20rem,62vw)] shrink-0"
          >
            <img
              src={image}
              alt={imageAlt}
              width={640}
              height={900}
              loading="lazy"
              draggable={false}
              className="h-full w-full rounded-t-[999px] rounded-b-3xl object-cover object-top shadow-xl shadow-brand-950/10"
            />
            <figcaption className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-brand-900 py-2.5 pl-3 pr-5 text-sm font-medium text-white shadow-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream">
                <img src="/images/icon-mark.png" alt="" width="107" height="126" className="h-4 w-auto" />
              </span>
              {badge}
            </figcaption>
          </figure>

          {/* 3. Timeline */}
          <div data-timeline className="relative h-[min(34rem,66svh)] shrink-0">
            {/* faint track + drawn line + moving tip */}
            <span aria-hidden="true" className="absolute left-0 right-0 top-1/2 h-px bg-brand-900/15" />
            <span
              aria-hidden="true"
              data-line
              className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-brand-500 to-brand-700 group-data-[static=true]:!scale-x-100"
            />
            <span
              aria-hidden="true"
              data-tip
              className="absolute left-0 top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-brand-700 ring-4 ring-brand-500/25 group-data-[static=true]:hidden"
            />

            <ol className="relative flex h-full">
              {items.map((item, i) => {
                const top = i % 2 === 0;
                return (
                  <li
                    key={item.year + item.title}
                    data-item
                    data-side={top ? "top" : "bottom"}
                    className="relative h-full w-[72vw] shrink-0 sm:w-[17rem]"
                  >
                    {/* stem */}
                    <span
                      aria-hidden="true"
                      data-stem
                      className={`absolute left-0 w-[2px] -translate-x-1/2 rounded-full bg-brand-600 ${
                        top ? "bottom-1/2 top-[1.1rem]" : "bottom-[1.1rem] top-1/2"
                      }`}
                    />
                    {/* dot with the clinic mark */}
                    <span
                      aria-hidden="true"
                      data-dot
                      className={`absolute left-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-700 bg-cream shadow-sm ${
                        top ? "top-0" : "bottom-0"
                      }`}
                    >
                      <img src="/images/icon-mark.png" alt="" width="107" height="126" className="h-[1.3rem] w-auto" />
                    </span>
                    {/* copy */}
                    <div
                      className={`absolute left-0 right-3 pl-8 ${top ? "top-0" : "bottom-0"}`}
                    >
                      <p
                        data-label
                        className="pt-1.5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-600"
                      >
                        {item.year}
                      </p>
                      <h3 data-title className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">
                        {item.title}
                      </h3>
                      <p data-text className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                        {item.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        </div>

        {/* progress + hint */}
        <div className="pointer-events-none absolute inset-x-6 bottom-6 group-data-[static=true]:hidden sm:inset-x-[8vw] sm:bottom-8">
          <div
            data-hint
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700"
          >
            Keep scrolling <ArrowRight className="h-4 w-4 animate-pulse" aria-hidden="true" />
          </div>
          <div className="h-px w-full bg-brand-900/15">
            <div data-bar className="h-[2px] origin-left scale-x-0 bg-brand-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
