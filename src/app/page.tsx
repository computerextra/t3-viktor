import { api, HydrateClient } from "@/trpc/server";
import Clock from "./_components/clock";
import GeburtstagsListe from "./_components/geburtstags-liste";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Viktor
        </h1>
        <Clock />
        <GeburtstagsListe />
      </div>
    </HydrateClient>
  );
}
