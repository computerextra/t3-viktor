"use client";

import { PaginatedSearchDataTable } from "@/components/data-table";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { type inferRouterOutputs } from "@trpc/server";
import { Search } from "lucide-react";

type RouterOutput = inferRouterOutputs<AppRouter>;

export default function Seite2({ id }: { id: number }) {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-3 gap-8">
          <Dokumente id={id} />
          <div className="col-span-2">
            <Ansprechpartner id={id} />
          </div>
          <Standorte id={id} />
        </div>
      </CardContent>
    </Card>
  );
}

type DokuDokumente = RouterOutput["intrexx_doku"]["dokumente"];
function Dokumente({ id }: { id: number }) {
  const dokumente = api.intrexx_doku.dokumente.useQuery({ id });

  const DokumenteColumns: ColumnDef<DokuDokumente[0]>[] = [
    {
      accessorKey: "STR_BEZEICHNUNG_35D4ABDE",
      header: "Bezeichnung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_BEZEICHNUNG_35D4ABDE}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "L_DATEI_690DB904",
      header: "Datei",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="text-pretty">
              {x.XFILEDATAGROUP4CC65BF4.map((y, idx) => (
                <span key={idx} className="block">
                  {y.STRFILENAME}
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
      <h3 className="text-center">Dokumente</h3>
      {dokumente.isLoading ? (
        <LoadingSkeleton desc="Dokumente laden..." />
      ) : (
        <PaginatedSearchDataTable
          filter="STR_BEZEICHNUNG_35D4ABDE"
          label="Bezeichnung"
          columns={DokumenteColumns}
          data={dokumente.data ?? []}
        />
      )}
    </div>
  );
}

type DokuAnsprechpartner = RouterOutput["intrexx_doku"]["ansprechpartner"];
function Ansprechpartner({ id }: { id: number }) {
  const ansprechpartner = api.intrexx_doku.ansprechpartner.useQuery({ id });

  const AnsprechpartnerColumns: ColumnDef<DokuAnsprechpartner[0]>[] = [
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
                  <DialogTitle>Ansprechpartner bearbeiten</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="Name">Name</Label>
                    <Input
                      id="Name"
                      name="Name"
                      defaultValue={x.STR_NMAE_E843FEF8 ?? ""}
                    />
                  </Field>
                  <Field className="col-span-2">
                    <Label htmlFor="Position">Position</Label>
                    <Input
                      id="Position"
                      name="Position"
                      defaultValue={x.STR_POSITION_015DC0B5 ?? ""}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="Telefon1">Telefon1</Label>
                    <Input
                      id="Telefon1"
                      name="Telefon1"
                      defaultValue={x.STR_TELEFON1_E2E70675 ?? ""}
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="Telefon2">Telefon2</Label>
                    <Input
                      id="Telefon2"
                      name="Telefon2"
                      defaultValue={x.STR_TELEFON2_DAD3C381 ?? ""}
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="Email">Email</Label>
                    <Input
                      id="Email"
                      name="Email"
                      defaultValue={x.STR_EMAIL_12F8DD28 ?? ""}
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
      accessorKey: "STR_NMAE_E843FEF8",
      header: "Name",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">{x.STR_NMAE_E843FEF8}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_POSITION_015DC0B5",
      header: "Position",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_POSITION_015DC0B5}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_TELEFON1_E2E70675",
      header: "Telefon1",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <a
              href={"tel:" + x.STR_TELEFON1_E2E70675}
              className="line-clamp-4 text-pretty underline"
            >
              {x.STR_TELEFON1_E2E70675}
            </a>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_TELEFON2_DAD3C381",
      header: "Telefon2",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <a
              href={"tel:" + x.STR_TELEFON2_DAD3C381}
              className="line-clamp-4 text-pretty underline"
            >
              {x.STR_TELEFON2_DAD3C381}
            </a>
          </div>
        );
      },
    },
    {
      accessorKey: "STR_EMAIL_12F8DD28",
      header: "Mail",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <a
              href={"mailto:" + x.STR_EMAIL_12F8DD28}
              className="line-clamp-4 text-pretty underline"
            >
              {x.STR_EMAIL_12F8DD28}
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3 className="text-center">Ansprechpartner</h3>
      {ansprechpartner.isLoading ? (
        <LoadingSkeleton desc="Ansprechpartner laden..." />
      ) : (
        <PaginatedSearchDataTable
          filter="STR_NMAE_E843FEF8"
          label="Name"
          columns={AnsprechpartnerColumns}
          data={ansprechpartner.data ?? []}
        />
      )}
    </div>
  );
}

type DokuStandorte = RouterOutput["intrexx_doku"]["standorte"];
function Standorte({ id }: { id: number }) {
  const standorte = api.intrexx_doku.standorte.useQuery({ id });

  const StandortColumns: ColumnDef<DokuStandorte[0]>[] = [
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
                  <DialogTitle>Standort bearbeiten</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="Bezeichnung">Bezeichnung</Label>
                    <Input
                      id="Bezeichnung"
                      name="Bezeichnung"
                      defaultValue={x.STR_BEZEICHNUNG_03F3446E ?? ""}
                    />
                  </Field>
                  <Field className="col-span-2">
                    <Label htmlFor="Beschreibung">Beschreibung</Label>
                    <Textarea
                      id="Beschreibung"
                      name="Beschreibung"
                      defaultValue={x.TXT_BESCHREIBUNG_E68EC424 ?? ""}
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
      accessorKey: "STR_BEZEICHNUNG_03F3446E",
      header: "Bezeichnung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.STR_BEZEICHNUNG_03F3446E}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "TXT_BESCHREIBUNG_E68EC424",
      header: "Beschreibung",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="max-w-40">
            <p className="line-clamp-4 text-pretty">
              {x.TXT_BESCHREIBUNG_E68EC424}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3 className="text-center">Standorte</h3>
      {standorte.isLoading ? (
        <LoadingSkeleton desc="Standorte laden..." />
      ) : (
        <PaginatedSearchDataTable
          filter="STR_BEZEICHNUNG_03F3446E"
          label="Name"
          columns={StandortColumns}
          data={standorte.data ?? []}
        />
      )}
    </div>
  );
}
