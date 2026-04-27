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

const labelField = "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8FA3BF]";
const valueField = "font-sans text-[18px] font-semibold leading-snug text-[#0B1B3A] md:text-[20px]";
const sectionEyebrow = "text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8FA3BF]";
const dividerY = "border-t border-[#E6ECF5] my-8";
const listRow = "flex justify-between gap-6 py-4";
const listLabel = "text-[11px] font-semibold uppercase tracking-widest text-[#8FA3BF]";
const listValue = "text-right font-medium text-[#0B1B3A]";

function FieldGroup({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className={labelField}>{label}</p>
      <p className={valueField}>{value}</p>
    </div>
  );
}

function CoverageCard({ item }: { item: ProfileCoverageItem }) {
  const inner = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
      </div>
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8FA3BF]">{item.source}</p>
        <p className={`${oswald.className} mt-1 line-clamp-2 text-base font-bold uppercase leading-snug tracking-tight text-[#0B1B3A]`}>
          {item.title}
        </p>
        <p className="mt-2 text-xs font-semibold text-[#113278]">{item.cta}</p>
      </div>
    </>
  );

  const className =
    "group flex flex-col overflow-hidden border border-[#E6ECF5] bg-white transition-colors duration-200 hover:border-[#cfd8e8]";

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
    <div className="min-h-screen bg-[#f8f9fb] pb-12 md:pb-16">
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

      <div className="border-b border-[#E6ECF5] bg-white">
        <div className="mx-auto max-w-3xl px-5 py-8 md:px-12 md:py-16">
          {/* Field groups */}
          <div className="space-y-6">
            {factFields.map((f) => (
              <FieldGroup key={f.label} label={f.label} value={f.value} />
            ))}
          </div>

          <div className={dividerY} aria-hidden />

          {/* Record + earnings */}
          <div className="grid grid-cols-2 gap-6 border-y border-[#E6ECF5] py-6">
            <div>
              <p className={listLabel}>Record</p>
              <p className={`${oswald.className} mt-1 text-2xl font-bold uppercase tabular-nums tracking-tight text-[#0B1B3A]`}>
                {horse.record}
              </p>
            </div>
            <div>
              <p className={listLabel}>Earnings</p>
              <p className={`${oswald.className} mt-1 text-2xl font-bold uppercase tabular-nums tracking-tight text-[#0B1B3A]`}>
                {horse.earnings}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="space-y-1">
              <p className={labelField}>Best class</p>
              <p className={`${oswald.className} text-lg font-bold uppercase leading-tight tracking-tight text-[#0B1B3A] md:text-xl`}>
                {bestClass}
              </p>
            </div>
            <div className="space-y-1">
              <p className={labelField}>Career starts</p>
              <p className={`${oswald.className} text-lg font-bold uppercase tabular-nums tracking-tight text-[#0B1B3A] md:text-xl`}>
                {careerStarts}
              </p>
            </div>
          </div>

          <div className={dividerY} aria-hidden />

          {/* Biography */}
          <div className="space-y-4">
            <h2 className={sectionEyebrow}>Biography</h2>
            <p className="font-sans text-[15px] font-medium leading-relaxed text-[#2C3E5D]">{horse.bio}</p>
            {horse.salesNote ? (
              <div className="space-y-4 border-t border-[#E6ECF5] pt-6">
                <h3 className={sectionEyebrow}>Buyer / consignor</h3>
                <p className="font-sans text-[15px] leading-relaxed text-[#2C3E5D]">{horse.salesNote}</p>
              </div>
            ) : null}
          </div>

          <div className={dividerY} aria-hidden />

          {/* Pedigree */}
          <div className="space-y-4">
            <h2 className={sectionEyebrow}>Pedigree</h2>
            <div className="divide-y divide-[#E6ECF5]">
              <div className={listRow}>
                <span className={listLabel}>Sire</span>
                <span className={listValue}>{horse.sire}</span>
              </div>
              <div className={listRow}>
                <span className={listLabel}>Dam</span>
                <span className={listValue}>{damShortName(horse.dam)}</span>
              </div>
              <div className={listRow}>
                <span className={listLabel}>Damsire</span>
                <span className={listValue}>{damsire ?? "—"}</span>
              </div>
            </div>
          </div>

          <div className={dividerY} aria-hidden />

          {/* Connections */}
          <div className="space-y-4">
            <h2 className={sectionEyebrow}>Connections</h2>
            <div className="divide-y divide-[#E6ECF5]">
              {horse.jockey ? (
                <div className={listRow}>
                  <span className={listLabel}>Jockey</span>
                  <span className={listValue}>{horse.jockey}</span>
                </div>
              ) : null}
              <div className={listRow}>
                <span className={listLabel}>Trainer</span>
                <span className={listValue}>{horse.trainer}</span>
              </div>
              <div className={listRow}>
                <span className={listLabel}>Owner</span>
                <span className={listValue}>{horse.owner ?? "—"}</span>
              </div>
              <div className={listRow}>
                <span className={listLabel}>Breeder</span>
                <span className={listValue}>{horse.breeder ?? "—"}</span>
              </div>
            </div>
          </div>

          {(horse.periodStats2026 || horse.periodStatsCareer) && (
            <>
              <div className={dividerY} aria-hidden />
              <div className="space-y-6">
                <h2 className={`${oswald.className} text-[12px] font-bold uppercase tracking-[0.2em] text-[#8FA3BF]`}>
                  Period statistics
                </h2>
                {horse.periodStats2026 ? (
                  <div className="space-y-1">
                    <p className={labelField}>2026 (through current entry)</p>
                    <p className="font-sans text-[15px] leading-relaxed text-[#2C3E5D]">
                      <span className="font-semibold text-[#0B1B3A]">{horse.periodStats2026.starts}</span> starts ·{" "}
                      <span className="font-semibold text-[#0B1B3A]">{horse.periodStats2026.firsts}</span> wins ·{" "}
                      {horse.periodStats2026.seconds}–{horse.periodStats2026.thirds} ·{" "}
                      <span className="font-semibold tabular-nums text-[#113278]">{horse.periodStats2026.earnings}</span>
                    </p>
                  </div>
                ) : null}
                {horse.periodStatsCareer ? (
                  <div className="space-y-1">
                    <p className={labelField}>Career (stable)</p>
                    <p className="font-sans text-[15px] leading-relaxed text-[#2C3E5D]">
                      <span className="font-semibold text-[#0B1B3A]">{horse.periodStatsCareer.starts}</span> starts ·{" "}
                      <span className="font-semibold text-[#0B1B3A]">{horse.periodStatsCareer.firsts}</span> wins ·{" "}
                      {horse.periodStatsCareer.seconds}–{horse.periodStatsCareer.thirds} ·{" "}
                      <span className="font-semibold tabular-nums text-[#113278]">{horse.periodStatsCareer.earnings}</span>
                    </p>
                  </div>
                ) : null}
                <p className="text-xs text-[#8FA3BF]">Figures shown for stable and promotional use.</p>
              </div>
            </>
          )}

          {rows.length > 0 ? (
            <>
              <div className={dividerY} aria-hidden />
              <div className="space-y-6">
                <h2 className={`${oswald.className} text-[12px] font-bold uppercase tracking-[0.2em] text-[#8FA3BF]`}>
                  Recent results
                </h2>
                <div className="space-y-6">
                  {rows.map((row, i) => (
                    <div
                      key={`${row.date}-${row.track}-${i}`}
                      className="border-b border-[#E6ECF5] pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#8FA3BF]">
                        {formatProfileResultDate(row.date)}
                      </p>
                      <p className="mt-1 font-semibold text-[#0B1B3A]">{row.track}</p>
                      <p className="text-sm text-[#5B6B88]">{row.race}</p>
                      <p className="mt-2 text-lg font-bold tabular-nums tracking-tight text-[#113278]">
                        {row.finish.trim().toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
                {horseResults.length > 0 ? (
                  <p className="text-sm text-[#5B6B88]">
                    <Link href="/results" className="font-semibold text-[#113278] transition hover:text-[#1a448f]">
                      View all results →
                    </Link>
                  </p>
                ) : null}
              </div>
            </>
          ) : null}

          {coverage.length > 0 ? (
            <>
              <div className={dividerY} aria-hidden />
              <div className="space-y-6">
                <h2 className={`${oswald.className} text-[12px] font-bold uppercase tracking-[0.2em] text-[#8FA3BF]`}>
                  Related coverage
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {coverage.map((item) => (
                    <CoverageCard key={item.id + item.href} item={item} />
                  ))}
                </div>
              </div>
            </>
          ) : null}

          <div className="mt-10 border-t border-[#E6ECF5] pt-6 text-center">
            <Link href="/horses" className="text-xs font-semibold uppercase tracking-wide text-[#113278] transition hover:text-[#1a448f]">
              ← Back to roster
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
