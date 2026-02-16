import { env } from "@/env";
import { PrismaClient as ViktorClient } from "../../generated/viktor";
import { PrismaClient as SageClient } from "../../generated/sage";

const createClient = () =>
  new ViktorClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });


const createSageClient = () => new SageClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
})

const globalForPrisma = globalThis as unknown as {
  db: ReturnType<typeof createClient> | undefined;
  sage_db: ReturnType<typeof createSageClient> | undefined;
};

export const db = globalForPrisma.db ?? createClient();
export const sageDb = globalForPrisma.sage_db ?? createSageClient();

if (env.NODE_ENV !== "production") globalForPrisma.db = db;
if (env.NODE_ENV !== "production") globalForPrisma.sage_db = sageDb;
