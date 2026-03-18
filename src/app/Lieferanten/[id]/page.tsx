import { api, HydrateClient } from "@/trpc/server";
import LieferantCard from "./_components/Lieferant-card";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await api.lieferant.get.prefetch({ id });

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <LieferantCard id={id} />
      </div>
    </HydrateClient>
  );
}
