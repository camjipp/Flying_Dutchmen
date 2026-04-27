import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { news } from "@/lib/data";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = news.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <PageShell title={item.title} intro={`${item.date} / ${item.category}`}>
      <article className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-zinc-300">{item.body}</p>
      </article>
    </PageShell>
  );
}
