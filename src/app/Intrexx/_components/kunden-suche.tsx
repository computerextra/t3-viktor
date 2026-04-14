"use client";

import { DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Ergebnis = {
  LID: number;
  STR_KUNDENNUMMER_D45D177B: string | null;
  STR_NAME_5FE19153: string | null;
  STR_NAME2_CECE8E30: string | null;
  STR_STRASSE_1FE60006: string | null;
  L_INTREXXNR_5F3E58AF: number | null;
};

const columns: ColumnDef<Ergebnis>[] = [
  {
    accessorKey: "STR_KUNDENNUMMER_D45D177B",
    header: "Kundennummer",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <Link href={"/Intrexx/Kunde/" + x.L_INTREXXNR_5F3E58AF}>
          {x.STR_KUNDENNUMMER_D45D177B}
        </Link>
      );
    },
  },
  {
    accessorKey: "STR_NAME_5FE19153",
    header: "Name",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <Link href={"/Intrexx/Kunde/" + x.L_INTREXXNR_5F3E58AF}>
          {x.STR_NAME_5FE19153}
        </Link>
      );
    },
  },
  {
    accessorKey: "STR_NAME2_CECE8E30",
    header: "Vorname",
  },
  {
    accessorKey: "STR_STRASSE_1FE60006",
    header: "Straße",
  },
];

export default function KundenSuche() {
  const [suche, setSuche] = useState<string | null>(null);
  const [Ergebnisse, setErgebnisse] = useState<null | Ergebnis[]>(null);

  const kundensuche = api.intrexx_kunden.suche.useMutation({
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
    <Card className="mx-auto mt-12 max-w-4xl">
      <CardHeader>
        <CardTitle>Kundensuche</CardTitle>
        <CardDescription>
          Suche nach Nachnamen, Firma, Kundennummer, E-Mail oder G Data Login
          möglich.
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
