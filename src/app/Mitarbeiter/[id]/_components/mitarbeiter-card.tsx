"use client";

import { api } from "@/trpc/react";
import MitarbeiterForm from "../../_components/mitarbeiter-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MitarbeiterCard({ id }: { id: string }) {
  const [data] = api.mitarbeiter.getWithAbteilung.useSuspenseQuery({ id });

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>{data?.name}</CardTitle>
        <CardDescription>{data?.Abteilung?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <MitarbeiterForm mitarbeiter={data} />
      </CardContent>
    </Card>
  );
}
