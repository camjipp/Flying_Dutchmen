import type { SpotlightItem } from "@/lib/types";
import { CARD_CLIP } from "@/components/fixture/fixtureStripShared";
import { editorialSourceLabel } from "./spotlightEditorial";
import { SpotlightAnchor, SpotlightMediaImage } from "./spotlightPrimitives";

/** Tier 2 — compact rail tile (~20% shorter than 4:3), lighter treatment */
export function SpotlightRailCard({
  item,
  imageSrc,
  className = ""
}: {
  item: SpotlightItem;
  imageSrc: string;
  className?: string;
}) {
  const wire = editorialSourceLabel(item);

  return (
    <SpotlightAnchor
      data-spotlight-rail-card
      href={item.href}
      className={`group block shrink-0 snap-start text-left outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 w-[min(72vw,238px)] sm:w-[248px] xl:w-[calc((100%-30px)/4)] xl:max-w-none ${className}`}
    >
      <div
        className="overflow-hidden border border-white/18 bg-[#112548]/75 shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,box-shadow] duration-300 ease-out group-hover:border-white/28 group-hover:shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
        style={{ clipPath: CARD_CLIP }}
      >
        <div className="relative aspect-[5/3] overflow-hidden">
          <SpotlightMediaImage
            src={imageSrc}
            alt=""
            sizes="(max-width: 1279px) 248px, 25vw"
            className="transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030a18]/55 via-transparent to-black/10 transition duration-300 group-hover:from-[#030a18]/62"
            aria-hidden
          />
          {item.kind === "youtube" ? (
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[11px] text-slate-900 shadow-md ring-1 ring-white/30 transition duration-300 group-hover:scale-[1.03]"
              aria-hidden
            >
              ▶
            </span>
          ) : null}
        </div>
        <div className="border-t border-white/12 px-2 py-1.5 sm:px-2.5">
          <p className="font-sans text-[8px] font-semibold uppercase tracking-[0.2em] text-[#b8cce8]/90">{wire}</p>
          <p className="mt-0.5 line-clamp-2 font-sans text-[0.75rem] font-bold uppercase leading-snug tracking-tight text-white">
            {item.title}
          </p>
        </div>
      </div>
    </SpotlightAnchor>
  );
}
