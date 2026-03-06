import { env } from "@/env";
import { PrismaClient as Viktorclient } from "../../generated/viktor/client";
import { PrismaClient as Sageclient } from "../../generated/sage/client";
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

const globalForPrisma = globalThis as unknown as {
  viktor: ReturnType<typeof createViktorClient> | undefined;
  sage: ReturnType<typeof createSageClient> | undefined;
};

export const viktor = globalForPrisma.viktor ?? createViktorClient();
export const sage = globalForPrisma.sage ?? createSageClient();

if (env.NODE_ENV !== "production") globalForPrisma.viktor = viktor;
if (env.NODE_ENV !== "production") globalForPrisma.sage = sage;
