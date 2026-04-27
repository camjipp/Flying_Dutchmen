import { InstagramLogo } from "@/components/icons/InstagramLogo";
import { oswald } from "@/components/fixture/fixtureStripShared";

const SOCIAL_INSTAGRAM = "https://www.instagram.com/flyingdutchmenky/";

const btnInstagram =
  "inline-flex h-9 items-center justify-center gap-2 rounded-sm bg-[#113278] px-4 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[#0d265c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113278]/40 sm:h-10 sm:px-5";

const linkContact =
  "underline decoration-slate-300 underline-offset-[5px] transition hover:decoration-[#113278] hover:text-[#113278]";

export function ContactPageView() {
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="border-b border-slate-200/90 pb-14 pt-4 sm:pb-16 sm:pt-6 lg:pb-20 lg:pt-8">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#113278]">Contact</p>
          <h1
            className={`${oswald.className} mt-2 text-3xl font-bold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]`}
          >
            Racing operations and media inquiries.
          </h1>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg">
            We operate with a focused network and respond selectively to aligned opportunities.
          </p>
        </div>
      </section>

      {/* Operations — dominant */}
      <section className="border-b border-slate-200/90 py-14 sm:py-16 lg:py-20">
        <h2
          className={`${oswald.className} text-3xl font-bold uppercase tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]`}
        >
          Operations
        </h2>
        <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6">
          <a
            href="mailto:operations@flyingdutchmenracing.com"
            className={`${linkContact} text-xl font-semibold leading-snug text-slate-900 sm:text-2xl lg:text-[1.65rem]`}
          >
            operations@flyingdutchmenracing.com
          </a>
          <a
            href="tel:+18595550188"
            className={`${linkContact} text-xl font-semibold tabular-nums leading-snug text-slate-900 sm:text-2xl lg:text-[1.65rem]`}
          >
            +1 (859) 555-0188
          </a>
          <p className="font-sans text-xl font-semibold leading-snug text-slate-900 sm:text-2xl lg:text-[1.65rem]">
            Lexington, Kentucky
          </p>
        </div>
      </section>

      {/* Media — secondary */}
      <section className="border-b border-slate-200/90 py-12 sm:py-14 lg:py-16">
        <h2 className={`${oswald.className} text-xs font-bold uppercase tracking-[0.2em] text-[#113278]`}>Media</h2>
        <div className="mt-5 max-w-xl space-y-3 sm:mt-6">
          <a
            href="mailto:press@flyingdutchmenracing.com"
            className={`${linkContact} block text-base font-semibold text-slate-800 sm:text-lg`}
          >
            press@flyingdutchmenracing.com
          </a>
          <p className="font-sans text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            Response window: 24–48 hours
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <h2 className={`${oswald.className} text-2xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-3xl`}>
            Follow the stable
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-slate-600 sm:text-lg">
            Track runners, entries, and performance in real time.
          </p>
          <div className="mt-8 sm:mt-10">
            <a href={SOCIAL_INSTAGRAM} className={btnInstagram} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex shrink-0 rounded-[3px] bg-white p-[2px] leading-none">
                <InstagramLogo gradientId="fd-contact-instagram" className="h-4 w-4" />
              </span>
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
