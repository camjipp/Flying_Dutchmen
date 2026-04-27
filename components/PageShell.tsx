import { ReactNode } from "react";
import { oswald } from "@/components/fixture/fixtureStripShared";

interface PageShellProps {
  title: string;
  intro: string;
  children: ReactNode;
  showIntro?: boolean;
  /** Match homepage / strip section typography (Oswald headline + sans intro). */
  headlineVariant?: "default" | "fixture";
  /** Small uppercase line above title when `headlineVariant` is `fixture`. */
  headlineKicker?: string;
}

export function PageShell({
  title,
  intro,
  children,
  showIntro = true,
  headlineVariant = "default",
  headlineKicker = "Flying Dutchmen"
}: PageShellProps) {
  const isFixture = headlineVariant === "fixture";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      {showIntro ? (
        <section className={isFixture ? "mb-12 sm:mb-14" : "mb-10"}>
          {isFixture ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#113278]">
                {headlineKicker}
              </p>
              <h1
                className={`${oswald.className} mt-1 max-w-4xl text-xl font-bold uppercase leading-none tracking-tight text-slate-900 sm:text-2xl`}
              >
                {title}
              </h1>
              <p className="mt-1.5 max-w-3xl font-sans text-sm leading-relaxed text-slate-600">{intro}</p>
            </>
          ) : (
            <>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#8ea6d2]">Flying Dutchmen</p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-slate-600">{intro}</p>
            </>
          )}
        </section>
      ) : null}
      <div className="space-y-10">{children}</div>
    </main>
  );
}
