"use client";

import type { AppRouter } from "@/server/api/root";
import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import type { XFILEDATAGROUP6 } from "../../../../../../generated/intrexx/client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircleIcon, CrossIcon } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import GeräteDialog from "./geräte-dialog";

type RouterOutput = inferRouterOutputs<AppRouter>;
type IntrexxKunde = RouterOutput["intrexx_kunden"]["get"];

export const columnsIrgendwas: ColumnDef<XFILEDATAGROUP6>[] = [
  { accessorKey: "LID" },
  { accessorKey: "STRFILENAME" },
  { accessorKey: "STRURL" },
  { accessorKey: "STRCONTENTTYPE" },
  { accessorKey: "LUSERID" },
  { accessorKey: "DTINSERT" },
  { accessorKey: "LUSERIDINSERT" },
  { accessorKey: "FKLID" },
  { accessorKey: "DTEDIT" },
  { accessorKey: "DTLASTMODIFY" },
  { accessorKey: "STRMETA" },
  { accessorKey: "LORDER" },
];

export const columnGeräte: ColumnDef<IntrexxKunde["Geräte"][0]>[] = [
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
  {
    accessorKey: "L_GERTENR_B4E6AEA5",
    header: "GN",
    cell: ({ row }) => {
      const x = row.original;
      if (x.L_GERTENR_B4E6AEA5)
        return (
          <Dialog>
            <DialogTrigger>{x.L_GERTENR_B4E6AEA5}</DialogTrigger>
            <GeräteDialog Gerätenummer={x.L_GERTENR_B4E6AEA5} />
          </Dialog>
        );
    },
  },
  {
    accessorKey: "STR_BESCHREIBUNG_25EF44CB",
    header: "Beschreibung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-25">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_BESCHREIBUNG_25EF44CB}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_BESCHREIBUNG_25EF44CB}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_KONFIGURATION_E2BE31D5",
    header: "Config",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-25">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_KONFIGURATION_E2BE31D5}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_KONFIGURATION_E2BE31D5}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  { accessorKey: "STR_HERSTELLER_D957E082", header: "Bezug" },
  {
    accessorKey: "TXT_BEMERKUNG",
    header: "Bemerkung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-25">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.TXT_BEMERKUNG}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_BEMERKUNG}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  { accessorKey: "STR_GARANTIE_E566FEB1", header: "Garantie" },
  {
    accessorKey: "B_VORORT_BF77D997",
    header: "VOS",
    cell: ({ row }) => {
      const x = row.original;
      if (x.B_VORORT_BF77D997)
        return <CheckCircleIcon className="size-4 text-green-500" />;
      else return <CrossIcon className="size-4 rotate-45 text-red-500" />;
    },
  },
  {
    accessorKey: "B_AUSGEMUSTERT_622C2EFE",
    header: "Ausgemustert",
    cell: ({ row }) => {
      const x = row.original;
      if (x.B_AUSGEMUSTERT_622C2EFE)
        return <CheckCircleIcon className="size-4 text-green-500" />;
      else return <CrossIcon className="size-4 rotate-45 text-red-500" />;
    },
  },
];

