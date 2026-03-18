import { api, HydrateClient } from "@/trpc/server";
import PartnerCard from "../_components/card";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  api.job.get.prefetch({ id });

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <PartnerCard id={id} />
      </div>
    </HydrateClient>
  );
}
