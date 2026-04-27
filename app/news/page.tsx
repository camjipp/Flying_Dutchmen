import { NewsPageView } from "@/components/news/NewsPageView";
import { PageShell } from "@/components/PageShell";
import { news, stableNewsNotes } from "@/lib/data";

export default function NewsPage() {
  return (
    <PageShell title="" intro="" showIntro={false}>
      <NewsPageView news={news} stableNotes={stableNewsNotes} />
    </PageShell>
  );
}
