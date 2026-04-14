import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import ArtikelSuche from "./_components/artikel-suche";

export const dynamic = "force-dynamic";

export default async function page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          CE Wiki
        </h1>
        <div className="my-8 grid grid-cols-3 gap-8">
          <Button asChild>
            <Link href={"/Intrexx/Wiki/Kategorien"}>Alle Kategorien</Link>
          </Button>
          <Button asChild>
            <Link href={"/Intrexx/Wiki/Artikel"}>Alle Artikel</Link>
          </Button>
          <Button disabled>Neuen Artikel</Button>
        </div>
        {/* Artikel Suche */}
        <ArtikelSuche />
      </div>
    </HydrateClient>
  );
}
