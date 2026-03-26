import { HydrateClient } from "@/trpc/server";
import ArtikelSuche from "./_components/kunden-suche";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Seriennummern für CE SN
        </h1>
        <ArtikelSuche />
      </div>
    </HydrateClient>
  );
}
