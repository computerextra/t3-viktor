import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const intrexxDokuRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const doku = await ctx.intrexx.xTABLEFE663382.findFirst({
        where: {
          L_INTREXXNR_F67AE19A: input.id,
        },
      });

      return {
        Doku: doku,
      };
    }),
  drucker: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const drucker = await ctx.intrexx.xDATAGROUP11B089C2.findMany({
        where: {
          L_INTREXXNR_F0BD41AE: input.id,
        },
      });
      return drucker;
    }),
  wartungenTk: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const wartungenTk = await ctx.intrexx.xDATAGROUP19DF1D8D.findMany({
        where: {
          L_INTREXXNR: input.id,
        },
      });
      return wartungenTk;
    }),
  zugangsdaten: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const zugangsdaten = await ctx.intrexx.xDATAGROUP52176A1A.findMany({
        where: {
          L_INTREXXNR_6FE781AE: input.id,
        },
      });
      return zugangsdaten;
    }),
  kontaktdaten: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const kontaktdaten = await ctx.intrexx.xDATAGROUP5FAC0D60.findMany({
        where: {
          L_INTREXXNR_CFA455C3: input.id,
        },
      });
      return kontaktdaten;
    }),
  dienstleistungen: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const dienstleistungen = await ctx.intrexx.xDATAGROUP6CBD4214.findMany({
        where: { L_INTREXXNR_A1F4EA3E: input.id },
      });
      return dienstleistungen;
    }),
  workstations: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const workstations = await ctx.intrexx.xDATAGROUP6FCE42B4.findMany({
        where: { L_INTREXXNR_7F34A3BB: input.id },
      });
      return workstations;
    }),
  email: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const email = await ctx.intrexx.xDATAGROUP86DE8D9E.findMany({
        where: { L_INTREXXNR_E756114C: input.id },
      });
      return email;
    }),
  netzwerkgeräte: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const netzwerkgeräte = await ctx.intrexx.xDATAGROUP8EA70C90.findMany({
        where: { L_INTREXXNR_C91C07A1: input.id },
      });
      return netzwerkgeräte;
    }),
  sonstiges: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const sonstiges = await ctx.intrexx.xDATAGROUP97AA886C.findMany({
        where: { L_INTREXXNR_C138187C: input.id },
      });
      return sonstiges;
    }),
  konten: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const konten = await ctx.intrexx.xDATAGROUPB318AC55.findMany({
        where: { L_INTREXXNR_7EE0A994: input.id },
      });
      return konten;
    }),
  software: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const software = await ctx.intrexx.xDATAGROUPB4995030.findMany({
        where: { L_INTREXXNR_86855F77: input.id },
      });
      return software;
    }),
  getServer: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const servers = await ctx.intrexx.xDATAGROUPB947D46D.findMany({
        where: { L_INTREXXNR_AA286ADF: input.id },
      });
      return servers;
    }),
  wartungen: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const wartungen = await ctx.intrexx.xDATAGROUPBD2B40C7.findMany({
        where: { L_INTREXXNR: input.id },
      });
      return wartungen;
    }),
  standorte: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const standorte = await ctx.intrexx.xDATAGROUPD565F7E8.findMany({
        where: { L_INTREXXNR_E91C9479: input.id },
      });
      return standorte;
    }),
  dokumente: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const dokumente = await ctx.intrexx.xDATAGROUPDE5A5C79.findMany({
        where: { L_INTREXXNR_B8FC0FD5: input.id },
      });
      return dokumente;
    }),
});
