import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTitle } from "@/hooks/use-title";
import { GeburtstagsQueryOptions, getGeburtstage } from "@/server/mitarbeiter";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(GeburtstagsQueryOptions());
    return getGeburtstage();
  },
});

function Home() {
  useTitle(undefined);
  const data = Route.useLoaderData();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const timer = useRef<any | null>(null);

  useEffect(() => {
    const t = new Date();
    setHour(t.getHours());
    setMinute(t.getMinutes());

    timer.current = setInterval(() => {
      setHour(new Date().getHours());
      setMinute(new Date().getMinutes());
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Viktor
      </h1>
      <p className="leading-7 not-first:mt-6 text-2xl">
        Heute ist der:{" "}
        {new Date().toLocaleDateString("de-de", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}{" "}
        - {hour > 9 ? hour : "0" + hour}:{minute > 0 ? minute : "0" + minute}{" "}
        Uhr
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Geburtstagsliste</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.heute && data.heute.length > 0 && (
            <section className="my-4">
              <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Heute hat Geburtstag:
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.heute.map((x) => (
                  <Alert id={x.id}>
                    <AlertTitle>{x.name}</AlertTitle>
                    <AlertDescription>Hat heute Geburtstag!</AlertDescription>
                  </Alert>
                ))}
              </div>
            </section>
          )}
          {data?.zukunft && data.zukunft.length > 0 && (
            <section className="my-4">
              <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Zukünftige Geburtstage:
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.zukunft.map((x) => (
                  <Alert id={x.id}>
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
          {data?.vergangen && data.vergangen.length > 0 && (
            <section className="my-4">
              <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Vergangene Geburtstage:
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.vergangen.map((x) => (
                  <Alert id={x.id}>
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
    </div>
  );
}
