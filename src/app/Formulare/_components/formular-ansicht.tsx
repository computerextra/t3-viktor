/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppForm } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  aomeiFormData,
  appleFormData,
  GDataAnwendungen,
  gdataFormData,
  googleFormData,
  mailDeFormData,
  microsoftFormData,
  telekomFormData,
  TelekomFragen,
} from "@/types";
import { useState } from "react";
import type z from "zod";
import type { Formular, Kunde } from "./formular-auswahl";

export default function FormularAnsicht({
  auswahl,
  kunde,
}: {
  auswahl: Formular;
  kunde: Kunde;
}) {
  switch (auswahl.label) {
    case "AOMEI":
      return <Aomei kunde={kunde} />;
    case "Apple":
      return <Apple kunde={kunde} />;
    case "GData":
      return <Gdata kunde={kunde} />;
    case "Google":
      return <Google kunde={kunde} />;
    case "Microsoft":
      return <Microsoft kunde={kunde} />;
    case "Telekom":
      return <Telekom kunde={kunde} />;
    case "Mail.de":
      return <MailDe kunde={kunde} />;
  }
}

function Aomei({ kunde }: { kunde: Kunde }) {
  type formSchema = z.input<typeof aomeiFormData>;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | formSchema>(null);
  const defaultValues: formSchema = {
    Gerätenummer: "",
    Lizenz: "",
  };

  const form = useAppForm({
    validators: { onSubmit: aomeiFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      setLoading(true);
      setData(value);
      window.setTimeout(window.print, 1000);
      setLoading(false);
    },
  });
  return (
    <form
      id="aomei-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup className="print:hidden">
        <form.AppField
          name="Lizenz"
          children={(field) => (
            <field.FormInput label="Lizenz" loading={loading} />
          )}
        />
        <form.AppField
          name="Gerätenummer"
          children={(field) => (
            <field.FormInput label="Gerätenummer" loading={loading} />
          )}
        />
        <div>
          <Button type="submit">Drucken</Button>
        </div>
      </FieldGroup>
      <div className="hidden text-black print:block">
        <div className="container flex flex-col justify-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            AOMEI Backupper Pro <br />
            für 2 Computer
          </h1>
          <img
            src="https://bilder.computer-extra.de/data/forms/aomei.png"
            alt="Aomei Logo"
            className="mx-auto h-auto max-w-xl"
          />
          <p className="text-center leading-7 font-bold not-first:mt-6">
            Kundennummer:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.KundNr}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Name:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.Vorname} {kunde?.Name}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Lizenzschlüssel:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Lizenz}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Installiert auf Gerät:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Gerätenummer}
          </p>

          <p className="mt-12 text-center text-sm leading-none font-medium">
            Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
            benötigt, wenn Sie AOMEI erneut anmelden möchten.
          </p>
        </div>
      </div>
    </form>
  );
}

function Apple({ kunde }: { kunde: Kunde }) {
  const [loading, setLoading] = useState(false);
  const defaultValues: z.input<typeof appleFormData> = {
    Benutzername: "",
    Passwort: "",
  };

  const form = useAppForm({
    validators: { onSubmit: appleFormData },
    defaultValues: defaultValues,
    onSubmit: ({}) => {
      setLoading(true);
      window.setTimeout(window.print, 1000);
      setLoading(false);
    },
  });
  return (
    <form
      id="apple-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup className="print:hidden">
        <form.AppField
          name="Benutzername"
          children={(field) => (
            <field.FormInput label="Benutzername" loading={loading} />
          )}
        />
        <form.AppField
          name="Passwort"
          children={(field) => (
            <field.FormInput label="Passwort" loading={loading} />
          )}
        />
        <div>
          <Button type="submit">Drucken</Button>
        </div>
      </FieldGroup>
      <div className="hidden text-black print:block">
        <div className="container flex flex-col justify-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Apple ID Zugangsdaten
          </h1>
          <img
            src="https://bilder.computer-extra.de/data/forms/apple.png"
            alt="Apple Logo"
            className="mx-auto h-auto w-[80%] max-w-xl"
          />
          <p className="text-center leading-7 font-bold not-first:mt-6">
            Kundennummer:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.KundNr}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Name:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.Vorname} {kunde?.Name}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Benutzername:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {form.getFieldValue("Benutzername")}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Passwort:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {form.getFieldValue("Passwort")}
          </p>

          <p className="mt-12 text-center text-sm leading-none font-medium">
            Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
            benötigt, wenn Sie bei Apple erneut anmelden möchten.
          </p>
        </div>
      </div>
    </form>
  );
}

