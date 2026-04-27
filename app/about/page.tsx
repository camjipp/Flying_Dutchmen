import { AboutPageView } from "@/components/about/AboutPageView";
import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell title="" intro="" showIntro={false}>
      <section className="pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10 xl:pb-[100px]">
        <AboutPageView />
      </section>
    </PageShell>
  );
}
