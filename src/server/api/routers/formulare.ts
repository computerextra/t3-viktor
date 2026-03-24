import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  aomeiFormData,
  appleFormData,
  gdataFormData,
  googleFormData,
  mailDeFormData,
  microsoftFormData,
  telekomFormData,
} from "@/types";

export const formularRouter = createTRPCRouter({
  aomei: publicProcedure.input(aomeiFormData).mutation(async ({ input }) => {
    // const browser = await launch();
    // const page = await browser.newPage();
    // let html = await readFile("template.html", "utf-8");
    // html = html.replace("{{Benutzername}}", input.Gerätenummer);
    // await page.setContent(html, { waitUntil: "networkidle0" });
    // const pdfBuffer = await page.pdf({
    //   format: "A4",
    //   printBackground: true,
    // });
    // await browser.close();
  }),
  apple: publicProcedure.input(appleFormData).query(({ input }) => {
    return "";
  }),
  gdata: publicProcedure.input(gdataFormData).query(({ input }) => {
    return "";
  }),
  google: publicProcedure.input(googleFormData).query(({ input }) => {
    return "";
  }),
  microsoft: publicProcedure.input(microsoftFormData).query(({ input }) => {
    return "";
  }),
  telekom: publicProcedure.input(telekomFormData).query(({ input }) => {
    return "";
  }),
  mailde: publicProcedure.input(mailDeFormData).query(({ input }) => {
    return "";
  }),
});
