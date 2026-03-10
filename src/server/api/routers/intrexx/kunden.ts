import z, { includes } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const intrexxKundenRouter = createTRPCRouter({
  suche: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.intrexx.xTABLE898B92CE.findMany({
        where: {
          OR: [
            { STR_NAME_5FE19153: { contains: input.search } },
            { STR_NAME2_CECE8E30: { contains: input.search } },
            { STR_NACHNAMEDUE: { contains: input.search } },
            { STR_VORNAMEDUE: { contains: input.search } },
            { STR_KUNDENNUMMER_D45D177B: { contains: input.search } },
            { STR_FIRMADUE: { contains: input.search } },
            { STR_EMAILADRESSE_6AF00EDF: { contains: input.search } },
            { STR_LOGIN_8E8D93B6: { contains: input.search } },
          ],
        },
        select: {
          LID: true,
          STR_KUNDENNUMMER_D45D177B: true,
          STR_NAME_5FE19153: true,
          STR_NAME2_CECE8E30: true,
          STR_STRASSE_1FE60006: true,
        },
        orderBy: {
          STR_KUNDENNUMMER_D45D177B: "asc",
        },
      });
      return res ?? null;
    }),
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const Kunde = await ctx.intrexx.xTABLE898B92CE.findUnique({
        where: {
          LID: input.id,
        },
        include: {
          XDATAGROUPFFC21EED: {
            include: {
              XFILEDATAGROUP6: true,
            },
          },
        },
      });

      const geräte = await ctx.intrexx.xDATAGROUP353B6511.findMany({
        where: { L_INTREXXNR_615CC850: Kunde?.L_INTREXXNR_5F3E58AF },
        orderBy: { DTINSERT: "desc" },
      });

      const werkstattaufträge = await ctx.intrexx.xDATAGROUP577CCE23.findMany({
        where: { L_INTREXXNR_A99FF71D: Kunde?.L_INTREXXNR_5F3E58AF },
        orderBy: { DTINSERT: "desc" },
      });

      const rma = await ctx.intrexx.xDATAGROUP7D3A6EB1.findMany({
        where: { L_INTREXXNR_213345CC: Kunde?.L_INTREXXNR_5F3E58AF },
        orderBy: { DTINSERT: "desc" },
      });

      const neubauten = await ctx.intrexx.xDATAGROUPA9E98313.findMany({
        where: { L_INTREXXNR_AE6C9D81: Kunde?.L_INTREXXNR_5F3E58AF },
        orderBy: { DTINSERT: "desc" },
      });

      const termine = await ctx.intrexx.xDATAGROUP42FFC361.findMany({
        where: { L_INTREXXNR_613AA502: Kunde?.L_INTREXXNR_5F3E58AF },
        orderBy: { DTINSERT: "desc" },
      });

      const Dienstleistungen = await ctx.intrexx.xDATAGROUP6CBD4214.findMany({
        where: { L_INTREXXNR_A1F4EA3E: Kunde?.L_INTREXXNR_5F3E58AF },
        orderBy: { DTINSERT: "desc" },
      });

      const PCVisit = await ctx.pcvisit.protokolle.findMany({
        where: { Kundennummer: Kunde?.STR_KUNDENNUMMER_D45D177B },
        orderBy: { Startzeit: "desc" },
      });

      const Leasing = await ctx.intrexx.xDATAGROUPE28928E22.findMany({
        where: { L_INTREXXNR_64C7F50E: Kunde?.L_INTREXXNR_5F3E58AF },
        orderBy: { DTINSERT: "desc" },
      });

      const response = {
        Kunde: Kunde,
        Geräte: geräte,
        WA: werkstattaufträge,
        RMA: rma,
        NB: neubauten,
        Termine: termine,
        Dienstleistungen: Dienstleistungen,
        PCVisit: PCVisit,
        Leasing: Leasing,
      };

      return response;
    }),
});
