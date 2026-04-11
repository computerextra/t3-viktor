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
export type Abteilung = RouterOutput["abteilung"]["get"];

const AbteilungProps = z.object({
  name: z.string(),
  idx: z.number().int(),
});

export default function AbteilungForm({
  abteilung,
}: {
  abteilung: Abteilung | undefined;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const mutate = api.abteilung.upsert.useMutation({
    onSuccess: async () => {
      await utils.abteilung.getAll.invalidate();
      await utils.mitarbeiter.getWithAbteilung.invalidate();
      router.push("/CMS/Abteilung");
    },
  });

  const defaultValues: z.input<typeof AbteilungProps> = {
    name: abteilung?.name ?? "",
    idx: abteilung?.idx ?? 0,
  };

  const form = useAppForm({
    validators: {
      onSubmit: AbteilungProps,
    },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      await mutate.mutateAsync({
        id: abteilung?.id ?? null,
        idx: value.idx,
        name: value.name,
      });
    },
  });

  return (
    <form
      id="abteilung-form"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
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
          name="idx"
          children={(field) => (
            <field.FormInput label="Index" loading={mutate.isPending} />
          )}
        />
        <div>
          <Button type="submit">Speichern</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
