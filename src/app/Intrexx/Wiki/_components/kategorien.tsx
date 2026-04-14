"use client";

import { PaginatedSearchDataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { type inferRouterOutputs } from "@trpc/server";
import Link from "next/link";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Kategorie = RouterOutput["intrexx_wiki"]["kategorien"];

export default function Kategorien() {
  const kategorien = api.intrexx_wiki.kategorien.useQuery();

  const Columns: ColumnDef<Kategorie[0]>[] = [
    {
      accessorKey: "STR_KATEGORIE_6D894D0A",
      header: "Name",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <Link href={"/Intrexx/Wiki/Kategorien/" + x.LID}>
            {x.STR_KATEGORIE_6D894D0A}
          </Link>
        );
      },
    },
  ];

  if (kategorien.isLoading)
    return <LoadingSkeleton desc="Kategorien werden geladen" />;

  return (
    <PaginatedSearchDataTable
      columns={Columns}
      data={kategorien.data ?? []}
      filter="STR_KATEGORIE_6D894D0A"
      label="Kategorie"
    />
  );
}
