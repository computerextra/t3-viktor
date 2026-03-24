"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import KundendatenSuche from "./kundendaten-suche";
import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import FormularAnsicht from "./formular-ansicht";
import z from "zod";
import {
  aomeiFormData,
  appleFormData,
  gdataFormData,
  googleFormData,
  mailDeFormData,
  microsoftFormData,
  telekomFormData,
} from "@/types";

// TODO: Formular Druck erstellen!

export type Formular = {
  label: string;
  formData: z.ZodObject;
};

const Formulare: Formular[] = [
  {
    label: "AOMEI",
    formData: aomeiFormData,
  },
  {
    label: "Apple",
    formData: appleFormData,
  },
  {
    label: "GData",
    formData: gdataFormData,
  },
  {
    label: "Google",
    formData: googleFormData,
  },
  {
    label: "Microsoft",
    formData: microsoftFormData,
  },
  {
    label: "Telekom",
    formData: telekomFormData,
  },
  {
    label: "Mail.de",
    formData: mailDeFormData,
  },
];

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Kunde = RouterOutput["sage_kunden"]["get"];

export default function FormularAuswahl() {
  const [auswahl, setAuswahl] = useState<Formular | undefined>(undefined);
  const [kunde, setKunde] = useState<null | Kunde>(null);

  return (
    <Card className="mt-5 print:mt-0 print:border-0 print:shadow-none">
      <CardHeader className="print:hidden">
        <CardTitle>Formular Generator</CardTitle>
        <CardDescription>
          <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
            <li>Formular Auswählen</li>
            <li>Kundennummer eingeben</li>
            <li>Restliches Formular ausfüllen</li>
            <li>Generieren Drücken</li>
            <li>PDF Runterladen oder Drucken</li>
          </ol>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="print:hidden">
          <Select
            onValueChange={(e) => {
              const x = Formulare.find((x) => x.label == e);
              setAuswahl(x);
            }}
            defaultValue={auswahl?.label}
          >
            <SelectTrigger className="w-full max-w-60">
              <SelectValue placeholder="Formular wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Formulare</SelectLabel>
                {Formulare.sort((a, b) => (a.label < b.label ? -1 : 1)).map(
                  (x) => (
                    <SelectItem key={x.label} value={x.label}>
                      {x.label}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {auswahl != null && (
          <Separator className="my-8 print:my-0 print:hidden" />
        )}
        {auswahl != null && <KundendatenSuche setKunde={setKunde} />}
        {kunde != null && (
          <p className="mt-2 print:mt-0 print:hidden">
            Gefundener Kunde: {kunde.Name}, {kunde.Vorname}
          </p>
        )}
        {kunde != null && (
          <Separator className="mt-4 mb-8 print:mt-0 print:mb-0 print:hidden" />
        )}
        {kunde != null && auswahl != null && (
          <FormularAnsicht auswahl={auswahl} kunde={kunde} />
        )}
      </CardContent>
    </Card>
  );
}
