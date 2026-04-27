import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import { oswald } from "@/components/fixture/fixtureStripShared";
import { SectionHeader } from "@/components/SectionHeader";
import { formatResultsPageDate } from "@/lib/resultsDisplay";
import { sortedNewsDesc } from "@/lib/newsDisplay";

function SpotlightFeature({ item }: { item: NewsItem }) {
  return (
    <div className="grid grid-cols-1 overflow-hidden border border-slate-200/90 bg-white lg:grid-cols-2">
      <Link href={`/news/${item.slug}`} className="relative block aspect-[16/10] min-h-[200px] bg-slate-200 sm:min-h-[240px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </Link>
      <div className="flex flex-col justify-center border-t border-slate-200/90 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-10">
        <h3 className={`${oswald.className} text-2xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[1.65rem]`}>
          <Link href={`/news/${item.slug}`} className="transition hover:text-[#113278]">
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-slate-600 sm:text-[15px]">{item.excerpt}</p>
        <p className="mt-4 font-sans text-sm font-semibold uppercase tracking-wide text-[#113278] transition hover:text-[#1a448f]">
          <Link href={`/news/${item.slug}`} className="inline-flex items-center gap-1">
            Read <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

function UpdateGridItem({ item }: { item: NewsItem }) {
  return (
    <li className="min-w-0">
      <Link href={`/news/${item.slug}`} className="group block">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
          {formatResultsPageDate(item.date)}
        </p>
        <h4 className={`${oswald.className} mt-2 text-lg font-bold uppercase leading-snug tracking-tight text-slate-900 transition group-hover:text-[#113278] sm:text-xl`}>
          {item.title}
        </h4>
        <p className="mt-1 line-clamp-1 font-sans text-sm leading-snug text-slate-600">{item.excerpt}</p>
        <p className="mt-4 font-sans text-base font-semibold text-[#113278] transition group-hover:translate-x-0.5" aria-hidden>
          →
        </p>
      </Link>
    </li>
  );
}

interface NewsPageViewProps {
  news: NewsItem[];
  stableNotes: string[];
}

export function NewsPageView({ news: items, stableNotes }: NewsPageViewProps) {
  const sorted = sortedNewsDesc(items);
  const lead = sorted[0] ?? null;
  const updates = sorted.slice(1);

  return (
    <div className="space-y-0 pb-16 sm:pb-20 lg:pb-24 xl:pb-[100px]">
      <section className="pt-2 pb-10 sm:pb-12 lg:pb-14">
        <SectionHeader
          variant="fixture"
          kicker="Flying Dutchmen"
          title="News"
          description="Campaign updates, placements, and stable activity."
        />
        {lead ? (
          <div className="relative z-0 mt-10 sm:mt-12 lg:mt-14">
            <SpotlightFeature item={lead} />
          </div>
        ) : null}
      </section>

      {updates.length > 0 ? (
        <section className="border-t border-slate-200/80 py-10 sm:py-12 lg:py-14">
          <SectionHeader variant="fixture" kicker="Updates" title="Latest updates" />
          <ul className="relative z-0 mx-auto mt-10 grid w-full max-w-[1280px] list-none grid-cols-1 justify-items-stretch gap-x-10 gap-y-14 sm:mt-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:mt-14 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
            {updates.map((item) => (
              <UpdateGridItem key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ) : null}

      {stableNotes.length > 0 ? (
        <section className="border-t border-slate-200/80 py-10 sm:py-12 lg:py-14">
          <SectionHeader variant="fixture" kicker="Operations" title="Stable notes" />
          <ul className="mt-8 max-w-3xl space-y-0 sm:mt-10">
            {stableNotes.map((line, i) => (
              <li
                key={i}
                className="border-b border-slate-200/80 py-3.5 font-sans text-sm leading-relaxed text-slate-700 first:pt-0 last:border-b-0 sm:text-[15px]"
              >
                {line}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
