"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { RaceResult } from "@/lib/types";
import {
  CARD_CLIP,
  CARD_INNER_H,
  NAVY,
  STRIP_BG,
  arrowBtnClass,
  formatFixtureDate,
  oswald,
  stakesTagFromRace
} from "@/components/fixture/fixtureStripShared";

interface LatestResultsSectionProps {
  results: RaceResult[];
}

const GAP_PX = 10;

const RESULTS_TRACK =
  "latest-results-carousel-track flex snap-x snap-mandatory touch-pan-x gap-2.5 overflow-x-auto scroll-smooth sm:gap-2.5";

function columnsVisible(): 1 | 2 | 4 {
  if (typeof window === "undefined") return 4;
  if (window.matchMedia("(min-width: 1280px)").matches) return 4;
  if (window.matchMedia("(min-width: 768px)").matches) return 2;
  return 1;
}

export function LatestResultsSection({ results }: LatestResultsSectionProps) {
  const items = useMemo(
    () => [...results].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10),
    [results]
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  const layoutViewport = useCallback(() => {
    const wrap = wrapRef.current;
    const viewport = viewportRef.current;
    if (!wrap || !viewport) return;
    const iw = wrap.clientWidth;
    const cols = columnsVisible();
    const cardW = Math.max(200, Math.floor((iw - (cols - 1) * GAP_PX) / cols));
    viewport.style.setProperty("--results-card", `${cardW}px`);
    viewport.style.width = `${cols * cardW + (cols - 1) * GAP_PX}px`;
    syncScrollState();
  }, [syncScrollState]);

  useLayoutEffect(() => {
    layoutViewport();
  }, [layoutViewport, items.length]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => layoutViewport());
    ro.observe(wrap);
    const onMq = () => layoutViewport();
    const mq1280 = window.matchMedia("(min-width: 1280px)");
    const mq768 = window.matchMedia("(min-width: 768px)");
    mq1280.addEventListener("change", onMq);
    mq768.addEventListener("change", onMq);
    window.addEventListener("resize", layoutViewport);
    return () => {
      ro.disconnect();
      mq1280.removeEventListener("change", onMq);
      mq768.removeEventListener("change", onMq);
      window.removeEventListener("resize", layoutViewport);
    };
  }, [layoutViewport]);

  const advance = useCallback((dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-fixture-card]");
    const second = first?.nextElementSibling as HTMLElement | null;
    const gap =
      first && second?.hasAttribute("data-fixture-card")
        ? second.offsetLeft - first.offsetLeft - first.offsetWidth
        : GAP_PX;
    const cardWidth = first?.offsetWidth ?? 280;
    el.scrollBy({ left: (cardWidth + Math.max(0, gap)) * dir, behavior: "smooth" });
  }, []);

  return (
    <section
      className={`${oswald.className} mt-0 w-full border-t border-[#113278]/35 py-9 text-white sm:py-11`}
      style={{ background: STRIP_BG }}
      aria-labelledby="latest-results-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8cce8]">
              Race office
            </p>
            <h2
              id="latest-results-heading"
              className="mt-1 text-xl font-bold uppercase leading-none tracking-tight text-white sm:text-2xl"
            >
              Latest results
            </h2>
          </div>
          <Link
            href="/results"
            className="shrink-0 text-sm font-semibold uppercase tracking-wide text-white transition hover:text-white/85"
          >
            View all results →
          </Link>
        </header>

        <div ref={wrapRef} className="w-full">
          <div ref={viewportRef} className="mx-auto overflow-hidden">
            <div ref={trackRef} onScroll={syncScrollState} className={RESULTS_TRACK}>
              {items.map((result) => (
                <FixtureResultCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center border-t border-white/20 pt-6">
          <div className="inline-flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Scroll results left"
              disabled={!canPrev}
              onClick={() => advance(-1)}
              className={arrowBtnClass}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Scroll results right"
              disabled={!canNext}
              onClick={() => advance(1)}
              className={arrowBtnClass}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FixtureResultCard({ result }: { result: RaceResult }) {
  const stakes = stakesTagFromRace(result.race);
  const dateLine = formatFixtureDate(result.date);
  const finishNorm = result.finish.trim().toUpperCase();

  return (
    <Link
      data-fixture-card
      href="/results"
      className="group relative shrink-0 snap-start overflow-hidden border border-slate-300/95 bg-white text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] duration-150 ease-out hover:border-slate-400 hover:shadow-[0_2px_0_rgba(15,23,42,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/85"
      style={{
        clipPath: CARD_CLIP,
        width: "var(--results-card, 280px)"
      }}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px]" style={{ backgroundColor: NAVY }} aria-hidden />

      <div
        className="pointer-events-none absolute -right-2 bottom-0 h-[5.5rem] w-[9rem] translate-x-3 translate-y-2 sm:h-[6.25rem] sm:w-[10rem] sm:translate-x-4 sm:translate-y-3"
        style={{
          opacity: 0.055,
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

      <div
        className={`relative flex ${CARD_INNER_H} w-full min-w-0 flex-col pl-[14px] pr-4 pb-3.5 pt-3 sm:pl-[15px] sm:pr-5 sm:pb-4 sm:pt-3.5`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <span
            className="inline-flex items-center px-1 py-px text-[7px] font-bold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: NAVY }}
          >
            Result
          </span>
          <time
            dateTime={result.date}
            className="font-sans text-[10px] font-semibold tabular-nums uppercase tracking-wide text-slate-400"
          >
            {dateLine}
          </time>
        </div>

        <div className="mt-2 flex h-[26px] items-center">
          {stakes ? (
            <span
              className="inline-flex items-center px-1.5 py-px font-sans text-[8px] font-bold uppercase tracking-[0.12em] text-white"
              style={{ backgroundColor: NAVY }}
            >
              {stakes}
            </span>
          ) : null}
        </div>

        <div className="mt-1.5 flex flex-1 items-start justify-between gap-2.5">
          <h3 className="min-w-0 flex-1 text-left text-[1.0625rem] font-bold uppercase leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-[1.1875rem]">
            {result.horseName}
          </h3>
          <p
            className="shrink-0 text-[2.125rem] font-bold leading-[0.88] tracking-[-0.09em] sm:text-[2.5rem]"
            style={{ color: NAVY }}
            aria-label={`Finish ${result.finish}`}
          >
            {finishNorm}
          </p>
        </div>

        <div className="mt-auto space-y-0.5 border-t border-slate-100 pt-2 font-sans">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{result.track}</p>
          <p className="line-clamp-2 text-[10px] font-medium leading-snug text-slate-400">{result.race}</p>
        </div>
      </div>
    </Link>
  );
}
