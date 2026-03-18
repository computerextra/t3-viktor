import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const angebotsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const abteilungen = await ctx.viktor.angebot.findMany({
      orderBy: { title: "asc" },
    });
    return abteilungen ?? null;
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const abteilung = await ctx.viktor.angebot.findUnique({
        where: { id: input.id },
      });
      return abteilung ?? null;
    }),
  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().nullable(),
        title: z.string(),
        subtitle: z.string().nullable(),
        date_start: z.date(),
        date_stop: z.date(),
        link: z.string(),
        image: z.string(),
        anzeigen: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id)
        await ctx.viktor.angebot.update({
          where: { id: input.id },
          data: { ...input, id: input.id },
        });
      else
        await ctx.viktor.angebot.create({
          data: { ...input, id: undefined },
        });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.viktor.angebot.delete({ where: { id: input.id } });
    }),
});
