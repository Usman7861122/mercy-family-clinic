// Scroll animations used across the site: reveal on scroll, reading progress, back to top.
// Everything switches off with "reduce motion" (the reveal CSS also checks it).

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Stagger: <div data-stagger="90"> reveals its children one after another.
document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
  const step = Number(parent.dataset.stagger) || 80;
  Array.from(parent.children).forEach((child, i) => {
    const el = child as HTMLElement;
    if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", parent.dataset.revealType ?? "");
    el.style.setProperty("--d", `${Math.min(i, 8) * step}ms`);
  });
});

// 2. Reveal when scrolled into view.
const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (reduce || !("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  targets.forEach((el) => io.observe(el));
}

// 3. Reading progress bar + back-to-top button.
const bar = document.getElementById("scroll-progress");
const toTop = document.getElementById("to-top");
let ticking = false;

const update = () => {
  ticking = false;
  const root = document.documentElement;
  const max = root.scrollHeight - root.clientHeight;
  const y = window.scrollY;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  toTop?.classList.toggle("is-visible", y > 700);
};

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  },
  { passive: true },
);
window.addEventListener("resize", update, { passive: true });
update();

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  document.getElementById("main")?.focus({ preventScroll: true });
});
