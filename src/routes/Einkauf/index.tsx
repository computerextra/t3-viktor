import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTitle } from "@/hooks/use-title";
import {
  getMitarbeiterListe,
  MitarbeiterListeQueryOptions,
} from "@/server/mitarbeiter";
import {
  EinkaufsListeQueryOptions,
  getEinkaufsliste,
} from "@/server/mitarbeiter/einkauf";

import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/Einkauf/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(EinkaufsListeQueryOptions());
    await context.queryClient.ensureQueryData(MitarbeiterListeQueryOptions());
    const liste = await getEinkaufsliste();
    const ma = await getMitarbeiterListe();

    return { liste, ma };
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
        <MitarbeiterDialog data={data.ma} />

        <Button asChild size={"lg"}>
          <a
            href="https://www.edeka.de/maerkte/062700/prospekte/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edeka Blättchen
          </a>
        </Button>
        <ClientOnly>
          <Button size={"lg"} onClick={window.print}>
            Drucken
          </Button>
        </ClientOnly>
      </div>

      <Card className="my-8">
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

              {idx != data.liste.length - 1 && (
                <Separator className="print:text-black print:border-b" />
              )}
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
        <ItemTitle>
          <Link to="/Einkauf/$maId" params={{ maId: props.maId }}>
            {props.name}
          </Link>
        </ItemTitle>
        <ItemDescription>
          {props.pfand &&
            props.pfand.length > 0 &&
            "Pfand: " + props.pfand + " | "}
          {props.geld && props.geld.length > 0 && "Geld: " + props.geld + " | "}
          {props.paypal ? "Zahlung mit Paypal" : "Zahlung in Bar"}
        </ItemDescription>
        <div className="grid grid-cols-3">
          <pre className="font-sans col-span-2">{props.dinge.trim()}</pre>
          <div>
            {props.bild1 && props.bild1.length > 1 && (
              <EinkaufBild src={props.bild1} />
            )}
            {props.bild2 && props.bild2.length > 1 && (
              <EinkaufBild src={props.bild2} />
            )}
            {props.bild3 && props.bild3.length > 1 && (
              <EinkaufBild src={props.bild3} />
            )}
          </div>
        </div>
      </ItemContent>
    </Item>
  );
}

function EinkaufBild({ src }: { src: string }) {
  return (
    <img src={src} alt={src} className="max-h-45 max-w-45 h-auto w-auto" />
  );
}

function MitarbeiterDialog({ data }: { data: { id: string; name: string }[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>Eingabe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Einkauf eingeben</DialogTitle>
          <DialogDescription>
            Deinen Namen auswählen und weiter klicken
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={(e) => setSelected(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Bitte wählen..." />
          </SelectTrigger>
          <SelectContent position={"item-aligned"}>
            <SelectGroup>
              {data.map((x) => (
                <SelectItem value={x.id} key={x.id}>
                  {x.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Abbrechen</Button>
          </DialogClose>
          <Button asChild disabled={selected == null}>
            <Link to="/Einkauf/$maId" params={{ maId: selected ?? "" }}>
              Zur Eingabe
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
