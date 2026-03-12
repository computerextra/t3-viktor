import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const intrexxWaRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ waNummer: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const wa = await ctx.intrexx.xDATAGROUP577CCE23.findFirst({
        where: {
          L_XWANR_B9E0244D: input.waNummer,
        },
      });

      const einträge = await ctx.intrexx.xDATAGROUPD72B26EA.findMany({
        where: {
          FKLID: wa?.LID,
        },
        orderBy: {
          DTINSERT: "desc",
        },
      });

      const res = {
        WA: wa,
        Einträge: einträge,
      };

      return res ?? null;
    }),
});
