import Image from "next/image";
import Link from "next/link";
import { oswald } from "@/components/fixture/fixtureStripShared";
import { InstagramLogo } from "@/components/icons/InstagramLogo";

/** Placeholder profile links — replace with canonical stable URLs when set. */
const SOCIAL_INSTAGRAM = "https://www.instagram.com/flyingdutchmenky/";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/horses", label: "Horses" },
  { href: "/results", label: "Results" },
  { href: "/news", label: "News" }
] as const;

const STABLE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

const INFO_LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" }
] as const;

const columnHeading =
  "mb-3 font-sans text-[9px] font-semibold uppercase tracking-[0.11em] text-[#7f97c9]";

const linkClass =
  "block w-fit font-sans text-[14px] font-medium leading-snug text-white/88 transition hover:text-white hover:underline hover:decoration-white/35 hover:underline-offset-[3px]";

const socialBtnClass =
  "inline-flex items-center gap-2 rounded-sm border border-white/18 bg-transparent px-4 py-2.5 font-sans text-[14px] font-medium text-white transition hover:border-[#113278] hover:bg-[#113278]/25 hover:text-white";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B1220] text-white">
      {/* Large crest — right side, vertically centered in main block (hidden on xs) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[min(52%,520px)] items-center justify-end pr-2 sm:flex lg:w-[min(46%,520px)] lg:pr-6"
        aria-hidden
      >
        <div className="relative aspect-square w-[min(72vw,400px)] max-w-[480px] opacity-[0.045] lg:w-[min(36vw,480px)] lg:opacity-[0.055]">
          <Image
            src="/brand/logo-transparent.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 400px, 480px"
            className="object-contain object-right brightness-0 invert"
          />
        </div>
      </div>

      {/* Very small screens: subtle mark, lower-right */}
      <div
        className="pointer-events-none absolute bottom-6 right-4 z-0 h-40 w-40 opacity-[0.03] sm:hidden"
        aria-hidden
      >
        <Image
          src="/brand/logo-transparent.png"
          alt=""
          width={160}
          height={160}
          className="h-full w-full object-contain object-bottom brightness-0 invert"
        />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 pb-12 pt-[72px] sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-[minmax(0,1.65fr)_repeat(3,minmax(0,1fr))] lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
          {/* Brand + social */}
          <div className="max-w-[280px] sm:col-span-2 sm:max-w-none lg:col-span-1 lg:pr-4">
            <p className={`${oswald.className} text-[13px] font-bold uppercase leading-snug tracking-[0.12em] text-white sm:text-sm`}>
              Flying Dutchmen Racing
            </p>
            <p className="mt-4 font-sans text-[13px] leading-relaxed text-[#9aa8c2]">
              Thoroughbred racing stable competing at the highest level.
            </p>
            <p className="mt-4 font-sans text-[13px] leading-relaxed text-[#8d9cb3]">
              Follow live updates, entries, results, and stable coverage.
            </p>

            <h2 className={`${columnHeading} mt-8`}>Follow the stable</h2>
            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <a
                href={SOCIAL_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtnClass}
              >
                <span className="inline-flex shrink-0 rounded-[3px] bg-white p-[2px] leading-none">
                  <InstagramLogo gradientId="fd-footer-instagram" className="h-4 w-4" />
                </span>
                Instagram <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <div className="sm:col-span-1 lg:col-span-1">
            <h2 className={columnHeading}>Navigation</h2>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-1 lg:col-span-1">
            <h2 className={columnHeading}>Stable</h2>
            <ul className="space-y-2.5">
              {STABLE_LINKS.map((item, i) => (
                <li key={`${item.href}-${item.label}-${i}`}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className={columnHeading}>Info</h2>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-12 border-t border-white/[0.12] sm:my-14" aria-hidden />

        <div className="flex flex-col gap-2 font-sans text-[11px] leading-snug text-[#8d9cb3] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="text-white/55">© 2026 Flying Dutchmen Racing</p>
          <p className="max-w-md sm:text-right">Live operation updates, entries, and performance reporting.</p>
        </div>
      </div>
    </footer>
  );
}
