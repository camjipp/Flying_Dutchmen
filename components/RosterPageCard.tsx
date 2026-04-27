import Image from "next/image";
import Link from "next/link";
import { Horse } from "@/lib/types";
import { horseAgeType, isPlaceholderHorseImage } from "@/lib/horseDisplay";
import { oswald } from "@/components/fixture/fixtureStripShared";

const BRAND_LOGO = "/brand/logo-transparent.png";

interface RosterPageCardProps {
  horse: Horse;
}

export function RosterPageCard({ horse }: RosterPageCardProps) {
  const ageType = horseAgeType(horse).toUpperCase();
  const noPhoto = isPlaceholderHorseImage(horse.image);

  return (
    <Link
      href={`/horses/${horse.slug}`}
      className="group/roster flex w-full cursor-pointer flex-col items-center text-center transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#113278]"
    >
      <div className="relative flex h-[260px] w-full items-end justify-center overflow-visible">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[55%] w-3/4 -translate-x-1/2 -skew-x-[8deg] bg-[#E5E7EB] transition-colors duration-300 ease-out group-hover/roster:bg-[#113278]"
          aria-hidden
        />

        {noPhoto ? (
          <div className="relative z-10 flex h-full w-[88%] max-w-[280px] flex-col items-center justify-end pb-1">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[10%] flex items-center justify-center">
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#113278]/[0.08] via-transparent to-slate-400/[0.1]"
                aria-hidden
              />
              <Image
                src={BRAND_LOGO}
                alt=""
                width={180}
                height={180}
                className="relative h-auto w-[38%] opacity-[0.14]"
              />
            </div>
          </div>
        ) : (
          <div className="relative z-10 h-[118%] w-[88%] max-w-[280px] shrink-0">
            <Image
              src={horse.image}
              alt={horse.name}
              fill
              priority={horse.slug === "slay-the-day"}
              className="object-contain object-bottom transition-transform duration-300 ease-out group-hover/roster:scale-105"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          </div>
        )}
      </div>

      <div className={`mt-4 w-full ${oswald.className}`}>
        <h3 className="text-lg font-bold uppercase leading-tight tracking-tight text-slate-900 transition-colors duration-300 ease-out sm:text-xl group-hover/roster:text-[#113278]">
          {horse.name}
        </h3>
        <p className="mt-1 font-sans text-xs uppercase tracking-widest text-slate-500">{ageType}</p>
        <span
          className="mt-3 inline-block text-sm font-normal text-slate-400 transition duration-300 ease-out group-hover/roster:translate-x-0.5 group-hover/roster:text-[#113278]"
          aria-hidden
        >
          →
        </span>
      </div>
    </Link>
  );
}
