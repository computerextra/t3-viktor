import { api, HydrateClient } from "@/trpc/server";
import ReferenzCard from "../_components/card";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await api.referenz.get.prefetch({ id });

  return (
    <HydrateClient>
      <div className="container mx-auto">
        await <ReferenzCard id={id} />
      </div>
    </HydrateClient>
  );
}
