import { useEffect, useRef, useState } from "react";

/**
 * Text that writes itself, then inks in.
 * Adapted for Mercy Family Clinic from the "handwriting-text" component:
 *  - opentype.js is installed as a package and loaded on demand (no third-party CDN request).
 *  - the font is self-hosted in /public/fonts (no outside font request).
 *  - every word in a cycle uses the SAME box height, so letters keep one size from word to word.
 *  - with "reduce motion" on, it shows plain static text of the first word.
 *
 * How it works: the font is parsed into outlines. Each outline (contour) is its own <path>, so a
 * stroke-dash animation can draw them one after another like a pen. One filled copy of the whole
 * word fades in underneath to give it weight (counters like the hole in an "e" need one path).
 * If the font fails to load, the text stays as plain readable text.
 *
 * Colour comes from `currentColor`, so `className="text-brand-600"` styles it.
 */

const DEFAULT_FONT_URL = "/fonts/Sacramento-Regular.ttf";

export interface HandwritingTextProps {
  /** A single phrase to write. Ignored when `words` is given. */
  text?: string;
  /** Cycle through these, rewriting on each change. */
  words?: string[];
  /** Milliseconds each word is held before the next one starts. */
  interval?: number;
  /** URL of a .ttf or .otf. Must be same-origin or CORS-readable. */
  fontUrl?: string;
  /** Seconds for the pen to cross the whole word. */
  duration?: number;
  /** Seconds before the pen starts. */
  delay?: number;
  /** Stroke weight, in units of a 100px em. */
  strokeWidth?: number;
  /** Ink the letters in once drawn. Set false to leave them as outlines. */
  fill?: boolean;
  /** CSS height of the rendered line; width follows the glyphs. */
  height?: string;
  className?: string;
}

type Geometry = {
  full: string;
  contours: string[];
  /** left edge and width follow the word; top and height are shared by every word */
  x: number;
  y: number;
  w: number;
  h: number;
};

/* eslint-disable @typescript-eslint/no-explicit-any */

// One fetch and one parse per font URL, shared by every instance on the page.
const fontCache = new Map<string, Promise<any>>();

function loadFont(url: string): Promise<any> {
  let pending = fontCache.get(url);
  if (!pending) {
    pending = Promise.all([
      import("opentype.js").then((mod: any) => mod.default ?? mod),
      fetch(url).then((res) => {
        if (!res.ok) throw new Error(`Font request failed: ${res.status}`);
        return res.arrayBuffer();
      }),
    ]).then(([lib, buffer]) => (lib.parse ?? lib.default?.parse)(buffer));
    fontCache.set(url, pending);
  }
  return pending;
}

const EM = 100; // arbitrary: the viewBox normalises whatever we pick

const FADE_MS = 900;

