import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const mitarbeiterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const mitarbeiter = await ctx.viktor.mitarbeiter.findMany({
      orderBy: { name: "asc" },
    });
    return mitarbeiter ?? null;
  }),
  geburtstage: publicProcedure.query(async ({ ctx }) => {
    const mitarbeiter = await ctx.viktor.mitarbeiter.findMany({
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

    if (mitarbeiter.length === 0) return null;

    type maGeb = {
      id: string;
      name: string;
      geb: Date;
      diff: number;
    };
    const heute: maGeb[] = [];
    const zukunft: maGeb[] = [];
    const vergangen: maGeb[] = [];

    const today = new Date();
    const year = today.getFullYear();

    mitarbeiter.forEach((x) => {
      if (x.Geburtstag == null) return;
      const g = new Date(
        year,
        x.Geburtstag.getMonth(),
        x.Geburtstag.getDate(),
        0,
        0,
        0,
        0,
      );
      const diffMs = g.getTime() - today.getTime();
      const diffDays = Math.floor(diffMs / 86400000) + 1;
      const y: maGeb = {
        id: x.id,
        name: x.name,
        geb: g,
        diff: diffDays,
      };
      if (diffDays > 0) zukunft.push(y);
      else if (diffDays < 0) vergangen.push(y);
      else heute.push(y);
    });

    heute.sort((a, b) => a.diff - b.diff);
    zukunft.sort((a, b) => a.diff - b.diff);
    vergangen.sort((a, b) => a.diff - b.diff);

    return { heute, zukunft, vergangen };
  }),
});
