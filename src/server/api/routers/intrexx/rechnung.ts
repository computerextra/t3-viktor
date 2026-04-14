import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const intrexxRechnungRouter = createTRPCRouter({
  mesAbrechnung: publicProcedure.query(async ({ ctx }) => {
    const abrechnung = await ctx.intrexx.xDATAGROUP7E5D5EB5.findMany({});
    return abrechnung;
  }),
  vertragsarten: publicProcedure.query(async ({ ctx }) => {
    const arten = await ctx.intrexx.xDATAGROUPC5587B4D.findMany();
    return arten;
  }),
  vertäge: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const verträge = await ctx.intrexx.xTABLEB525C1C4.findMany({
        where: { L_INTREXXNR_CF6972BB: input.id },
        orderBy: { DT_ABLAUFDATUM_D2DCDDA9: "desc" },
      });
      return verträge;
    }),
});
