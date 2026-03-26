import z from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { readFile } from "node:fs/promises";
import { env } from "@/env";
import { join } from "node:path";

export const archivRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const pdf = await ctx.viktor.pdfs.findUnique({
        where: { id: input.id },
        select: { title: true },
      });
      if (pdf == null) return null;

      const filePath = join(env.ARCHIVE_PATH, pdf.title);
      const data = await readFile(filePath, { encoding: "base64" });

      return data;
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
