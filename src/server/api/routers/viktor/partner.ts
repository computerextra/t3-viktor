import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const partnerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const abteilungen = await ctx.viktor.partner.findMany({
      orderBy: { name: "asc" },
    });
    return abteilungen ?? null;
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const abteilung = await ctx.viktor.partner.findUnique({
        where: { id: input.id },
      });
      return abteilung ?? null;
    }),
  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().nullable(),
        name: z.string(),
        link: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id)
        await ctx.viktor.partner.update({
          where: { id: input.id },
          data: { ...input, id: input.id },
        });
      else
        await ctx.viktor.partner.create({
          data: { ...input, id: undefined },
        });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.viktor.partner.delete({ where: { id: input.id } });
    }),
});
