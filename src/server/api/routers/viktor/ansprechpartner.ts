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
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const Ansprechpartner = await ctx.viktor.ansprechpartner.findUnique({
        where: { id: input.id },
      });
      return Ansprechpartner ?? null;
    }),
  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().nullable(),
        name: z.string(),
        telefon: z.string().nullable(),
        mobil: z.string().nullable(),
        mail: z.string().nullable(),
        lieferantId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id)
        await ctx.viktor.ansprechpartner.update({
          where: { id: input.id },
          data: {
            ...input,
            id: input.id,
          },
        });
      else
        await ctx.viktor.ansprechpartner.create({
          data: {
            ...input,
            id: undefined,
          },
        });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.viktor.ansprechpartner.delete({ where: { id: input.id } });
    }),
});
