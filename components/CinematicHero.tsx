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
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[65%_center] md:object-center"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#050A19]/80 via-[#050A19]/60 to-transparent md:from-[#050A19]/90 md:via-[#050A19]/70"
        aria-hidden
      />

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
        <div className="mx-auto flex h-full min-h-[min(100dvh,900px)] max-w-7xl flex-col justify-center px-5 pb-16 pt-24 md:px-12 md:pb-20 md:pt-32">
          <div className="pointer-events-auto min-w-0 w-full max-w-[min(88vw,600px)] self-start md:-translate-x-[8px] md:-translate-y-[20px] lg:max-w-[560px]">
            <header className="min-w-0">
              <h1 className="text-4xl font-bold uppercase leading-tight tracking-[-0.04em] text-white md:text-7xl md:tracking-[-0.055em]">
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
              <dl className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 md:mt-[74px] md:flex md:flex-row md:gap-10">
                {statCells.map((cell, index) => (
                  <div
                    key={cell.label}
                    className={`flex min-w-0 flex-col items-start md:min-w-0 md:flex-1 ${index > 0 ? "md:border-l md:border-white/[0.08] md:pl-6" : ""}`}
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
