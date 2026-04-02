"use client";

import LoadingSkeleton from "@/components/loading-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";

export default function Seite1({ id }: { id: number }) {
  const server = api.intrexx_doku.getServer.useQuery({ id });
  const workstations = api.intrexx_doku.workstations.useQuery({ id });
  const konten = api.intrexx_doku.konten.useQuery({ id });
  const software = api.intrexx_doku.software.useQuery({ id });
  const email = api.intrexx_doku.email.useQuery({ id });
  const drucker = api.intrexx_doku.drucker.useQuery({ id });
  const netzwerkgeräte = api.intrexx_doku.netzwerkgeräte.useQuery({ id });
  const zugangsdaten = api.intrexx_doku.zugangsdaten.useQuery({ id });
  const sonstiges = api.intrexx_doku.sonstiges.useQuery({ id });

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-3 gap-8">{/* TODO: Tables */}</div>
      </CardContent>
    </Card>
  );
}
