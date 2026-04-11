import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type sg_adressen } from "../../../../../generated/sage/client";

export const sageKundenRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const search = `%${input.search}%`;
      const kunden = await ctx.sage.$queryRaw<sg_adressen[]>`
        SELECT * FROM sg_adressen
        WHERE 
	      (
		      REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Telefon1, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','') 
          LIKE ${search}
          OR REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Telefon2, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','') 
      	  LIKE ${search}
      	  OR REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Mobiltelefon1, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','') 
      	  LIKE ${search}
      	  OR REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Mobiltelefon2, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','') 
      	  LIKE ${search}
	      )
        OR
	      (
		      Suchbegriff LIKE ${search} OR 
		      KundNr LIKE ${search} OR 
		      LiefNr LIKE ${search}
	      );`;

      return kunden ?? null;
    }),
  get: publicProcedure
    .input(z.object({ kundennummer: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const kunde = await ctx.sage.sg_adressen.findFirst({
        where: {
          KundNr: {
            contains: input.kundennummer,
          },
        },
        select: {
          KundNr: true,
          Name: true,
          Vorname: true,
        },
      });

      return kunde ?? null;
    }),
});
