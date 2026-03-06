"use client";

import LoadingSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";

export default function GeburtstagsListe() {
  const res = api.mitarbeiter.geburtstage.useQuery();
  const geburtstage = res.data;

  if (res.isLoading)
    return <LoadingSkeleton desc="Geburtstagsliste wird geladen..." />;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Geburtstagsliste</CardTitle>
      </CardHeader>
      <CardContent>
        {geburtstage?.heute && geburtstage.heute.length > 0 && (
          <section className="my-4">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Heute hat Geburtstag:
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {geburtstage.heute.map((x) => (
                <Alert key={x.id + x.name}>
                  <AlertTitle>{x.name}</AlertTitle>
                  <AlertDescription>Hat heute Geburtstag!</AlertDescription>
                </Alert>
              ))}
            </div>
          </section>
        )}
        {geburtstage?.zukunft && geburtstage.zukunft.length > 0 && (
          <section className="my-4">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Zukünftige Geburtstage:
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {geburtstage.zukunft.map((x) => (
                <Alert key={x.id + x.name}>
                  <AlertTitle>{x.name}</AlertTitle>
                  <AlertDescription>
                    Hat in {x.diff} Tagen Geburtstag! -{" "}
                    {x.geb.toLocaleDateString("de-de", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </section>
        )}
        {geburtstage?.vergangen && geburtstage.vergangen.length > 0 && (
          <section className="my-4">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Vergangene Geburtstage:
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {geburtstage.vergangen.map((x) => (
                <Alert key={x.id + x.name}>
                  <AlertTitle>{x.name}</AlertTitle>
                  <AlertDescription>
                    Hatte vor {x.diff * -1} Tagen Geburtstag! -{" "}
                    {x.geb.toLocaleDateString("de-de", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
