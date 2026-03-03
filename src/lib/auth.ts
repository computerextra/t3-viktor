import { env } from "@/env";
import Github from "@auth/core/providers/github";
import type { StartAuthJSConfig } from "start-authjs";

declare module "@auth/core/types" {
  export interface Session {
    admin: boolean;
    user: {
      id: string;
      name: string;
      email: string;
      sub: string;
      email_verified: boolean;
    } & Profile;
    account: {
      access_token: string;
    };
    expires: string;
  }
}

export const authConfig: StartAuthJSConfig = {
  secret: env.AUTH_SECRET,
  providers: [Github],
  basePath: "/api/auth",
};
