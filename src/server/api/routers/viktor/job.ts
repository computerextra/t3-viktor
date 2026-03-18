import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const abteilungen = await ctx.viktor.jobs.findMany({
      orderBy: { name: "asc" },
    });
    return abteilungen ?? null;
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const abteilung = await ctx.viktor.jobs.findUnique({
        where: { id: input.id },
      });
      return abteilung ?? null;
    }),
  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().nullable(),
        name: z.string(),
        online: z.boolean(),
        Aufgabe: z.string().nullable(),
        Beschreibung: z.string().nullable(),
        Profil: z.string().nullable(),
        isAusbildung: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id)
        await ctx.viktor.jobs.update({
          where: { id: input.id },
          data: { ...input, id: input.id },
        });
      else
        await ctx.viktor.jobs.create({
          data: { ...input, id: undefined },
        });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.viktor.jobs.delete({ where: { id: input.id } });
    }),
});
