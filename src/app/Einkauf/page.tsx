import { HydrateClient } from "@/trpc/server";

import { Button } from "@/components/ui/button";
import PrintBtn from "@/app/Einkauf/_components/print-btn";
import MitarbeiterDialog from "@/app/Einkauf/_components/mitarbeiter-dialog";
import EinkaufCard from "@/app/Einkauf/_components/einkauf-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance print:hidden">
          Einkaufsliste
        </h1>
        <h1 className="mt-12 hidden scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance print:block print:text-black">
          An Post / Kaffee / Milch denken!
        </h1>

        <div className="mt-8 grid grid-cols-3 gap-4 print:hidden">
          <MitarbeiterDialog />
          <Button asChild size={"lg"}>
            <a
              href="https://www.edeka.de/maerkte/062700/prospekte/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edeka Blättchen
            </a>
          </Button>
          <PrintBtn />
        </div>
        <EinkaufCard />
      </div>
    </HydrateClient>
  );
}
