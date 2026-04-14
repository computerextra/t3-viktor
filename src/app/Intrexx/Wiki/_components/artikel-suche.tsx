"use client";

import LoadingSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { type inferRouterOutputs } from "@trpc/server";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type SearchResult = RouterOutput["intrexx_wiki"]["sucheArtikel"];

export default function ArtikelSuche() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<SearchResult | null>(null);

  const letzteArtikel = api.intrexx_wiki.letzteArtikel.useQuery();

  const searcher = api.intrexx_wiki.sucheArtikel.useMutation({
    onSuccess: (res) => {
      setResults(res);
    },
  });

  return (
    <div className="my-8">
      <form onSubmit={(e) => e.preventDefault()}>
        <InputGroup>
          <InputGroupInput
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={search}
            placeholder="Tippen zum suchen"
          />
          <InputGroupAddon align={"inline-end"}>
            <InputGroupButton
              disabled={searcher.isPending}
              variant={"secondary"}
              type="submit"
              onClick={async () => {
                if (search == null) return;
                await searcher.mutateAsync({ search: search });
              }}
            >
              {searcher.isPending ? (
                <>
                  <Spinner /> Sucht...
                </>
              ) : (
                <>
                  <Search /> Suchen
                </>
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {(search != null || results != null) && (
          <Button
            className="mt-2"
            size={"sm"}
            variant={"outline"}
            type="button"
            onClick={() => {
              setSearch(undefined);
              setResults(null);
            }}
          >
            Suche zurücksetzen
          </Button>
        )}
      </form>
      {(search == null || search.length < 1) && results == null ? (
        <div className="mt-8">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Letzte Artikel
          </h2>
          {letzteArtikel.isLoading ? (
            <LoadingSkeleton desc="Artikel laden" />
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {letzteArtikel.data?.map((artikel) => (
                <ArtikelCard key={artikel.LID} artikel={artikel} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Suchergebnisse
          </h2>
          {searcher.isPending ? (
            <LoadingSkeleton desc="Artikel laden" />
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {results?.map((artikel) => (
                <ArtikelCard key={artikel.LID} artikel={artikel} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ArtikelCard({ artikel }: { artikel: SearchResult[0] }) {
  const nav = useRouter();

  return (
    <Card
      key={artikel.LID}
      className="cursor-pointer"
      onClick={() => {
        nav.push("/Intrexx/Wiki/Artikel/" + artikel.LID);
      }}
    >
      <CardHeader>
        <CardTitle>{artikel.STRHEADLINE}</CardTitle>
        <CardDescription>
          <div className="flex flex-row justify-between">
            <span>Kategorie: {artikel.STR_KATEGORIE_BD83BD5F}</span>
            <span>
              Erstellt:{" "}
              {artikel.DTINSERT?.toLocaleDateString("de-de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="line-clamp-5 text-pretty">
        {artikel.TXTWIKI}
      </CardContent>
    </Card>
  );
}
