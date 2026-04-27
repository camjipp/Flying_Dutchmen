import Link from "next/link";
import type { SpotlightItem } from "@/lib/types";
import { SpotlightCoverageCarousel } from "@/components/spotlight/SpotlightCoverageCarousel";
import { SpotlightHeroCard } from "@/components/spotlight/SpotlightHeroCard";
import { oswald, STRIP_BG } from "@/components/fixture/fixtureStripShared";

interface InTheSpotlightProps {
  items: SpotlightItem[];
}

function parseTweetStatusPath(href: string): string | null {
  try {
    const u = new URL(href);
    if (!/^(www\.)?(twitter\.com|x\.com)$/i.test(u.hostname)) return null;
    const m = u.pathname.match(/^\/([^/]+)\/status\/(\d+)/);
    if (!m) return null;
    return `${m[1]}/status/${m[2]}`;
  } catch {
    return null;
  }
}

async function resolveSpotlightImageSrc(item: SpotlightItem): Promise<string> {
  if (item.kind === "instagram") {
    try {
      const params = new URLSearchParams({ url: item.href, format: "json" });
      const res = await fetch(`https://api.instagram.com/oembed?${params.toString()}`, {
        next: { revalidate: 86_400 },
        headers: {
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      if (!res.ok) return item.image;
      const data = (await res.json()) as { thumbnail_url?: string };
      if (data.thumbnail_url && /^https?:\/\//i.test(data.thumbnail_url)) {
        return data.thumbnail_url;
      }
    } catch {
      /* use fallback */
    }
    return item.image;
  }

  if (item.kind === "x") {
    const path = parseTweetStatusPath(item.href);
    if (!path) return item.image;
    try {
      const res = await fetch(`https://api.fxtwitter.com/${path}`, {
        next: { revalidate: 86_400 },
        headers: { Accept: "application/json" }
      });
      if (!res.ok) return item.image;
      const body = (await res.json()) as {
        tweet?: { media?: { all?: Array<{ type?: string; url?: string; thumbnail_url?: string }> } };
      };
      const first = body.tweet?.media?.all?.[0];
      const thumb = first?.type === "video" || first?.type === "animated_gif" ? first.thumbnail_url : first?.url;
      if (thumb && /^https?:\/\//i.test(thumb)) return thumb;
    } catch {
      /* use fallback */
    }
    return item.image;
  }

  return item.image;
}

/** Tier 1: article left, feature video right; fallbacks preserve first two features if kinds differ */
function resolveHeroPair(features: SpotlightItem[]): { left: SpotlightItem | null; right: SpotlightItem | null } {
  const article = features.find((f) => f.kind === "article") ?? null;
  const video = features.find((f) => f.kind === "youtube") ?? null;
  if (article && video && article.id !== video.id) {
    return { left: article, right: video };
  }
  if (features.length >= 2) {
    return { left: features[0], right: features[1] };
  }
  if (features.length === 1) {
    return { left: features[0], right: null };
  }
  return { left: null, right: null };
}

export async function InTheSpotlight({ items }: InTheSpotlightProps) {
  const features = items.filter((i) => i.tier === "feature");
  const support = items.filter((i) => i.tier === "support");
  const supportRail = support.slice(0, 4);
  const { left: heroArticle, right: heroVideo } = resolveHeroPair(features);

  const resolvedSrc = new Map<string, string>();
  await Promise.all(
    items.map(async (item) => {
      resolvedSrc.set(item.id, await resolveSpotlightImageSrc(item));
    })
  );

  if (!heroArticle && !heroVideo && supportRail.length === 0) {
    return null;
  }

  const hasHero = Boolean(heroArticle || heroVideo);

  return (
    <section
      aria-labelledby="spotlight-heading"
      className={`${oswald.className} w-full border-t border-white/10 py-8 text-white sm:py-10`}
      style={{ background: STRIP_BG }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8cce8]">Media</p>
            <h2
              id="spotlight-heading"
              className="mt-1 text-xl font-bold uppercase leading-none tracking-tight text-white sm:text-2xl"
            >
              In the Spotlight
            </h2>
            <p className="mt-1.5 max-w-2xl font-sans text-[13px] font-normal leading-snug text-[#c9d6ea] sm:text-sm">
              Curated coverage, features, and highlights
            </p>
          </div>
          <Link
            href="/news"
            className="shrink-0 text-sm font-semibold uppercase tracking-wide text-white transition hover:text-white/85"
          >
            View all coverage →
          </Link>
        </header>

        {hasHero ? (
          <div
            className={`grid grid-cols-1 gap-5 sm:gap-6 md:gap-7 ${
              heroArticle && heroVideo ? "md:grid-cols-2" : "md:max-w-4xl"
            }`}
          >
            {heroArticle ? <SpotlightHeroCard item={heroArticle} imageSrc={resolvedSrc.get(heroArticle.id)!} /> : null}
            {heroVideo ? <SpotlightHeroCard item={heroVideo} imageSrc={resolvedSrc.get(heroVideo.id)!} /> : null}
          </div>
        ) : null}

        {supportRail.length > 0 ? (
          <SpotlightCoverageCarousel
            className={hasHero ? "mt-5 sm:mt-6" : ""}
            entries={supportRail.map((item) => ({
              item,
              imageSrc: resolvedSrc.get(item.id)!
            }))}
          />
        ) : null}
      </div>
    </section>
  );
}
