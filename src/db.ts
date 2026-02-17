import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient as ViktorClient } from "../generated/prisma/client";
import { env } from "./env";

const viktorAdapter = new PrismaMariaDb({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  connectionLimit: 5,
});

declare global {
  var __prisma: ViktorClient | undefined;
}

export const db =
  globalThis.__prisma || new ViktorClient({ adapter: viktorAdapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = db;
}
