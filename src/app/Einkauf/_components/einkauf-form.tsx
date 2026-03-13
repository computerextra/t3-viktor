"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import LoadingSkeleton from "@/components/loading-skeleton";
import { useAppForm } from "@/components/Form";

import { ACCEPTED_IMAGE_TYPES, BildServer, EinkaufPropsClient } from "@/types";

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
    reader.onerror = (error) => reject(error);
  });
};

export default function EinkaufForm({ id }: { id: string }) {
  const res = api.einkauf.getEinkauf.useQuery({ id });
  const data = res.data;
  const router = useRouter();

  const utils = api.useUtils();
  const upsertEinkauf = api.einkauf.updateEinkauf.useMutation({
    onSuccess: async () => {
      await utils.einkauf.einkaufsliste.invalidate();
      router.push("/Einkauf");
    },
  });

  const form = useAppForm({
    validators: {
      onSubmit: EinkaufPropsClient,
    },
    defaultValues: {
      mitarbeiterId: id,
      geld: data?.Geld != null ? data.Geld : "",
      pfand: data?.Pfand != null ? data.Pfand : "",
      dinge: data?.Dinge != null ? data.Dinge : "",
      paypal: data?.Paypal != null ? data.Paypal : false,
      abo: data?.Abonniert != null ? data.Abonniert : false,
      bild1: null as File | null,
      bild2: null as File | null,
      bild3: null as File | null,
    },
    onSubmit: async ({ value }) => {
      const bild1Base64 = value.bild1 ? await fileToBase64(value.bild1) : null;
      const bild2Base64 = value.bild2 ? await fileToBase64(value.bild2) : null;
      const bild3Base64 = value.bild3 ? await fileToBase64(value.bild3) : null;

      let image1ToUpload: BildServer | null = null;
      let image2ToUpload: BildServer | null = null;
      let image3ToUpload: BildServer | null = null;

      if (bild1Base64) {
        image1ToUpload = {
          data: bild1Base64,
          type: value.bild1!.type.split("/")[1], // extract "jpeg" from "image/jpeg"
        };
      }
      if (bild2Base64) {
        image2ToUpload = {
          data: bild2Base64,
          type: value.bild2!.type.split("/")[1], // extract "jpeg" from "image/jpeg",
        };
      }
      if (bild3Base64) {
        image3ToUpload = {
          data: bild3Base64,
          type: value.bild3!.type.split("/")[1], // extract "jpeg" from "image/jpeg",
        };
      }

      upsertEinkauf.mutate({
        ...value,
        bild1: bild1Base64 ? image1ToUpload : null,
        bild2: bild2Base64 ? image2ToUpload : null,
        bild3: bild3Base64 ? image3ToUpload : null,
      });
    },
  });

  if (res.isLoading)
    return <LoadingSkeleton desc="Dein Einkauf wird geladen..." />;

  return (
    <form
      id="einklauf-form"
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="grid grid-cols-2 gap-8">
          <form.AppField
            name="geld"
            children={(field) => (
              <field.FormInput label="Geld" loading={upsertEinkauf.isPending} />
            )}
          />
          <form.AppField
            name="pfand"
            children={(field) => (
              <field.FormInput
                label="Pfand"
                loading={upsertEinkauf.isPending}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <form.AppField
            name="paypal"
            children={(field) => (
              <field.FormSwitch
                label="Paypal"
                loading={upsertEinkauf.isPending}
              />
            )}
          />
          <form.AppField
            name="abo"
            children={(field) => (
              <field.FormSwitch label="Abo" loading={upsertEinkauf.isPending} />
            )}
          />
        </div>
        <form.AppField
          name="dinge"
          children={(field) => (
            <field.FormTextarea
              label="Dinge"
              loading={upsertEinkauf.isPending}
            />
          )}
        />

        <div className="grid grid-cols-3 gap-8">
          <form.Field
            name="bild1"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <Input
                    disabled={upsertEinkauf.isPending}
                    id={field.name}
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    name={field.name}
                    type="file"
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.files?.[0] ?? null)
                    }
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="bild2"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <Input
                    disabled={upsertEinkauf.isPending}
                    id={field.name}
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    name={field.name}
                    type="file"
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.files?.[0] ?? null)
                    }
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="bild3"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <Input
                    disabled={upsertEinkauf.isPending}
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.files?.[0] ?? null)
                    }
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
        <Button
          type="submit"
          className="self-end"
          disabled={upsertEinkauf.isPending}
        >
          {upsertEinkauf.isPending ? (
            <>
              <Spinner data-icon="inline-start" />
              Bitte warten...
            </>
          ) : (
            "Speichern"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