function Gdata({ kunde }: { kunde: Kunde }) {
  type formSchema = z.input<typeof gdataFormData>;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | formSchema>(null);
  const defaultValues: formSchema = {
    AnzahlBenutzer: 0,
    Benutzername: "",
    Lizenz: "",
    Passwort: "",
    Software: "",
  };

  const form = useAppForm({
    validators: { onSubmit: gdataFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      setLoading(true);
      setData(value);
      window.setTimeout(window.print, 1000);
      setLoading(false);
    },
  });

  const gData: { label: string; value: string }[] = [];
  GDataAnwendungen.forEach((x) => {
    gData.push({
      label: x,
      value: x,
    });
  });

  return (
    <form
      id="gdata-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup className="print:hidden">
        <form.AppField
          name="Benutzername"
          children={(field) => (
            <field.FormInput label="Benutzername" loading={loading} />
          )}
        />
        <form.AppField
          name="Passwort"
          children={(field) => (
            <field.FormInput label="Passwort" loading={loading} />
          )}
        />
        <form.AppField
          name="AnzahlBenutzer"
          children={(field) => (
            <field.FormNumberInput
              label="Anzahl der Benutzer"
              loading={loading}
            />
          )}
        />
        <form.AppField
          name="Software"
          children={(field) => (
            <field.FormSelect data={gData} label="Software" loading={loading} />
          )}
        />
        <form.AppField
          name="Lizenz"
          children={(field) => (
            <field.FormInput label="Lizenz" loading={loading} />
          )}
        />
        <div>
          <Button type="submit">Drucken</Button>
        </div>
      </FieldGroup>
      <div className="hidden text-black print:block">
        <div className="container flex flex-col justify-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            G Data Zugangsdaten
          </h1>
          <img
            src="https://bilder.computer-extra.de/data/forms/gdata.png"
            alt="Apple Logo"
            className="mx-auto h-auto w-[80%] max-w-xl"
          />
          <p className="text-center leading-7 font-bold not-first:mt-6">
            Kundennummer:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.KundNr}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Name:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.Vorname} {kunde?.Name}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            {data?.Software} für {data?.AnzahlBenutzer} Benutzer
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Benutzername:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Benutzername}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Passwort:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Passwort}
          </p>

          <p className="mt-12 text-center text-sm leading-none font-medium">
            Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
            benötigt, wenn Sie erneut in G Data anmelden möchten.
          </p>
        </div>
      </div>
    </form>
  );
}

function Google({ kunde }: { kunde: Kunde }) {
  type formSchema = z.input<typeof googleFormData>;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | formSchema>(null);
  const defaultValues: formSchema = {
    Benutzername: "",
    Passwort: "",
  };

  const form = useAppForm({
    validators: { onSubmit: googleFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      setLoading(true);
      setData(value);
      window.setTimeout(window.print, 1000);
      setLoading(false);
    },
  });
  return (
    <form
      id="google-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup className="print:hidden">
        <form.AppField
          name="Benutzername"
          children={(field) => (
            <field.FormInput label="Benutzername" loading={loading} />
          )}
        />
        <form.AppField
          name="Passwort"
          children={(field) => (
            <field.FormInput label="Passwort" loading={loading} />
          )}
        />
        <div>
          <Button type="submit">Drucken</Button>
        </div>
      </FieldGroup>
      <div className="hidden text-black print:block">
        <div className="container flex flex-col justify-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Google Zugangsdaten
          </h1>
          <img
            src="https://bilder.computer-extra.de/data/forms/google.png"
            alt="Apple Logo"
            className="mx-auto h-auto w-[80%] max-w-xl"
          />
          <p className="text-center leading-7 font-bold not-first:mt-6">
            Kundennummer:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.KundNr}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Name:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.Vorname} {kunde?.Name}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Benutzername:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Benutzername}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Passwort:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Passwort}
          </p>

          <p className="mt-12 text-center text-sm leading-none font-medium">
            Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
            benötigt, wenn Sie erneut bei Google anmelden möchten.
          </p>
        </div>
      </div>
    </form>
  );
}

function Microsoft({ kunde }: { kunde: Kunde }) {
  type formSchema = z.input<typeof microsoftFormData>;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | formSchema>(null);

  const defaultValues: formSchema = {
    Benutzername: "",
    EMail: "",
    Mobil: "",
    Passwort: "",
  };

  const form = useAppForm({
    validators: { onSubmit: microsoftFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      setLoading(true);
      setData({
        Benutzername: value.Benutzername,
        EMail: value.EMail,
        Mobil: value.Mobil,
        Passwort: value.Passwort,
      });
      window.setTimeout(window.print, 1000);
      setLoading(false);
    },
  });
  return (
    <form
      id="microsoft-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup className="print:hidden">
        <form.AppField
          name="Benutzername"
          children={(field) => (
            <field.FormInput label="Benutzername" loading={loading} />
          )}
        />
        <form.AppField
          name="Passwort"
          children={(field) => (
            <field.FormInput label="Passwort" loading={loading} />
          )}
        />
        <form.AppField
          name="EMail"
          children={(field) => (
            <field.FormInput label="EMail" loading={loading} />
          )}
        />
        <form.AppField
          name="Mobil"
          children={(field) => (
            <field.FormInput label="Mobil" loading={loading} />
          )}
        />
        <div>
          <Button type="submit">Drucken</Button>
        </div>
      </FieldGroup>
      <div className="hidden text-black print:block">
        <div className="container flex flex-col justify-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Microsoft Zugangsdaten
          </h1>
          <img
            src="https://bilder.computer-extra.de/data/forms/microsoft.jpg"
            alt="Apple Logo"
            className="mx-auto h-auto w-[80%] max-w-xl"
          />
          <p className="text-center leading-7 font-bold not-first:mt-6">
            Kundennummer:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.KundNr}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Name:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.Vorname} {kunde?.Name}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Benutzername:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Benutzername}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Passwort:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Passwort}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Alternative E-Mail Adresse:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.EMail}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Mobilfunk:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Mobil}
          </p>

          <p className="mt-12 text-center text-sm leading-none font-medium">
            Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
            benötigt, wenn Sie erneut bei Microsoft anmelden möchten.
          </p>
        </div>
      </div>
    </form>
  );
}

