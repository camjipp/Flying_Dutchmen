import { Oswald } from "next/font/google";

/** Flying Dutchmen primary */
export const NAVY = "#113278";

export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap"
});

/** Chamfered ticket corner — match Results / Upcoming */
export const CARD_CLIP = "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/** Strip: subtle vertical light */
export const STRIP_BG =
  "linear-gradient(180deg, #0e2652 0%, #113278 38%, #133f82 72%, #154890 100%)";

export const arrowBtnClass =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/40 bg-white/18 text-xl font-semibold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition enabled:hover:border-white/55 enabled:hover:bg-white/28 disabled:cursor-not-allowed disabled:opacity-25 sm:h-12 sm:w-12 sm:text-2xl";

/** Shared fixture card inner height */
export const CARD_INNER_H = "h-[172px]";

/** Horizontal track: no native scrollbar (see globals `.latest-results-carousel-track`) */
export const fixtureCarouselTrackClass =
  "latest-results-carousel-track -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-4 pb-0.5 sm:-mx-6 sm:gap-2.5 sm:px-6 touch-pan-x";

export function formatFixtureDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ /g, " ")
    .toUpperCase();
}

export function stakesTagFromRace(race: string): string | null {
  const m = race.match(/\b(G[123])\b/i);
  return m ? m[1].toUpperCase() : null;
}
