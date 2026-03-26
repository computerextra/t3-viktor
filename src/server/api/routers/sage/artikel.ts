import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const sageArtikelRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.sage.sg_auf_artikel.findFirst({
        where: {
          ARTNR: input.search,
        },
        select: {
          SUCHBEGRIFF: true,
        },
      });

      if (res == null) return null;

      return `${input.search}: ${res.SUCHBEGRIFF}`;
    }),
});
