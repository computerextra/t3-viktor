"use client";

import { PaginatedDataTable } from "@/components/data-table";
import type { AppRouter } from "@/server/api/root";
import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import { GlobeIcon, SchoolIcon } from "lucide-react";
import Link from "next/link";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Mitarbeiter = RouterOutput["mitarbeiter"]["getAll"];
type Lieferant = RouterOutput["lieferant"]["getAllWithAp"];
type Ansprechpartner = RouterOutput["ansprechpartner"]["getAll"];

const ansprechpartnerColumns: ColumnDef<Ansprechpartner[0]>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <Link href={"/Lieferanten/" + x.lieferantId + "/" + x.id}>
          {x.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "telefon",
    header: "Telefon",
    cell: ({ row }) => {
      const x = row.original;
      if (x.telefon)
        return (
          <a href={"tel:" + x.telefon} className="underline">
            {x.telefon}
          </a>
        );
      else return "-";
    },
  },
  {
    accessorKey: "mobil",
    header: "Mobil",
    cell: ({ row }) => {
      const x = row.original;
      if (x.mobil)
        return (
          <a href={"tel:" + x.mobil} className="underline">
            {x.mobil}
          </a>
        );
      else return "-";
    },
  },
  {
    accessorKey: "mail",
    header: "Mail",
    cell: ({ row }) => {
      const x = row.original;
      if (x.mail)
        return (
          <a href={"mailto:" + x.mail} className="underline">
            {x.mail}
          </a>
        );
      else return "-";
    },
  },
];

export const lieferantenColumns: ColumnDef<Lieferant[0]>[] = [
  {
    accessorKey: "Firma",
    cell: ({ row }) => {
      const x = row.original;
      return <Link href={"/Lieferanten/" + x.id}>{x.Firma}</Link>;
    },
  },
  { accessorKey: "Kundennummer" },
  {
    accessorKey: "Webseite",
    cell: ({ row }) => {
      const x = row.original;
      if (x.Webseite)
        return (
          <a
            href={x.Webseite}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {x.Webseite}
          </a>
        );
      else return "-";
    },
  },
  {
    accessorKey: "Ansprechpartner",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <PaginatedDataTable
          data={x.Ansprechpartner}
          columns={ansprechpartnerColumns}
        />
      );
    },
  },
];

export const mitarbeiterColumns: ColumnDef<Mitarbeiter[0]>[] = [
  {
    accessorKey: "Azubi",
    header: "Status",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="flex">
          {x.Azubi && <SchoolIcon className="size-4" />}
          {x.online && <GlobeIcon className="size-4" />}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const x = row.original;
      return <Link href={"/Mitarbeiter/" + x.id}>{x.name}</Link>;
    },
  },
  {
    accessorKey: "mail",
    header: "E-Mail",
    cell: ({ row }) => {
      const x = row.original;
      if (x.mail == null) return "-";
      return (
        <a className="underline" href={"mailto:" + x.mail}>
          {x.mail}
        </a>
      );
    },
  },
  {
    accessorKey: "Geburtstag",
    header: "Geburtstag",
    cell: ({ row }) => {
      const x = row.original;
      return x.Geburtstag?.toLocaleDateString("de-de", {
        day: "2-digit",
        month: "2-digit",
      });
    },
  },
  {
    accessorKey: "Gruppenwahl",
    header: "Kommunikation Intern",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="grid grid-cols-2">
          <span>Gruppe</span>
          <span>{x.Gruppenwahl}</span>
          <span>Intern</span>
          <span>{x.Telefon_Intern_1}</span>
          <span>Intern 2</span>
          <span>{x.Telefon_Intern_2}</span>
          <span>HomeOffice</span>
          <span>{x.HomeOffice}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "Telefon_Privat",
    header: "Kommunikation Extern",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="grid grid-cols-2">
          <span>Festnetz Privat</span>
          {x.Telefon_Privat ? (
            <a className="underline" href={"tel:" + x.Telefon_Privat}>
              {x.Telefon_Privat}
            </a>
          ) : (
            "-"
          )}

          <span>Festnetz Business</span>
          {x.Telefon_Business ? (
            <a className="underline" href={"tel:" + x.Telefon_Business}>
              {x.Telefon_Business}
            </a>
          ) : (
            "-"
          )}

          <span>Mobil Privat</span>
          {x.Mobil_Privat ? (
            <a className="underline" href={"tel:" + x.Mobil_Privat}>
              {x.Mobil_Privat}
            </a>
          ) : (
            "-"
          )}

          <span>Mobil Business</span>
          {x.Mobil_Business ? (
            <a className="underline" href={"tel:" + x.Mobil_Business}>
              {x.Mobil_Business}
            </a>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
];