export const columnWA: ColumnDef<IntrexxKunde["WA"][0]>[] = [
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
  {
    accessorKey: "L_XWANR_B9E0244D",
    header: "WA Nr.",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <Link href={"/Intrexx/WA/" + x.L_XWANR_B9E0244D} className="underline">
          {x.L_XWANR_B9E0244D}
        </Link>
      );
    },
  },
  {
    accessorKey: "STR_AUFTRAGSART_208E7536",
    header: "Auftragsart",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-25">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_AUFTRAGSART_208E7536}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_AUFTRAGSART_208E7536}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_AUFTRAGSNUMMERSAGE",
    header: "SAGE Nr.",
  },
  {
    accessorKey: "L_GERT_18257601",
    header: "Geräte Nr.",
    cell: ({ row }) => {
      const x = row.original;
      if (x.L_GERT_18257601)
        return (
          <Dialog>
            <DialogTrigger>{x.L_GERT_18257601}</DialogTrigger>
            <GeräteDialog Gerätenummer={x.L_GERT_18257601} />
          </Dialog>
        );
    },
  },
  {
    accessorKey: "STR_GERTEBESCHREIBUNG_08244125",
    header: "Gerätebeschreibung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-30">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>
                {x.STR_GERTEBESCHREIBUNG_08244125}
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_GERTEBESCHREIBUNG_08244125}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "TXT_BESCHREIBUNGDESGE_D646B19B",
    header: "Beschreibung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-25">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>
                {x.TXT_BESCHREIBUNGDESGE_D646B19B}
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_BESCHREIBUNGDESGE_D646B19B}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "TXT_PROBLEMBZWAUFGABE_01724AEF",
    header: "Problem",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-50">
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
  { accessorKey: "B_RMAAKTIV_F3426D1D", header: "RMA" },
  {
    accessorKey: "STR_STATUS_8388673F",
    header: "Status",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-15">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_STATUS_8388673F}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_STATUS_8388673F}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "DT_KUNDEBRINGTREINAM",
    header: "Kunde bringt",
    cell: ({ row }) => {
      const x = row.original;

      return x.DT_KUNDEBRINGTREINAM?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "DT_FIXTERMIN",
    header: "Fixtermin",
    cell: ({ row }) => {
      const x = row.original;

      return x.DT_FIXTERMIN?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
];

export const columnsRMA: ColumnDef<IntrexxKunde["RMA"][0]>[] = [
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
  { accessorKey: "L_RMANR_17A9990C", header: "RMA-Nr" },
  { accessorKey: "L_WANR_6602D8B1", header: "WA Nr." },
  {
    accessorKey: "STR_ARTIKELBEZEICHNUN_86D16860",
    header: "Artikel",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-50">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>
                {x.STR_ARTIKELBEZEICHNUN_86D16860}
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_ARTIKELBEZEICHNUN_86D16860}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "TXT_FEHLERBESCHREIBUN_CCB69242",
    header: "Fehler",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-40">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>
                {x.TXT_FEHLERBESCHREIBUN_CCB69242}
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_FEHLERBESCHREIBUN_CCB69242}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_RMAERGEBNIS_26D40C10",
    header: "Ergebnis",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-20">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_RMAERGEBNIS_26D40C10}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_RMAERGEBNIS_26D40C10}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "TXT_RMAERGEBNISBEMERK_606F8A8A",
    header: "Bemerkung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-40">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>
                {x.TXT_RMAERGEBNISBEMERK_606F8A8A}
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_RMAERGEBNISBEMERK_606F8A8A}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  { accessorKey: "STR_STATUS_0F6403CC", header: "Status" },
];

