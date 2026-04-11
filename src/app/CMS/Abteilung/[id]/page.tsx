import { api, HydrateClient } from "@/trpc/server";
import AbteilungCard from "../_components/card";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await api.abteilung.get.prefetch({ id });

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <AbteilungCard id={id} />
      </div>
    </HydrateClient>
  );
}
