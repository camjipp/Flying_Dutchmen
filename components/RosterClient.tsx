"use client";

import { useMemo, useState } from "react";
import { Horse, HorseStatus } from "@/lib/types";
import { RosterPageCard } from "@/components/RosterPageCard";

const FILTERS: { id: HorseStatus; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "retired", label: "Retired" }
];

interface RosterClientProps {
  horses: Horse[];
}

export function RosterClient({ horses }: RosterClientProps) {
  const [filter, setFilter] = useState<HorseStatus>("active");

  const visible = useMemo(() => {
    const list =
      filter === "active"
        ? horses.filter((h) => h.status === "active")
        : horses.filter((h) => h.status === "retired" || h.status === "sold");
    return [...list].sort((a, b) => {
      if (a.slug === "slay-the-day") return -1;
      if (b.slug === "slay-the-day") return 1;
      return 0;
    });
  }, [horses, filter]);

  return (
    <div>
      <div className="mb-14 flex gap-12 border-b border-slate-200/80">
        {FILTERS.map((f) => {
          const selected = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={
                selected
                  ? "-mb-px border-b-2 border-[#113278] pb-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#113278]"
                  : "-mb-px border-b-2 border-transparent pb-3.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 transition hover:text-slate-600"
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-slate-500">No horses in this category.</p>
      ) : (
        <ul className="mx-auto grid w-full max-w-[1280px] list-none grid-cols-1 justify-items-stretch gap-x-10 gap-y-14 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
          {visible.map((horse) => (
            <li key={horse.id} className="min-w-0">
              <RosterPageCard horse={horse} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
