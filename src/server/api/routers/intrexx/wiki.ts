import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const WikiRouter = createTRPCRouter({
  getArtikel: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.intrexx.xWIKIF7BF7662.findUnique({
        where: { LID: input.id },
      });
      return res;
    }),
  letzteArtikel: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.intrexx.xWIKIF7BF7662.findMany({
      orderBy: {
        DTINSERT: "desc",
      },
      take: 9,
    });
    return res;
  }),
  kategorien: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.intrexx.xDATAGROUPB76723CF.findMany({
      orderBy: {
        STR_KATEGORIE_6D894D0A: "asc",
      },
    });
    return res;
  }),
  artikelAusKategorie: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const kategorie = await ctx.intrexx.xDATAGROUPB76723CF.findUnique({
        where: { LID: input.id },
      });
      const res = await ctx.intrexx.xWIKIF7BF7662.findMany({
        where: {
          STR_KATEGORIE_BD83BD5F: kategorie?.STR_KATEGORIE_6D894D0A,
        },
        orderBy: {
          DTINSERT: "desc",
        },
      });

      return res;
    }),
  alleArtikel: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.intrexx.xWIKIF7BF7662.findMany({
      orderBy: {
        DTINSERT: "desc",
      },
    });
    return res;
  }),
  sucheArtikel: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.intrexx.xWIKIF7BF7662.findMany({
        where: {
          OR: [
            {
              STRHEADLINE: {
                contains: input.search,
              },
            },
            {
              STRCOMMENT: { contains: input.search },
            },
            {
              TXTWIKI: { contains: input.search },
            },
          ],
        },
        orderBy: {
          DTINSERT: "desc",
        },
      });

      return res;
    }),
});
