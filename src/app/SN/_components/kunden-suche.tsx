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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/api/root";
import { toast } from "sonner";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Artikel = RouterOutput["sage_artikel"]["search"];

export default function ArtikelSuche() {
  const [suche, setSuche] = useState<string | null>(null);
  const [gesucht, setGesucht] = useState(false);
  const [Ergebnisse, setErgebnisse] = useState<null | Artikel>(null);

  const kundensuche = api.sage_artikel.search.useMutation({
    onSuccess: (data) => {
      setGesucht(true);
      setErgebnisse(data);

      if (data == null) {
        toast.error("Kein Artikel gefunden", {
          description: "Scheinbar war deine Eingabe falsch.",
          action: {
            label: "Reset",
            onClick: () => setSuche(""),
          },
        });
      } else {
        const type = "text/plain";
        const clipboardItemData = {
          [type]: data,
        };
        const clipboardItem = new ClipboardItem(clipboardItemData);

        navigator.clipboard.write([clipboardItem]);
        toast(data, {
          description: "Die Daten wurden in die Zwischenablage kopiert.",
          action: {
            label: "Erneut Kopieren",
            onClick: () => navigator.clipboard.write([clipboardItem]),
          },
        });
      }
    },
  });

  const handleSearch = async () => {
    if (suche == null || suche.length < 3) return;

    await kundensuche.mutateAsync({ search: suche });
  };

  return (
    <Card className="mx-auto mt-12 max-w-4xl">
      <CardHeader>
        <CardTitle>Artikelsuche</CardTitle>
        <CardDescription>
          Artikelnummer eingeben rest geht von allein
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <InputGroupInput
              value={suche ?? undefined}
              onChange={(e) => {
                setGesucht(false);
                setSuche(e.target.value);
              }}
              type="text"
              placeholder="Artikelnummer"
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
        {gesucht && Ergebnisse == null ? (
          <span className="text-center text-sm font-light lowercase">
            - Keine Ergebnisse -
          </span>
        ) : gesucht ? (
          Ergebnisse
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
}
