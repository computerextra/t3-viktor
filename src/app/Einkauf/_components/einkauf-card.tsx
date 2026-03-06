"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import Link from "next/link";
import React from "react";

export default function EinkaufCard() {
  const [data] = api.einkauf.einkaufsliste.useSuspenseQuery();

  return (
    <Card className="my-8">
      <CardContent>
        {data?.map((x, idx) => (
          <React.Fragment key={x.id}>
            <Item variant={"default"}>
              <ItemContent>
                <ItemTitle>
                  <Link href={"Einkauf/" + x.Mitarbeiter?.id}>
                    {x.Mitarbeiter?.name}
                  </Link>
                </ItemTitle>
                <ItemDescription>
                  {x.Pfand && x.Pfand.length > 0 && "Pfand: " + x.Pfand + " | "}
                  {x.Geld && x.Geld.length > 0 && "Geld: " + x.Geld + " | "}
                  {x.Paypal ? "Zahlung mit Paypal" : "Zahlung in Bar"}
                </ItemDescription>
                <div className="grid grid-cols-3 print:grid-cols-1">
                  <pre className="col-span-2 font-sans">{x.Dinge.trim()}</pre>
                  <div className="grid grid-cols-3 gap-8">
                    {x.Bild1 && x.Bild1.length > 1 && (
                      <EinkaufBild src={x.Bild1} />
                    )}
                    {x.Bild2 && x.Bild2.length > 1 && (
                      <EinkaufBild src={x.Bild2} />
                    )}
                    {x.Bild3 && x.Bild3.length > 1 && (
                      <EinkaufBild src={x.Bild3} />
                    )}
                  </div>
                </div>
              </ItemContent>
            </Item>
            {idx != data.length - 1 && (
              <Separator className="print:border-b print:text-black" />
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

function EinkaufBild({ src }: { src: string }) {
  return (
    <img src={src} alt={src} className="h-auto max-h-45 w-auto max-w-45" />
  );
}
