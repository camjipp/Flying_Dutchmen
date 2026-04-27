import Link from "next/link";
import { oswald } from "@/components/fixture/fixtureStripShared";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  /** Default link style; button for primary roster CTAs */
  actionVariant?: "link" | "button";
  /**
   * `fixture` matches strip sections (Latest results, Upcoming runners, In the spotlight):
   * Oswald label + title, tight title tracking, sans description.
   */
  variant?: "default" | "fixture";
}

export function SectionHeader({
  kicker,
  title,
  description,
  actionHref,
  actionLabel,
  actionVariant = "link",
  variant = "default"
}: SectionHeaderProps) {
  const isFixture = variant === "fixture";

  const kickerClass = isFixture
    ? "text-[10px] font-semibold uppercase tracking-[0.22em] text-[#113278]"
    : "mb-2 text-xs uppercase tracking-[0.18em] text-[#7f97c9]";

  const titleClass = isFixture
    ? "text-xl font-bold uppercase leading-none tracking-tight text-slate-900 sm:text-2xl"
    : "text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl";

  const titleSpacing = kicker && isFixture ? "mt-1" : "";

  const descriptionClass = isFixture
    ? "mt-1.5 max-w-2xl font-sans text-sm leading-relaxed text-slate-600"
    : "mt-2 text-slate-600";

  const headingBlock = (
    <>
      {kicker ? <p className={kickerClass}>{kicker}</p> : null}
      <h2 className={[titleClass, titleSpacing].filter(Boolean).join(" ")}>{title}</h2>
    </>
  );

  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-3xl">
        {isFixture ? <div className={oswald.className}>{headingBlock}</div> : headingBlock}
        {description ? <p className={descriptionClass}>{description}</p> : null}
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className={
            actionVariant === "button"
              ? "inline-flex shrink-0 items-center justify-center rounded-md border border-[#113278] bg-white px-4 py-2 text-sm font-semibold text-[#113278] transition hover:bg-[#f0f4fc]"
              : "text-sm font-medium text-[#8ea6d2] transition hover:text-[#b3c3e4]"
          }
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
