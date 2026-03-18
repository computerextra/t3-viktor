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
export type Job = RouterOutput["job"]["get"];

const JobProps = z.object({
  name: z.string(),
  online: z.boolean(),
  Aufgaben: z.string().optional(),
  Beschreibung: z.string().optional(),
  Profil: z.string().optional(),
  isAusbilung: z.boolean(),
});

export default function JobForm({ job }: { job: Job | undefined }) {
  const router = useRouter();
  const utils = api.useUtils();
  const mutate = api.job.upsert.useMutation({
    onSuccess: async () => {
      await utils.job.getAll.invalidate();

      router.push("/CMS/Job");
    },
  });

  const defaultValues: z.input<typeof JobProps> = {
    name: job?.name ?? "",
    isAusbilung: job?.isAusbilung ?? false,
    online: job?.online ?? false,
    Aufgaben: job?.Aufgaben ?? undefined,
    Beschreibung: job?.Beschreibung ?? undefined,
    Profil: job?.Profil ?? undefined,
  };

  const form = useAppForm({
    validators: {
      onSubmit: JobProps,
    },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      await mutate.mutateAsync({
        id: job?.id ?? null,
        ...value,
        Aufgaben: value.Aufgaben ?? null,
        Beschreibung: value.Beschreibung ?? null,
        Profil: value.Profil ?? null,
      });
    },
  });

  return (
    <form
      id="angebot-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField
          name="name"
          children={(field) => (
            <field.FormInput label="Titel" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="Aufgaben"
          children={(field) => (
            <field.FormTextarea
              label="Aufgaben (Mit | getrennt)"
              loading={mutate.isPending}
            />
          )}
        />
        <form.AppField
          name="Beschreibung"
          children={(field) => (
            <field.FormTextarea
              label="Beschreibung Nur bei Job, nicht bei Ausbildung"
              loading={mutate.isPending}
            />
          )}
        />
        <form.AppField
          name="Profil"
          children={(field) => (
            <field.FormTextarea
              label="Profil (Mit | getrennt) Nur bei Job, nicht bei Ausbildung"
              loading={mutate.isPending}
            />
          )}
        />
        <div className="grid grid-cols-6 gap-8">
          <form.AppField
            name="isAusbilung"
            children={(field) => (
              <field.FormSwitch
                label="Ausbildung?"
                loading={mutate.isPending}
              />
            )}
          />
          <form.AppField
            name="online"
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
