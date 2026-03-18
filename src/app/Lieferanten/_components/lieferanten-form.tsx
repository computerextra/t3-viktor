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
export type Lieferant = RouterOutput["lieferant"]["get"];

const LieferantenProps = z.object({
  id: z.string(),
  Firma: z.string(),
  Kundennummer: z.string().optional(),
  Webseite: z.string().optional(),
});
type SchemaValues = z.input<typeof LieferantenProps>;

export default function LieferantForm({
  lieferant,
}: {
  lieferant: Lieferant | undefined;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const mutate = api.lieferant.upsert.useMutation({
    onSuccess: async () => {
      // Invalidate everything with a "Lieferant"
      await utils.lieferant.get.invalidate();
      await utils.lieferant.getAll.invalidate();
      await utils.lieferant.getAllWithAp.invalidate();

      router.push("/Lieferanten");
    },
  });

  const defaultValues: SchemaValues = {
    id: lieferant?.id ?? "",
    Firma: lieferant?.Firma ?? "",
    Kundennummer: lieferant?.Kundennummer ?? undefined,
    Webseite: lieferant?.Webseite ?? undefined,
  };

  const form = useAppForm({
    validators: {
      onSubmit: LieferantenProps,
    },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      await mutate.mutateAsync({
        ...value,
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
          name="Firma"
          children={(field) => (
            <field.FormInput label="Firma" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="Kundennummer"
          children={(field) => (
            <field.FormInput label="Kundennummer" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="Webseite"
          children={(field) => (
            <field.FormInput label="Webseite" loading={mutate.isPending} />
          )}
        />
        <div>
          <Button type="submit">Speichern</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
