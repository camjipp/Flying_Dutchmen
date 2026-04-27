"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  formatCountdownLabel,
  getMsUntilStart,
  getScheduleLiveStatus,
  type ScheduleLiveStatus
} from "@/lib/upcomingScheduleTime";
import type { UpcomingRunner } from "@/lib/types";
import { CARD_CLIP, NAVY, oswald, stakesTagFromRace } from "@/components/fixture/fixtureStripShared";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** Soft off-white strip — clearly separate from dark Latest Results */
const SECTION_BG = "#eef1f6";

interface UpcomingRunnersScheduleProps {
  runners: UpcomingRunner[];
}

function formatCardDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function sortRunners(runners: UpcomingRunner[]) {
  return [...runners].sort((a, b) => a.date.localeCompare(b.date) || a.postTime.localeCompare(b.postTime));
}

function parseRaceType(race: string): { type: string; subtitle: string | null } {
  const t = race.trim();
  const g = t.match(/^(G[123])\b/i);
  if (g) {
    const rest = t.slice(g[0].length).trim();
    return { type: g[1].toUpperCase(), subtitle: rest || null };
  }
  if (/^Listed\b/i.test(t)) {
    return { type: "Listed", subtitle: t.replace(/^Listed\s*/i, "").trim() || null };
  }
  if (/^Allowance\b/i.test(t)) {
    const words = t.split(/\s+/);
    return { type: words.slice(0, 3).join(" "), subtitle: words.slice(3).join(" ") || null };
  }
  const words = t.split(/\s+/);
  return { type: words.slice(0, 2).join(" ") || t, subtitle: words.slice(2).join(" ") || null };
}

const STATUS_TAG: Record<
  ScheduleLiveStatus,
  { label: string; border: string; text: string; dot?: string }
> = {
  upcoming: {
    label: "Scheduled",
    border: "border-slate-300/90",
    text: "text-slate-600"
  },
  soon: {
    label: "Soon",
    border: "border-[#113278]/50",
    text: "text-[#113278]"
  },
  live: {
    label: "Live",
    border: "border-red-400/70",
    text: "text-red-600",
    dot: "bg-red-500"
  }
};

/** Countdown: always smaller & lighter than post time; accent under 1h; slightly stronger under 24h. */
function countdownStyle(
  msUntil: number | null,
  status: ScheduleLiveStatus,
  countdown: string
): string {
  const base = "mt-0.5 font-sans text-[10px] tabular-nums leading-tight sm:text-right";
  if (countdown === "Running Now" || status === "live") {
    return `${base} font-semibold text-red-600`;
  }
  if (countdown === "Scheduled" || countdown === "Started" || msUntil === null) {
    return `${base} font-medium text-slate-400`;
  }
  if (status === "soon" || (msUntil > 0 && msUntil < HOUR_MS)) {
    return `${base} font-medium text-[#113278]`;
  }
  if (msUntil > 0 && msUntil < DAY_MS) {
    return `${base} font-medium text-slate-500`;
  }
  return `${base} font-medium text-slate-400`;
}

