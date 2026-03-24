import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const sageKundenRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ kundennummer: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const kunde = await ctx.sage.sg_adressen.findFirst({
        where: {
          KundNr: {
            contains: input.kundennummer,
          },
        },
        select: {
          KundNr: true,
          Name: true,
          Vorname: true,
        },
      });

      return kunde ?? null;
    }),
});
