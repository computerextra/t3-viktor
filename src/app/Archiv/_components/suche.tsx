"use client";

import { DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type ArchivSuche = RouterOutput["archiv"]["search"];
type ArchivDownload = RouterOutput["archiv"]["get"];

export default function ArchivSuche() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<ArchivSuche | null>(null);
  const [data, setData] = useState<ArchivDownload | null>(null);

  const suche = api.archiv.search.useMutation({
    onSuccess: (res) => {
      setResults(res);
    },
  });

  const download = api.archiv.get.useMutation({
    onSuccess: (res) => {
      // TODO: öffne neuen tab für download der Datei
      setData(res);
    },
  });

  const columns: ColumnDef<ArchivSuche[0]>[] = [
    {
      accessorKey: "title",
      header: "Datei",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div
            className="cursor-pointer"
            onClick={async () => download.mutateAsync({ id: x.id })}
          >
            {x.title}
          </div>
        );
      },
    },
  ];

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>CE Archiv</CardTitle>
        <CardDescription>Freitextsuche im Rechnungsarchiv</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputGroup className="w-full">
            <InputGroupInput
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchbegriff..."
              disabled={suche.isPending}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                disabled={search == null}
                onClick={async () => suche.mutateAsync({ search: search! })}
                variant="secondary"
                type="submit"
              >
                {suche.isPending ? (
                  <>
                    Sucht...
                    <Spinner />
                  </>
                ) : (
                  "Suche"
                )}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>

        {results != null && <Separator className="my-8" />}
        {results != null && <DataTable data={results} columns={columns} />}
      </CardContent>
    </Card>
  );
}
