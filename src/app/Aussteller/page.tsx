import { HydrateClient } from "@/trpc/server";
import TestBtn from "./_components/sync-btn";
import BildForm from "./_components/bild-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="text-center text-2xl font-bold">
          Digitale Preisschilder
        </h1>
        <div className="my-12 flex justify-center">
          <TestBtn />
        </div>
        <h2 className="text-center">Bild Aktualisieren</h2>
        <BildForm />
      </div>
    </HydrateClient>
  );
}
