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
export type Referenz = RouterOutput["referenz"]["get"];

const ReferenzProps = z.object({
  Name: z.string(),
  Webseite: z.string(),
  Bild: z.string(),
  Online: z.boolean(),
});

export default function ReferenzForm({
  referenz,
}: {
  referenz: Referenz | undefined;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const mutate = api.referenz.upsert.useMutation({
    onSuccess: async () => {
      await utils.referenz.getAll.invalidate();

      router.push("/CMS/Referenz");
    },
  });

  const defaultValues: z.input<typeof ReferenzProps> = {
    Name: referenz?.Name ?? "",
    Bild: referenz?.Bild ?? "",
    Online: referenz?.Online ?? false,
    Webseite: referenz?.Webseite ?? "",
  };

  const form = useAppForm({
    validators: {
      onSubmit: ReferenzProps,
    },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      await mutate.mutateAsync({
        id: referenz?.id ?? null,
        ...value,
      });
    },
  });

  return (
    <form
      id="referenz-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField
          name="Name"
          children={(field) => (
            <field.FormInput label="Name" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="Webseite"
          children={(field) => (
            <field.FormInput label="Webseite" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="Bild"
          children={(field) => (
            <field.FormInput label="Bild" loading={mutate.isPending} />
          )}
        />
        <div className="grid grid-cols-6">
          <form.AppField
            name="Online"
            children={(field) => (
              <field.FormSwitch
                label="Auf Webseite"
                loading={mutate.isPending}
              />
            )}
          />
        </div>
        <div>
          <Button type="submit">Speichern</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