export function UpcomingRunnersSchedule({ runners }: UpcomingRunnersScheduleProps) {
  const sorted = useMemo(() => sortRunners(runners), [runners]);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 10_000);
    return () => window.clearInterval(id);
  }, []);

  if (sorted.length === 0) {
    return null;
  }

  return (
    <section
      className={`${oswald.className} w-full border-t border-slate-200/90 py-10 text-slate-900 sm:py-12 md:py-14`}
      style={{ backgroundColor: SECTION_BG }}
      aria-labelledby="upcoming-runners-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#113278]">Declarations</p>
            <h2
              id="upcoming-runners-heading"
              className="mt-1 text-xl font-bold uppercase leading-none tracking-tight text-slate-900 sm:text-2xl"
            >
              Upcoming runners
            </h2>
            <p className="mt-1.5 max-w-xl font-sans text-sm leading-relaxed text-slate-600">Next scheduled races</p>
          </div>
          <Link
            href="/horses"
            className="shrink-0 text-sm font-semibold uppercase tracking-wide text-[#113278] transition hover:text-[#0d265c]"
          >
            Full roster →
          </Link>
        </header>

        <ul className="space-y-1 sm:space-y-1.5">
          {sorted.map((runner) => (
            <li key={runner.id}>
              <UpcomingFixtureRow runner={runner} nowMs={nowMs} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function UpcomingFixtureRow({ runner, nowMs }: { runner: UpcomingRunner; nowMs: number }) {
  const { type, subtitle } = parseRaceType(runner.race);
  const stakes = stakesTagFromRace(runner.race);
  const dateLine = formatCardDate(runner.date);
  const msUntil = getMsUntilStart(runner, nowMs);
  const status = getScheduleLiveStatus(msUntil);
  const countdown = formatCountdownLabel(msUntil);
  const postDisplay = runner.postTime.trim();
  const tag = STATUS_TAG[status];
  const raceTypeDisplay =
    stakes && type === stakes && subtitle
      ? subtitle
      : subtitle
        ? `${type} · ${subtitle}`
        : type;

  return (
    <Link
      href={`/horses/${runner.horseSlug}`}
      className="group relative flex w-full overflow-hidden border border-slate-200/90 bg-white text-left text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_2px_6px_rgba(15,23,42,0.03)] transition-[border-color,box-shadow,transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-slate-300/95 hover:bg-[#f9fafc] hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_4px_12px_rgba(15,23,42,0.04)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113278]/35"
      style={{ clipPath: CARD_CLIP }}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-1" style={{ backgroundColor: NAVY }} aria-hidden />

      <div className="relative flex min-w-0 flex-1 flex-col gap-1.5 px-2 py-1.5 pl-[15px] sm:flex-row sm:items-stretch sm:justify-between sm:gap-4 sm:px-3 sm:py-2 sm:pl-4 sm:pr-3">
        <div
          className="pointer-events-none absolute bottom-0.5 right-2.5 h-8 w-11 opacity-[0.065] sm:right-3 sm:h-9 sm:w-[3.25rem]"
          style={{
            backgroundColor: NAVY,
            WebkitMaskImage: "url(/brand/logo-transparent.png)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "right bottom",
            WebkitMaskSize: "contain",
            maskImage: "url(/brand/logo-transparent.png)",
            maskRepeat: "no-repeat",
            maskPosition: "right bottom",
            maskSize: "contain"
          }}
          aria-hidden
        />

        <div className="relative z-[1] min-w-0 flex-1">
          <span
            className={`inline-flex w-fit items-center gap-1 border bg-white px-1 py-px font-sans text-[7px] font-bold uppercase tracking-[0.14em] ${tag.border} ${tag.text}`}
          >
            {tag.dot ? (
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tag.dot} live-dot-soft`} aria-hidden />
            ) : null}
            {tag.label}
          </span>
          <time dateTime={runner.date} className="mt-0.5 block font-sans text-[10px] font-medium tabular-nums leading-tight text-slate-500">
            {dateLine}
          </time>

          <h3 className="mt-0.5 text-[1rem] font-bold uppercase leading-[1.15] tracking-[-0.03em] text-slate-900 sm:text-[1.05rem]">
            {runner.horseName}
          </h3>

          <p className="mt-0.5 font-sans text-[10px] font-medium leading-tight text-slate-600">{raceTypeDisplay}</p>
          <p className="mt-0.5 font-sans text-[9px] font-medium uppercase leading-tight tracking-[0.12em] text-slate-500">
            {runner.track}
          </p>
        </div>

        <div className="relative z-[1] flex w-full shrink-0 flex-col border-t border-slate-100 pt-1.5 sm:w-[8.75rem] sm:border-l sm:border-slate-200/55 sm:border-t-0 sm:pl-3 sm:pt-0 md:w-[9.75rem]">
          <div className="flex flex-col items-start gap-0 sm:items-end sm:text-right">
            <p className="w-full font-sans text-sm font-bold tabular-nums leading-none tracking-[-0.02em] text-slate-900 sm:text-right sm:text-[0.9375rem]">
              {postDisplay}
            </p>
            <p className={`w-full ${countdownStyle(msUntil, status, countdown)}`}>{countdown}</p>
          </div>
          <div className="mt-1.5 flex flex-col gap-0 pt-1 sm:mt-1.5 sm:items-end sm:border-t sm:border-slate-100/90 sm:pt-1.5">
            <p className="line-clamp-2 w-full max-w-[14rem] font-sans text-[8px] font-medium leading-snug text-slate-500 sm:max-w-none sm:text-right">
              {runner.jockey}
            </p>
            <p className="line-clamp-2 w-full max-w-[14rem] font-sans text-[8px] leading-snug text-slate-400 sm:max-w-none sm:text-right">
              {runner.trainer}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
