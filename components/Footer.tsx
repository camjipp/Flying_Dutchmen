import Image from "next/image";
import Link from "next/link";
import { oswald } from "@/components/fixture/fixtureStripShared";

const SOCIAL_INSTAGRAM = "https://www.instagram.com/flyingdutchmenky/";
const SOCIAL_X = "https://x.com/flyingdutchmen";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/horses", label: "Horses" },
  { href: "/results", label: "Results" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" }
] as const;

const columnHeading =
  "mb-3 font-sans text-[9px] font-semibold uppercase tracking-[0.11em] text-[#7f97c9]";

const footerNavLinkClass =
  "block w-fit text-sm leading-snug text-gray-300 transition hover:text-white";

const socialPillClass =
  "inline-flex items-center rounded-lg border border-white/20 px-4 py-2 font-sans text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/5";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B1220] text-white">
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
        <div className="flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-x-10 md:gap-y-0 xl:gap-x-12">
          {/* A — Brand */}
          <div className="max-w-md md:max-w-none">
            <p className={`${oswald.className} text-[13px] font-bold uppercase leading-snug tracking-[0.12em] text-white sm:text-sm`}>
              Flying Dutchmen Racing
            </p>
            <p className="mt-4 font-sans text-[13px] leading-relaxed text-[#9aa8c2]">
              Thoroughbred racing stable competing at the highest level.
            </p>
            <p className="mt-4 font-sans text-[13px] leading-relaxed text-[#8d9cb3]">
              Follow live updates, entries, results, and stable coverage.
            </p>
          </div>

          {/* B — Social */}
          <div>
            <div>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-gray-400">
                Follow the stable
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SOCIAL_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPillClass}
                >
                  Instagram <span aria-hidden>→</span>
                </a>
                <a href={SOCIAL_X} target="_blank" rel="noopener noreferrer" className={socialPillClass}>
                  X <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* C — Navigation */}
          <div>
            <h2 className={columnHeading}>Navigation</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerNavLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* D — Legal */}
          <div>
            <h2 className={columnHeading}>Legal</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerNavLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 font-sans text-xs leading-snug text-gray-400 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="text-white/55">© 2026 Flying Dutchmen Racing</p>
          <p className="max-w-md sm:text-right">Live operation updates, entries, and performance reporting.</p>
        </div>
      </div>
    </footer>
  );
}
