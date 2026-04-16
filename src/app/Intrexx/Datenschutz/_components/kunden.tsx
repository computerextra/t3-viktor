"use client";
import { PaginatedSearchDataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { type inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Kunden = RouterOutput["intrexx_kunden"]["ohneDatenschutz"];

export default function Kunden() {
  const kunden = api.intrexx_kunden.ohneDatenschutz.useQuery();

  if (kunden.isLoading) return <LoadingSkeleton desc="Kunden laden" />;

  const columns: ColumnDef<Kunden[0]>[] = [
    { accessorKey: "STR_KUNDENNUMMER_D45D177B", header: "Kundennummer" },
    { accessorKey: "STR_NAME_5FE19153", header: "Name" },
  ];

  return (
    <PaginatedSearchDataTable
      columns={columns}
      data={kunden.data ?? []}
      filter="STR_KUNDENNUMMER_D45D177B"
      label="Kundennummer"
    />
  );
}
