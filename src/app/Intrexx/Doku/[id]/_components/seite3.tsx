"use client";

import {
  columnGeräte,
  columnsNB,
  columnWA,
} from "@/app/Intrexx/Kunde/[id]/_components/columns";
import { PaginatedSearchDataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { type inferRouterOutputs } from "@trpc/server";
import { CheckCircle, Cross } from "lucide-react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type DokuVerträge = RouterOutput["intrexx_rechnungen"]["vertäge"];
const VertragsColumns: ColumnDef<DokuVerträge[0]>[] = [
  {
    accessorKey: "STR_VERTRAGSART_B4558E9B",
    header: "Vertragsart",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-w-40">
          <p className="line-clamp-4 text-pretty">
            {x.STR_VERTRAGSART_B4558E9B}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_DOMAIN_1D8CB061",
    header: "Domain",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-w-40">
          <p className="line-clamp-4 text-pretty">{x.STR_DOMAIN_1D8CB061}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "DT_VERTRAGSBEGINN_A3EA16C9",
    header: "Beginn",
    cell: ({ row }) => {
      const x = row.original;
      return x.DT_VERTRAGSBEGINN_A3EA16C9?.toLocaleDateString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "DT_ABLAUFDATUM_D2DCDDA9",
    header: "Ablauf",
    cell: ({ row }) => {
      const x = row.original;
      return x.DT_ABLAUFDATUM_D2DCDDA9?.toLocaleDateString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "B_AKTIV_7A0C7651",
    header: "Aktiv",
    cell: ({ row }) => {
      const x = row.original;
      if (x.B_AKTIV_7A0C7651)
        return <CheckCircle className="size-4 text-green-500" />;
      return <Cross className="size-4 rotate-45 text-red-500" />;
    },
  },
];

export default function Seite3({ id }: { id: number }) {
  const res = api.intrexx_kunden.get.useQuery({ id });
  const verträge = api.intrexx_rechnungen.vertäge.useQuery({ id });

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-center">Werkstattaufträge</h3>
            {res.isLoading ? (
              <LoadingSkeleton desc="Werkstattaufträge laden..." />
            ) : (
              <PaginatedSearchDataTable
                filter="L_XWANR_B9E0244D"
                label="Wa Nummer"
                columns={columnWA}
                data={res.data?.WA ?? []}
              />
            )}
          </div>

          <div>
            <h3 className="text-center">Geräte</h3>
            {res.isLoading ? (
              <LoadingSkeleton desc="Geräte laden..." />
            ) : (
              <PaginatedSearchDataTable
                filter="L_GERTENR_B4E6AEA5"
                label="Geräte Nummer"
                columns={columnGeräte}
                data={res.data?.Geräte ?? []}
              />
            )}
          </div>

          <div>
            <h3 className="text-center">Verträge</h3>
            {verträge.isLoading ? (
              <LoadingSkeleton desc="Verträge laden..." />
            ) : (
              <PaginatedSearchDataTable
                filter="STR_VERTRAGSART_B4558E9B"
                label="Vertragsart"
                columns={VertragsColumns}
                data={verträge.data ?? []}
              />
            )}
          </div>

          <div>
            <h3 className="text-center">Neubauten</h3>
            {res.isLoading ? (
              <LoadingSkeleton desc="Neubauten laden..." />
            ) : (
              <PaginatedSearchDataTable
                filter="STR_AUFTRAGSNUMMERKHK_E440E7D0"
                label="Auftragsnummer"
                columns={columnsNB}
                data={res.data?.NB ?? []}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
