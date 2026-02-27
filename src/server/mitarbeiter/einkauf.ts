import { db } from "@/db";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import {
  ServerValidateError,
  createServerValidate,
  formOptions,
  getFormData,
} from "@tanstack/react-form-start";
import { setResponseStatus } from "@tanstack/react-start/server";

export const MAX_FILE_SIZE_MB = 10;
export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jgp",
  "image/jpeg",
  "image/webp",
];

const BildValidator = z
  .any()
  .transform((file) => file.length > 0 && file.item(0))
  .refine(
    (file) => !file || (!!file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024),
    `Das Bild darf maximal ${MAX_FILE_SIZE_MB} MB groß sein.`,
  )
  .refine(
    (file) =>
      !file ||
      (!!file && file.type?.startsWith("image"),
      "Es dürfen nur Bild Dateien hochgeladen werden"),
  );

export const EinkaufProps = z.object({
  mitarbeiterId: z.string(),
  geld: z.string().optional().nullable(),
  pfand: z.string().optional().nullable(),
  dinge: z.string(),
  paypal: z.boolean().default(false).optional(),
  abo: z.boolean().default(false).optional(),
  bild1: BildValidator.optional().nullable(),
  bild2: BildValidator.optional().nullable(),
  bild3: BildValidator.optional().nullable(),
});

export const EinkaufFormOpts = formOptions({
  defaultValues: {
    mitarbeiterId: "",
    geld: "",
    pfand: "",
    dinge: "",
    paypal: false,
    abo: false,
    bild1: null,
    bild2: null,
    bild3: null,
  },
});

const serverValidateEinkauf = createServerValidate({
  ...EinkaufFormOpts,
  onServerValidate: ({ value }) => {
    const parsed = EinkaufProps.safeParse(value);
    if (!parsed.success) {
      return parsed.error;
    }
  },
});

export const EinkaufsListeQueryOptions = () =>
  queryOptions({
    queryKey: ["Einkaufsliste"],
    queryFn: () => getEinkaufsliste(),
  });

export const GetEinkaufQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["Einkaufsliste", id],
    queryFn: () => getEinkauf({ data: { id: id } }),
  });

export const UpdateEinkaufOptons = (props: z.infer<typeof EinkaufProps>) =>
  mutationOptions({
    mutationFn: () =>
      updateEinkauf({
        data: props,
      }),
  });

export const getEinkauf = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const einkauf = await db.mitarbeiter.findUnique({
      where: { id: data.id },
      include: { Einkauf: true },
    });

    return einkauf?.Einkauf ?? null;
  });

export const getEinkaufsliste = createServerFn({ method: "GET" }).handler(
  async () => {
    const liste = await db.einkauf.findMany({
      where: {
        OR: [
          {
            AND: [
              { Abgeschickt: { lte: new Date() } },
              {
                Abgeschickt: {
                  gt: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() - 1,
                    0,
                    0,
                    0,
                    0,
                  ),
                },
              },
            ],
          },
          {
            AND: [{ Abonniert: true }, { Abgeschickt: { lte: new Date() } }],
          },
        ],
      },
      orderBy: {
        Abgeschickt: "desc",
      },
      include: {
        Mitarbeiter: true,
      },
    });

    return liste;
  },
);

export const updateEinkauf = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error("Invalid Form Data");
    }
    return data;
  })
  .handler(async (ctx) => {
    try {
      const validatedData = await serverValidateEinkauf(ctx.data);

      // Check einkauf
      const ma = await db.mitarbeiter.findUnique({
        where: { id: validatedData.mitarbeiterId },
        include: { Einkauf: true },
      });

      // TODO: Upload Bilder
      let image1: string | null = null;
      let image2: string | null = null;
      let image3: string | null = null;

      const res = await db.einkauf.upsert({
        where: {
          id: ma?.Einkauf?.id,
        },
        create: {
          Abgeschickt: new Date(),
          Dinge: validatedData.dinge,
          Abonniert: validatedData.abo,
          Bild1: image1,
          Bild2: image2,
          Bild3: image3,
          Geld: validatedData.geld,
          Paypal: validatedData.paypal,
          Pfand: validatedData.pfand,
          Mitarbeiter: {
            connect: {
              id: validatedData.mitarbeiterId,
            },
          },
        },
        update: {
          Abgeschickt: new Date(),
          Dinge: validatedData.dinge,
          Abonniert: validatedData.abo,
          Bild1: image1,
          Bild2: image2,
          Bild3: image3,
          Geld: validatedData.geld,
          Paypal: validatedData.paypal,
          Pfand: validatedData.pfand,
          Mitarbeiter: {
            connect: {
              id: validatedData.mitarbeiterId,
            },
          },
        },
      });
      return res;
    } catch (e) {
      if (e instanceof ServerValidateError) {
        return e.response;
      }
      setResponseStatus(500);
      return "Interer Server Fehler";
    }
  });

export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
  async () => {
    return getFormData();
  },
);
