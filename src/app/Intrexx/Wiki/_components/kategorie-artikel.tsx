"use client";

import { PaginatedSearchDataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { type inferRouterOutputs } from "@trpc/server";
import Link from "next/link";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Artikel = RouterOutput["intrexx_wiki"]["artikelAusKategorie"];

export default function KategorieArtikel({ id }: { id: number }) {
  const Artikel = api.intrexx_wiki.artikelAusKategorie.useQuery({ id });

  const Columns: ColumnDef<Artikel[0]>[] = [
    {
      accessorKey: "STRHEADLINE",
      header: "Überschrift",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-50">
            <Link
              href={"/Intrexx/Wiki/Artikel/" + x.LID}
              className="line-clamp-4 text-pretty"
            >
              {x.STRHEADLINE}
            </Link>
          </div>
        );
      },
    },
    { accessorKey: "STR_KATEGORIE_BD83BD5F", header: "Kategorie" },
    {
      accessorKey: "TXTWIKI",
      header: "Inhalt",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-280">
            <pre className="line-clamp-6 font-sans text-pretty">
              {x.TXTWIKI}
            </pre>
          </div>
        );
      },
    },
  ];

  if (Artikel.isLoading) return <LoadingSkeleton desc="Artikel laden" />;

  return (
    <PaginatedSearchDataTable
      filter="STRHEADLINE"
      label="Überschrift"
      columns={Columns}
      data={Artikel.data ?? []}
    />
  );
}
