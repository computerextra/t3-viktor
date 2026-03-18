import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const ansprechpartnerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const Ansprechpartner = await ctx.viktor.ansprechpartner.findMany({
      orderBy: { name: "asc" },
    });
    return Ansprechpartner ?? null;
  }),
  getAllFromLieferant: publicProcedure
    .input(z.object({ lieferantenId: z.string() }))
    .query(async ({ ctx, input }) => {
      const Ansprechpartner = await ctx.viktor.ansprechpartner.findMany({
        where: { lieferantId: input.lieferantenId },
        orderBy: { name: "asc" },
      });
      return Ansprechpartner ?? null;
    }),
});
