import { PageShell } from "@/components/PageShell";
import { RosterClient } from "@/components/RosterClient";
import { horses } from "@/lib/data";

export default function HorsesPage() {
  return (
    <PageShell
      title="Stable Roster"
      intro="Current and past runners"
      headlineVariant="fixture"
    >
      <RosterClient horses={horses} />
    </PageShell>
  );
}
