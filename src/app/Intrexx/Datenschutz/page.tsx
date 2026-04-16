import { HydrateClient } from "@/trpc/server";
import Kunden from "./_components/kunden";

export const dynamic = "force-dynamic";

export default async function page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Kunden ohne "Datenschutzzettel"
        </h1>
        <Kunden />
      </div>
    </HydrateClient>
  );
}
