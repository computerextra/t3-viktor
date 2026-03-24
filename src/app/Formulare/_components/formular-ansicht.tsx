"use client";

import type { Formular, Kunde } from "./formular-auswahl";
import z from "zod";
import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/components/Form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [loading, setLoading] = useState(false);

  const defaultValues: z.input<typeof aomeiFormData> = {
    Gerätenummer: "",
    Lizenz: "",
  };

  const form = useAppForm({
    validators: { onSubmit: aomeiFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      setLoading(true);
      window.setTimeout(window.print, 1000);
      setLoading(false);
    },
  });
  return (
    <form
      id="aomei-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
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
            {form.getFieldValue("Lizenz")}
          </p>

          <p className="text-center leading-7 font-bold not-first:mt-6">
            Installiert auf Gerät:
          </p>
          <p className="text-center text-sm leading-none font-medium">
            {form.getFieldValue("Gerätenummer")}
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
    onSubmit: ({ value }) => {
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
        form.handleSubmit();
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
  const [loading, setLoading] = useState(false);
  const defaultValues: z.input<typeof gdataFormData> = {
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
      // TODO: Druck logic
      setLoading(true);
      console.log(value);
      setLoading(false);
    },
  });

  const data: { label: string; value: string }[] = [];
  GDataAnwendungen.forEach((x) => {
    data.push({
      label: x,
      value: x,
    });
  });

  return (
    <form
      id="gdata-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
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
            <field.FormInput label="Anzahl der Benutzer" loading={loading} />
          )}
        />
        <form.AppField
          name="Software"
          children={(field) => (
            <field.FormSelect data={data} label="Software" loading={loading} />
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
    </form>
  );
}

function Google({ kunde }: { kunde: Kunde }) {
  const [loading, setLoading] = useState(false);
  const defaultValues: z.input<typeof googleFormData> = {
    Benutzername: "",
    Passwort: "",
  };

  const form = useAppForm({
    validators: { onSubmit: googleFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      // TODO: Druck logic
      setLoading(true);
      console.log(value);
      setLoading(false);
    },
  });
  return (
    <form
      id="google-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
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
    </form>
  );
}

function Microsoft({ kunde }: { kunde: Kunde }) {
  const [loading, setLoading] = useState(false);
  const defaultValues: z.input<typeof microsoftFormData> = {
    Benutzername: "",
    EMail: "",
    Mobil: "",
    Passwort: "",
  };

  const form = useAppForm({
    validators: { onSubmit: microsoftFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      // TODO: Druck logic
      setLoading(true);
      console.log(value);
      setLoading(false);
    },
  });
  return (
    <form
      id="microsoft-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
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
    </form>
  );
}

function Telekom({ kunde }: { kunde: Kunde }) {
  const [loading, setLoading] = useState(false);
  const defaultValues: z.input<typeof telekomFormData> = {
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
      // TODO: Druck logic
      setLoading(true);
      console.log(value);
      setLoading(false);
    },
  });

  const data: { label: string; value: string }[] = [];
  TelekomFragen.forEach((x) => {
    data.push({
      label: x,
      value: x,
    });
  });

  return (
    <form
      id="telekom-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
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
              data={data}
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
    </form>
  );
}

function MailDe({ kunde }: { kunde: Kunde }) {
  const [loading, setLoading] = useState(false);
  const defaultValues: z.input<typeof mailDeFormData> = {
    Benutzername: "",
    Passwort: "",
  };

  const form = useAppForm({
    validators: { onSubmit: mailDeFormData },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      // TODO: Druck logic
      setLoading(true);
      console.log(value);
      setLoading(false);
    },
  });
  return (
    <form
      id="mailde-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
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
    </form>
  );
}
