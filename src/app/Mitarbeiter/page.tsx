import { HydrateClient } from "@/trpc/server";
import MitarbeiterAnsicht from "./_components/übersicht";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <MitarbeiterAnsicht />
      </div>
    </HydrateClient>
  );
}
