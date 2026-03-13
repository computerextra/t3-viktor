import { HydrateClient } from "@/trpc/server";
import KundenSuche from "./_components/kunden-suche";

export const dynamic = "force-dynamic";

export default async function page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Intrexx Kundensuche
        </h1>
        <KundenSuche />
      </div>
    </HydrateClient>
  );
}
