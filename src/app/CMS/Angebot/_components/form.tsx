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
export type Angebot = RouterOutput["angebot"]["get"];

const AngebotProps = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  date_start: z.date(),
  date_stop: z.date(),
  link: z.string(),
  image: z.string(),
  anzeigen: z.boolean(),
});

export default function AngebotForm({
  angebot,
}: {
  angebot: Angebot | undefined;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const mutate = api.angebot.upsert.useMutation({
    onSuccess: async () => {
      await utils.angebot.getAll.invalidate();

      router.push("/CMS/Angebot");
    },
  });

  const defaultValues: z.input<typeof AngebotProps> = {
    anzeigen: angebot?.anzeigen ?? false,
    date_start: angebot?.date_start ?? new Date(),
    date_stop: angebot?.date_stop ?? new Date(),
    image: angebot?.image ?? "",
    link: angebot?.link ?? "",
    title: angebot?.title ?? "",
    subtitle: angebot?.subtitle ?? undefined,
  };

  const form = useAppForm({
    validators: {
      onSubmit: AngebotProps,
    },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      await mutate.mutateAsync({
        id: angebot?.id ?? null,
        ...value,
        subtitle: value.subtitle ?? null,
      });
    },
  });

  return (
    <form
      id="angebot-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField
          name="title"
          children={(field) => (
            <field.FormInput label="Titel" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="subtitle"
          children={(field) => (
            <field.FormInput label="Sub Titel" loading={mutate.isPending} />
          )}
        />
        <div className="grid grid-cols-2 gap-8">
          <form.AppField
            name="date_start"
            children={(field) => (
              <field.FormDateInput label="Start" loading={mutate.isPending} />
            )}
          />
          <form.AppField
            name="date_stop"
            children={(field) => (
              <field.FormDateInput label="Ende" loading={mutate.isPending} />
            )}
          />
        </div>
        <form.AppField
          name="link"
          children={(field) => (
            <field.FormInput label="Link" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="image"
          children={(field) => (
            <field.FormInput label="Bild" loading={mutate.isPending} />
          )}
        />
        <div className="grid grid-cols-6">
          <form.AppField
            name="anzeigen"
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
