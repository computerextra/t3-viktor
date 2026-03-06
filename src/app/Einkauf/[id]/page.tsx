import { api, HydrateClient } from "@/trpc/server";
import EinkaufForm from "../_components/einkauf-form";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance print:hidden">
          Einkauf bearbeiten
        </h1>
        <EinkaufForm id={id} />
      </div>
    </HydrateClient>
  );
}
