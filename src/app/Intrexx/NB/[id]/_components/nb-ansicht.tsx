"use client";

import { DataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import { CheckCircle, CrossIcon } from "lucide-react";
import Link from "next/link";

type RouterOutput = inferRouterOutputs<AppRouter>;
type IntrexxKunde = RouterOutput["intrexx_nb"]["get"];

const columns: ColumnDef<IntrexxKunde["Einträge"][0]>[] = [
  {
    accessorKey: "DTINSERT",
    header: "Datum",
    cell: ({ row }) => {
      const x = row.original;

      return x.DTINSERT?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  { accessorKey: "STR_MITARBEITER_30090B2F", header: "Mitarbeiter" },
  { accessorKey: "STR_AUFRAGSBERNAHME_6F7FD0F5", header: "Übernahme" },
  { accessorKey: "STR_ARBEITSPLATZ_EBCD8019", header: "Platz" },
  {
    accessorKey: "TXT_ARBEITSBESCHREIBU_A6CBE101",
    header: "Arbeitsbeschreibung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <p className="max-w-40 text-pretty">
          {x.TXT_ARBEITSBESCHREIBU_A6CBE101}
        </p>
      );
    },
  },
  { accessorKey: "STR_ARBEITSZEIT_F51BF965", header: "DL" },
  {
    accessorKey: "TXT_BEMERKUNG_BB3DCF25",
    header: "Bemerkung",
    cell: ({ row }) => {
      const x = row.original;
      return <p className="max-w-40 text-pretty">{x.TXT_BEMERKUNG_BB3DCF25}</p>;
    },
  },
  { accessorKey: "STR_KONTAKTART_F9DE5EF8", header: "Kontaktart" },
  {
    accessorKey: "TXT_PROTOKOLL_D77E5076",
    header: "Protokoll",
    cell: ({ row }) => {
      const x = row.original;
      return <p className="max-w-40 text-pretty">{x.TXT_PROTOKOLL_D77E5076}</p>;
    },
  },
  { accessorKey: "STR_MAILAN_B8C02467", header: "Mail an" },
];

export default function NbAnsicht({ id }: { id: string }) {
  const res = api.intrexx_nb.get.useQuery({ AuNummer: id });

  if (res.isLoading) return <LoadingSkeleton desc="NB Lädt" />;

  return (
    <Card className="mx-auto mt-5 max-w-[80%]">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-sm font-light">
                {res.data?.NB?.STR_KUNDENUMMER_545CBACC}
              </span>
              <p>{res.data?.NB?.STR_KUNDE_6B1979C7}</p>
              <p>{res.data?.NB?.STR_NAME2_8BD5DB2A}</p>
            </div>
            <Button asChild>
              <Link
                href={"/Intrexx/Kunde/" + res.data?.NB?.L_INTREXXNR_AE6C9D81}
              >
                Kundenansicht
              </Link>
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className="font-bold">Erstellungsdatum</p>
              <p>
                {res.data?.NB?.DTINSERT?.toLocaleDateString("de-de", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <p className="font-bold">Auftragsdatum SAGE</p>
              <p>
                {res.data?.NB?.DT_AUFTRAGSDATUMKHK_CA977541?.toLocaleDateString(
                  "de-de",
                  { day: "2-digit", month: "2-digit", year: "numeric" },
                )}
              </p>
            </div>
            <div>
              <p className="font-bold">Auftragsnr</p>
              <p>{res.data?.NB?.STR_AUFTRAGSNUMMERKHK_E440E7D0}</p>
            </div>
            <div></div>
            <div className="col-span-2">
              <p className="font-bold">Fehlteile</p>
              <pre className="font-sans">
                {res.data?.NB?.TXT_FEHLTEILE_A0F28CFE}
              </pre>
            </div>
            <div>
              <p className="font-bold">Eilauftrag</p>
              {res.data?.NB?.B_EILAUFTRAG_7D1E7E98 ? (
                <CheckCircle className="size-4 text-green-500" />
              ) : (
                <CrossIcon className="size-4 rotate-45" />
              )}
            </div>
            <div>
              <p className="font-bold">Fixtermin</p>
              {res.data?.NB?.DT_FIXTERMIN_4019DB73?.toLocaleDateString(
                "de-de",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                },
              )}
            </div>
            <div>
              <p className="font-bold">Verkäufer</p>
              <p>{res.data?.NB?.STR_VERKUFER_679A6C41}</p>
            </div>
            <div>
              <p className="font-bold">Kommissionierer</p>
              <p>{res.data?.NB?.STR_KOMMISSIONIERER_72028765}</p>
            </div>
            <div className="col-span-2">
              <p className="font-bold">
                Gerät: {res.data?.NB?.L_GERTENR_37F271AA}
              </p>
              <p>{res.data?.NB?.STR_BESCHREIBUNG_5F254E86}</p>
              <p>{res.data?.NB?.STR_KONFIGURATION_2C3567B0}</p>
              <p>{res.data?.NB?.STR_BEZUGSQUELLE_EAAE498D}</p>
            </div>
          </div>
          <div className="text-foreground mt-2 w-fit rounded-lg border-2 p-2 text-2xl font-semibold">
            Status: {res.data?.NB?.STR_STATUS_549CBC40}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={res.data?.Einträge ?? []} />
      </CardContent>
    </Card>
  );
}
