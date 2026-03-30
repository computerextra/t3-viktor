import { HydrateClient } from "@/trpc/server";
import InfoForm from "./_components/info-formular";

export default async function Page() {
  return (
    <HydrateClient>
      <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Info an Kunde
      </h1>
      <InfoForm />
    </HydrateClient>
  );
}
