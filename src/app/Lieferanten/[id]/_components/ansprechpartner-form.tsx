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
export type Ansprechpartner = RouterOutput["ansprechpartner"]["get"];

const LieferantenProps = z.object({
  id: z.string(),
  name: z.string(),
  telefon: z.string().optional(),
  mobil: z.string().optional(),
  mail: z.string().optional(),
  lieferantId: z.string(),
});
type SchemaValues = z.input<typeof LieferantenProps>;

export default function AnsprechpartnerForm({
  ansprechpartner,
  lieferantenId,
}: {
  ansprechpartner: Ansprechpartner | undefined;
  lieferantenId: string;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const mutate = api.ansprechpartner.upsert.useMutation({
    onSuccess: async () => {
      // Invalidate everything with a "Lieferant"
      await utils.lieferant.getAllWithAp.invalidate();

      router.push("/Lieferanten");
    },
  });

  const defaultValues: SchemaValues = {
    id: ansprechpartner?.id ?? "",
    lieferantId: lieferantenId,
    name: ansprechpartner?.name ?? "",
    mail: ansprechpartner?.mail ?? undefined,
    mobil: ansprechpartner?.mobil ?? undefined,
    telefon: ansprechpartner?.telefon ?? undefined,
  };

  const form = useAppForm({
    validators: {
      onSubmit: LieferantenProps,
    },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      await mutate.mutateAsync({
        id: value.id,
        lieferantId: value.lieferantId,
        mail: value.mail ?? null,
        mobil: value.mobil ?? null,
        name: value.name,
        telefon: value.telefon ?? null,
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
        <form.AppField
          name="name"
          children={(field) => (
            <field.FormInput label="Name" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="mail"
          children={(field) => (
            <field.FormInput label="E-Mail" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="telefon"
          children={(field) => (
            <field.FormInput label="Telefon" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="mobil"
          children={(field) => (
            <field.FormInput label="Mobil" loading={mutate.isPending} />
          )}
        />
        <div>
          <Button type="submit">Speichern</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
