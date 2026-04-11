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
import { cn } from "@/lib/utils";
import type { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type ArchivSuche = RouterOutput["archiv"]["search"];

export default function ArchivSuche() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<ArchivSuche | null>(null);

  const suche = api.archiv.search.useMutation({
    onSuccess: (res) => {
      setResults(res);
    },
  });

  const download = api.archiv.get.useMutation({
    onSuccess: (res) => {
      if (res == null) {
        alert("Download konnte nicht gestartet werden!");
        return;
      }
      const byteChars = atob(res);
      const byteNumbers = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++)
        byteNumbers[i] = byteChars.charCodeAt(i);
      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      const fileName = "download.pdf";
      link.download = fileName;
      link.click();
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
            className={cn(
              download.isPending ? "line-through" : "cursor-pointer",
            )}
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
              disabled={suche.isPending || download.isPending}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                disabled={search == null || download.isPending}
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
