import { useTitle } from "@/hooks/use-title";
import {
  EinkaufFormOpts,
  getEinkauf,
  GetEinkaufQueryOptions,
  getFormDataFromServer,
  updateEinkauf,
} from "@/server/mitarbeiter/einkauf";
import { createFileRoute } from "@tanstack/react-router";
import { mergeForm, useForm, useStore } from "@tanstack/react-form";
import { useTransform } from "@tanstack/react-form-start";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/Einkauf/$maId/")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      GetEinkaufQueryOptions(params.maId),
    );
    const einkauf = await getEinkauf({ data: { id: params.maId } });
    const state = await getFormDataFromServer();

    return { einkauf: einkauf, state: state };
  },
  component: RouteComponent,
});

function RouteComponent() {
  useTitle("Einkauf Eingabe");
  const data = Route.useLoaderData();
  const { maId } = Route.useParams();

  const form = useForm({
    ...EinkaufFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, data.state),
      [data.state],
    ),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  useEffect(() => {
    if (maId) {
      form.setFieldValue("mitarbeiterId", maId);
    }
  }, [maId]);

  useEffect(() => {
    if (data.einkauf?.Abonniert)
      form.setFieldValue("abo", data.einkauf.Abonniert);
    if (data.einkauf?.Dinge) form.setFieldValue("dinge", data.einkauf.Dinge);
    if (data.einkauf?.Geld) form.setFieldValue("geld", data.einkauf.Geld);
    if (data.einkauf?.Pfand) form.setFieldValue("pfand", data.einkauf.Pfand);
    if (data.einkauf?.Paypal) form.setFieldValue("paypal", data.einkauf.Paypal);
  }, [data.einkauf]);

  return (
    <div className="container mx-auto">
      <h1 className="mt-12 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance print:hidden">
        Einkauf bearbeiten
      </h1>

      <form
        action={updateEinkauf.url}
        method="POST"
        encType={"multipart/form-data"}
      >
        {formErrors.map((error) => (
          <p key={error as never as string}>{error}</p>
        ))}

        <FieldGroup>
          <form.Field
            name="dinge"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Dinge</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="min-h-30"
                  />
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
