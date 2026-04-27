import { notFound } from "next/navigation";
import { HorseProfileView } from "@/components/horse-profile/HorseProfileView";
import { horses, news, results, spotlightItems } from "@/lib/data";

interface HorseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function HorseDetailPage({ params }: HorseDetailPageProps) {
  const { slug } = await params;
  const horse = horses.find((item) => item.slug === slug);

  if (!horse) {
    notFound();
  }

  const horseResults = results
    .filter((item) => item.horseSlug === horse.slug)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return (
    <HorseProfileView horse={horse} horseResults={horseResults} spotlightItems={spotlightItems} newsItems={news} />
  );
}
