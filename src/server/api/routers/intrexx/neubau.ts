import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const intrexxNbRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ AuNummer: z.string() }))
    .query(async ({ ctx, input }) => {
      const wa = await ctx.intrexx.xDATAGROUPA9E98313.findFirst({
        where: {
          STR_AUFTRAGSNUMMERKHK_E440E7D0: input.AuNummer,
        },
      });

      const einträge = await ctx.intrexx.xDATAGROUPE5617B92.findMany({
        where: {
          FKLID: wa?.LID,
        },
        orderBy: {
          DTINSERT: "desc",
        },
      });

      return {
        NB: wa,
        Einträge: einträge,
      };
    }),
});
