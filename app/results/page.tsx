import { ResultsPageView } from "@/components/results/ResultsPageView";
import { horses, results, upcomingRunners } from "@/lib/data";

export default function ResultsPage() {
  return <ResultsPageView results={results} upcomingRunners={upcomingRunners} horses={horses} />;
}
