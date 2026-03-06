import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { EinkaufPropsServer } from "@/types";
import { uploadImageToFTP } from "@/server/ftp-upload";

export const einkaufRouter = createTRPCRouter({
  getEinkauf: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const einkauf = await ctx.viktor.mitarbeiter.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Einkauf: true,
        },
      });

      return einkauf?.Einkauf ?? null;
    }),
  einkaufsliste: publicProcedure.query(async ({ ctx }) => {
    const liste = await ctx.viktor.einkauf.findMany({
      where: {
        OR: [
          {
            AND: [
              { Abgeschickt: { lte: new Date() } },
              {
                Abgeschickt: {
                  gt: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() - 1,
                    0,
                    0,
                    0,
                    0,
                  ),
                },
              },
            ],
          },
          {
            AND: [{ Abonniert: true }, { Abgeschickt: { lte: new Date() } }],
          },
        ],
      },
      orderBy: {
        Abgeschickt: "desc",
      },
      include: {
        Mitarbeiter: true,
      },
    });
    return liste ?? null;
  }),
  updateEinkauf: publicProcedure
    .input(EinkaufPropsServer)
    .mutation(async ({ ctx, input }) => {
      const ma = await ctx.viktor.mitarbeiter.findUnique({
        where: {
          id: input.mitarbeiterId,
        },
        include: { Einkauf: true },
      });

      // Upload Bilder
      let image1: string | null = null;
      let image2: string | null = null;
      let image3: string | null = null;

      if (input.bild1)
        image1 = await uploadImageToFTP(input.bild1, input.mitarbeiterId, 1);
      if (input.bild2)
        image2 = await uploadImageToFTP(input.bild2, input.mitarbeiterId, 2);
      if (input.bild3)
        image3 = await uploadImageToFTP(input.bild3, input.mitarbeiterId, 3);

      await ctx.viktor.einkauf.upsert({
        where: {
          id: ma?.Einkauf?.id,
        },
        create: {
          Abgeschickt: new Date(),
          Dinge: input.dinge,
          Abonniert: input.abo,
          Bild1: image1,
          Bild2: image2,
          Bild3: image3,
          Geld: input.geld.length > 0 ? input.geld : null,
          Paypal: input.paypal,
          Pfand: input.pfand.length > 0 ? input.pfand : null,
          Mitarbeiter: {
            connect: {
              id: input.mitarbeiterId,
            },
          },
        },
        update: {
          Abgeschickt: new Date(),
          Dinge: input.dinge,
          Abonniert: input.abo,
          Bild1: image1,
          Bild2: image2,
          Bild3: image3,
          Geld: input.geld.length > 0 ? input.geld : null,
          Paypal: input.paypal,
          Pfand: input.pfand.length > 0 ? input.pfand : null,
        },
      });
    }),
});
