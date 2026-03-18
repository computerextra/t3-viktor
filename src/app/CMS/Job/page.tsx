import { HydrateClient } from "@/trpc/server";
import JobAnsicht from "./_components/übersicht";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <JobAnsicht />
      </div>
    </HydrateClient>
  );
}
