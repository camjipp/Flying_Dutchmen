import type { SpotlightItem } from "@/lib/types";

/** Small caps wire labels — consistent across features and support */
export function editorialSourceLabel(item: SpotlightItem): string {
  if (item.kind === "youtube") return "YOUTUBE";
  if (item.kind === "instagram") return "INSTAGRAM";
  if (item.kind === "x") return "X";
  if (item.kind === "article") {
    const s = item.source.toLowerCase();
    if (s.includes("bloodhorse")) return "BLOODHORSE";
    if (s.includes("flying dutchmen")) return "STABLE";
    return "PRESS";
  }
  return "PRESS";
}
