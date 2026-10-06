import { site, unsplash } from "./site";

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href?: string; // missing = sample post
  sample?: boolean;
}

const samples: Post[] = [
  {
    title: "What to expect from a medical weight loss program",
    excerpt:
      "A simple look at how medically supervised weight loss works, and who it may help.",
    date: "2026-09-12",
    image: unsplash("1571019613454-1cb2f99b2d8b", 800, 560),
    sample: true,
  },
  {
    title: "Small habits that help keep blood pressure in check",
    excerpt:
      "Easy daily steps that support a healthy heart, alongside regular visits to your doctor.",
    date: "2026-08-20",
    image: unsplash("1530026405186-ed1f139313f8", 800, 560),
    sample: true,
  },
  {
    title: "Eating well when you live with diabetes",
    excerpt:
      "Practical food ideas that make blood sugar easier to manage, one meal at a time.",
    date: "2026-07-30",
    image: unsplash("1512621776951-a57141f2eefd", 800, 560),
    sample: true,
  },
];

const strip = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;|\[&hellip;\]/g, "…")
    .replace(/&#8217;/g, "’")
    .replace(/&#8211;/g, "–")
    .replace(/&amp;/g, "&")
    .trim();

/** Latest posts from WordPress. Falls back to sample posts if WP has none yet. */
export async function getPosts(count = 3): Promise<Post[]> {
  let live: Post[] = [];
  try {
    const res = await fetch(
      `${site.wordpress}/wp-json/wp/v2/posts?per_page=${count + 2}&_embed=1`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (res.ok) {
      const data = (await res.json()) as any[];
      live = data
        .filter((p) => p.slug !== "hello-world")
        .map((p, i) => ({
          title: strip(p.title?.rendered ?? ""),
          excerpt: strip(p.excerpt?.rendered ?? ""),
          date: p.date,
          href: p.link,
          image:
            p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
            samples[i % samples.length].image,
        }));
    }
  } catch {
    // WordPress not reachable: use samples
  }
  return [...live, ...samples].slice(0, count);
}
