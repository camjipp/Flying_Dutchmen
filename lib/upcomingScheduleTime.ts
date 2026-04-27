import type { UpcomingRunner } from "@/lib/types";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
/** “Live” band: from 5 min before post through 15 min after. */
const LIVE_BEFORE_MS = 5 * MINUTE;
const LIVE_AFTER_MS = 15 * MINUTE;
const SOON_MS = HOUR;

/** Rough US Eastern DST: Apr–Oct inclusive → EDT (UTC−4), else EST (UTC−5). */
function easternWallClockToUtc(dateIso: string, hour24: number, minute: number): Date {
  const month = parseInt(dateIso.slice(5, 7), 10);
  const dst = month >= 4 && month <= 10;
  const offsetHours = dst ? 4 : 5;
  const y = parseInt(dateIso.slice(0, 4), 10);
  const mo = parseInt(dateIso.slice(5, 7), 10) - 1;
  const da = parseInt(dateIso.slice(8, 10), 10);
  return new Date(Date.UTC(y, mo, da, hour24 + offsetHours, minute, 0));
}

export function parseRunnerStartUtc(runner: UpcomingRunner): Date | null {
  const m = runner.postTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let hour = parseInt(m[1], 10);
  const minute = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();
  if (ap === "PM" && hour !== 12) hour += 12;
  if (ap === "AM" && hour === 12) hour = 0;
  return easternWallClockToUtc(runner.date, hour, minute);
}

export type ScheduleLiveStatus = "upcoming" | "soon" | "live";

export function getScheduleLiveStatus(msUntil: number | null): ScheduleLiveStatus {
  if (msUntil === null) return "upcoming";
  if (msUntil <= LIVE_BEFORE_MS && msUntil >= -LIVE_AFTER_MS) return "live";
  if (msUntil > 0 && msUntil <= SOON_MS) return "soon";
  return "upcoming";
}

export function formatCountdownLabel(msUntil: number | null): string {
  if (msUntil === null) return "Scheduled";

  if (msUntil < -LIVE_AFTER_MS) {
    return "Started";
  }

  if (msUntil <= 0 && msUntil >= -LIVE_AFTER_MS) {
    return "Running Now";
  }

  if (msUntil >= DAY) {
    const d = Math.floor(msUntil / DAY);
    const rem = msUntil % DAY;
    const h = Math.floor(rem / HOUR);
    const m = Math.floor((rem % HOUR) / MINUTE);
    if (h === 0 && m === 0) return `Runs in ${d}d`;
    if (h === 0) return `Runs in ${d}d ${m}m`;
    if (m === 0) return `Runs in ${d}d ${h}h`;
    return `Runs in ${d}d ${h}h ${m}m`;
  }

  if (msUntil > HOUR) {
    const h = Math.floor(msUntil / HOUR);
    const m = Math.floor((msUntil % HOUR) / MINUTE);
    return m === 0 ? `Runs in ${h}h` : `Runs in ${h}h ${m}m`;
  }

  const minutes = Math.max(1, Math.ceil(msUntil / MINUTE));
  return `Runs in ${minutes}m`;
}

export function getMsUntilStart(runner: UpcomingRunner, nowMs: number): number | null {
  const start = parseRunnerStartUtc(runner);
  if (!start || Number.isNaN(start.getTime())) return null;
  return start.getTime() - nowMs;
}
