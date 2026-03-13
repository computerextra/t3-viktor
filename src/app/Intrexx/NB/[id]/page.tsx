import { HydrateClient } from "@/trpc/server";
import NbAnsicht from "./_components/nb-ansicht";
export const dynamic = "force-dynamic";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <HydrateClient>
      <NbAnsicht id={id} />
    </HydrateClient>
  );
}
