import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { mitarbeiterRouter } from "./routers/mitarbeiter";
import { einkaufRouter } from "./routers/einkauf";
import { intrexxKundenRouter } from "./routers/intrexx/kunden";
import { intrexxWaRouter } from "./routers/intrexx/werkstattauftrag";
import { intrexxGeräteRouter } from "./routers/intrexx/geräte";
import { intrexxNbRouter } from "./routers/intrexx/neubau";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // Viktor Calls
  einkauf: einkaufRouter,
  mitarbeiter: mitarbeiterRouter,

  // SAGE Calls

  // INTREXX Calls
  intrexx_kunden: intrexxKundenRouter,
  intrexx_wa: intrexxWaRouter,
  intrexx_nb: intrexxNbRouter,
  intrexx_geräte: intrexxGeräteRouter,
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
