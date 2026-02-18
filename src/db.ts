import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient as SageClient } from "../generated/sage/client";
import { PrismaClient as ViktorClient } from "../generated/viktor/client";
import { env } from "./env";

const viktorAdapter = new PrismaMariaDb({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  connectionLimit: 5,
});

const sageAdapter = new PrismaMssql({
  user: env.SAGE_DATABASE_USER,
  password: env.SAGE_DATABASE_PASSWORD,
  database: env.SAGE_DATABASE_NAME,
  server: env.SAGE_DATABASE_HOST,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});

declare global {
  var __db: ViktorClient | undefined;
  var __sage: SageClient | undefined;
}

export const db =
  globalThis.__db || new ViktorClient({ adapter: viktorAdapter });

export const sage =
  globalThis.__sage || new SageClient({ adapter: sageAdapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.__db = db;
  globalThis.__sage = sage;
}
