import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../trpc";

const MitarbeiterProps = z.object({
  id: z.string().optional(),
  name: z.string(),
  short: z.string().nullable(),
  image: z.boolean().default(false),
  sex: z.enum(["w", "m"]).nullable(),
  focus: z.string().nullable(),
  mail: z.email().nullable(),
  abteilungId: z.string().nullable(),
  Azubi: z.boolean().default(false),
  Geburtstag: z.date().nullable(),
  Gruppenwahl: z.string().nullable(),
  HomeOffice: z.string().nullable(),
  Mobil_Business: z.string().nullable(),
  Mobil_Privat: z.string().nullable(),
  Telefon_Business: z.string().nullable(),
  Telefon_Intern_1: z.string().nullable(),
  Telefon_Intern_2: z.string().nullable(),
  Telefon_Privat: z.string().nullable(),
  Bild: z.string().nullable(),
});

export const mitarbeiterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const mitarbeiter = await ctx.viktor.mitarbeiter.findMany({
      orderBy: { name: "asc" },
    });
    return mitarbeiter ?? null;
  }),
  upsert: publicProcedure
    .input(MitarbeiterProps)
    .mutation(async ({ ctx, input }) => {
      let image: string | null = null;
      // TODO: Upload für Mitarbeiter Bilder bauen!
      // if(input.Bild) image = await uploadImageToFTP(input.Bild)

      if (input.id)
        await ctx.viktor.mitarbeiter.update({
          where: { id: input.id },
          data: { ...input, Bild: image },
        });
      else
        await ctx.viktor.mitarbeiter.create({
          data: { ...input, Bild: image },
        });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.viktor.mitarbeiter.delete({
        where: { id: input.id },
      });
    }),
  getWithAbteilung: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const ma = await ctx.viktor.mitarbeiter.findUnique({
        where: { id: input.id },
        include: { Abteilung: true },
      });
      return ma ?? null;
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const ma = await ctx.viktor.mitarbeiter.findUnique({
        where: { id: input.id },
      });
      return ma ?? null;
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
