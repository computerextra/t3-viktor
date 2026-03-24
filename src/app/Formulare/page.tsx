import { HydrateClient } from "@/trpc/server";
import FormularAuswahl from "./_components/formular-auswahl";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <FormularAuswahl />
      </div>
    </HydrateClient>
  );
}
