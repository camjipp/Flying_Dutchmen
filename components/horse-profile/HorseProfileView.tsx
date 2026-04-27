import Image from "next/image";
import Link from "next/link";
import type { Horse, HorseRecentResult, RaceResult } from "@/lib/types";
import { formatHorseStatus, horseAgeType, isPlaceholderHorseImage } from "@/lib/horseDisplay";
import { NAVY, STRIP_BG, oswald } from "@/components/fixture/fixtureStripShared";
import {
  birthplaceLabel,
  careerStartsFromRecord,
  damShortName,
  damsireFromDam,
  formatProfileResultDate,
  heroMetaLine,
  registrationStateCode,
  relatedCoverageForHorse,
  type ProfileCoverageItem
} from "@/lib/horseProfileHelpers";
import type { NewsItem, SpotlightItem } from "@/lib/types";

interface HorseProfileViewProps {
  horse: Horse;
  horseResults: RaceResult[];
  spotlightItems: SpotlightItem[];
  newsItems: NewsItem[];
}

function PeriodStatsBlock({ horse }: { horse: Horse }) {
  if (!horse.periodStats2026 && !horse.periodStatsCareer) return null;
  return (
    <section className="border-t border-slate-200 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className={`${oswald.className} text-sm font-bold uppercase tracking-[0.18em] text-slate-900`}>
          Period statistics
        </h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {horse.periodStats2026 ? (
            <dl className="space-y-3 border-t border-slate-200 pt-6">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f97c9]">
                2026 (through current entry)
              </dt>
              <dd className="font-sans text-sm text-slate-700">
                <span className="font-semibold text-slate-900">{horse.periodStats2026.starts}</span> starts ·{" "}
                <span className="font-semibold text-slate-900">{horse.periodStats2026.firsts}</span> wins ·{" "}
                {horse.periodStats2026.seconds}–{horse.periodStats2026.thirds} ·{" "}
                <span className="font-semibold tabular-nums text-[#113278]">{horse.periodStats2026.earnings}</span>
              </dd>
            </dl>
          ) : null}
          {horse.periodStatsCareer ? (
            <dl className="space-y-3 border-t border-slate-200 pt-6">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f97c9]">Career (stable)</dt>
              <dd className="font-sans text-sm text-slate-700">
                <span className="font-semibold text-slate-900">{horse.periodStatsCareer.starts}</span> starts ·{" "}
                <span className="font-semibold text-slate-900">{horse.periodStatsCareer.firsts}</span> wins ·{" "}
                {horse.periodStatsCareer.seconds}–{horse.periodStatsCareer.thirds} ·{" "}
                <span className="font-semibold tabular-nums text-[#113278]">{horse.periodStatsCareer.earnings}</span>
              </dd>
            </dl>
          ) : null}
        </div>
        <p className="mt-8 text-xs text-slate-400">Figures shown for stable and promotional use.</p>
      </div>
    </section>
  );
}

function CoverageCard({ item }: { item: ProfileCoverageItem }) {
  const inner = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
      </div>
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f97c9]">{item.source}</p>
        <p className={`${oswald.className} mt-1 line-clamp-2 text-base font-bold uppercase leading-snug tracking-tight text-slate-900`}>
          {item.title}
        </p>
        <p className="mt-2 text-xs font-semibold text-[#113278]">{item.cta}</p>
      </div>
    </>
  );

  const className =
    "group flex flex-col overflow-hidden border border-slate-200/90 bg-white transition-colors duration-200 hover:border-slate-300";

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  );
}

