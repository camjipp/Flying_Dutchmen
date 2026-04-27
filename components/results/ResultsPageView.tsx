"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Horse, RaceResult, UpcomingRunner } from "@/lib/types";
import { CARD_CLIP, NAVY, oswald } from "@/components/fixture/fixtureStripShared";
import { formatCountdownLabel, getMsUntilStart } from "@/lib/upcomingScheduleTime";
import { formatResultsPageDate, isStakesRaceName, sortedResultsDesc } from "@/lib/resultsDisplay";

type ResultsTab = "latest" | "horse" | "stakes" | "all";

const TABS: { id: ResultsTab; label: string }[] = [
  { id: "latest", label: "Latest" },
  { id: "horse", label: "By horse" },
  { id: "stakes", label: "Stakes" },
  { id: "all", label: "All" }
];

const tabListClass =
  "flex min-h-[44px] gap-8 overflow-x-auto border-b border-slate-200/90 pb-0 sm:gap-10 md:gap-12 scrollbar-none";

const tabBtnClass = (active: boolean) =>
  [
    "shrink-0 border-b-2 pb-3 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
    active
      ? "border-[#113278] text-[#113278]"
      : "border-transparent text-slate-500 hover:text-[#113278]"
  ].join(" ");

function ResultRecordRow({ result }: { result: RaceResult }) {
  const finish = result.finish.trim().toUpperCase();

  return (
    <article
      className="group relative border border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] duration-150 hover:border-slate-300/95"
      style={{ clipPath: CARD_CLIP }}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px]" style={{ backgroundColor: NAVY }} aria-hidden />

      <div className="grid grid-cols-1 gap-4 px-4 py-4 pl-[14px] sm:px-5 sm:py-5 lg:grid-cols-12 lg:items-center lg:gap-6 lg:pl-[15px]">
        <div className="min-w-0 lg:col-span-4">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {formatResultsPageDate(result.date)}
          </p>
          <p className="mt-1 font-sans text-sm font-semibold text-slate-900">{result.track}</p>
          <p className="mt-0.5 font-sans text-[13px] leading-snug text-slate-600">{result.race}</p>
        </div>

        <div className="min-w-0 border-t border-slate-100 pt-3 lg:col-span-5 lg:border-t-0 lg:pt-0">
          <Link
            href={`/horses/${result.horseSlug}`}
            className={`${oswald.className} text-lg font-bold uppercase leading-tight tracking-tight text-slate-950 transition hover:text-[#113278] sm:text-xl`}
          >
            {result.horseName}
          </Link>
          <p className="mt-1.5 font-sans text-[12px] font-medium leading-snug text-slate-500">
            {result.jockey} / {result.trainer}
          </p>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-slate-100 pt-3 lg:col-span-3 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
            Finish
          </span>
          <p
            className={`${oswald.className} text-right text-2xl font-bold leading-none tracking-tight sm:text-3xl lg:w-full`}
            style={{ color: NAVY }}
          >
            {finish}
          </p>
        </div>
      </div>
    </article>
  );
}

