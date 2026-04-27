import { ContactPageView } from "@/components/contact/ContactPageView";
import { PageShell } from "@/components/PageShell";

export default function ContactPage() {
  return (
    <PageShell title="" intro="" showIntro={false}>
      <section className="pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10 xl:pb-[100px]">
        <ContactPageView />
      </section>
    </PageShell>
  );
}
