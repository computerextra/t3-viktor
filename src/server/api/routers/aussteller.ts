import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { BildServerValidator } from "@/types";
import { uploadToFtp } from "@/server/ftp-upload";

type SageRes = {
  SG_AUF_ARTIKEL_PK: number;
  ARTNR: string | null;
  SUCHBEGRIFF: string | null;
  ZUSTEXT1: string | null;
  PR01: number | null;
};

export const ausstellerRouter = createTRPCRouter({
  sync: publicProcedure.mutation(async ({ ctx }) => {
    const sageRes = await ctx.sage.$queryRaw<
      SageRes[]
    >`select sg_auf_artikel.SG_AUF_ARTIKEL_PK, sg_auf_artikel.ARTNR, sg_auf_artikel.SUCHBEGRIFF, sg_auf_artikel.ZUSTEXT1, sg_auf_vkpreis.PR01 FROM sg_auf_artikel INNER JOIN sg_auf_vkpreis ON sg_auf_artikel.SG_AUF_ARTIKEL_PK = sg_auf_vkpreis.SG_AUF_ARTIKEL_FK`;

    let upsertQuery =
      "INSERT INTO Aussteller (id, Artikelnummer, Artikelname, Specs, Preis) VALUES";

    sageRes.forEach((artikel, idx) => {
      if (idx == sageRes.length - 1) {
        upsertQuery += ` (${artikel.SG_AUF_ARTIKEL_PK}, '${artikel.ARTNR}', '${artikel.SUCHBEGRIFF?.replaceAll("'", '"')}', '${artikel.ZUSTEXT1?.replaceAll("'", '"')}', '${artikel.PR01?.toFixed(2) ?? 0.0}')`;
      } else {
        upsertQuery += ` (${artikel.SG_AUF_ARTIKEL_PK}, '${artikel.ARTNR}', '${artikel.SUCHBEGRIFF?.replaceAll("'", '"')}', '${artikel.ZUSTEXT1?.replaceAll("'", '"')}', '${artikel.PR01?.toFixed(2) ?? 0.0}'), `;
      }
    });
    upsertQuery +=
      "ON DUPLICATE KEY UPDATE Artikelnummer = VALUES(Artikelnummer), Artikelname = VALUES(Artikelname), Specs = VALUES(Specs), Preis = VALUES(Preis);";

    await ctx.viktor.$executeRawUnsafe(upsertQuery);

    return true;
  }),
  update: publicProcedure
    .input(
      z.object({
        Artikelnummer: z.string(),
        bild: BildServerValidator.nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let image: string | null = null;
      if (input.bild) image = await uploadToFtp(input.bild);

      if (image) {
        const artikel = await ctx.viktor.aussteller.findFirst({
          where: {
            Artikelnummer: input.Artikelnummer,
          },
          select: {
            id: true,
          },
        });
        if (artikel == null) return false;

        await ctx.viktor.aussteller.update({
          where: {
            id: artikel?.id,
          },
          data: {
            Bild: image,
          },
        });
        return true;
      } else {
        return false;
      }
    }),
});
