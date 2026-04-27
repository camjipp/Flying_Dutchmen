import { Horse, HorseStatus } from "@/lib/types";

export function isPlaceholderHorseImage(src: string): boolean {
  return src.toLowerCase().includes("placeholder.svg");
}

export function horseAgeType(horse: Horse): string {
  const age = new Date().getFullYear() - horse.year;
  return `${age}YO ${horse.sex}`;
}

export function formatHorseStatus(status: HorseStatus): string {
  if (status === "active") return "Active";
  if (status === "retired") return "Retired";
  return "Sold";
}

export function statusBadgeClass(status: HorseStatus, surface: "light" | "dark" = "light"): string {
  if (surface === "dark") {
    const base = "rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest";
    if (status === "active") {
      return `${base} border-white/20 bg-white/5 text-white/80`;
    }
    if (status === "retired") {
      return `${base} border-white/10 bg-black/20 text-zinc-500`;
    }
    return `${base} border-amber-400/25 bg-amber-500/10 text-amber-200/80`;
  }

  const base = "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider";
  if (status === "active") {
    return `${base} border-[#2b467b] bg-[#f0f4fc] text-[#1e3a6e]`;
  }
  if (status === "retired") {
    return `${base} border-slate-300 bg-slate-100 text-slate-600`;
  }
  return `${base} border-amber-300 bg-amber-50 text-amber-800`;
}
