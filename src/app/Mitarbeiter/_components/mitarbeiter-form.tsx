"use client";

import { useAppForm } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import type { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";
import { useRouter } from "next/navigation";
import z from "zod";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Mitarbeiter = RouterOutput["mitarbeiter"]["get"];

const MitarbeiterProps = z.object({
  id: z.string(),
  name: z.string(),
  short: z.string().optional(),
  image: z.boolean(),
  sex: z.string().optional(),
  focus: z.string().optional(),
  mail: z.string().optional(),
  abteilungId: z.string().optional(),
  Azubi: z.boolean(),
  Geburtstag: z.date().optional(),
  Gruppenwahl: z.string().optional(),
  HomeOffice: z.string().optional(),
  Mobil_Business: z.string().optional(),
  Mobil_Privat: z.string().optional(),
  Telefon_Business: z.string().optional(),
  Telefon_Intern_1: z.string().optional(),
  Telefon_Intern_2: z.string().optional(),
  Telefon_Privat: z.string().optional(),
  Bild: z.string().optional(),
});
type SchemaValues = z.input<typeof MitarbeiterProps>;

export default function MitarbeiterForm({
  mitarbeiter,
}: {
  mitarbeiter: Mitarbeiter | undefined;
}) {
  const [data] = api.abteilung.getAll.useSuspenseQuery();

  const router = useRouter();
  const utils = api.useUtils();
  const mutate = api.mitarbeiter.upsert.useMutation({
    onSuccess: async () => {
      // Invalidate everything with a "Mitarbeiter"
      await utils.mitarbeiter.get.invalidate();
      await utils.mitarbeiter.getAll.invalidate();
      await utils.mitarbeiter.geburtstage.invalidate();
      await utils.mitarbeiter.getWithAbteilung.invalidate();
      await utils.einkauf.einkaufsliste.invalidate();

      router.push("/Mitarbeiter");
    },
  });

  const defaultValues: SchemaValues = {
    id: mitarbeiter?.id ?? "",
    name: mitarbeiter?.name ?? "",
    mail: mitarbeiter?.mail ?? undefined,
    short: mitarbeiter?.short ?? undefined,
    image: mitarbeiter?.image ?? false,
    focus: mitarbeiter?.focus ?? undefined,
    abteilungId: mitarbeiter?.abteilungId ?? undefined,
    Azubi: mitarbeiter?.Azubi ?? false,
    Geburtstag: mitarbeiter?.Geburtstag ?? undefined,
    Gruppenwahl: mitarbeiter?.Gruppenwahl ?? undefined,
    HomeOffice: mitarbeiter?.HomeOffice ?? undefined,
    Mobil_Business: mitarbeiter?.Mobil_Business ?? undefined,
    Mobil_Privat: mitarbeiter?.Mobil_Privat ?? undefined,
    Telefon_Business: mitarbeiter?.Telefon_Business ?? undefined,
    Telefon_Intern_1: mitarbeiter?.Telefon_Intern_1 ?? undefined,
    Telefon_Intern_2: mitarbeiter?.Telefon_Intern_2 ?? undefined,
    Telefon_Privat: mitarbeiter?.Telefon_Privat ?? undefined,
    Bild: mitarbeiter?.Bild ?? undefined,
    sex: mitarbeiter?.sex ?? undefined,
  };

  const form = useAppForm({
    validators: {
      onSubmit: MitarbeiterProps,
    },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      let s: "m" | "w" | null = null;
      if (value.sex == "m") s = "m";
      if (value.sex == "w") s = "w";

      await mutate.mutateAsync({
        id: mitarbeiter?.id ?? undefined,
        name: value.name ?? "",
        short: value.short ?? null,
        Geburtstag: value.Geburtstag ?? null,
        sex: s,
        abteilungId: value.abteilungId ?? null,
        focus: value.focus ?? null,
        Bild: value.Bild ?? null,
        Gruppenwahl: value.Gruppenwahl ?? null,
        HomeOffice: value.HomeOffice ?? null,
        mail: value.mail ?? null,
        Mobil_Business: value.Mobil_Business ?? null,
        Mobil_Privat: value.Mobil_Privat ?? null,
        Telefon_Business: value.Telefon_Business ?? null,
        Telefon_Intern_1: value.Telefon_Intern_1 ?? null,
        Telefon_Intern_2: value.Telefon_Intern_2 ?? null,
        Azubi: value.Azubi,
        Telefon_Privat: value.Telefon_Privat ?? null,
        image: value.image,
      });
    },
  });

  return (
    <form
      id="mitarbeiter-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <form.AppField
              name="name"
              children={(field) => (
                <field.FormInput label="Name" loading={mutate.isPending} />
              )}
            />
          </div>
          <form.AppField
            name="short"
            children={(field) => (
              <field.FormInput label="Short" loading={mutate.isPending} />
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <form.AppField
            name="sex"
            children={(field) => (
              <field.FormSelect
                label="Geschlecht"
                loading={mutate.isPending}
                data={[
                  { label: "Männlich", value: "m" },
                  { label: "Weiblich", value: "w" },
                ]}
              />
            )}
          />
          <form.AppField
            name="abteilungId"
            children={(field) => {
              const abteilungen: { label: string; value: string }[] = [];
              data.map((x) => {
                abteilungen.push({
                  label: x.name,
                  value: x.id,
                });
              });
              return (
                <field.FormSelect
                  label="Abteilung"
                  loading={mutate.isPending}
                  data={abteilungen}
                />
              );
            }}
          />
        </div>
        <div className="grid grid-cols-6 gap-8">
          <form.AppField
            name="image"
            children={(field) => (
              <field.FormSwitch
                label="Bild auf Webseite?"
                loading={mutate.isPending}
              />
            )}
          />
        </div>
        <form.AppField
          name="focus"
          children={(field) => (
            <field.FormInput
              label="Focus (Komma getrennt)"
              loading={mutate.isPending}
            />
          )}
        />
        <form.AppField
          name="mail"
          children={(field) => (
            <field.FormInput label="E-Mail" loading={mutate.isPending} />
          )}
        />
        <div className="grid grid-cols-2 gap-8">
          <form.AppField
            name="Gruppenwahl"
            children={(field) => (
              <field.FormInput label="Gruppenwahl" loading={mutate.isPending} />
            )}
          />
          <form.AppField
            name="Telefon_Intern_1"
            children={(field) => (
              <field.FormInput
                label="Telefon Intern 1"
                loading={mutate.isPending}
              />
            )}
          />
          <form.AppField
            name="Telefon_Intern_2"
            children={(field) => (
              <field.FormInput
                label="Telefon Intern 2"
                loading={mutate.isPending}
              />
            )}
          />
          <form.AppField
            name="HomeOffice"
            children={(field) => (
              <field.FormInput label="HomeOffice" loading={mutate.isPending} />
            )}
          />
          <form.AppField
            name="Telefon_Privat"
            children={(field) => (
              <field.FormInput
                label="Telefon Privat"
                loading={mutate.isPending}
              />
            )}
          />
          <form.AppField
            name="Telefon_Business"
            children={(field) => (
              <field.FormInput
                label="Telefon Business"
                loading={mutate.isPending}
              />
            )}
          />
          <form.AppField
            name="Mobil_Privat"
            children={(field) => (
              <field.FormInput
                label="Mobil Privat"
                loading={mutate.isPending}
              />
            )}
          />
          <form.AppField
            name="Mobil_Business"
            children={(field) => (
              <field.FormInput
                label="Mobil Business"
                loading={mutate.isPending}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-6 gap-8">
          <form.AppField
            name="Azubi"
            children={(field) => (
              <field.FormSwitch label="Azubi?" loading={mutate.isPending} />
            )}
          />
        </div>
        <form.AppField
          name="Geburtstag"
          children={(field) => (
            <field.FormDateInput
              label="Geburtstag"
              loading={mutate.isPending}
            />
          )}
        />
        <div>
          <Button type="submit">Speichern</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
