import type { RaceResult } from "@/lib/types";

/** e.g. APR 18, 2026 */
export function formatResultsPageDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase()
    .replace(",", ",");
}

export function isStakesRaceName(race: string): boolean {
  if (/\bG[123]\b/i.test(race)) return true;
  if (/\bListed\b/i.test(race)) return true;
  if (/\bStakes\b/i.test(race)) return true;
  return false;
}

export function sortedResultsDesc(results: RaceResult[]): RaceResult[] {
  return [...results].sort((a, b) => b.date.localeCompare(a.date));
}
