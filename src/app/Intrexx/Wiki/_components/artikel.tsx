"use client";

import LoadingSkeleton from "@/components/loading-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";

export default function Artikel({ id }: { id: number }) {
  const res = api.intrexx_wiki.getArtikel.useQuery({ id });

  if (res.isLoading) return <LoadingSkeleton desc="Artikel lädt" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{res.data?.STRHEADLINE}</CardTitle>
        <CardDescription>{res.data?.STR_KATEGORIE_BD83BD5F}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="font-sans text-pretty">{res.data?.TXTWIKI}</pre>
      </CardContent>
      <CardFooter>
        Dateien und Bilder werden aktuell noch nicht unterstützt!
      </CardFooter>
    </Card>
  );
}
