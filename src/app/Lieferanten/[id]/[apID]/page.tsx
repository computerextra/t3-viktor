import { api, HydrateClient } from "@/trpc/server";
import AnsprechpartnerCard from "../_components/ansprechpartner-card";

export default async function Page({
  params,
}: {
  params: Promise<{ apID: string; id: string }>;
}) {
  const { apID, id } = await params;
  await api.ansprechpartner.get.prefetch({ id: apID });

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <AnsprechpartnerCard id={apID} lieferantenId={id} />
      </div>
    </HydrateClient>
  );
}
