import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const lieferantenRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const lieferant = await ctx.viktor.lieferant.findUnique({
        where: { id: input.id },
      });
      return lieferant ?? null;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const lieferanten = await ctx.viktor.lieferant.findMany({
      orderBy: {
        Firma: "asc",
      },
    });
    return lieferanten ?? null;
  }),
  getAllWithAp: publicProcedure.query(async ({ ctx }) => {
    const lieferanten = await ctx.viktor.lieferant.findMany({
      orderBy: { Firma: "asc" },
      include: { Ansprechpartner: true },
    });
    return lieferanten ?? null;
  }),
  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().nullable(),
        Firma: z.string(),
        Kundennummer: z.string().optional(),
        Webseite: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id)
        await ctx.viktor.lieferant.update({
          where: { id: input.id },
          data: { ...input, id: input.id },
        });
      else
        await ctx.viktor.lieferant.create({
          data: { ...input, id: undefined },
        });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.viktor.lieferant.delete({ where: { id: input.id } });
    }),
});
