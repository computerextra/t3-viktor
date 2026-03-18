import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const referenzRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const abteilungen = await ctx.viktor.referenzen.findMany({
      orderBy: { Name: "asc" },
    });
    return abteilungen ?? null;
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const abteilung = await ctx.viktor.referenzen.findUnique({
        where: { id: input.id },
      });
      return abteilung ?? null;
    }),
  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().nullable(),
        Name: z.string(),
        Webseite: z.string(),
        Bild: z.string(),
        Online: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id)
        await ctx.viktor.referenzen.update({
          where: { id: input.id },
          data: { ...input, id: input.id },
        });
      else
        await ctx.viktor.referenzen.create({
          data: { ...input, id: undefined },
        });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.viktor.referenzen.delete({ where: { id: input.id } });
    }),
});
