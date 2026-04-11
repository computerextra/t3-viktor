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
export type Partner = RouterOutput["partner"]["get"];

const PartnerProps = z.object({
  name: z.string(),
  link: z.string(),
  image: z.string(),
});

export default function PartnerForm({
  partner,
}: {
  partner: Partner | undefined;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const mutate = api.partner.upsert.useMutation({
    onSuccess: async () => {
      await utils.partner.getAll.invalidate();

      router.push("/CMS/Partner");
    },
  });

  const defaultValues: z.input<typeof PartnerProps> = {
    name: partner?.name ?? "",
    image: partner?.image ?? "",
    link: partner?.link ?? "",
  };

  const form = useAppForm({
    validators: {
      onSubmit: PartnerProps,
    },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      await mutate.mutateAsync({
        id: partner?.id ?? null,
        ...value,
      });
    },
  });

  return (
    <form
      id="partner-form"
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
          name="image"
          children={(field) => (
            <field.FormInput label="Bild" loading={mutate.isPending} />
          )}
        />
        <form.AppField
          name="link"
          children={(field) => (
            <field.FormInput label="Link" loading={mutate.isPending} />
          )}
        />
        <div>
          <Button type="submit">Speichern</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
