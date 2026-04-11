"use client";

import { useAppForm } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { api } from "@/trpc/react";
import { type BildServer, BildClientValidator } from "@/types";
import { z } from "zod";

const AusstellerProp = z.object({
  Artikelnummer: z.string(),
  bild: BildClientValidator,
});

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/jpeg;base64, prefix to get just the base64
      const base64 = result.split(",")[1];
      resolve(base64 || "");
    };
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    reader.onerror = (error) => reject(error);
  });
};

export default function BildForm() {
  const updater = api.aussteller.update.useMutation();

  const form = useAppForm({
    validators: { onSubmit: AusstellerProp },
    defaultValues: {
      Artikelnummer: "",
      bild: null as File | null,
    },
    onSubmit: async ({ value }) => {
      const bildBase64 = value.bild ? await fileToBase64(value.bild) : null;

      let imageToUpload: BildServer | null = null;

      if (bildBase64) {
        imageToUpload = {
          data: bildBase64,
          type: value.bild!.type.split("/")[1], // extract "jpeg" from "image/jpeg"
        };
      }

      await updater.mutateAsync({
        Artikelnummer: value.Artikelnummer,
        bild: imageToUpload,
      });
    },
  });

  return (
    <form
      id="aussteller-form"
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField
          name="Artikelnummer"
          children={(field) => (
            <field.FormInput
              label="Artikelnummer"
              loading={updater.isPending}
            />
          )}
        />
        <form.AppField
          name="bild"
          children={(field) => (
            <field.FormFileInput label="Bild" loading={updater.isPending} />
          )}
        />
        <div>
          <Button type="submit" disabled={updater.isPending}>
            Speichern
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
