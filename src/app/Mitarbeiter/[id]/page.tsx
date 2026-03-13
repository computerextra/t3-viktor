import { api, HydrateClient } from "@/trpc/server";
import MitarbeiterCard from "./_components/mitarbeiter-card";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await api.mitarbeiter.getWithAbteilung.prefetch({ id });
  await api.abteilung.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <MitarbeiterCard id={id} />
      </div>
    </HydrateClient>
  );
}
