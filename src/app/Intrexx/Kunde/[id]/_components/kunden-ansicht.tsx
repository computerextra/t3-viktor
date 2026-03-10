"use client";

import { api } from "@/trpc/react";
import { ColumnDef } from "@tanstack/react-table";
import { XFILEDATAGROUP6 } from "../../../../../../generated/intrexx/client";
import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/api/root";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type RouterOutput = inferRouterOutputs<AppRouter>;
type IntrexxKunde = RouterOutput["intrexx_kunden"]["get"];

const columnsIrgendwas: ColumnDef<XFILEDATAGROUP6>[] = [
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

const columnGeräte: ColumnDef<IntrexxKunde["Geräte"][0]>[] = [
  { accessorKey: "LID" },
  { accessorKey: "LUSERID" },
  { accessorKey: "LUSERIDINSERT" },
  { accessorKey: "DTEDIT" },
  { accessorKey: "DTINSERT" },
  { accessorKey: "STR_BESCHREIBUNG_25EF44CB" },
  { accessorKey: "L_GERTENR_B4E6AEA5" },
  { accessorKey: "L_INTREXXNR_615CC850" },
  { accessorKey: "STR_KONFIGURATION_E2BE31D5" },
  { accessorKey: "STR_HERSTELLER_D957E082" },
  { accessorKey: "DT_KAUFDATUM_701B435B" },
  { accessorKey: "B_AUSGEMUSTERT_622C2EFE" },
  { accessorKey: "STR_GARANTIE_E566FEB1" },
  { accessorKey: "B_VORORT_BF77D997" },
  { accessorKey: "TXT_BEMERKUNG" },
];

const columnWA: ColumnDef<IntrexxKunde["WA"][0]>[] = [
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
  { accessorKey: "L_XWANR_B9E0244D", header: "WA Nr." },
  {
    accessorKey: "STR_AUFTRAGSART_208E7536",
    header: "Auftragsart",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="w-31">
          <p className="text-pretty break-all">{x.STR_AUFTRAGSART_208E7536}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "STR_AUFTRAGSNUMMERSAGE",
    header: "SAGE Nr.",
  },
  { accessorKey: "L_GERT_18257601", header: "Geräte Nr." },
  {
    accessorKey: "STR_GERTEBESCHREIBUNG_08244125",
    header: "Gerätebeschreibung",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="w-31">
          <p className="text-pretty break-all">
            {x.STR_GERTEBESCHREIBUNG_08244125}
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
        <div className="w-31">
          <p className="text-pretty break-all">
            {x.TXT_BESCHREIBUNGDESGE_D646B19B}
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
        <div className="w-31">
          <p className="text-pretty break-all">
            {x.TXT_PROBLEMBZWAUFGABE_01724AEF}
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
        <div className="w-12">
          <p className="text-pretty break-all">{x.STR_STATUS_8388673F}</p>
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

const columnsRMA: ColumnDef<IntrexxKunde["RMA"][0]>[] = [
  { accessorKey: "LID" },
  { accessorKey: "LUSERID" },
  { accessorKey: "DTEDIT" },
  { accessorKey: "LUSERIDINSERT" },
  { accessorKey: "DTINSERT" },
  { accessorKey: "STR_KUNDEAUSINTREXX_E12B9044" },
  { accessorKey: "L_INTREXXNR_213345CC" },
  { accessorKey: "L_KUNDENID_326934EF" },
  { accessorKey: "STR_NAME2_E02D8374" },
  { accessorKey: "STR_STRASSE_1B6EE904" },
  { accessorKey: "STR_PLZ_064718F3" },
  { accessorKey: "STR_ORT_02C44E67" },
  { accessorKey: "STR_TELEFON_AF1F5B0D" },
  { accessorKey: "STR_ALTERNATIVETELEFO_FA071E86" },
  { accessorKey: "LSTR_KUNDENNUMMER_DD750857ID" },
  { accessorKey: "L_RMANR_17A9990C" },
  { accessorKey: "STR_MITARBEITER_4C2953F0" },
  { accessorKey: "L_WANR_6602D8B1" },
  { accessorKey: "DT_WAERSTELLTAM_8B71E6A1" },
  { accessorKey: "STR_STATUS_0F6403CC" },
  { accessorKey: "STR_ARTIKELBEZEICHNUN_86D16860" },
  { accessorKey: "TXT_FEHLERBESCHREIBUN_CCB69242" },
  { accessorKey: "STR_ARTIKELNRKHK_8FDE2E06" },
  { accessorKey: "TXT_BEMERKUNG_87D3A3EC" },
  { accessorKey: "STR_SN_8239795B" },
  { accessorKey: "STR_PAKETNUMMER_528AB818" },
  { accessorKey: "STR_RMANR_8D18AD38" },
  { accessorKey: "STR_RENRLIEFERANT_6B91EDD5" },
  { accessorKey: "DT_REDATUMLIEFERANT_9E02F701" },
  { accessorKey: "DT_RMADATUM_FC430B1A" },
  { accessorKey: "STR_LIEFERANT_3C2052B4" },
  { accessorKey: "STR_RCKSENDUNGAN_D171B5CB" },
  { accessorKey: "STR_RMANAME2_87386488" },
  { accessorKey: "STR_RMASTRASSE_5AACD139" },
  { accessorKey: "STR_RMAPLZ_3E0626BA" },
  { accessorKey: "STR_RMAORT_75F9B170" },
  { accessorKey: "DT_ENDE_BF34671C" },
  { accessorKey: "L_WAID_DC7C2906" },
  { accessorKey: "STR_RMAERGEBNIS_26D40C10" },
  { accessorKey: "DT_RMADATUMZURCK_0508E3DE" },
  { accessorKey: "TXT_RMAERGEBNISBEMERK_606F8A8A" },
  { accessorKey: "STR_RMAANZAHL_C04337D1" },
  { accessorKey: "STR_AUSGEBUCHT_CC96D27F" },
  { accessorKey: "STR_PAKETDIENST" },
];

const columnsTermine: ColumnDef<IntrexxKunde["Termine"][0]>[] = [
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
        <div className="w-31">
          <p className="text-pretty break-all">
            {x.TXT_AUTRAGSBESCHREIBU_01EBFA02}
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

const columnsNB: ColumnDef<IntrexxKunde["NB"][0]>[] = [
  { accessorKey: "LID" },
  { accessorKey: "LUSERID" },
  { accessorKey: "LUSERIDINSERT" },
  { accessorKey: "DTEDIT" },
  { accessorKey: "DTINSERT" },
  { accessorKey: "STR_KUNDE_6B1979C7" },
  { accessorKey: "STR_KOMMISSIONIERER_72028765" },
  { accessorKey: "STR_AUFTRAGSNUMMERKHK_E440E7D0" },
  { accessorKey: "STR_STATUS_549CBC40" },
  { accessorKey: "B_EILAUFTRAG_7D1E7E98" },
  { accessorKey: "DT_FIXTERMIN_4019DB73" },
  { accessorKey: "L_INTREXXNR_AE6C9D81" },
  { accessorKey: "L_KOMMISSIONSNR_A25FFFAD" },
  { accessorKey: "STR_NAME_A5C91504" },
  { accessorKey: "STR_PLZ_BC0CE8FB" },
  { accessorKey: "STR_ORT_C3A612F5" },
  { accessorKey: "STR_TELEFON_F2129703" },
  { accessorKey: "STR_ALTERNATIVETELEFO_E0E42CDF" },
  { accessorKey: "STR_KUNDENUMMER_545CBACCLID" },
  { accessorKey: "STR_NAME2_8BD5DB2A" },
  { accessorKey: "DT_AUFTRAGSDATUMKHK_CA977541" },
  { accessorKey: "L_KUNDENID_24BF80BD" },
  { accessorKey: "B_EINZELTEILAUFTRAG_A39ECC92" },
  { accessorKey: "TXT_FEHLTEILE_A0F28CFE" },
  { accessorKey: "STR_BESCHREIBUNG_5F254E86" },
  { accessorKey: "STR_KONFIGURATION_2C3567B0" },
  { accessorKey: "L_GERTENR_37F271AA" },
  { accessorKey: "STR_BEZUGSQUELLE_EAAE498D" },
  { accessorKey: "STR_VERKUFER_679A6C41" },
  { accessorKey: "STR_EMAILADRESSE_566990BB" },
];

function Green() {
  return <span className="size-4 rounded-2xl bg-green-500" />;
}

function Yellow() {
  return <span className="size-4 rounded-2xl bg-yellow-500" />;
}

function Red() {
  return <span className="size-4 rounded-2xl bg-red-500" />;
}

export default function KundenAnsicht({ id }: { id: number }) {
  const [kunde] = api.intrexx_kunden.get.useSuspenseQuery({ id });

  return (
    <Card className="mx-auto mt-5 max-w-7xl">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-6 gap-8">
            <div>
              <span className="text-sm font-thin">
                {kunde.Kunde?.STR_KUNDENNUMMER_D45D177B}
              </span>
              <br />
              {kunde.Kunde?.STR_NAME_5FE19153} <br />
              {kunde.Kunde?.STR_NAME2_CECE8E30}
            </div>
            <div>AV KRAM</div>
            <div>DOKU</div>
            {kunde.Kunde?.STR_PCVISITURL ? (
              <Button asChild>
                <a
                  href={kunde.Kunde?.STR_PCVISITURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PC VISIT
                </a>
              </Button>
            ) : (
              <Button disabled className="line-through">
                PC VISIT
              </Button>
            )}

            <div>
              <h2>Datenübermittlung</h2>
              <div className="grid grid-cols-2 gap-2 text-sm font-thin">
                <span className="m-0 p-0 leading-none">Apple</span>
                {kunde.Kunde?.STR_APPLE == "ja" ? (
                  <Green />
                ) : kunde.Kunde?.STR_APPLE == "nein" ? (
                  <Red />
                ) : (
                  <Yellow />
                )}
                <span className="m-0 p-0 leading-none">Microsoft</span>
                {kunde.Kunde?.STR_MICROSOFTDUE == "ja" ? (
                  <Green />
                ) : kunde.Kunde?.STR_MICROSOFTDUE == "nein" ? (
                  <Red />
                ) : (
                  <Yellow />
                )}
                <span className="m-0 p-0 leading-none">Google</span>
                {kunde.Kunde?.STR_ALPHABETDUE == "ja" ? (
                  <Green />
                ) : kunde.Kunde?.STR_ALPHABETDUE == "nein" ? (
                  <Red />
                ) : (
                  <Yellow />
                )}
              </div>
            </div>
            <div>
              <h2>Sepa</h2>
              {kunde.Kunde?.B_SEPAMANDATERSTELLT ? "Ja" : "Nein"}
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="grid grid-cols-4 gap-8">
            <div>
              {kunde.Kunde?.STR_STRASSE_1FE60006} <br />
              {kunde.Kunde?.STR_PLZ_FCF64909} {kunde.Kunde?.STR_ORT_541484BC}
            </div>
            <div className="grid grid-cols-2">
              <span className="font-bold">Telefon:</span>
              {kunde.Kunde?.STR_TELEFONNUMMER1_FE4BFAA0 ? (
                <a
                  className="cursor-pointer"
                  href={"tel:" + kunde.Kunde.STR_TELEFONNUMMER1_FE4BFAA0}
                >
                  {kunde.Kunde.STR_TELEFONNUMMER1_FE4BFAA0}
                </a>
              ) : (
                <span>-</span>
              )}
              <span className="font-bold">Alternativ:</span>{" "}
              {kunde.Kunde?.STR_ALTERNATIVETELEFO_19DEE048 ? (
                <a
                  className="cursor-pointer"
                  href={"tel:" + kunde.Kunde?.STR_ALTERNATIVETELEFO_19DEE048}
                >
                  {kunde.Kunde?.STR_ALTERNATIVETELEFO_19DEE048}
                </a>
              ) : (
                <span>-</span>
              )}
            </div>
            <div>
              <span className="font-bold">E-Mail:</span>
              <br />
              {kunde.Kunde?.STR_EMAILADRESSE_6AF00EDF ? (
                <a
                  href={"mailto:" + kunde.Kunde?.STR_EMAILADRESSE_6AF00EDF}
                  className="cursor-pointer"
                >
                  {kunde.Kunde?.STR_EMAILADRESSE_6AF00EDF}
                </a>
              ) : (
                <span>-</span>
              )}
            </div>
            <div>
              <span className="font-bold">Notizen</span>
              <pre className="font-serif">
                {kunde.Kunde?.TXT_NOTIZ_3ECC3AA2}
              </pre>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Werkstattaufträge
        </h2>
        <DataTable columns={columnWA} data={kunde.WA ?? []} />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Termine
        </h2>
        <DataTable columns={columnsTermine} data={kunde.Termine ?? []} />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          PC Visit
        </h2>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Dienstleitungen
        </h2>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          RMA
        </h2>
        <DataTable columns={columnsRMA} data={kunde.RMA ?? []} />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Geräte
        </h2>
        <DataTable columns={columnGeräte} data={kunde.Geräte ?? []} />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Leasing
        </h2>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Neubauten
        </h2>
        <DataTable columns={columnsNB} data={kunde.NB ?? []} />
      </CardContent>

      <h2>Dateien</h2>
      {kunde.Kunde?.XDATAGROUPFFC21EED.map((x) => (
        <DataTable
          key={x.LID}
          columns={columnsIrgendwas}
          data={x.XFILEDATAGROUP6 ?? []}
        />
      ))}
      <Separator className="my-5" />
    </Card>
  );
}
