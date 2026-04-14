import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { ausstellerRouter } from "./routers/aussteller";
import { intrexxDokuRouter } from "./routers/intrexx/doku";
import { intrexxGeräteRouter } from "./routers/intrexx/geräte";
import { intrexxKundenRouter } from "./routers/intrexx/kunden";
import { intrexxNbRouter } from "./routers/intrexx/neubau";
import { intrexxWaRouter } from "./routers/intrexx/werkstattauftrag";
import { mailRouter } from "./routers/mail";
import { sageArtikelRouter } from "./routers/sage/artikel";
import { sageKundenRouter } from "./routers/sage/kunde";
import { abteilungsRouter } from "./routers/viktor/abteilung";
import { angebotsRouter } from "./routers/viktor/angebot";
import { ansprechpartnerRouter } from "./routers/viktor/ansprechpartner";
import { archivRouter } from "./routers/viktor/archiv";
import { einkaufRouter } from "./routers/viktor/einkauf";
import { jobRouter } from "./routers/viktor/job";
import { lieferantenRouter } from "./routers/viktor/lieferanten";
import { mitarbeiterRouter } from "./routers/viktor/mitarbeiter";
import { partnerRouter } from "./routers/viktor/partner";
import { referenzRouter } from "./routers/viktor/referenz";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mail: mailRouter,
  aussteller: ausstellerRouter,

  // Viktor Calls
  abteilung: abteilungsRouter,
  angebot: angebotsRouter,
  ansprechpartner: ansprechpartnerRouter,
  einkauf: einkaufRouter,
  job: jobRouter,
  lieferant: lieferantenRouter,
  mitarbeiter: mitarbeiterRouter,
  partner: partnerRouter,
  referenz: referenzRouter,
  archiv: archivRouter,

  // SAGE Calls
  sage_kunden: sageKundenRouter,
  sage_artikel: sageArtikelRouter,

  // INTREXX Calls
  intrexx_kunden: intrexxKundenRouter,
  intrexx_wa: intrexxWaRouter,
  intrexx_nb: intrexxNbRouter,
  intrexx_geräte: intrexxGeräteRouter,
  intrexx_doku: intrexxDokuRouter,

  // PC Visit Calls
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