function UpcomingEntryRow({ runner, nowMs }: { runner: UpcomingRunner; nowMs: number }) {
  const ms = getMsUntilStart(runner, nowMs);
  const countdown = formatCountdownLabel(ms);

  return (
    <article
      className="relative border border-slate-200/80 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.03)]"
      style={{ clipPath: CARD_CLIP }}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px] bg-[#113278]/35" aria-hidden />
      <div className="grid grid-cols-1 gap-3 px-4 py-3.5 pl-[14px] sm:px-5 sm:py-4 lg:grid-cols-12 lg:items-center lg:gap-5 lg:pl-[15px]">
        <div className="min-w-0 lg:col-span-3">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {formatResultsPageDate(runner.date)}
          </p>
          <p className="mt-0.5 font-sans text-sm font-semibold text-slate-900">{runner.track}</p>
        </div>
        <div className="min-w-0 border-t border-slate-100 pt-2.5 lg:col-span-4 lg:border-t-0 lg:pt-0">
          <Link
            href={`/horses/${runner.horseSlug}`}
            className={`${oswald.className} text-base font-bold uppercase tracking-tight text-slate-950 transition hover:text-[#113278] sm:text-lg`}
          >
            {runner.horseName}
          </Link>
        </div>
        <div className="min-w-0 border-t border-slate-100 pt-2.5 font-sans text-[13px] text-slate-600 lg:col-span-3 lg:border-t-0 lg:pt-0">
          {runner.race}
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-slate-100 pt-2.5 font-sans text-sm lg:col-span-2 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
          <span className="font-semibold tabular-nums text-slate-900">{runner.postTime}</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-[#113278]">{countdown}</span>
        </div>
      </div>
    </article>
  );
}

interface ResultsPageViewProps {
  results: RaceResult[];
  upcomingRunners: UpcomingRunner[];
  horses: Horse[];
}

export function ResultsPageView({ results, upcomingRunners, horses }: ResultsPageViewProps) {
  const [tab, setTab] = useState<ResultsTab>("latest");
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const sorted = useMemo(() => sortedResultsDesc(results), [results]);
  const stakesOnly = useMemo(() => sorted.filter((r) => isStakesRaceName(r.race)), [sorted]);

  const byHorseBlocks = useMemo(() => {
    const order = [...horses]
      .filter((h) => h.status === "active")
      .sort((a, b) => {
        if (a.slug === "slay-the-day") return -1;
        if (b.slug === "slay-the-day") return 1;
        return a.name.localeCompare(b.name);
      });
    return order.map((h) => ({
      horse: h,
      rows: sorted.filter((r) => r.horseSlug === h.slug)
    }));
  }, [horses, sorted]);

  const listForTab = useMemo(() => {
    if (tab === "stakes") return stakesOnly;
    if (tab === "horse") return null;
    return sorted;
  }, [tab, sorted, stakesOnly]);

  return (
    <div className="bg-[#f8f9fb] pb-24 pt-14 sm:pb-28 sm:pt-16 lg:pb-[100px] lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#113278]">Flying Dutchmen</p>
          <h1 className={`${oswald.className} mt-1 text-3xl font-bold uppercase leading-none tracking-tight text-slate-900 sm:text-4xl`}>
            Results
          </h1>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            Performance across graded stakes and daily competition.
          </p>
        </header>

        <div className="mt-10 sm:mt-12">
          <nav aria-label="Results views" className="-mx-4 px-4 sm:mx-0 sm:px-0">
            <ul
              className={`${tabListClass} [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
            >
              {TABS.map((t) => (
                <li key={t.id}>
                  <button type="button" onClick={() => setTab(t.id)} className={tabBtnClass(tab === t.id)}>
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {tab === "stakes" ? (
            <p className="mt-4 max-w-2xl font-sans text-[13px] leading-relaxed text-slate-500">
              Major race performances and black-type efforts.
            </p>
          ) : null}

          <div className="mt-8 space-y-3 sm:space-y-3.5">
            {tab === "horse" ? (
              <div className="space-y-12">
                {byHorseBlocks.map(({ horse, rows }) => (
                  <section key={horse.id}>
                    <h2 className={`${oswald.className} border-b border-slate-200 pb-3 text-lg font-bold uppercase tracking-tight text-slate-900`}>
                      {horse.name}
                    </h2>
                    {rows.length === 0 ? (
                      <p className="mt-4 font-sans text-sm text-slate-500">No recorded finishes in this feed.</p>
                    ) : (
                      <div className="mt-4 space-y-3 sm:space-y-3.5">
                        {rows.map((r) => (
                          <ResultRecordRow key={r.id} result={r} />
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            ) : !listForTab || listForTab.length === 0 ? (
              <p className="py-10 font-sans text-sm text-slate-500">No entries in this view.</p>
            ) : (
              listForTab.map((r) => <ResultRecordRow key={r.id} result={r} />)
            )}
          </div>
        </div>

        <section className="mt-16 border-t border-slate-200/90 pt-14 sm:mt-20 sm:pt-16">
          <header className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#113278]">Declarations</p>
            <h2 className={`${oswald.className} mt-1 text-2xl font-bold uppercase leading-none tracking-tight text-slate-900 sm:text-3xl`}>
              Upcoming entries
            </h2>
            <p className="mt-2 font-sans text-sm text-slate-600">Next scheduled runners.</p>
          </header>
          <div className="mt-8 space-y-2.5 sm:space-y-3">
            {upcomingRunners.map((runner) => (
              <UpcomingEntryRow key={runner.id} runner={runner} nowMs={nowMs} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
