/* eslint-disable @next/next/no-img-element */
"use client";

import { PaginatedDataTable } from "@/components/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AppRouter } from "@/server/api/root";
import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import { CheckCircle, CrossIcon, GlobeIcon, SchoolIcon } from "lucide-react";
import Link from "next/link";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Mitarbeiter = RouterOutput["mitarbeiter"]["getAll"];
type Lieferant = RouterOutput["lieferant"]["getAllWithAp"];
type Ansprechpartner = RouterOutput["ansprechpartner"]["getAll"];
type Abteilung = RouterOutput["abteilung"]["get"];
type Angebot = RouterOutput["angebot"]["get"];
type Job = RouterOutput["job"]["get"];
type Partner = RouterOutput["partner"]["get"];
type Referenz = RouterOutput["referenz"]["get"];

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

export const abteilungenColumns: ColumnDef<Abteilung>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const x = row.original;
      return <Link href={"/CMS/Abteilung/" + x?.id}>{x?.name}</Link>;
    },
  },
  { accessorKey: "idx", header: "Index" },
];

export const AngeboteColumns: ColumnDef<Angebot>[] = [
  {
    accessorKey: "title",
    header: "Titel",
    cell: ({ row }) => {
      const x = row.original;
      return <Link href={"/CMS/Angebot/" + x?.id}>{x?.title}</Link>;
    },
  },
  { accessorKey: "subtitle", header: "Sub Titel" },
  {
    accessorKey: "date_start",
    header: "Laufzeit",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <p>
          {x?.date_start.toLocaleDateString("de-de", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
          -
          {x?.date_stop.toLocaleDateString("de-de", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.link)
        return (
          <div className="max-h-10 w-60">
            <p className="overflow-hidden text-ellipsis">
              <Tooltip>
                <TooltipTrigger>
                  <a href={x?.link} target="_blank" rel="noopener noreferrer">
                    {x?.link}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-md">
                  {x?.link}
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        );
      else return "-";
    },
  },
  {
    accessorKey: "image",
    header: "Bild",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.image)
        return (
          <Tooltip>
            <TooltipTrigger>{x?.image}</TooltipTrigger>
            <TooltipContent side="left" align="start" className="max-w-md">
              <img
                src={
                  "https://bilder.computer-extra.de/data/Angebote/" + x.image
                }
                alt={x.image}
                className="h-auto max-w-md"
              />
            </TooltipContent>
          </Tooltip>
        );
      else return "-";
    },
  },
  {
    accessorKey: "anzeigen",
    header: "Online",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.anzeigen) return <CheckCircle className="size-4 text-green-500" />;
      else return <CrossIcon className="size-4 rotate-45 text-red-500" />;
    },
  },
];

export const JobColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const x = row.original;
      return <Link href={"/CMS/Job/" + x?.id}>{x?.name}</Link>;
    },
  },
  {
    accessorKey: "isAusbilung",
    header: "Ausbildung",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.isAusbilung)
        return <CheckCircle className="size-4 text-green-500" />;
      else return <CrossIcon className="size-4 rotate-45 text-red-500" />;
    },
  },
  {
    accessorKey: "Aufgaben",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.Aufgaben)
        return (
          <div className="max-h-10 w-60">
            <p className="overflow-hidden text-ellipsis">
              <Tooltip>
                <TooltipTrigger>{x?.Aufgaben}</TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-md">
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    {x?.Aufgaben.split("|").map((y, idx) => (
                      <li key={idx}>{y}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        );
      else return "-";
    },
  },
  {
    accessorKey: "Beschreibung",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.Beschreibung)
        return (
          <div className="max-h-10 w-60">
            <p className="overflow-hidden text-ellipsis">
              <Tooltip>
                <TooltipTrigger>{x?.Beschreibung}</TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-md">
                  {x?.Beschreibung}
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        );
      else return "-";
    },
  },
  {
    accessorKey: "Profil",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.Profil)
        return (
          <div className="max-h-10 w-60">
            <p className="overflow-hidden text-ellipsis">
              <Tooltip>
                <TooltipTrigger>{x?.Profil}</TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-md">
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    {x?.Profil.split("|").map((y, idx) => (
                      <li key={idx}>{y}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        );
      else return "-";
    },
  },
  {
    accessorKey: "online",
    header: "Auf Webseite",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.online) return <CheckCircle className="size-4 text-green-500" />;
      else return <CrossIcon className="size-4 rotate-45 text-red-500" />;
    },
  },
];

export const PartnerColumns: ColumnDef<Partner>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const x = row.original;
      return <Link href={"/CMS/Partner/" + x?.id}>{x?.name}</Link>;
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.link)
        return (
          <div className="max-h-10 w-60">
            <p className="overflow-hidden text-ellipsis">
              <Tooltip>
                <TooltipTrigger>
                  <a href={x?.link} target="_blank" rel="noopener noreferrer">
                    {x?.link}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-md">
                  {x?.link}
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        );
      else return "-";
    },
  },
  {
    accessorKey: "image",
    header: "Bild",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.image)
        return (
          <Tooltip>
            <TooltipTrigger>{x?.image}</TooltipTrigger>
            <TooltipContent side="left" align="start" className="max-w-md">
              <img
                src={"https://bilder.computer-extra.de/data/Partner/" + x.image}
                alt={x.image}
                className="h-auto max-w-md"
              />
            </TooltipContent>
          </Tooltip>
        );
      else return "-";
    },
  },
];

export const ReferenzColumns: ColumnDef<Referenz>[] = [
  {
    accessorKey: "Name",
    cell: ({ row }) => {
      const x = row.original;
      return <Link href={"/CMS/Referenz/" + x?.id}>{x?.Name}</Link>;
    },
  },
  {
    accessorKey: "Webseite",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.Webseite)
        return (
          <div className="max-h-10 w-60">
            <p className="overflow-hidden text-ellipsis">
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href={x?.Webseite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {x?.Webseite}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" align="start" className="max-w-md">
                  {x?.Webseite}
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        );
      else return "-";
    },
  },
  {
    accessorKey: "Bild",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.Bild)
        return (
          <Tooltip>
            <TooltipTrigger>{x?.Bild}</TooltipTrigger>
            <TooltipContent side="left" align="start" className="max-w-md">
              <img src={x.Bild} alt={x.Bild} className="h-auto max-w-md" />
            </TooltipContent>
          </Tooltip>
        );
      else return "-";
    },
  },
  {
    accessorKey: "Online",
    cell: ({ row }) => {
      const x = row.original;
      if (x?.Online) return <CheckCircle className="size-4 text-green-500" />;
      else return <CrossIcon className="size-4 rotate-45 text-red-500" />;
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
