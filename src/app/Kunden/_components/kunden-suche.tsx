"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Kunde = RouterOutput["sage_kunden"]["search"];

const columns: ColumnDef<Kunde[0]>[] = [
  {
    accessorKey: "SG_Adressen_PK",
    header: "Typ",
    cell: ({ row }) => {
      const x = row.original;
      if (x.KundNr != null) return "Kunde";
      if (x.LiefNr != null) return "Lieferant";
      else return "-";
    },
  },
  {
    accessorKey: "KundNr",
    header: "Kundennummer",
    cell: ({ row }) => {
      const x = row.original;
      if (x.KundNr != null) return x.KundNr;
      if (x.LiefNr != null) return x.LiefNr;
      else return "-";
    },
  },
  {
    accessorKey: "Suchbegriff",
    header: "Suchbegriff",
  },
  {
    accessorKey: "Homepage",
    header: "Webseite",
    cell: ({ row }) => {
      const x = row.original;
      if (x.Homepage != null)
        return (
          <>
            <a
              href={x.Homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {x.Homepage}
            </a>
          </>
        );
      else return "-";
    },
  },
  {
    accessorKey: "Telefon1",
    header: "Telefon",
    cell: ({ row }) => {
      const x = row.original;
      if (x.Telefon1 != null)
        return (
          <>
            <a href={"tel:" + x.Telefon1} className="underline">
              {x.Telefon1}
            </a>
            {x.Telefon2 && (
              <>
                <br />
                <a href={"tel:" + x.Telefon2} className="underline">
                  {x.Telefon2}
                </a>
              </>
            )}
          </>
        );
      else return "-";
    },
  },
  {
    accessorKey: "Mobiltelefon1",
    header: "Mobil",
    cell: ({ row }) => {
      const x = row.original;
      if (x.Mobiltelefon1 != null)
        return (
          <>
            <a href={"tel:" + x.Mobiltelefon1} className="underline">
              {x.Mobiltelefon1}
            </a>
            {x.Mobiltelefon2 && (
              <>
                <br />
                <a href={"tel:" + x.Mobiltelefon2} className="underline">
                  {x.Mobiltelefon2}
                </a>
              </>
            )}
          </>
        );
      else return "-";
    },
  },
  {
    accessorKey: "EMail1",
    header: "Mail",
    cell: ({ row }) => {
      const x = row.original;
      if (x.EMail1 != null)
        return (
          <>
            <a href={"mailto:" + x.EMail1} className="underline">
              {x.EMail1}
            </a>
            {x.EMail2 && (
              <>
                <br />
                <a href={"mailto:" + x.EMail2} className="underline">
                  {x.EMail2}
                </a>
              </>
            )}
          </>
        );
      else return "-";
    },
  },
  {
    accessorKey: "KundUmsatz",
    header: "Umsatz",
    cell: ({ row }) => {
      const x = row.original;
      if (x.KundNr != null && x.KundUmsatz)
        return `${Math.round((x.KundUmsatz + Number.EPSILON) * 100) / 100} €`;
      if (x.LiefNr != null && x.LiefUmsatz)
        return `${Math.round((x.LiefUmsatz + Number.EPSILON) * 100) / 100} €`;
      else return "-";
    },
  },
];

export default function KundenSuche() {
  const [suche, setSuche] = useState<string | null>(null);
  const [Ergebnisse, setErgebnisse] = useState<null | Kunde>(null);

  const kundensuche = api.sage_kunden.search.useMutation({
    onSuccess: (data) => {
      if (data.length > 0) setErgebnisse(data);
      else setErgebnisse(null);
    },
  });

  const handleSearch = async () => {
    if (suche == null || suche.length < 3) return;

    await kundensuche.mutateAsync({ search: suche });
  };

  return (
    <Card className="mx-auto mt-12">
      <CardHeader>
        <CardTitle>Kundensuche</CardTitle>
        <CardDescription>
          Suche nach Suchbegriff, Kundennummer oder Telefonnummer möglich.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <InputGroupInput
              defaultValue={suche ?? undefined}
              onChange={(e) => setSuche(e.target.value)}
              type="text"
              placeholder="Suchbegriff"
              disabled={kundensuche.isPending}
            />
            <InputGroupAddon>
              {kundensuche.isPending ? <Spinner /> : <SearchIcon />}
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton
                variant={"secondary"}
                onClick={handleSearch}
                disabled={kundensuche.isPending}
                type="submit"
              >
                {kundensuche.isPending ? (
                  <>
                    Sucht ...
                    <Spinner />
                  </>
                ) : (
                  "Suchen"
                )}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardContent>
      <CardFooter className={"justify-center"}>
        {Ergebnisse == null ? (
          <span className="text-center text-sm font-light lowercase">
            - Keine Ergebnisse -
          </span>
        ) : (
          <DataTable columns={columns} data={Ergebnisse} />
        )}
      </CardFooter>
    </Card>
  );
}
