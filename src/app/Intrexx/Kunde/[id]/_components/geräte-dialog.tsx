"use client";

import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { ColumnDef } from "@tanstack/react-table";
import { inferRouterOutputs } from "@trpc/server";
import { CheckCircleIcon, CrossIcon } from "lucide-react";
import Link from "next/link";

type RouterOutput = inferRouterOutputs<AppRouter>;
type IntrexxKunde = RouterOutput["intrexx_geräte"]["get"];

const columns: ColumnDef<IntrexxKunde["WA"][0]>[] = [
  {
    accessorKey: "L_XWANR_B9E0244D",
    header: "WA",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <Link href={"/Intrexx/WA/" + x.L_XWANR_B9E0244D} className="underline">
          {x.L_XWANR_B9E0244D}
        </Link>
      );
    },
  },
  { accessorKey: "STR_KUNDE_9218693C", header: "Kunde" },
  {
    accessorKey: "DTINSERT",
    header: "Datum",
    cell: ({ row }) => {
      const x = row.original;
      return x.DTINSERT?.toLocaleDateString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    },
  },
  { accessorKey: "STR_AUFTRAGSART_208E7536", header: "Auftragsart" },
  {
    accessorKey: "TXT_PROBLEMBZWAUFGABE_01724AEF",
    header: "Problem",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-34">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>
                {x.TXT_PROBLEMBZWAUFGABE_01724AEF}
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_PROBLEMBZWAUFGABE_01724AEF}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  { accessorKey: "STR_STATUS_8388673F", header: "Status" },
];

export default function GeräteDialog({
  Gerätenummer,
}: {
  Gerätenummer: number;
}) {
  const res = api.intrexx_geräte.get.useQuery({ id: Gerätenummer });

  if (res.isLoading) return <LoadingSkeleton desc="Gerät lädt..." />;

  const data = res.data?.Gerät;

  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Gerät: {data?.L_GERTENR_B4E6AEA5}</DialogTitle>
        <DialogDescription>
          <div className="grid grid-cols-5 gap-8">
            <div>
              <span className="font-bold">Bezugsquelle</span>
              <br />
              <span>{data?.STR_HERSTELLER_D957E082}</span>
            </div>
            <div>
              <span className="font-bold">Kaufdatum</span>
              <br />
              <span>
                {data?.DT_KAUFDATUM_701B435B?.toLocaleDateString("de-de", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div>
              <span className="font-bold">Garantie</span>
              <br />
              <span>{data?.STR_GARANTIE_E566FEB1}</span>
            </div>
            <div>
              <span className="font-bold">Vor-Ort</span>
              <br />
              <span>
                {data?.B_VORORT_BF77D997 ? (
                  <CheckCircleIcon className="size-4" />
                ) : (
                  <CrossIcon className="size-4 rotate-45" />
                )}
              </span>
            </div>
            <div>
              <span className="font-bold">Ausgemustert</span>
              <br />
              <span>
                {data?.B_AUSGEMUSTERT_622C2EFE ? (
                  <CheckCircleIcon className="size-4" />
                ) : (
                  <CrossIcon className="size-4 rotate-45" />
                )}
              </span>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div>
        <span className="font-semibold">Beschreibung</span>
        <br />
        <span className="text-md font-extralight">
          {data?.STR_BESCHREIBUNG_25EF44CB}
        </span>
      </div>
      <div>
        <span className="font-semibold">Konfiguration</span>
        <br />
        <span className="text-md font-extralight">
          {data?.STR_KONFIGURATION_E2BE31D5}
        </span>
      </div>
      <div>
        <span className="font-semibold">Bemerkung</span>
        <br />
        <span className="text-md font-extralight">{data?.TXT_BEMERKUNG}</span>
      </div>
      <h2>WA's</h2>
      <DataTable columns={columns} data={res.data?.WA ?? []} />
    </DialogContent>
  );
}
