"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useAppForm } from "@/components/Form";
import z from "zod";
import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  Kundennummer: z.string(),
  Auftrag: z.string(),
  Mail: z.email(),
});

export default function InfoForm() {
  const defaultValues: z.input<typeof formSchema> = {
    Kundennummer: "",
    Auftrag: "",
    Mail: "",
  };

  const mailer = api.mail.send.useMutation();

  const form = useAppForm({
    defaultValues: defaultValues,
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const data = await mailer.mutateAsync(value);
      if (data) {
        toast.success("Mail erfolgreich verschickt");

        setTimeout(() => {
          document.location.reload();
        }, 1000);
      } else {
        toast.error("Mail konnte nicht verschickt werden!");
      }
    },
  });

  return (
    <Card className="mx-auto mt-12 max-w-4xl">
      <CardHeader>
        <CardTitle>Mail an Kunde</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField
              name="Kundennummer"
              children={(field) => (
                <field.FormInput
                  label="Kundennummer"
                  loading={mailer.isPending}
                />
              )}
            />
            <form.AppField
              name="Mail"
              children={(field) => (
                <field.FormInput
                  label="Kunden E-Mail"
                  loading={mailer.isPending}
                />
              )}
            />
            <form.AppField
              name="Auftrag"
              children={(field) => (
                <field.FormInput
                  label="Auftrag mit AU/LI/RE"
                  loading={mailer.isPending}
                />
              )}
            />
            <div>
              <Button type="submit">Mail Senden</Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