export default function HandwritingText({
  text,
  words,
  interval = 4400,
  fontUrl = DEFAULT_FONT_URL,
  duration = 1.5,
  delay = 0.05,
  strokeWidth = 1.2,
  fill = true,
  height = "1.4em",
  className,
}: HandwritingTextProps) {
  const list = words && words.length > 0 ? words : [text ?? ""];
  const cycle = list.length > 1;
  const [index, setIndex] = useState(0);
  const current = list[index % list.length];

  const [reduce, setReduce] = useState(false);
  const [failed, setFailed] = useState(false);
  const [font, setFont] = useState<any>(null);
  const [geom, setGeom] = useState<Geometry | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const firstRun = useRef(true);
  const [lengths, setLengths] = useState<number[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!cycle || reduce) return undefined;
    // Hold the finished word, fade it out slowly, then write the next one.
    const hold = Math.max(500, interval - FADE_MS);
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const run = () => {
      t1 = setTimeout(() => {
        setLeaving(true);
        t2 = setTimeout(() => {
          setLeaving(false);
          setIndex((i) => i + 1);
          run();
        }, FADE_MS);
      }, hold + (firstRun.current ? 800 : 0));
      firstRun.current = false;
    };
    run();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [cycle, interval, reduce]);

  useEffect(() => {
    if (reduce) return undefined;
    let cancelled = false;
    loadFont(fontUrl)
      .then((f) => { if (!cancelled) setFont(f); })
      .catch(() => setFailed(true)); // falls back to plain text below
    return () => { cancelled = true; };
  }, [fontUrl, reduce]);

  useEffect(() => {
    if (!font || !current) return;
    // One shared top and bottom for every word, so the letters keep the same size.
    let top = Infinity;
    let bottom = -Infinity;
    for (const w of list) {
      const b = font.getPath(w, 0, EM, EM).getBoundingBox();
      top = Math.min(top, b.y1);
      bottom = Math.max(bottom, b.y2);
    }
    const path = font.getPath(current, 0, EM, EM);
    const box = path.getBoundingBox();
    const pad = EM * 0.12; // room for the stroke
    const full = path.toPathData(2);
    setGeom({
      full,
      // Split on the moveto that opens each contour, keeping the M with its segment.
      contours: full.split(/(?=M)/).filter((d: string) => d.trim().length > 1),
      x: box.x1 - pad,
      y: top - pad,
      w: box.x2 - box.x1 + pad * 2,
      h: bottom - top + pad * 2,
    });
    setDrawn(false);
    setLengths([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [font, current]);

  useEffect(() => {
    if (!geom) return undefined;
    setLengths(
      pathRefs.current
        .slice(0, geom.contours.length)
        .map((el) => (el ? el.getTotalLength() : 0)),
    );
    // Two frames: the first commits the full-length offsets with no transition, the
    // second enables it and moves to zero. Both in one commit leaves nothing to animate.
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setDrawn(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [geom]);

  // Before the font resolves, if it never does, or with "reduce motion": plain readable text.
  if (reduce || !geom) {
    // While the font loads (JavaScript on), the plain text stays invisible so there is no flash of the wrong font.
    // If the font fails, or with "reduce motion", it shows as normal text.
    const waiting = !reduce && !failed;
    return <span className={[className, waiting ? "hw-pending" : ""].filter(Boolean).join(" ")}>{reduce ? list[0] : current}</span>;
  }

  const count = Math.max(1, geom.contours.length);
  // The start delay is only for the very first word; later words begin right away.
  const lead = index === 0 ? delay : 0.05;

  return (
    <svg
      key={current}
      viewBox={`${geom.x} ${geom.y} ${geom.w} ${geom.h}`}
      role="img"
      aria-label={current}
      className={["inline-block align-middle", className].filter(Boolean).join(" ")}
      style={{
        height,
        width: `calc(${height} * ${(geom.w / geom.h).toFixed(4)})`,
        overflow: "visible",
        opacity: leaving ? 0 : 1,
        transition: leaving ? `opacity ${FADE_MS}ms ease-in-out` : "none",
      }}
    >
      {fill && (
        <path
          d={geom.full}
          fill="currentColor"
          stroke="none"
          style={{
            opacity: drawn ? 1 : 0,
            transition: drawn
              ? `opacity 0.45s ease-out ${(lead + duration * 0.72).toFixed(3)}s`
              : "none",
          }}
        />
      )}
      {geom.contours.map((d, i) => {
        const length = lengths[i] || 0;
        // Contours overlap slightly so the stroke reads as one continuous movement.
        const each = (duration / count) * 2.4;
        const start = lead + (i / count) * duration;
        return (
          <path
            key={i}
            ref={(el) => { pathRefs.current[i] = el; }}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: length || 1,
              strokeDashoffset: drawn ? 0 : length || 1,
              transition: drawn
                ? `stroke-dashoffset ${each.toFixed(3)}s ease-out ${start.toFixed(3)}s`
                : "none",
            }}
          />
        );
      })}
    </svg>
  );
}
