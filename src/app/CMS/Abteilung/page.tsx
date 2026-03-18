import { HydrateClient } from "@/trpc/server";
import AbteilungenAnsicht from "./_components/übersicht";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <AbteilungenAnsicht />
      </div>
    </HydrateClient>
  );
}
