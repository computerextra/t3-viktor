import { api, HydrateClient } from "@/trpc/server";
import KundenAnsicht from "./_components/kunden-ansicht";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await api.intrexx_kunden.get.prefetch({ id: parseInt(id) });

  return (
    <HydrateClient>
      <KundenAnsicht id={parseInt(id)} />
    </HydrateClient>
  );
}
