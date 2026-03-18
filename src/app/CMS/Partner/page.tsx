import { HydrateClient } from "@/trpc/server";
import PartnerAnsicht from "./_components/übersicht";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <PartnerAnsicht />
      </div>
    </HydrateClient>
  );
}
