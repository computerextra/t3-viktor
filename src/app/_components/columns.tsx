"use client";

import type { AppRouter } from "@/server/api/root";
import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import { GlobeIcon, SchoolIcon } from "lucide-react";
import Link from "next/link";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Mitarbeiter = RouterOutput["mitarbeiter"]["getAll"];

export const mitarbeiterColumns: ColumnDef<Mitarbeiter[0]>[] = [
  {
    accessorKey: "Azubi",
    header: "Status",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="flex">
          {x.Azubi && <SchoolIcon className="size-4" />}
          {x.mail && x.sex && x.short && <GlobeIcon className="size-4" />}
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