export function HorseProfileView({ horse, horseResults, spotlightItems, newsItems }: HorseProfileViewProps) {
  const rows: HorseRecentResult[] =
    horse.recentResults.length > 0
      ? horse.recentResults
      : horseResults.map((r) => ({
          date: r.date,
          track: r.track,
          race: r.race,
          finish: r.finish
        }));

  const ageType = horseAgeType(horse);
  const stateCode = registrationStateCode(horse);
  const secondaryLine = [
    `Foaled ${horse.foaled}`,
    stateCode ?? undefined,
    ageType.toUpperCase()
  ]
    .filter(Boolean)
    .join(" · ");

  const damsire = damsireFromDam(horse.dam);
  const coverage = relatedCoverageForHorse(horse, spotlightItems, newsItems);
  const noPhoto = isPlaceholderHorseImage(horse.image);
  const cutout = horse.imagePresentation === "cutout";
  const statusLabel = formatHorseStatus(horse.status).toUpperCase();

  const factFields: { label: string; value: string }[] = [
    { label: "Full name", value: horse.name },
    { label: "Foaled", value: horse.foaled },
    { label: "Sex", value: horse.sex },
    { label: "Color", value: horse.color ?? "—" },
    { label: "Birthplace", value: birthplaceLabel(horse) },
    { label: "Trainer", value: horse.trainer },
    { label: "Owner", value: horse.owner ?? "—" },
    { label: "Breeder", value: horse.breeder ?? "—" }
  ];

  const careerStarts = horse.periodStatsCareer?.starts ?? careerStartsFromRecord(horse.record);
  const bestClass = horse.racingClass ?? "—";

  return (
    <div className="min-h-screen bg-[#f8f9fb] pb-16">
      {/* Hero */}
      <section
        className={`relative w-full overflow-hidden ${oswald.className}`}
        style={{ background: STRIP_BG }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
          style={{
            backgroundImage: `linear-gradient(115deg, ${NAVY} 0%, transparent 45%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12), transparent 55%)`
          }}
        />
        <span
          className="pointer-events-none absolute -bottom-8 right-[2%] select-none text-[clamp(10rem,32vw,24rem)] font-bold leading-none tracking-tighter text-white/[0.12] sm:-bottom-16 sm:right-[8%]"
          aria-hidden
        >
          {horse.name.charAt(0)}
        </span>

        <div className="relative mx-auto grid min-h-[480px] max-w-7xl grid-cols-1 items-end gap-8 px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-16 md:min-h-[620px] md:grid-cols-12 md:gap-6 md:pb-16 md:pt-20">
          <div className="relative z-10 flex flex-col justify-end md:col-span-5 lg:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8cce8]">{statusLabel}</p>
            <h1 className="mt-2 max-w-xl text-[clamp(2.25rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
              {horse.name}
            </h1>
            <p className="mt-4 max-w-md font-sans text-sm font-medium leading-relaxed text-white/85 sm:text-base">
              {heroMetaLine(horse)}
            </p>
            <p className="mt-2 max-w-lg font-sans text-xs font-normal uppercase tracking-[0.14em] text-white/60 sm:text-sm">
              {secondaryLine}
            </p>
          </div>

          <div className="relative z-10 flex min-h-[260px] items-end justify-center md:col-span-7 lg:col-span-7 md:min-h-[420px]">
            <div
              className={`relative h-[52vw] max-h-[420px] min-h-[240px] w-full max-w-[520px] md:h-[min(48vw,520px)] md:max-h-none md:min-h-[360px] ${
                noPhoto ? "opacity-90" : ""
              }`}
            >
              <Image
                src={horse.image}
                alt={horse.name}
                fill
                priority
                className={
                  cutout || noPhoto
                    ? "object-contain object-bottom drop-shadow-[0_28px_48px_rgba(0,0,0,0.35)]"
                    : "object-cover object-center drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)]"
                }
                sizes="(max-width: 767px) 90vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Profile facts */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <dl className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {factFields.map((f) => (
              <div key={f.label}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f97c9]">{f.label}</dt>
                <dd className="mt-2 font-sans text-base font-semibold leading-snug text-[#113278]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-slate-200 bg-[#f1f3f7] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-300/80">
            <div className="lg:px-6 lg:first:pl-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f97c9]">Record</p>
              <p className={`${oswald.className} mt-2 text-2xl font-bold uppercase tabular-nums tracking-tight text-slate-900 sm:text-3xl`}>
                {horse.record}
              </p>
            </div>
            <div className="lg:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f97c9]">Earnings</p>
              <p className={`${oswald.className} mt-2 text-2xl font-bold uppercase tabular-nums tracking-tight text-slate-900 sm:text-3xl`}>
                {horse.earnings}
              </p>
            </div>
            <div className="col-span-2 border-t border-slate-300/80 pt-8 lg:col-span-1 lg:border-t-0 lg:pt-0 lg:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f97c9]">Best class</p>
              <p className={`${oswald.className} mt-2 text-xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-2xl`}>
                {bestClass}
              </p>
            </div>
            <div className="col-span-2 border-t border-slate-300/80 pt-8 lg:col-span-1 lg:border-t-0 lg:pt-0 lg:px-6 lg:pr-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f97c9]">Career starts</p>
              <p className={`${oswald.className} mt-2 text-2xl font-bold uppercase tabular-nums tracking-tight text-slate-900 sm:text-3xl`}>
                {careerStarts}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className={`${oswald.className} text-sm font-bold uppercase tracking-[0.22em] text-slate-900`}>
            Biography
          </h2>
          <p className="mt-8 max-w-[900px] font-sans text-lg font-semibold leading-[1.65] text-slate-800 sm:text-xl sm:leading-[1.7]">
            {horse.bio}
          </p>
          {horse.salesNote ? (
            <div className="mt-12 max-w-[900px] border-t border-slate-200 pt-10">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f97c9]">Buyer / consignor</h3>
              <p className="mt-3 font-sans text-sm font-medium leading-relaxed text-slate-600">{horse.salesNote}</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Pedigree & connections */}
      <section className="border-t border-slate-200 bg-[#f8f9fb] py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className={`${oswald.className} border-b border-slate-300 pb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-900`}>
              Pedigree
            </h2>
            <dl className="mt-6 space-y-0 divide-y divide-slate-200">
              <div className="flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f97c9]">Sire</dt>
                <dd className="font-sans text-base font-semibold text-[#113278] sm:text-right">{horse.sire}</dd>
              </div>
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f97c9]">Dam</dt>
                <dd className="font-sans text-base font-semibold text-[#113278] sm:text-right">{damShortName(horse.dam)}</dd>
              </div>
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f97c9]">Damsire</dt>
                <dd className="font-sans text-base font-semibold text-[#113278] sm:text-right">{damsire ?? "—"}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className={`${oswald.className} border-b border-slate-300 pb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-900`}>
              Connections
            </h2>
            <dl className="mt-6 space-y-0 divide-y divide-slate-200">
              {horse.jockey ? (
                <div className="flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f97c9]">Jockey</dt>
                  <dd className="font-sans text-base font-semibold text-[#113278] sm:text-right">{horse.jockey}</dd>
                </div>
              ) : null}
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f97c9]">Trainer</dt>
                <dd className="font-sans text-base font-semibold text-[#113278] sm:text-right">{horse.trainer}</dd>
              </div>
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f97c9]">Owner</dt>
                <dd className="font-sans text-base font-semibold text-[#113278] sm:text-right">{horse.owner ?? "—"}</dd>
              </div>
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <dt className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f97c9]">Breeder</dt>
                <dd className="font-sans text-base font-semibold text-[#113278] sm:text-right">{horse.breeder ?? "—"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <PeriodStatsBlock horse={horse} />

      {/* Recent results */}
      {rows.length > 0 ? (
        <section className="border-t border-slate-200 bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className={`${oswald.className} text-sm font-bold uppercase tracking-[0.22em] text-slate-900`}>
              Recent results
            </h2>
            <ul className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
              {rows.map((row, i) => (
                <li
                  key={`${row.date}-${row.track}-${i}`}
                  className="grid grid-cols-1 gap-2 py-4 font-sans text-sm sm:grid-cols-[7rem_1fr_1fr_auto] sm:items-center sm:gap-6"
                >
                  <time className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {formatProfileResultDate(row.date)}
                  </time>
                  <span className="font-semibold text-slate-900">{row.track}</span>
                  <span className="min-w-0 text-slate-600">{row.race}</span>
                  <span className="text-left text-lg font-bold tabular-nums tracking-tight text-[#113278] sm:text-right sm:text-xl">
                    {row.finish.trim().toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
            {horseResults.length > 0 ? (
              <p className="mt-8 text-sm text-slate-500">
                <Link href="/results" className="font-semibold text-[#113278] transition hover:text-[#1a448f]">
                  View all results →
                </Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Related coverage */}
      {coverage.length > 0 ? (
        <section className="border-t border-slate-200 bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className={`${oswald.className} text-sm font-bold uppercase tracking-[0.22em] text-slate-900`}>
              Related coverage
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coverage.map((item) => (
                <CoverageCard key={item.id + item.href} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 pt-10 text-center sm:px-6">
        <Link href="/horses" className="text-sm font-semibold uppercase tracking-wide text-[#113278] transition hover:text-[#1a448f]">
          ← Back to roster
        </Link>
      </div>
    </div>
  );
}
