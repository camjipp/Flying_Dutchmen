import Image from "next/image";
import Link from "next/link";
import type { Stats } from "@/lib/types";
import { oswald } from "@/components/fixture/fixtureStripShared";

interface CinematicHeroProps {
  heading: string;
  subheading: string;
  stats?: Stats;
  /** Full-bleed hero art */
  backgroundImageSrc?: string;
}

function formatEarnedLine(earnings: string): string {
  const n = Number.parseFloat(earnings.replace(/[$,]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return "$0M+";
  const millions = Math.floor(n / 1_000_000);
  return `$${millions}M+`;
}

function heroStatCells(stats: Stats) {
  return [
    { value: `${stats.wins}+`, label: "WINS" },
    { value: `${stats.starts}`, label: "STARTS" },
    { value: formatEarnedLine(stats.earnings), label: "EARNED" },
    { value: `${stats.stakesPerformers}+`, label: "STAKES" }
  ] as const;
}

export function CinematicHero({
  heading,
  subheading,
  stats,
  backgroundImageSrc = "/images/Hero_section.jpg"
}: CinematicHeroProps) {
  const displayTitle = heading.toUpperCase();
  const statCells = stats ? heroStatCells(stats) : [];

  return (
    <section
      className={`relative left-1/2 right-1/2 -translate-x-1/2 w-screen max-w-[100vw] overflow-hidden bg-[#03060c] min-h-[min(100dvh,900px)] ${oswald.className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundImageSrc}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        decoding="async"
        fetchPriority="high"
      />

      <div
        className="pointer-events-none absolute inset-y-0 left-[34%] right-0 z-[1] bg-[#03060c]/18 sm:left-[32%]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        <div className="absolute inset-y-0 left-0 w-[min(100vw,620px)] bg-gradient-to-r from-[#02040a] via-[#040a14]/98 to-transparent sm:w-[min(92vw,680px)] lg:w-[min(58%,720px)]" />
        <div className="absolute inset-y-0 left-0 w-[min(100vw,580px)] border-r border-white/[0.07] sm:w-[min(88vw,640px)] lg:w-[min(54%,640px)]" />
      </div>

      <div
        className="pointer-events-none absolute left-0 top-[7%] z-[3] h-[min(92vw,480px)] w-[min(92vw,480px)] max-w-[520px] translate-x-[min(6vw,3rem)] opacity-[0.075] sm:top-[9%] sm:h-[440px] sm:w-[440px] sm:translate-x-[min(8vw,4.5rem)] sm:opacity-[0.085] lg:translate-x-[min(10vw,6.5rem)] lg:h-[480px] lg:w-[480px] lg:opacity-[0.095]"
        aria-hidden
      >
        <Image
          src="/brand/logo-transparent.png"
          alt=""
          width={520}
          height={520}
          className="h-full w-full object-contain brightness-0 invert"
          priority
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[4]">
        <div className="mx-auto flex h-full min-h-[min(100dvh,900px)] max-w-7xl flex-col justify-center pl-0.5 pr-4 py-16 sm:pl-2 sm:pr-6 sm:py-20 lg:pl-3">
          <div className="pointer-events-auto min-w-0 w-full max-w-[min(88vw,600px)] -translate-x-[8px] -translate-y-[20px] self-start lg:max-w-[560px]">
            <header className="min-w-0">
              <h1 className="text-[clamp(48px,5vw,72px)] font-bold uppercase leading-[1.05] tracking-[-0.055em] text-white">
                {displayTitle}
              </h1>
              <p className="mt-[22px] sm:mt-[22px]">
                <span className="inline-block border-y border-white/18 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.48em] text-white/48 sm:tracking-[0.52em]">
                  Thoroughbred Racing
                </span>
              </p>
            </header>

            <p className="mt-[42px] max-w-[20rem] font-sans text-sm font-medium leading-relaxed text-white/88 sm:mt-[42px] sm:max-w-[21rem] sm:text-[0.9375rem]">
              {subheading}
            </p>

            {statCells.length > 0 ? (
              <dl className="mt-[74px] grid grid-cols-4 gap-x-3 sm:mt-[74px] sm:gap-x-4">
                {statCells.map((cell, index) => (
                  <div
                    key={cell.label}
                    className={`flex min-w-0 flex-col items-start pl-2.5 sm:pl-3.5 ${index > 0 ? "border-l border-white/[0.08]" : "pl-0"}`}
                  >
                    <dt className="order-2 mt-1 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-white/38">
                      {cell.label}
                    </dt>
                    <dd className="order-1 font-sans text-[24px] font-bold leading-none tabular-nums tracking-[-0.035em] text-white">
                      {cell.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className={`flex flex-wrap gap-4 ${statCells.length > 0 ? "mt-[60px] sm:mt-[60px]" : "mt-9"}`}>
              <Link
                href="/horses"
                className="inline-flex h-8 items-center justify-center rounded-sm bg-[#113278] px-3 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0d265c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              >
                View Horses
              </Link>
              <Link
                href="/results"
                className="inline-flex h-8 items-center justify-center rounded-sm border border-[#113278] bg-transparent px-3 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:border-[#5a8fe8] hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              >
                Latest Results
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
