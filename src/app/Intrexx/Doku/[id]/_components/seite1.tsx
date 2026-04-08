"use client";

import {
  PaginatedDataTable,
  PaginatedSearchDataTable,
} from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { KontenColumns, ServerColumns, WorkstationColumns } from "./columns";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Context } from "radix-ui/internal";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RouterOutput = inferRouterOutputs<AppRouter>;

export default function Seite1({ id }: { id: number }) {
  const server = api.intrexx_doku.getServer.useQuery({ id });
  const workstations = api.intrexx_doku.workstations.useQuery({ id });
  const konten = api.intrexx_doku.konten.useQuery({ id });

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

          <Software id={id} />
          <Email id={id} />
          <Drucker id={id} />
          <Netzwerkgeräte id={id} />
          <Zugangsdaten id={id} />
          <Sonstiges id={id} />
        </div>
      </CardContent>
    </Card>
  );
}

type DokuSoftware = RouterOutput["intrexx_doku"]["software"];
function Software({ id }: { id: number }) {
  const software = api.intrexx_doku.software.useQuery({ id });

  const SoftwareColumns: ColumnDef<DokuSoftware[0]>[] = [
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
                  <DialogTitle>Software bearbeiten</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="Bezeichnung">Bezeichnung</Label>
                    <Input
                      id="Bezeichnung"
                      name="Bezeichnung"
                      defaultValue={x.STR_BEZEICHNUNG_CDC647B9 ?? ""}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="Registrierung">Registrierung</Label>
                    <Input
                      id="Registrierung"
                      name="Registrierung"
                      defaultValue={x.STR_REGISTRIERUNG_86D1E105 ?? ""}
                    />
                  </Field>
                  <h4 className="mb-0 text-sm leading-none font-medium">
                    Installiert auf
                  </h4>
                  <div className="grid grid-cols-2 gap-8">
                    <ScrollArea className="h-72 w-48 rounded-md border">
                      <div className="p-4">
                        <h4 className="mb-4 text-sm leading-none font-medium">
                          Workstations:
                        </h4>
                        {x.TXT_WORKSTATIONS_0D05B97D?.split("|").map(
                          (tag, idx) => (
                            <React.Fragment key={idx}>
                              <div className="text-sm">{tag}</div>
                              <Separator className="my-2" />
                            </React.Fragment>
                          ),
                        )}
                      </div>
                    </ScrollArea>
                    <ScrollArea className="h-72 w-48 rounded-md border">
                      <div className="p-4">
                        <h4 className="mb-4 text-sm leading-none font-medium">
                          Server:
                        </h4>
                        {x.TXT_SERVER_BF0068DC?.split("|").map((tag, idx) => (
                          <React.Fragment key={idx}>
                            <div className="text-sm">{tag}</div>
                            <Separator className="my-2" />
                          </React.Fragment>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <Field>
                    <Label htmlFor="Bemerkung">Bemerkung</Label>
                    <Textarea
                      id="Bemerkung"
                      name="Bemerkung"
                      defaultValue={x.TXT_BEMERKUNG_E255216A ?? ""}
                    />
                  </Field>
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
      accessorKey: "STR_BEZEICHNUNG_CDC647B9",
      header: "Bezeichnung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_BEZEICHNUNG_CDC647B9}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "TXT_SERVER_BF0068DC",
      header: "Server",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.TXT_SERVER_BF0068DC?.split("|").map((x, idx) => (
                <span className="block" key={idx}>
                  {x}
                </span>
              ))}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "TXT_WORKSTATIONS_0D05B97D",
      header: "Wokstations",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.TXT_WORKSTATIONS_0D05B97D?.split("|").map((x, idx) => (
                <span className="block" key={idx}>
                  {x}
                </span>
              ))}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3 className="text-center">Software</h3>
      {software.isLoading ? (
        <LoadingSkeleton desc="Software lädt..." />
      ) : (
        <PaginatedSearchDataTable
          filter="STR_BEZEICHNUNG_CDC647B9"
          label="Bezeichnung"
          columns={SoftwareColumns}
          data={software.data ?? []}
        />
      )}
    </div>
  );
}

type DokuEmails = RouterOutput["intrexx_doku"]["email"];
function Email({ id }: { id: number }) {
  const email = api.intrexx_doku.email.useQuery({ id });

  const EmailColumns: ColumnDef<DokuEmails[0]>[] = [
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
                  <DialogTitle>Email bearbeiten</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <div className="grid grid-cols-3 gap-8">
                    <Field className="col-span-2">
                      <Label htmlFor="E-Mail">E-Mail</Label>
                      <Input
                        id="E-Mail"
                        name="E-Mail"
                        defaultValue={x.STR_EMAILADRESSE_1EA5B191 ?? ""}
                      />
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox
                        id="Hauptadresse"
                        name="Hauptadresse"
                        defaultChecked={x.B_HAUPTADRESSE_D177615C ?? false}
                      />
                      <Label htmlFor="Hauptadresse">Hauptadresse</Label>
                    </Field>
                  </div>

                  <Field>
                    <Label htmlFor="Kontotype">Kontotype</Label>
                    <Input
                      id="Kontotype"
                      name="Kontotype"
                      defaultValue={x.STR_KONTOTYP_5A9DD29A ?? ""}
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="Anmeldename">Anmeldename</Label>
                    <Input
                      id="Anmeldename"
                      name="Anmeldename"
                      defaultValue={x.STR_ANMELDENAME_7B82FEE6 ?? ""}
                    />
                  </Field>
                  <div className="grid grid-cols-3 gap-8">
                    <Field className="col-span-2">
                      <Label htmlFor="Kennwort">Kennwort</Label>
                      <Input
                        id="Kennwort"
                        name="Kennwort"
                        defaultValue={x.STR_KENNWORT_B9B3C27F ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="Benutzer">Benutzer</Label>
                      <Input
                        id="Benutzer"
                        name="Benutzer"
                        defaultValue={x.STR_BENUTZER_5AD93F17 ?? ""}
                      />
                    </Field>
                  </div>
                  <Field>
                    <Label htmlFor="Bemerkung">Bemerkung</Label>
                    <Textarea
                      id="Bemerkung"
                      name="Bemerkung"
                      defaultValue={x.TXT_BEMERKUNG_0166A07C ?? ""}
                    />
                  </Field>
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
      accessorKey: "STR_EMAILADRESSE_1EA5B191",
      header: "E-Mail",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_EMAILADRESSE_1EA5B191}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_ANMELDENAME_7B82FEE6",
      header: "Anmeldename",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_ANMELDENAME_7B82FEE6}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_KENNWORT_B9B3C27F",
      header: "Kennwort",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <Tooltip delayDuration={1000}>
            <TooltipTrigger>
              <ContextMenu>
                <ContextMenuTrigger>*****</ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    onClick={() => {
                      if (x.STR_KENNWORT_B9B3C27F == null) return;
                      navigator.clipboard.writeText(x.STR_KENNWORT_B9B3C27F);
                      toast.success("Passwort in Zwischenablage kopiert.");
                    }}
                  >
                    {x.STR_KENNWORT_B9B3C27F}
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rechtsklick zum anzeigen und kopieren</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <div>
      <h3 className="text-center">E-Mail</h3>
      {email.isLoading ? (
        <LoadingSkeleton desc="E-Mails laden..." />
      ) : (
        <PaginatedSearchDataTable
          filter="STR_EMAILADRESSE_1EA5B191"
          label="E-Mail"
          columns={EmailColumns}
          data={email.data ?? []}
        />
      )}
    </div>
  );
}

