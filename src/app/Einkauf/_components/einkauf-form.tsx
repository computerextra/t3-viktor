"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ACCEPTED_IMAGE_TYPES, BildServer, EinkaufPropsClient } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import LoadingSkeleton from "@/components/loading-skeleton";

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

  const form = useForm({
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
          <form.Field
            name="geld"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Geld</FieldLabel>
                  <Input
                    disabled={upsertEinkauf.isPending}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="pfand"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Pfand</FieldLabel>
                  <Input
                    disabled={upsertEinkauf.isPending}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <form.Field
            name="paypal"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} orientation="horizontal">
                  <FieldLabel htmlFor={field.name}>Paypal</FieldLabel>
                  <Switch
                    disabled={upsertEinkauf.isPending}
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="abo"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} orientation="horizontal">
                  <FieldLabel htmlFor={field.name}>Abo</FieldLabel>
                  <Switch
                    disabled={upsertEinkauf.isPending}
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
        <form.Field
          name="dinge"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Dinge</FieldLabel>
                <Textarea
                  disabled={upsertEinkauf.isPending}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="min-h-30"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
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
