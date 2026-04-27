export type HorseStatus = "active" | "retired" | "sold";

export interface HorseRecentResult {
  date: string;
  track: string;
  race: string;
  finish: string;
}

/** Starts / wins / seconds / thirds style period stats (e.g. calendar year vs career). */
export interface HorsePeriodStats {
  starts: number;
  firsts: number;
  seconds: number;
  thirds: number;
  earnings: string;
}

export interface Horse {
  id: string;
  slug: string;
  name: string;
  year: number;
  sex: string;
  sire: string;
  dam: string;
  trainer: string;
  status: HorseStatus;
  record: string;
  earnings: string;
  image: string;
  /**
   * cutout: transparent/white-knockout portrait — use light cell + contain so it does not read like a grey placeholder.
   * Omit for full-bleed track photos (default cover + dark overlays).
   */
  imagePresentation?: "cutout";
  /** Display string for profile, e.g. "March 8, 2022" */
  foaled: string;
  bio: string;
  recentResults: HorseRecentResult[];
  /** Optional hero line, e.g. "Thoroughbred, Bay, Filly — foaled February 2, 2023" */
  heroSubline?: string;
  color?: string;
  /** e.g. "Kentucky" — shown in profile facts; may be inferred from registration when omitted */
  birthplace?: string;
  /** Registration or catalog note, e.g. "(KY) 91" */
  registration?: string;
  jockey?: string;
  owner?: string;
  breeder?: string;
  salesNote?: string;
  /** Best racing class achieved, e.g. "Graded Stakes Winner" */
  racingClass?: string;
  periodStats2026?: HorsePeriodStats;
  periodStatsCareer?: HorsePeriodStats;
}

export interface RaceResult {
  id: string;
  horseName: string;
  horseSlug: string;
  date: string;
  track: string;
  race: string;
  finish: string;
  jockey: string;
  trainer: string;
  notes: string;
}

export interface UpcomingRunner {
  id: string;
  horseName: string;
  horseSlug: string;
  date: string;
  track: string;
  race: string;
  postTime: string;
  jockey: string;
  trainer: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  body: string;
}

export type SpotlightMediaKind = "article" | "youtube" | "instagram" | "x";

export interface SpotlightItem {
  id: string;
  tier: "feature" | "support";
  kind: SpotlightMediaKind;
  title: string;
  source: string;
  href: string;
  image: string;
  excerpt?: string;
  /** Defaults by kind when omitted */
  ctaLabel?: string;
  /** Omit from the main four-tile row; shown only after “Show more”. */
  showInExpandOnly?: boolean;
}

export interface Stats {
  wins: number;
  starts: number;
  earnings: string;
  stakesPerformers: number;
}
