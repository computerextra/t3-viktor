"use client";

import LoadingSkeleton from "@/components/loading-skeleton";
import { api } from "@/trpc/react";

export default function WaAnsicht({ id }: { id: number }) {
  const res = api.intrexx_wa.get.useQuery({ waNummer: id });

  if (res.isLoading) return <LoadingSkeleton desc="WA Lädt" />;

  return (
    <div>
      {res.data?.WA?.L_XWANR_B9E0244D} <br />
      {res.data?.WA?.TXT_PROBLEMBZWAUFGABE_01724AEF}
      {res.data?.Einträge.map((x) => (
        <p key={x.LID}>{x.TXT_ARBEITSBESCHREIBU_F06ED27B}</p>
      ))}
    </div>
  );
}
