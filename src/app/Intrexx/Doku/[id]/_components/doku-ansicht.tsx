"use client";

import LoadingSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import Link from "next/link";
import Seite1 from "./seite1";
import Seite2 from "./seite2";
import Seite3 from "./seite3";
import Seite4 from "./seite4";
import Seite5 from "./seite5";

export default function DokuAnsicht({ id }: { id: number }) {
  const data = api.intrexx_doku.get.useQuery({ id });

  if (data.isLoading) return <LoadingSkeleton desc="Einträg lädt." />;

  return (
    <Card className="mx-auto mt-5 max-w-[80%]">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-9 gap-8">
            <div>
              Kundennummer <br />
              <span className="text-sm font-thin">
                {data.data?.Doku?.STR_KUNDENNUMMER_079885A1}
              </span>
            </div>
            <div>
              Name <br />
              <span className="text-sm font-thin">
                {data.data?.Doku?.STR_KUNDEAUSINTREXX_0A80D23C}
              </span>
            </div>
            <div>
              Name 2 <br />
              <span className="text-sm font-thin">
                {data.data?.Doku?.STR_NAME2_252EA5D0}
              </span>
            </div>
            <div>
              Straße <br />
              <span className="text-sm font-thin">
                {data.data?.Doku?.STR_STRASSE_9E3AE7BC}
              </span>
            </div>
            <div>
              Telefon <br />
              {data.data?.Doku?.STR_TELEFON_93F9D3E5 ? (
                <a
                  className="text-sm font-thin underline"
                  href={"tel:" + data.data.Doku.STR_TELEFON_93F9D3E5}
                >
                  {data.data.Doku.STR_TELEFON_93F9D3E5}
                </a>
              ) : (
                "-"
              )}
            </div>
            <div>
              E-Mail <br />
              {data.data?.Doku?.STR_EMAILADRESSE_8AF326BD ? (
                <a
                  className="text-sm font-thin underline"
                  href={"mailto:" + data.data.Doku.STR_EMAILADRESSE_8AF326BD}
                >
                  {data.data.Doku.STR_EMAILADRESSE_8AF326BD}
                </a>
              ) : (
                "-"
              )}
            </div>
            <div>
              Serverwartung <br />
              <span className="text-sm font-thin">
                {data.data?.Doku?.B_TERMINSERIEISTERSTELLT ? "Ja" : "Nein"}
              </span>
            </div>
            <div>
              TK-Anlagenwartung <br />
              <span className="text-sm font-thin">
                {data.data?.Doku?.B_TERMINSERIETKISTERSTELLT ? "Ja" : "Nein"}
              </span>
            </div>
            <Button asChild>
              <Link
                href={"/Intrexx/Kunde/" + data.data?.Doku?.L_INTREXXNR_F67AE19A}
              >
                Kundenansicht
              </Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Seite1">
          <TabsList>
            <TabsTrigger value="Seite1">Seite 1: Angaben</TabsTrigger>
            <TabsTrigger value="Seite2">Seite 2: Docs, AP, etc.</TabsTrigger>
            <TabsTrigger value="Seite3">
              Seite 3: WA,NB,Geräte,Verträge
            </TabsTrigger>
            <TabsTrigger value="Seite4">
              Seite 4: Termine,DL,PC-Visit
            </TabsTrigger>
            <TabsTrigger value="Seite5">Seite 5: Wartung</TabsTrigger>
          </TabsList>
          <TabsContent value="Seite1">
            <Seite1 id={id} />
          </TabsContent>
          <TabsContent value="Seite2">
            <Seite2 id={id} />
          </TabsContent>
          <TabsContent value="Seite3">
            <Seite3 id={id} />
          </TabsContent>
          <TabsContent value="Seite4">
            <Seite4 id={id} />
          </TabsContent>
          <TabsContent value="Seite5">
            <Seite5 id={id} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
