import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { mitarbeiterRouter } from "./routers/viktor/mitarbeiter";
import { einkaufRouter } from "./routers/viktor/einkauf";
import { intrexxKundenRouter } from "./routers/intrexx/kunden";
import { intrexxWaRouter } from "./routers/intrexx/werkstattauftrag";
import { intrexxGeräteRouter } from "./routers/intrexx/geräte";
import { intrexxNbRouter } from "./routers/intrexx/neubau";
import { abteilungsRouter } from "./routers/viktor/abteilung";
import { lieferantenRouter } from "./routers/viktor/lieferanten";
import { ansprechpartnerRouter } from "./routers/viktor/ansprechpartner";
import { angebotsRouter } from "./routers/viktor/angebot";
import { jobRouter } from "./routers/viktor/job";
import { partnerRouter } from "./routers/viktor/partner";
import { referenzRouter } from "./routers/viktor/referenz";
import { sageKundenRouter } from "./routers/sage/kunde";
import { formularRouter } from "./routers/formulare";
import { archivRouter } from "./routers/viktor/archiv";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  formular: formularRouter,

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

  // INTREXX Calls
  intrexx_kunden: intrexxKundenRouter,
  intrexx_wa: intrexxWaRouter,
  intrexx_nb: intrexxNbRouter,
  intrexx_geräte: intrexxGeräteRouter,

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
