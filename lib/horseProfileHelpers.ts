import type { Horse, NewsItem, SpotlightItem } from "@/lib/types";

const STATE_NAMES: Record<string, string> = {
  KY: "Kentucky",
  NY: "New York",
  FL: "Florida",
  CA: "California"
};

export function damShortName(dam: string): string {
  const i = dam.indexOf(",");
  return (i === -1 ? dam : dam.slice(0, i)).trim();
}

export function damsireFromDam(dam: string): string | null {
  const m = dam.match(/,\s*by\s+(.+)$/i);
  return m ? m[1].trim() : null;
}

export function birthplaceLabel(horse: Horse): string {
  if (horse.birthplace) return horse.birthplace;
  const m = horse.registration?.match(/\(([A-Z]{2})\)/);
  if (m?.[1] && STATE_NAMES[m[1]]) return STATE_NAMES[m[1]];
  if (m?.[1]) return m[1];
  return "—";
}

export function registrationStateCode(horse: Horse): string | null {
  const m = horse.registration?.match(/\(([A-Z]{2})\)/);
  return m?.[1] ?? null;
}

export function careerStartsFromRecord(record: string): string {
  const head = record.split(":")[0]?.trim();
  return head && /^\d+$/.test(head) ? head : "—";
}

export function heroMetaLine(horse: Horse): string {
  if (horse.heroSubline) return horse.heroSubline;
  const parts = ["Thoroughbred"];
  if (horse.color) parts.push(horse.color);
  parts.push(horse.sex);
  return parts.join(" · ");
}

export interface ProfileCoverageItem {
  id: string;
  title: string;
  source: string;
  href: string;
  image: string;
  cta: string;
  external: boolean;
}

export function relatedCoverageForHorse(
  horse: Horse,
  spotlightItems: SpotlightItem[],
  newsItems: NewsItem[]
): ProfileCoverageItem[] {
  const nameLower = horse.name.toLowerCase();
  const slug = horse.slug;
  const seen = new Set<string>();
  const out: ProfileCoverageItem[] = [];

  const push = (item: ProfileCoverageItem) => {
    if (seen.has(item.href)) return;
    seen.add(item.href);
    out.push(item);
  };

  for (const s of spotlightItems) {
    const hay = `${s.title} ${s.excerpt ?? ""} ${s.href}`.toLowerCase();
    if (hay.includes(nameLower) || hay.includes(slug)) {
      push({
        id: s.id,
        title: s.title,
        source: s.source,
        href: s.href,
        image: s.image,
        cta: s.ctaLabel ?? "View →",
        external: /^https?:\/\//i.test(s.href)
      });
    }
  }

  for (const n of newsItems) {
    const hay = `${n.title} ${n.slug}`.toLowerCase();
    if (hay.includes(nameLower) || hay.includes(slug)) {
      push({
        id: n.id,
        title: n.title,
        source: n.category,
        href: `/news/${n.slug}`,
        image: n.image,
        cta: "Read story →",
        external: false
      });
    }
  }

  for (const s of spotlightItems) {
    if (out.length >= 4) break;
    push({
      id: s.id,
      title: s.title,
      source: s.source,
      href: s.href,
      image: s.image,
      cta: s.ctaLabel ?? "View →",
      external: /^https?:\/\//i.test(s.href)
    });
  }

  return out.slice(0, 4);
}

export function formatProfileResultDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
