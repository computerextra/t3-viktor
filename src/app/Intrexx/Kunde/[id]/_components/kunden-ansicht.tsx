"use client";

import { api } from "@/trpc/react";
import { PaginatedDataTable as DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/loading-skeleton";
import {
  columnGeräte,
  columnsDienstleistungen,
  columnsLeasing,
  columnsNB,
  columnsPcVisit,
  columnsRMA,
  columnsTermine,
  columnWA,
} from "./columns";
import Link from "next/link";
import { CheckCircleIcon, CrossIcon } from "lucide-react";

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
  const res = api.intrexx_kunden.get.useQuery({ id });

  if (res.isLoading) return <LoadingSkeleton desc="Einträg lädt." />;

  return (
    <Card className="mx-auto mt-5 max-w-[80%]">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-6 gap-8">
            <div>
              <span className="text-sm font-thin">
                {res.data?.Kunde?.STR_KUNDENNUMMER_D45D177B}
              </span>
              <br />
              {res.data?.Kunde?.STR_NAME_5FE19153} <br />
              {res.data?.Kunde?.STR_NAME2_CECE8E30}
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>AV</CardTitle>
                  <CardDescription>
                    {res.data?.Kunde?.DT_ANTIVIRENPROGRAMMI_197D92CB?.toLocaleDateString(
                      "de-de",
                    )}{" "}
                    <br />
                    {res.data?.Kunde?.STR_AVBEARBEITUNGSSTA_E30A9B89}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div>
              {res.data?.Kunde?.B_KUNDEISTINCEDOKUANG_F42FE149 ? (
                <Button asChild>
                  <Link
                    href={
                      "/Intrexx/Doku/" + res.data.Kunde.L_INTREXXNR_5F3E58AF
                    }
                  >
                    DOKU
                  </Link>
                </Button>
              ) : (
                <Button disabled>Nicht in Doku</Button>
              )}
            </div>
            {res.data?.Kunde?.STR_PCVISITURL ? (
              <Button asChild>
                <a
                  href={res.data?.Kunde?.STR_PCVISITURL}
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
              <h2 className="scroll-m-20 border-b pb-1 text-lg font-semibold tracking-tight first:mt-0">
                Datenübermittlung
              </h2>
              <div className="grid grid-cols-2 gap-2 text-sm font-thin">
                <span className="m-0 p-0 leading-none">Apple</span>
                {res.data?.Kunde?.STR_APPLE == "ja" ? (
                  <Green />
                ) : res.data?.Kunde?.STR_APPLE == "nein" ? (
                  <Red />
                ) : (
                  <Yellow />
                )}
                <span className="m-0 p-0 leading-none">Microsoft</span>
                {res.data?.Kunde?.STR_MICROSOFTDUE == "ja" ? (
                  <Green />
                ) : res.data?.Kunde?.STR_MICROSOFTDUE == "nein" ? (
                  <Red />
                ) : (
                  <Yellow />
                )}
                <span className="m-0 p-0 leading-none">Google</span>
                {res.data?.Kunde?.STR_ALPHABETDUE == "ja" ? (
                  <Green />
                ) : res.data?.Kunde?.STR_ALPHABETDUE == "nein" ? (
                  <Red />
                ) : (
                  <Yellow />
                )}
              </div>
            </div>
            <div>
              <h2 className="scroll-m-20 border-b pb-1 text-lg font-semibold tracking-tight first:mt-0">
                Sepa
              </h2>
              {res.data?.Kunde?.B_SEPAMANDATERSTELLT ? (
                <CheckCircleIcon className="size-8 text-green-500" />
              ) : (
                <CrossIcon className="size-8 rotate-45 text-red-500" />
              )}
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="grid grid-cols-4 gap-8">
            <div>
              {res.data?.Kunde?.STR_STRASSE_1FE60006} <br />
              {res.data?.Kunde?.STR_PLZ_FCF64909}{" "}
              {res.data?.Kunde?.STR_ORT_541484BC}
            </div>
            <div className="grid grid-cols-2">
              <span className="font-bold">Telefon:</span>
              {res.data?.Kunde?.STR_TELEFONNUMMER1_FE4BFAA0 ? (
                <a
                  className="cursor-pointer"
                  href={"tel:" + res.data?.Kunde.STR_TELEFONNUMMER1_FE4BFAA0}
                >
                  {res.data?.Kunde.STR_TELEFONNUMMER1_FE4BFAA0}
                </a>
              ) : (
                <span>-</span>
              )}
              <span className="font-bold">Alternativ:</span>{" "}
              {res.data?.Kunde?.STR_ALTERNATIVETELEFO_19DEE048 ? (
                <a
                  className="cursor-pointer"
                  href={
                    "tel:" + res.data?.Kunde?.STR_ALTERNATIVETELEFO_19DEE048
                  }
                >
                  {res.data?.Kunde?.STR_ALTERNATIVETELEFO_19DEE048}
                </a>
              ) : (
                <span>-</span>
              )}
            </div>
            <div>
              <span className="font-bold">E-Mail:</span>
              <br />
              {res.data?.Kunde?.STR_EMAILADRESSE_6AF00EDF ? (
                <a
                  href={"mailto:" + res.data?.Kunde?.STR_EMAILADRESSE_6AF00EDF}
                  className="cursor-pointer"
                >
                  {res.data?.Kunde?.STR_EMAILADRESSE_6AF00EDF}
                </a>
              ) : (
                <span>-</span>
              )}
            </div>
            <div>
              <span className="font-bold">Notizen</span>
              <pre className="font-serif">
                {res.data?.Kunde?.TXT_NOTIZ_3ECC3AA2}
              </pre>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Werkstattaufträge
        </h2>
        <DataTable columns={columnWA} data={res.data?.WA ?? []} />

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Termine
        </h2>
        <DataTable columns={columnsTermine} data={res.data?.Termine ?? []} />

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          PC Visit
        </h2>
        <DataTable columns={columnsPcVisit} data={res.data?.PCVisit ?? []} />

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Dienstleitungen
        </h2>
        <DataTable
          columns={columnsDienstleistungen}
          data={res.data?.Dienstleistungen ?? []}
        />

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          RMA
        </h2>
        <DataTable columns={columnsRMA} data={res.data?.RMA ?? []} />

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Geräte
        </h2>
        <DataTable columns={columnGeräte} data={res.data?.Geräte ?? []} />

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Leasing
        </h2>
        <DataTable columns={columnsLeasing} data={res.data?.Leasing ?? []} />

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Neubauten
        </h2>
        <DataTable columns={columnsNB} data={res.data?.NB ?? []} />
      </CardContent>

      {/* <h2>Dateien</h2>
      {res.data?.Kunde?.XDATAGROUPFFC21EED.map((x) => (
        <DataTable
          key={x.LID}
          columns={columnsIrgendwas}
          data={x.XFILEDATAGROUP6 ?? []}
        />
      ))}
      <Separator className="my-5" /> */}
    </Card>
  );
}
