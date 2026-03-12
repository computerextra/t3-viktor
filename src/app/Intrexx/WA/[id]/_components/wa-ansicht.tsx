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
import Link from "next/link";

type RouterOutput = inferRouterOutputs<AppRouter>;
type IntrexxKunde = RouterOutput["intrexx_wa"]["get"];

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
  { accessorKey: "STR_MITARBEITER_A8428B58", header: "Mitarbeiter" },
  { accessorKey: "STR_AUFTRASBERNAHME_3840D741", header: "Übernahme" },
  { accessorKey: "STR_ARBEITSPLATZ_2E4D7032", header: "Platz" },
  {
    accessorKey: "TXT_ARBEITSBESCHREIBU_F06ED27B",
    header: "Arbeitsbeschreibung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <p className="max-w-40 text-pretty">
          {x.TXT_ARBEITSBESCHREIBU_F06ED27B}
        </p>
      );
    },
  },
  { accessorKey: "L_DLINAW_721F5A16", header: "DL" },
  {
    accessorKey: "TXT_BEMERKUNG_E2C6836F",
    header: "Bemerkung",
    cell: ({ row }) => {
      const x = row.original;
      return <p className="max-w-40 text-pretty">{x.TXT_BEMERKUNG_E2C6836F}</p>;
    },
  },
  { accessorKey: "STR_KONTAKTART_A4F71515", header: "Kontaktart" },
  {
    accessorKey: "TXT_PROTOKOLL_53302FFD",
    header: "Protokoll",
    cell: ({ row }) => {
      const x = row.original;
      return <p className="max-w-40 text-pretty">{x.TXT_PROTOKOLL_53302FFD}</p>;
    },
  },
  {
    accessorKey: "TXT_BESCHREIBUNGDERTE_69AF1E49",
    header: "Teile",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <p className="max-w-25 text-pretty">
          {x.TXT_BESCHREIBUNGDERTE_69AF1E49}
        </p>
      );
    },
  },
  { accessorKey: "STR_MAILAN_D1E98BC9", header: "Mail an" },
];

export default function WaAnsicht({ id }: { id: number }) {
  const res = api.intrexx_wa.get.useQuery({ waNummer: id });

  if (res.isLoading) return <LoadingSkeleton desc="WA Lädt" />;

  return (
    <Card className="mx-auto mt-5 max-w-[80%]">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-sm font-light">
                {res.data?.WA?.STR_KUNDENUMMER_887CF8BA}
              </span>
              <p>{res.data?.WA?.STR_KUNDE_9218693C}</p>
              <p>{res.data?.WA?.STR_NAME2_9E85749A}</p>
            </div>
            <Button asChild>
              <Link
                href={"/Intrexx/Kunde/" + res.data?.WA?.L_INTREXXNR_A99FF71D}
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
                {res.data?.WA?.DTINSERT?.toLocaleDateString("de-de", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <p className="font-bold">WA Nr</p>
              <p>{res.data?.WA?.L_XWANR_B9E0244D}</p>
            </div>
            <div>
              <p className="font-bold">Auftragsart</p>
              <p>{res.data?.WA?.STR_AUFTRAGSART_208E7536}</p>
            </div>
            <div>
              <p className="font-bold">Geräteart</p>
              <p>{res.data?.WA?.STR_GERTEART_12378BB9}</p>
            </div>
            <div className="col-span-2">
              <p className="font-bold">Software kann gelöscht werden</p>
              <p>{res.data?.WA?.STR_SOFTWAREKANNGELSC_EC81CE09}</p>
            </div>
            <div>
              <p className="font-bold">Kennwort</p>
              <p>{res.data?.WA?.STR_KENNWORTBIOSBZWOS_5B0FD7F5}</p>
            </div>
            <div>
              <p className="font-bold">RMA</p>
              {res.data?.WA?.B_RMAAKTIV_F3426D1D ? (
                <p className="text-red-500">Aktiv</p>
              ) : (
                <p className="text-green-500">Inaktiv</p>
              )}
            </div>
            <div>
              <p className="font-bold">
                Gerät: {res.data?.WA?.L_GERT_18257601}
              </p>
              <p>{res.data?.WA?.STR_GERTEBESCHREIBUNG_08244125}</p>
              <p>{res.data?.WA?.STR_KONFIGURATION_B8E4AC36}</p>
            </div>
            <div>
              <p className="font-bold">Beschreibung des/r Geräte/s</p>
              <p>{res.data?.WA?.TXT_BESCHREIBUNGDESGE_D646B19B}</p>
            </div>
            <div>
              <p className="font-bold">Problem bzw. Aufgabenstellung</p>
              <p>{res.data?.WA?.TXT_PROBLEMBZWAUFGABE_01724AEF}</p>
            </div>
            <div>
              <p className="font-bold">
                Sachbearbeiter:{" "}
                <span className="font-light">
                  {res.data?.WA?.STR_SACHBEARBEITER_9F4B325E}
                </span>
              </p>
              <p className="font-bold">
                Kunde bringt:{" "}
                <span className="font-light">
                  {res.data?.WA?.DT_KUNDEBRINGTREINAM?.toLocaleDateString(
                    "de-de",
                    { day: "2-digit", month: "2-digit", year: "numeric" },
                  )}
                </span>
              </p>
              <p className="font-bold">
                Fixtermin:{" "}
                <span className="font-light">
                  {res.data?.WA?.DT_FIXTERMIN?.toLocaleDateString("de-de", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="font-bold">
                AU SAGE:{" "}
                <span className="font-light">
                  {res.data?.WA?.STR_AUFTRAGSNUMMERSAGE}
                </span>
              </p>
              <p className="font-bold">
                Gerät entsorgen ab:{" "}
                <span className="font-light">
                  {res.data?.WA?.DT_GERAETKANNENTSORGTWERDENAB?.toLocaleDateString(
                    "de-de",
                    { day: "2-digit", month: "2-digit", year: "numeric" },
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="text-foreground mt-2 w-fit rounded-lg border-2 p-2 text-2xl font-semibold">
            Status: {res.data?.WA?.STR_STATUS_8388673F}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={res.data?.Einträge ?? []} />
      </CardContent>
    </Card>
  );
}
