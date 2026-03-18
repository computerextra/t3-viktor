"use client";

import { AngeboteColumns } from "@/app/_components/columns";
import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { api } from "@/trpc/react";
import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { useRouter } from "next/navigation";

export default function AngboteAnsicht() {
  const res = api.angebot.getAll.useQuery();

  const navigate = useRouter();

  useHotkey("Shift+N", () => navigate.push("/CMS/Angebot/new"), {
    conflictBehavior: "replace",
    preventDefault: true,
  });

  if (res.isLoading) return <LoadingSkeleton desc="Angebote werden geladen" />;

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Angebote Übersicht</CardTitle>
        <CardDescription>
          <span className="flex items-center">
            <Kbd>{formatForDisplay("Shift+N")}</Kbd>: Neu
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={AngeboteColumns} data={res.data ?? []} />
      </CardContent>
    </Card>
  );
}
