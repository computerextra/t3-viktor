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

export const GDataAnwendungen: readonly string[] = [
  "Anti-Virus",
  "MES",
  "Internet Security",
  "Internet Security Attached",
  "Mobile Internet Security",
  "Mobile Security",
  "Total Security",
];

export const TelekomFragen: readonly string[] = [
  "Wie lautet der Beruf Ihres Großvaters?",
  "Wo haben Sie Ihren Partner kennengelernt?",
  "Wie lautet der Name Ihrer Grundschule?",
  "Wie lautet Ihre Lieblingsfigur aus der Geschichte?",
  "Wie lautet der Name Ihrer Grundschule?",
  "Was ist Ihr Lieblingshobby?",
  "Wie lautet der Geburtsname Ihrer Mutter?",
  "Welche ist Ihre Lieblingsmannschaft?",
  "Was war Ihr erstes Auto?",
  "Wie hieß der beste Freund aus Ihrer Kindheit?",
  "Wie heißt oder hieß Ihr erstes Haustier?",
  "Wie ist der Name Ihres Lieblingslehrers?",
  "Wie hieß der Titel Ihres ersten Musik-Albums?",
  "Was war Ihr erstes Faschingskostüm?",
  "Wie hieß Ihr erstes Buch?",
  "Wie hieß Ihr erstes Plüschtier?",
  "Wo waren Sie bei Ihrem ersten Kuss?",
  "Was war Ihr schönstes Weihnachtsgeschenk?",
  "Wie heißt die Antwort auf die Frage aller Fragen?",
];

export const aomeiFormData = z.object({
  Lizenz: z.string(),
  Gerätenummer: z.string(),
});

export const appleFormData = z.object({
  Benutzername: z.string(),
  Passwort: z.string(),
});

export const gdataFormData = z.object({
  Benutzername: z.string(),
  Passwort: z.string(),
  AnzahlBenutzer: z.number().int(),
  Software: z.enum(GDataAnwendungen),
  Lizenz: z.string(),
});

export const googleFormData = z.object({
  Benutzername: z.string(),
  Passwort: z.string(),
});

export const microsoftFormData = z.object({
  Benutzername: z.string(),
  Passwort: z.string(),
  EMail: z.email(),
  Mobil: z.string(),
});

export const telekomFormData = z.object({
  Benutzername: z.string(),
  Passwort: z.string(),
  Mobil: z.string(),
  Geburtstag: z.date(),
  Sicherheitsfrage: z.enum(TelekomFragen),
  Antwort: z.string(),
});

export const mailDeFormData = z.object({
  Benutzername: z.string(),
  Passwort: z.string(),
});
