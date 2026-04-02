import { HydrateClient } from "@/trpc/server";
import DokuAnsicht from "./_components/doku-ansicht";
export const dynamic = "force-dynamic";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <HydrateClient>
      <DokuAnsicht id={parseInt(id)} />
    </HydrateClient>
  );
}
