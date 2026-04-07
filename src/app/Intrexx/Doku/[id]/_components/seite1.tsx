"use client";

import { PaginatedDataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import {
  EmailColumns,
  KontenColumns,
  ServerColumns,
  SoftwareColumns,
  WorkstationColumns,
} from "./columns";
import type { AppRouter } from "@/server/api/root";
import { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type RouterOutput = inferRouterOutputs<AppRouter>;

type DokuDrucker = RouterOutput["intrexx_doku"]["drucker"];
type DokuNetzwerkgeräte = RouterOutput["intrexx_doku"]["netzwerkgeräte"];
type DokuZugangsdaten = RouterOutput["intrexx_doku"]["zugangsdaten"];
type DokuSonstiges = RouterOutput["intrexx_doku"]["sonstiges"];

export default function Seite1({ id }: { id: number }) {
  const server = api.intrexx_doku.getServer.useQuery({ id });
  const workstations = api.intrexx_doku.workstations.useQuery({ id });
  const konten = api.intrexx_doku.konten.useQuery({ id });
  const software = api.intrexx_doku.software.useQuery({ id });
  const email = api.intrexx_doku.email.useQuery({ id });

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-3 gap-8">
          {/* TODO: In Eigene Funktion mit Modal */}
          <div>
            <h3 className="text-center">Server</h3>
            {server.isLoading ? (
              <LoadingSkeleton desc="Server laden..." />
            ) : (
              <PaginatedDataTable
                columns={ServerColumns}
                data={server.data ?? []}
              />
            )}
          </div>
          {/* TODO: In Eigene Funktion mit Modal */}
          <div>
            <h3 className="text-center">Worstations</h3>
            {workstations.isLoading ? (
              <LoadingSkeleton desc="Workstations laden..." />
            ) : (
              <PaginatedDataTable
                columns={WorkstationColumns}
                data={workstations.data ?? []}
              />
            )}
          </div>
          {/* TODO: In Eigene Funktion mit Modal */}
          <div>
            <h3 className="text-center">Konten</h3>
            {konten.isLoading ? (
              <LoadingSkeleton desc="Konten laden..." />
            ) : (
              <PaginatedDataTable
                columns={KontenColumns}
                data={konten.data ?? []}
              />
            )}
          </div>
          {/* TODO: In Eigene Funktion mit Modal */}
          <div>
            <h3 className="text-center">Software</h3>
            {software.isLoading ? (
              <LoadingSkeleton desc="Software lädt..." />
            ) : (
              <PaginatedDataTable
                columns={SoftwareColumns}
                data={software.data ?? []}
              />
            )}
          </div>
          {/* TODO: In Eigene Funktion mit Modal */}
          <div>
            <h3 className="text-center">E-Mail</h3>
            {email.isLoading ? (
              <LoadingSkeleton desc="E-Mails laden..." />
            ) : (
              <PaginatedDataTable
                columns={EmailColumns}
                data={email.data ?? []}
              />
            )}
          </div>

          <Drucker id={id} />
          <Netzwerkgeräte id={id} />
          <Zugangsdaten id={id} />
          <Sonstiges id={id} />
        </div>
      </CardContent>
    </Card>
  );
}

function Drucker({ id }: { id: number }) {
  const drucker = api.intrexx_doku.drucker.useQuery({ id });

  const DruckerColumns: ColumnDef<DokuDrucker[0]>[] = [
    {
      accessorKey: "LID",
      header: "",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <Dialog>
            <form onSubmit={(e) => e.preventDefault()}>
              <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <Search className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Zugangsdaten bearbeiten</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="Modell">Modell</Label>
                      <Input
                        id="Modell"
                        name="Modell"
                        defaultValue={x.STR_MODELL_67B0B40E ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="Anschluss">Anschluss</Label>
                      <Input
                        id="Anschluss"
                        name="Anschluss"
                        defaultValue={x.STR_ANSCHLUSSART_F75AD7D2 ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="IP">IP</Label>
                      <Input
                        id="IP"
                        name="IP"
                        defaultValue={x.STR_IPADRESSE_BCEA9C26 ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="Standort">Standort</Label>
                      <Input
                        id="Standort"
                        name="Standort"
                        defaultValue={x.STR_STANDORT_917A167A ?? ""}
                      />
                    </Field>
                  </FieldGroup>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Abbrechen</Button>
                  </DialogClose>
                  <Button type="submit">Speichern</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        );
      },
    },
    {
      accessorKey: "STR_MODELL_67B0B40E",
      header: "Modell",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">{x.STR_MODELL_67B0B40E}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_ANSCHLUSSART_F75AD7D2",
      header: "Anschluss",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_ANSCHLUSSART_F75AD7D2}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_IPADRESSE_BCEA9C26",
      header: "IP",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_IPADRESSE_BCEA9C26}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_STANDORT_917A167A",
      header: "Standort",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_STANDORT_917A167A}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3 className="text-center">Drucker</h3>
      {drucker.isLoading ? (
        <LoadingSkeleton desc="Drucker laden..." />
      ) : (
        <PaginatedDataTable
          columns={DruckerColumns}
          data={drucker.data ?? []}
        />
      )}
    </div>
  );
}

