import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    SAGE_DATABASE_HOST: z.string(),
    SAGE_DATABASE_USER: z.string(),
    SAGE_DATABASE_PASSWORD: z.string(),
    SAGE_DATABASE_NAME: z.string(),
    EMAIL_SERVER_USER: z.string(),
    EMAIL_SERVER_PASSWORD: z.string(),
    EMAIL_SERVER_HOST: z.string(),
    EMAIL_SERVER_PORT: z.coerce.number().int(),
    EMAIL_FROM: z.email(),
    FTP_HOST: z.string(),
    FTP_PORT: z.coerce.number().int().default(21),
    FTP_USER: z.string(),
    FTP_PASSWORD: z.string(),
    FTP_BASE_PATH: z.string(),
    IMAGE_URL: z.url(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SAGE_DATABASE_HOST: process.env.SAGE_DATABASE_HOST,
    SAGE_DATABASE_USER: process.env.SAGE_DATABASE_USER,
    SAGE_DATABASE_PASSWORD: process.env.SAGE_DATABASE_PASSWORD,
    SAGE_DATABASE_NAME: process.env.SAGE_DATABASE_NAME,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_FROM: process.env.EMAIL_FROM,
    FTP_HOST: process.env.FTP_HOST,
    FTP_PORT: process.env.FTP_PORT,
    FTP_USER: process.env.FTP_USER,
    FTP_PASSWORD: process.env.FTP_PASSWORD,
    FTP_BASE_PATH: process.env.FTP_BASE_PATH,
    IMAGE_URL: process.env.IMAGE_URL,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
