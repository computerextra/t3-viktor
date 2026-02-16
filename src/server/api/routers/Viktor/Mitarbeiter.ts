import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const MitarbeiterRouter = createTRPCRouter({
  geburtstage: publicProcedure.query(async ({ ctx }) => {
    const ma = await ctx.db.mitarbeiter.findMany({
      where: {
        NOT: [
          {
            Geburtstag: null,
          },
        ],
      },
      orderBy: {
        Geburtstag: "asc",
      },
    });
    if (ma.length < 1) return null;

    // Sort Mitarbeiter
    const heute: typeof ma = [];
    const zukunft: typeof ma = [];
    const vergangen: typeof ma = [];

    return ma ?? null;
  }),
});
