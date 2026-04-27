import type { SpotlightItem, SpotlightMediaKind } from "@/lib/types";
import { CARD_CLIP } from "@/components/fixture/fixtureStripShared";
import { editorialSourceLabel } from "./spotlightEditorial";
import { SpotlightAnchor, SpotlightMediaImage } from "./spotlightPrimitives";

function defaultCta(kind: SpotlightMediaKind): string {
  if (kind === "youtube") return "Watch →";
  if (kind === "instagram") return "View →";
  if (kind === "x") return "View on X →";
  return "Read Article →";
}

export function SpotlightHeroCard({ item, imageSrc }: { item: SpotlightItem; imageSrc: string }) {
  const cta = item.ctaLabel ?? defaultCta(item.kind);
  const wire = editorialSourceLabel(item);

  return (
    <SpotlightAnchor
      href={item.href}
      className="group block text-left outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
    >
      <div
        className="overflow-hidden border border-white/15 bg-[#06142c] shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-white/25 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        style={{ clipPath: CARD_CLIP }}
      >
        <div className="relative aspect-[16/10] min-h-[168px] sm:min-h-[200px] sm:aspect-[2/1]">
          <SpotlightMediaImage
            src={imageSrc}
            alt=""
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030a18]/95 via-[#030a18]/35 to-black/25 transition duration-500 group-hover:from-[#030a18]/98"
            aria-hidden
          />
          {item.kind === "youtube" ? (
            <span
              className="pointer-events-none absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-white/30 transition duration-300 group-hover:scale-105 sm:h-[3.25rem] sm:w-[3.25rem]"
              aria-hidden
            >
              <span className="ml-0.5 text-base font-bold">▶</span>
            </span>
          ) : null}
        </div>

        <div className="border-t border-white/10 px-3.5 py-3.5 sm:px-5 sm:py-4">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b8cce8]">{wire}</p>
          <h3 className="mt-1.5 text-lg font-bold uppercase leading-[1.12] tracking-tight text-white sm:text-xl lg:text-[1.35rem]">
            {item.title}
          </h3>
          {item.excerpt ? (
            <p className="mt-1.5 line-clamp-3 font-sans text-[13px] font-normal leading-relaxed text-[#b6c4d9] sm:text-sm">
              {item.excerpt}
            </p>
          ) : null}
          <p className="mt-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-[#d4e2f7] transition group-hover:text-white">
            {cta}
          </p>
        </div>
      </div>
    </SpotlightAnchor>
  );
}
