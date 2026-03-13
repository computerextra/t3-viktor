"use client";

import { mitarbeiterColumns } from "@/app/_components/columns";
import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { GlobeIcon, SchoolIcon } from "lucide-react";

export default function MitarbeiterAnsicht() {
  const res = api.mitarbeiter.getAll.useQuery();

  if (res.isLoading)
    return <LoadingSkeleton desc="Mitarbeiter werden geladen" />;

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Mitarbeiter Übersicht</CardTitle>
        <CardDescription>
          <span className="flex items-center">
            <SchoolIcon className="size-4" />: Azubi
          </span>
          <span className="flex items-center">
            <GlobeIcon className="size-4" />: Auf Webseite
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={mitarbeiterColumns} data={res.data ?? []} />
      </CardContent>
    </Card>
  );
}
