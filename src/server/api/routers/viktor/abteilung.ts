import { createTRPCRouter, publicProcedure } from "../../trpc";

export const abteilungsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const abteilungen = await ctx.viktor.abteilung.findMany({
      orderBy: { name: "asc" },
    });
    return abteilungen ?? null;
  }),
});
