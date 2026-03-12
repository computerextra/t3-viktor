import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const intrexxGeräteRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const gerät = await ctx.intrexx.xDATAGROUP353B6511.findFirst({
        where: { L_GERTENR_B4E6AEA5: input.id },
      });

      const werkstattaufträge = await ctx.intrexx.xDATAGROUP577CCE23.findMany({
        where: { L_GERT_18257601: input.id },
        orderBy: { DTINSERT: "desc" },
      });

      return {
        Gerät: gerät,
        WA: werkstattaufträge,
      };
    }),
});
