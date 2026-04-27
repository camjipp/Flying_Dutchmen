"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SpotlightItem } from "@/lib/types";
import { SpotlightRailCard } from "@/components/spotlight/SpotlightRailCard";

export type SpotlightRailEntry = {
  item: SpotlightItem;
  imageSrc: string;
};

const RAIL_TRACK =
  "latest-results-carousel-track flex w-full snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth touch-pan-x xl:justify-center xl:overflow-x-visible xl:pb-0";

const ARROW_BTN =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/50 bg-white/16 text-lg font-semibold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition enabled:hover:border-white/70 enabled:hover:bg-white/24 disabled:cursor-not-allowed disabled:opacity-25 sm:h-11 sm:w-11 sm:text-xl";

export function SpotlightCoverageCarousel({
  entries,
  className = ""
}: {
  entries: SpotlightRailEntry[];
  className?: string;
}) {
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

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncScrollState();
    const ro = new ResizeObserver(() => syncScrollState());
    ro.observe(el);
    return () => ro.disconnect();
  }, [entries.length, syncScrollState]);

  const advance = useCallback((dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-spotlight-rail-card]");
    const second = first?.nextElementSibling as HTMLElement | null;
    const gap =
      first && second?.hasAttribute("data-spotlight-rail-card")
        ? second.offsetLeft - first.offsetLeft - first.offsetWidth
        : 10;
    const cardWidth = first?.offsetWidth ?? 248;
    el.scrollBy({ left: (cardWidth + Math.max(0, gap)) * dir, behavior: "smooth" });
  }, []);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={`mx-auto w-full ${className}`}>
      <p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8cce8]">More coverage</p>

      <div className="flex w-full justify-center">
        <div ref={trackRef} onScroll={syncScrollState} className={RAIL_TRACK}>
          {entries.map(({ item, imageSrc }) => (
            <SpotlightRailCard key={item.id} item={item} imageSrc={imageSrc} />
          ))}
          <div className="w-1 shrink-0 xl:hidden" aria-hidden />
        </div>
      </div>

      <div className="mt-3 flex justify-center border-t border-white/15 pt-3 sm:mt-3.5 sm:pt-3.5">
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            aria-label="Scroll coverage left"
            disabled={!canPrev}
            onClick={() => advance(-1)}
            className={ARROW_BTN}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll coverage right"
            disabled={!canNext}
            onClick={() => advance(1)}
            className={ARROW_BTN}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