function Netzwerkgeräte({ id }: { id: number }) {
  const netzwerkgeräte = api.intrexx_doku.netzwerkgeräte.useQuery({ id });

  const NetzwerkGeräteColumns: ColumnDef<DokuNetzwerkgeräte[0]>[] = [
    {
      accessorKey: "LID",
      header: "",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <Dialog>
            <form onSubmit={(e) => e.preventDefault()}>
              <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <Search className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Netzwerkgerät bearbeiten</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="Bezeichnung">Bezeichnung</Label>
                      <Input
                        id="Bezeichnung"
                        name="Bezeichnung"
                        defaultValue={x.STR_BEZEICHNUNG_EA6D28B2 ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="IP">IP</Label>
                      <Input
                        id="IP"
                        name="IP"
                        defaultValue={x.STR_IPADRESSE_C56DEAB6 ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="Standort">Standort</Label>
                      <Input
                        id="Standort"
                        name="Standort"
                        defaultValue={x.STR_STANDORT_45CC8D89 ?? ""}
                      />
                    </Field>
                  </FieldGroup>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Abbrechen</Button>
                  </DialogClose>
                  <Button type="submit">Speichern</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        );
      },
    },
    {
      accessorKey: "STR_BEZEICHNUNG_EA6D28B2",
      header: "Bezeichnung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_BEZEICHNUNG_EA6D28B2}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_IPADRESSE_C56DEAB6",
      header: "IP",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_IPADRESSE_C56DEAB6}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_STANDORT_45CC8D89",
      header: "Standort",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_STANDORT_45CC8D89}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3 className="text-center">Netzwerkgeräte</h3>
      {netzwerkgeräte.isLoading ? (
        <LoadingSkeleton desc="Netzwerkgeräte laden..." />
      ) : (
        <PaginatedDataTable
          columns={NetzwerkGeräteColumns}
          data={netzwerkgeräte.data ?? []}
        />
      )}
    </div>
  );
}

function Zugangsdaten({ id }: { id: number }) {
  const zugangsdaten = api.intrexx_doku.zugangsdaten.useQuery({ id });

  const ZugangsdatenColumns: ColumnDef<DokuZugangsdaten[0]>[] = [
    {
      accessorKey: "LID",
      header: "",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <Dialog>
            <form onSubmit={(e) => e.preventDefault()}>
              <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <Search className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Zugangsdaten bearbeiten</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="Bezeichnung">Bezeichnung</Label>
                      <Input
                        id="Bezeichnung"
                        name="Bezeichnung"
                        defaultValue={x.STR_BEZEICHNUNG_2863B413 ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="Bemerkung">Bemerkung</Label>
                      <Textarea
                        className="max-h-60"
                        id="Bemerkung"
                        name="Bemerkung"
                        defaultValue={x.TXT_BEMERKUNG_E8B73E6B ?? ""}
                      />
                    </Field>
                  </FieldGroup>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Abbrechen</Button>
                  </DialogClose>
                  <Button type="submit">Speichern</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        );
      },
    },
    {
      accessorKey: "STR_BEZEICHNUNG_2863B413",
      header: "Bezeichnung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_BEZEICHNUNG_2863B413}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "TXT_BEMERKUNG_E8B73E6B",
      header: "Bemerkung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.TXT_BEMERKUNG_E8B73E6B}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3 className="text-center">Zugangsdaten</h3>
      {zugangsdaten.isLoading ? (
        <LoadingSkeleton desc="Zugangsdaten laden..." />
      ) : (
        <PaginatedDataTable
          columns={ZugangsdatenColumns}
          data={zugangsdaten.data ?? []}
        />
      )}
    </div>
  );
}

function Sonstiges({ id }: { id: number }) {
  const sonstiges = api.intrexx_doku.sonstiges.useQuery({ id });

  const SonstigesColumns: ColumnDef<DokuSonstiges[0]>[] = [
    {
      accessorKey: "LID",
      header: "",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <Dialog>
            <form onSubmit={(e) => e.preventDefault()}>
              <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <Search className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sonstiges bearbeiten</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="Beschreibung">Beschreibung</Label>
                      <Input
                        id="Beschreibung"
                        name="Beschreibung"
                        defaultValue={x.STR_BESCHREIBUNG_CE8A52EF ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="Bemerkung">Bemerkung</Label>
                      <Textarea
                        className="max-h-60"
                        id="Bemerkung"
                        name="Bemerkung"
                        defaultValue={x.TXT_BEMERKUNG_15AFD3BC ?? ""}
                      />
                    </Field>
                  </FieldGroup>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Abbrechen</Button>
                  </DialogClose>
                  <Button type="submit">Speichern</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        );
      },
    },
    {
      accessorKey: "STR_BESCHREIBUNG_CE8A52EF",
      header: "Beschreibung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_BESCHREIBUNG_CE8A52EF}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "TXT_BEMERKUNG_15AFD3BC",
      header: "Bemerkung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="h-15 max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.TXT_BEMERKUNG_15AFD3BC}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3 className="text-center">Sonstiges</h3>
      {sonstiges.isLoading ? (
        <LoadingSkeleton desc="Sonstiges lädt..." />
      ) : (
        <PaginatedDataTable
          columns={SonstigesColumns}
          data={sonstiges.data ?? []}
        />
      )}
    </div>
  );
}
