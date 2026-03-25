import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const archivRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const pdf = await ctx.viktor.pdfs.findUnique({ where: { id: input.id } });
      //   TODO: Get PDF from Server and convert to data
      // TODO: Send Data to client for Download
    }),
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.viktor.pdfs.findMany({
        where: {
          OR: [
            {
              body: { contains: input.search },
            },
            {
              title: { contains: input.search },
            },
          ],
        },
        orderBy: {
          id: "desc",
        },
      });

      return res ?? null;
    }),
});
