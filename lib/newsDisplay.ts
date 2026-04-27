import type { NewsItem } from "@/lib/types";

export function sortedNewsDesc(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}