export const columnsTermine: ColumnDef<IntrexxKunde["Termine"][0]>[] = [
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
  { accessorKey: "STR_MITARBEITER_B9BA444C", header: "Mitarbeiter" },
  { accessorKey: "STR_MITARBEITER_D54548CB", header: "Techniker" },
  {
    accessorKey: "DT_VON_EAA8287E",
    header: "Von",
    cell: ({ row }) => {
      const x = row.original;

      return x.DT_VON_EAA8287E?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "DT_BIS_4493FE19",
    header: "Bis",
    cell: ({ row }) => {
      const x = row.original;

      return x.DT_BIS_4493FE19?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  { accessorKey: "STR_ANZAHLANUNDABFAHRT", header: "An/Abfahrt" },
  {
    accessorKey: "TXT_AUTRAGSBESCHREIBU_01EBFA02",
    header: "Beschreibung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-60">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>
                {x.TXT_AUTRAGSBESCHREIBU_01EBFA02}
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_AUTRAGSBESCHREIBU_01EBFA02}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  { accessorKey: "L_GESAMTDL_A804AE51", header: "Gesamt DL" },
  {
    accessorKey: "STR_STATUS_14F9CA65",
    header: "Status",
    cell: ({ row }) => {
      const x = row.original;
      const color = x.STR_STATUS_14F9CA65;

      switch (color) {
        case "#FFFF00":
          return <div className="h-6 w-full rounded-sm bg-yellow-500" />;
        case "#0099FF":
          return <div className="h-6 w-full rounded-sm bg-blue-500" />;
        case "#FF0000":
          return <div className="h-6 w-full rounded-sm bg-red-500" />;
        case "#6633FF":
          return <div className="h-6 w-full rounded-sm bg-purple-500" />;
        case "#00FF00":
          return <div className="h-6 w-full rounded-sm bg-green-500" />;
        case "#666666":
          return <div className="h-6 w-full rounded-sm bg-gray-500" />;
        default:
          return <div className="h-6 w-full">{color}</div>;
      }
    },
  },
];

export const columnsNB: ColumnDef<IntrexxKunde["NB"][0]>[] = [
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
  {
    accessorKey: "STR_AUFTRAGSNUMMERKHK_E440E7D0",
    header: "AU",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <Link
          href={"/Intrexx/NB/" + x.STR_AUFTRAGSNUMMERKHK_E440E7D0}
          className="underline"
        >
          {x.STR_AUFTRAGSNUMMERKHK_E440E7D0}
        </Link>
      );
    },
  },
  { accessorKey: "L_KOMMISSIONSNR_A25FFFAD", header: "Kommissions Nr." },
  {
    accessorKey: "TXT_FEHLTEILE_A0F28CFE",
    header: "Fehlteile",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-40">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.TXT_FEHLTEILE_A0F28CFE}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_FEHLTEILE_A0F28CFE}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  { accessorKey: "L_GERTENR_37F271AA", header: "GN" },
  { accessorKey: "STR_STATUS_549CBC40", header: "Status" },
];

export const columnsPcVisit: ColumnDef<IntrexxKunde["PCVisit"][0]>[] = [
  { accessorKey: "Supporter", header: "Mitarbeiter" },
  { accessorKey: "Rechnername", header: "Rechnername" },
  { accessorKey: "Benutzername", header: "Benutzername" },
  {
    accessorKey: "Problem",
    header: "Aufgabe",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-50">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.Problem}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.Problem}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "Startzeit",
    header: "Startzeit",
    cell: ({ row }) => {
      const x = row.original;

      return x.Startzeit?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  { accessorKey: "Dauer", header: "Dauer" },
  {
    accessorKey: "Ergebnis",
    header: "Ergebnis",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-50">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.Ergebnis}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.Ergebnis}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  { accessorKey: "Status", header: "Status" },
];

export const columnsDienstleistungen: ColumnDef<
  IntrexxKunde["Dienstleistungen"][0]
>[] = [
  { accessorKey: "STR_MITARBEITER_D10769F7", header: "Mitarbeiter" },
  {
    accessorKey: "TXT_AUFGABE_A9ED1971",
    header: "Aufgabe",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-60">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.TXT_AUFGABE_A9ED1971}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_AUFGABE_A9ED1971}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "DT_STARTZEIT_74FCA9A9",
    header: "Startzeit",
    cell: ({ row }) => {
      const x = row.original;

      return x.DT_STARTZEIT_74FCA9A9?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "DT_ENDZEIT_51135EB1",
    header: "Endzeit",
    cell: ({ row }) => {
      const x = row.original;

      return x.DT_ENDZEIT_51135EB1?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "TXT_TTIGKEITEN_B508ABF0",
    header: "Ergebnis",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-60">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.TXT_TTIGKEITEN_B508ABF0}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.TXT_TTIGKEITEN_B508ABF0}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  { accessorKey: "STR_STATUS_2CC6A195", header: "Status" },
];

export const columnsLeasing: ColumnDef<IntrexxKunde["Leasing"][0]>[] = [
  {
    accessorKey: "STR_GERT1_CB50B59E",
    header: "Gerät 1",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-40">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_GERT1_CB50B59E}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_GERT1_CB50B59E}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_GERT2_A6CE644D",
    header: "Gerät 2",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-40">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_GERT2_A6CE644D}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_GERT2_A6CE644D}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_GERT3_A162A7A2",
    header: "Gerät 3",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-40">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_GERT3_A162A7A2}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_GERT3_A162A7A2}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_GERAET4",
    header: "Gerät 4",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-40">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_GERAET4}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_GERAET4}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_GERAET5",
    header: "Gerät 5",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="max-h-10 w-40">
          <p className="overflow-hidden text-ellipsis">
            <Tooltip>
              <TooltipTrigger>{x.STR_GERAET5}</TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-md">
                {x.STR_GERAET5}
              </TooltipContent>
            </Tooltip>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "DT_STARTDATUM",
    header: "Start",
    cell: ({ row }) => {
      const x = row.original;

      return x.DT_STARTDATUM?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "DT_ABLAUFDATUM",
    header: "Ablauf",
    cell: ({ row }) => {
      const x = row.original;

      return x.DT_ABLAUFDATUM?.toLocaleString("de-de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
];
