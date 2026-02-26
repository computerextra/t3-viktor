import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { useTitle } from "@/hooks/use-title";
import {
  EinkaufsListeQueryOptions,
  getEinkaufsliste,
} from "@/server/mitarbeiter";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/Einkauf/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(EinkaufsListeQueryOptions());
    return getEinkaufsliste();
  },
});

function RouteComponent() {
  useTitle("Einkaufsliste");
  const data = Route.useLoaderData();

  return (
    <div className="container mx-auto">
      <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance print:hidden">
        Einkaufsliste
      </h1>
      <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance hidden print:block">
        An Post / Kaffee / Milch denken!
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-8 print:hidden">
        <Button size={"lg"}>Eingabe</Button>
        <Button asChild size={"lg"}>
          <a
            href="https://www.edeka.de/maerkte/062700/prospekte/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edeka Blättchen
          </a>
        </Button>
        <Button size={"lg"} onClick={() => alert("Drucken")}>
          Drucken
        </Button>
      </div>

      <Card className="my-8 print:hidden">
        <CardContent>
          {data.liste.map((x, idx) => (
            <React.Fragment key={x.id}>
              <EinkaufsCard
                id={x.id}
                abo={x.Abonniert}
                paypal={x.Paypal}
                name={x.Mitarbeiter?.name ?? ""}
                maId={x.Mitarbeiter?.id ?? ""}
                dinge={x.Dinge}
                bild3={x.Bild3}
                bild1={x.Bild1}
                geld={x.Geld}
                pfand={x.Pfand}
                bild2={x.Bild2}
              />

              {idx != data.liste.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function EinkaufsCard(props: {
  id: string;
  name: string;
  maId: string;
  dinge: string;
  pfand: string | null;
  geld: string | null;
  abo: boolean;
  paypal: boolean;
  bild1: string | null;
  bild2: string | null;
  bild3: string | null;
}) {
  return (
    <Item variant={"default"}>
      <ItemContent>
        <ItemTitle>{props.name}</ItemTitle>
        <ItemDescription>
          Pfand: {props.pfand} | Geld: {props.geld} | Paypal: {props.paypal}
        </ItemDescription>
        <pre>{props.dinge}</pre>
      </ItemContent>
    </Item>
  );
}
