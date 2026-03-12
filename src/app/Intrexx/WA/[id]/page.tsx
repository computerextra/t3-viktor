import { HydrateClient } from "@/trpc/server";
import WaAnsicht from "./_components/wa-ansicht";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <HydrateClient>
      <h1>WA</h1>
      <WaAnsicht id={parseInt(id)} />
    </HydrateClient>
  );
}