function Telekom({ kunde }: { kunde: Kunde }) {
  type formSchema = z.input<typeof telekomFormData>;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | formSchema>(null);
  const defaultValues: formSchema = {
    Antwort: "",
    Benutzername: "",
    Geburtstag: new Date(),
    Mobil: "",
    Passwort: "",
    Sicherheitsfrage: "",
  };

  const form = useAppForm({
    validators: { onSubmit: telekomFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      setLoading(true);
      setData(value);
      window.setTimeout(window.print, 1000);
      setLoading(false);
    },
  });

  const tData: { label: string; value: string }[] = [];
  TelekomFragen.forEach((x) => {
    tData.push({
      label: x,
      value: x,
    });
  });

  return (
    <form
      id="telekom-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup className="print:hidden">
        <form.AppField
          name="Benutzername"
          children={(field) => (
            <field.FormInput label="Benutzername" loading={loading} />
          )}
        />
        <form.AppField
          name="Passwort"
          children={(field) => (
            <field.FormInput label="Passwort" loading={loading} />
          )}
        />
        <form.AppField
          name="Mobil"
          children={(field) => (
            <field.FormInput label="Mobil" loading={loading} />
          )}
        />
        <form.AppField
          name="Geburtstag"
          children={(field) => (
            <field.FormDateInput label="Geburtstag" loading={loading} />
          )}
        />
        <form.AppField
          name="Sicherheitsfrage"
          children={(field) => (
            <field.FormSelect
              data={tData}
              label="Sicherheitsfrage"
              loading={loading}
            />
          )}
        />
        <form.AppField
          name="Antwort"
          children={(field) => (
            <field.FormInput label="Antwort" loading={loading} />
          )}
        />

        <div>
          <Button type="submit">Drucken</Button>
        </div>
      </FieldGroup>
      <div className="hidden text-black print:block">
        <div className="container flex flex-col justify-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Telekom E-Mail Zugangsdaten
          </h1>
          <img
            src="https://bilder.computer-extra.de/data/forms/telekom.jpg"
            alt="Apple Logo"
            className="mx-auto h-auto w-[80%] max-w-xl"
          />
          <p className="text-center leading-7 font-bold not-first:mt-6">Für:</p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.KundNr} - {kunde?.Vorname} {kunde?.Name}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Benutzername:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Benutzername}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Passwort:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Passwort}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Mobilfunk:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Mobil}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Geburtstag:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Geburtstag.toLocaleDateString("de-de", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Sicherheitsfrage:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Sicherheitsfrage}
          </p>
          <p className="text-center text-sm leading-none font-medium">
            <span className="font-bold">Anwort:</span> {data?.Antwort}
          </p>

          <p className="mt-12 text-center text-sm leading-none font-medium">
            Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
            benötigt, wenn Sie erneut bei der Telekom anmelden möchten.
          </p>
        </div>
      </div>
    </form>
  );
}

function MailDe({ kunde }: { kunde: Kunde }) {
  type formSchema = z.input<typeof mailDeFormData>;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | formSchema>(null);

  const defaultValues: formSchema = {
    Benutzername: "",
    Passwort: "",
  };

  const form = useAppForm({
    validators: { onSubmit: mailDeFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      setLoading(true);
      setData(value);
      window.setTimeout(window.print, 1000);
      setLoading(false);
    },
  });
  return (
    <form
      id="mailde-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup className="print:hidden">
        <form.AppField
          name="Benutzername"
          children={(field) => (
            <field.FormInput label="Benutzername" loading={loading} />
          )}
        />
        <form.AppField
          name="Passwort"
          children={(field) => (
            <field.FormInput label="Passwort" loading={loading} />
          )}
        />
        <div>
          <Button type="submit">Drucken</Button>
        </div>
      </FieldGroup>
      <div className="hidden text-black print:block">
        <div className="container flex flex-col justify-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Mail.de E-Mail Zugangsdaten
          </h1>
          <img
            src="https://bilder.computer-extra.de/data/forms/telekom.jpg"
            alt="Apple Logo"
            className="mx-auto h-auto w-[80%] max-w-xl"
          />
          <p className="text-center leading-7 font-bold not-first:mt-6">
            Kundennummer:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.KundNr}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Name:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {kunde?.Vorname} {kunde?.Name}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Benutzername:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Benutzername}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Passwort:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {data?.Passwort}
          </p>

          <p className="mt-12 text-center text-sm leading-none font-medium">
            Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
            benötigt, wenn Sie erneut bei Mail.de anmelden möchten.
          </p>
        </div>
      </div>
    </form>
  );
}
