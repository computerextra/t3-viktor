import { env } from "@/env";
import { PrismaClient as Viktorclient } from "../../generated/viktor/client";
import { PrismaClient as Sageclient } from "../../generated/sage/client";
import { PrismaClient as Intrexxclient } from "../../generated/intrexx/client";
import { PrismaClient as PcVisitClient } from "../../generated/pcvisit/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaMssql } from "@prisma/adapter-mssql";

const host = env.DATABASE_URL.split("@")[1].split("/")[0].split(":")[0];
const port = parseInt(
  env.DATABASE_URL.split("@")[1].split("/")[0].split(":")[1],
);
const user = env.DATABASE_URL.split("//")[1].split(":")[0];
const password = env.DATABASE_URL.split(":")[2].split("@")[0];
const database = env.DATABASE_URL.split("/").slice(-1)[0];

const adapter = new PrismaMariaDb({
  host,
  port,
  user,
  password,
  database,
  connectionLimit: 10,
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

const intrexxAdapter = new PrismaMssql({
  user: env.INTREXX_DATABASE_USER,
  password: env.INTREXX_DATABASE_PASSWORD,
  database: env.INTREXX_DATABASE_NAME,
  server: env.INTREXX_DATABASE_HOST,
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

const pcvisitAdapter = new PrismaMssql({
  user: env.INTREXX_DATABASE_USER,
  password: env.INTREXX_DATABASE_PASSWORD,
  database: env.PCVISIT_DATABASE_NAME,
  server: env.INTREXX_DATABASE_HOST,
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

const createViktorClient = () =>
  new Viktorclient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const createSageClient = () =>
  new Sageclient({
    adapter: sageAdapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const createIntrexxClient = () =>
  new Intrexxclient({
    adapter: intrexxAdapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const createPCVisitClient = () =>
  new PcVisitClient({
    adapter: pcvisitAdapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  viktor: ReturnType<typeof createViktorClient> | undefined;
  sage: ReturnType<typeof createSageClient> | undefined;
  intrexx: ReturnType<typeof createIntrexxClient> | undefined;
  pcvisit: ReturnType<typeof createPCVisitClient> | undefined;
};

export const viktor = globalForPrisma.viktor ?? createViktorClient();
export const sage = globalForPrisma.sage ?? createSageClient();
export const intrexx = globalForPrisma.intrexx ?? createIntrexxClient();
export const pcvisit = globalForPrisma.pcvisit ?? createPCVisitClient();

if (env.NODE_ENV !== "production") globalForPrisma.viktor = viktor;
if (env.NODE_ENV !== "production") globalForPrisma.sage = sage;
if (env.NODE_ENV !== "production") globalForPrisma.intrexx = intrexx;
if (env.NODE_ENV !== "production") globalForPrisma.pcvisit = pcvisit;