type DokuDrucker = RouterOutput["intrexx_doku"]["drucker"];
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
                    <Field>
                      <Label htmlFor="Bemerkung">Bemerkung</Label>
                      <Textarea
                        id="Bemerkung"
                        name="Bemerkung"
                        defaultValue={x.TXT_BEMERKUNG_017B4394 ?? ""}
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
          <div className="max-w-40">
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
          <div className="max-w-40">
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
          <div className="max-w-40">
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
          <div className="max-w-40">
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
        <PaginatedSearchDataTable
          filter="STR_MODELL_67B0B40E"
          label="Modell"
          columns={DruckerColumns}
          data={drucker.data ?? []}
        />
      )}
    </div>
  );
}

type DokuNetzwerkgeräte = RouterOutput["intrexx_doku"]["netzwerkgeräte"];
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
                      <Label htmlFor="Anmeldename">Anmeldename</Label>
                      <Input
                        id="Anmeldename"
                        name="Anmeldename"
                        defaultValue={x.STR_ANMELDENAME_7A29BBFC ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="Kennwort">Kennwort</Label>
                      <Input
                        id="Kennwort"
                        name="Kennwort"
                        defaultValue={x.STR_KENNWORT_6B25E9C9 ?? ""}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-8">
                      <Field>
                        <Label htmlFor="SSID">SSID</Label>
                        <Input
                          id="SSID"
                          name="SSID"
                          defaultValue={x.STR_SSID_CF0D84B0 ?? ""}
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
                    </div>
                    <Field>
                      <Label htmlFor="Verschlüsselung">Verschlüsselung</Label>
                      <Input
                        id="Verschlüsselung"
                        name="Verschlüsselung"
                        defaultValue={x.STR_VERSCHLSSELUNG_A6A222FA ?? ""}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="Bemerkung">Bemerkung</Label>
                      <Textarea
                        id="Bemerkung"
                        name="Bemerkung"
                        defaultValue={x.TXT_BEMERKUNG_8B081A4F ?? ""}
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
          <div className="max-w-40">
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
          <div className="max-w-40">
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
          <div className="max-w-40">
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
        <PaginatedSearchDataTable
          filter="STR_BEZEICHNUNG_EA6D28B2"
          label="Bezeichnung"
          columns={NetzwerkGeräteColumns}
          data={netzwerkgeräte.data ?? []}
        />
      )}
    </div>
  );
}

type DokuZugangsdaten = RouterOutput["intrexx_doku"]["zugangsdaten"];
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
          <div className="max-w-40">
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
          <div className="max-w-40">
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
        <PaginatedSearchDataTable
          columns={ZugangsdatenColumns}
          label="Bezeichnung"
          data={zugangsdaten.data ?? []}
          filter="STR_BEZEICHNUNG_2863B413"
        />
      )}
    </div>
  );
}

type DokuSonstiges = RouterOutput["intrexx_doku"]["sonstiges"];
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
          <div className="max-w-40">
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
          <div className="max-w-40">
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
        <PaginatedSearchDataTable
          filter="STR_BESCHREIBUNG_CE8A52EF"
          label="Beschreibung"
          columns={SonstigesColumns}
          data={sonstiges.data ?? []}
        />
      )}
    </div>
  );
}
