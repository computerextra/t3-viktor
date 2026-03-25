import { HydrateClient } from "@/trpc/server";
import ArchivSuche from "./_components/suche";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <ArchivSuche />
      </div>
    </HydrateClient>
  );
}
