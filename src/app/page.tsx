import Clock from "@/app/_components/clock";
import GeburtstagsListe from "@/app/_components/geburtstags-liste";
import { HydrateClient } from "@/trpc/server";

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
