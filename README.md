# Mercy Family Clinic

Astro + React islands + Tailwind CSS v4 + Motion (Framer Motion). Fonts: Poppins (headings), Inter (body).

## Commands
- `npm install`      first time only
- `npm run dev`      dev server at localhost:4321
- `npm run build`    type-check and build to `dist/`
- `npm run preview`  preview the build

## Where to edit things
- `src/lib/site.ts`   phone, address, hours, services, timeline, reviews, image ids (one place for all content)
- `src/lib/blog.ts`   blog posts come from the WordPress site; sample posts show until real posts exist
- `src/styles/global.css`  colors (theme tokens), buttons, flip cards, parallax
- `src/components/sections/`  one file per homepage section
- `src/components/islands/`   React + Motion parts (Reveal, Timeline, ContactForm). Only these ship JavaScript.

## Contact form
Copy `.env.example` to `.env` and set `PUBLIC_FORM_ENDPOINT` (for example a Formspree URL that emails the clinic).
Without it the form runs in demo mode and sends nothing.

## Images
- `public/images/logo.png`    official logo (shown white on the hero, original colors once you scroll)
- `public/images/Doctor.png`  Dr. Izzy
- `public/images/weight-loss.png`  optional: save the transparent weight loss model PNG here. Until then the site loads it from the WordPress site.

## To do before launch
- Set the form endpoint
- Replace static reviews with the real ones the clinic wants to show
- Publish real blog posts in WordPress

## Animations, cookies and legal pages
- Scroll reveals: add `data-reveal` (or `data-reveal="left|right|zoom|fade"`) to any element, or `data-stagger="90"` on a parent to reveal its children one by one. Code: `src/scripts/motion.ts` and the "Scroll reveal" block in `src/styles/global.css`.
- Hover helpers: `.lift` (card rises), `.hover-pop` + `.icon-pop` (icon badge pops), `.hover-shift`, `.link-slide`, `.link-draw`.
- Cookie consent: `src/components/CookieConsent.astro` and `src/lib/consent.ts`. One cookie (`mfc_consent`). The Google map loads only after consent. To add analytics later, add a field in `consent.ts`, a switch in the banner, and load the script only when it is allowed.
- Legal pages: `src/pages/privacy-policy.astro`, `terms-and-conditions.astro`, `accessibility.astro` (layout: `src/components/LegalPage.astro`). Change the "updated" date when you edit the text.
- TO DO before launch: have a lawyer review the legal pages, add the clinic's Notice of Privacy Practices, confirm the 2-business-day reply promise in the Accessibility page, and update the Privacy Policy if you add analytics, a new form service or other third-party tools.
