import Image from "next/image";
import Link from "next/link";
import { oswald, STRIP_BG } from "@/components/fixture/fixtureStripShared";

const philosophy = [
  {
    title: "Global racing standard",
    body: "We campaign with intent — placing horses where they can win, develop, and build long-term value."
  },
  {
    title: "Disciplined execution",
    body: "Every start is planned. Every move is deliberate. No wasted entries, no random placement."
  },
  {
    title: "Long-term value creation",
    body: "We balance immediate performance with long-term bloodstock upside."
  }
] as const;

const operationLines = [
  "Based in Kentucky",
  "Campaigning across major circuits",
  "Focused on graded-level competition"
] as const;

export function AboutPageView() {
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="border-b border-slate-200/90 pb-14 pt-4 sm:pb-16 sm:pt-6 lg:pb-20 lg:pt-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0 max-w-xl lg:max-w-none">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#113278]">Flying Dutchmen</p>
            <h1
              className={`${oswald.className} mt-2 text-3xl font-bold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]`}
            >
              Built to compete at the highest level.
            </h1>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg">
              A performance-first thoroughbred operation focused on elite placement, long-term development, and
              disciplined execution.
            </p>
          </div>
          <div className="relative aspect-[5/4] min-h-[220px] w-full overflow-hidden bg-slate-200 sm:min-h-[280px] lg:aspect-[16/11] lg:min-h-[300px]">
            <Image
              src="/images/Hero_section.jpg"
              alt="Thoroughbred racing"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 to-transparent" aria-hidden />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <div className="divide-y divide-slate-200/90">
        {philosophy.map((block) => (
          <section key={block.title} className="py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              <h2
                className={`${oswald.className} text-2xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem]`}
              >
                {block.title}
              </h2>
              <p className="mt-5 font-sans text-base leading-relaxed text-slate-600 sm:text-lg lg:mt-6">{block.body}</p>
            </div>
          </section>
        ))}
      </div>

      {/* The operation */}
      <section className="border-y border-slate-200/90 py-12 sm:py-14">
        <p className={`${oswald.className} text-xs font-bold uppercase tracking-[0.2em] text-[#113278]`}>
          The operation
        </p>
        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-0">
          {operationLines.map((line, i) => (
            <p
              key={line}
              className={`font-sans text-sm font-semibold leading-snug text-slate-800 sm:border-l sm:border-slate-200/90 sm:pl-8 sm:text-[15px] ${i === 0 ? "sm:border-l-0 sm:pl-0" : ""}`}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Visual break */}
      <div
        className="relative left-1/2 right-1/2 -mx-[50vw] mt-2 min-h-[180px] w-screen max-w-[100vw] sm:min-h-[220px] lg:min-h-[260px]"
        style={{ background: STRIP_BG }}
        aria-hidden
      />

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <h2 className={`${oswald.className} text-2xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-3xl`}>
            Follow the stable
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-slate-600 sm:text-lg">
            Track runners, results, and campaign activity in real time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Link
              href="/horses"
              className="inline-flex h-9 items-center justify-center rounded-sm bg-[#113278] px-4 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[#0d265c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113278]/40 sm:h-10 sm:px-5"
            >
              View Horses
            </Link>
            <Link
              href="/results"
              className="inline-flex h-9 items-center justify-center rounded-sm border border-[#113278] bg-white px-4 text-[11px] font-bold uppercase tracking-wide text-[#113278] transition hover:bg-[#f0f4fc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#113278]/40 sm:h-10 sm:px-5"
            >
              Results
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
