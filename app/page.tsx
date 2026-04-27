import { PageShell } from "@/components/PageShell";
import { CinematicHero } from "@/components/CinematicHero";
import { LatestResultsSection } from "@/components/LatestResultsSection";
import { InTheSpotlight } from "@/components/InTheSpotlight";
import { RosterPageCard } from "@/components/RosterPageCard";
import { SectionHeader } from "@/components/SectionHeader";
import { UpcomingRunnersSchedule } from "@/components/UpcomingRunnersSchedule";
import { horses, upcomingRunners, results, stats, spotlightItems } from "@/lib/data";

export default function HomePage() {
  const featuredHorses = horses
    .filter((h) => h.status === "active" && h.slug !== "harbor-command")
    .sort((a, b) => {
      if (a.slug === "slay-the-day") return -1;
      if (b.slug === "slay-the-day") return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <>
      <CinematicHero
        heading="Flying Dutchmen"
        subheading="Built to compete at the highest level."
        stats={stats}
      />
      <LatestResultsSection results={results} />
      <UpcomingRunnersSchedule runners={upcomingRunners.slice(0, 8)} />
      <InTheSpotlight items={spotlightItems} />
      <PageShell
        title="Flying Dutchmen"
        intro="A thoroughbred racing operation built around performance, precision, and the pursuit of the wire."
        showIntro={false}
      >
        <section className="pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-[4.5rem] lg:pb-24 xl:pb-[100px]">
          <div className="relative z-20">
            <SectionHeader
              variant="fixture"
              kicker="Stable Roster"
              title="Featured Horses"
              description="A snapshot of the active string. Open a name for the full profile."
              actionHref="/horses"
              actionLabel="View Full Roster"
              actionVariant="button"
            />
          </div>
          <ul className="relative z-0 mx-auto mt-12 grid w-full max-w-[1280px] list-none grid-cols-1 justify-items-stretch gap-x-10 gap-y-14 sm:mt-14 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:mt-16 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
            {featuredHorses.map((horse) => (
              <li key={horse.id} className="min-w-0">
                <RosterPageCard horse={horse} />
              </li>
            ))}
          </ul>
        </section>
      </PageShell>
    </>
  );
}
