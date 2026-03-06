import z from "zod";

const MAX_FILE_SIZE_MB = 10;
export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jgp",
  "image/jpeg",
  "image/webp",
];

// validator used on the client to ensure a File object meets our size/type limits
const BildClientValidator = z
  .instanceof(File)
  .refine((file) => {
    return file?.size <= MAX_FILE_SIZE_MB * 1024 * 1024;
  }, `Datei muss kleiner als ${MAX_FILE_SIZE_MB}MB sein.`)
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type));

const BildServerValidator = z.object({
  data: z.string(),
  type: z.string(),
});

export type BildServer = z.infer<typeof BildServerValidator>;

// the server never receives a real File instance, so the schema must be
// permissive; the actual upload logic will be handled separately later.
// We keep the client validator around so that the form still does proper
// validation before submission.
export const EinkaufPropsServer = z.object({
  mitarbeiterId: z.string(),
  geld: z.string(),
  pfand: z.string(),
  dinge: z.string(),
  paypal: z.boolean(),
  abo: z.boolean(),
  bild1: BildServerValidator.nullable(),
  bild2: BildServerValidator.nullable(),
  bild3: BildServerValidator.nullable(),
});

// exported for convenience on the client
export const EinkaufPropsClient = z.object({
  mitarbeiterId: z.string(),
  geld: z.string(),
  pfand: z.string(),
  dinge: z.string(),
  paypal: z.boolean(),
  abo: z.boolean(),
  bild1: BildClientValidator.nullable(),
  bild2: BildClientValidator.nullable(),
  bild3: BildClientValidator.nullable(),
});
