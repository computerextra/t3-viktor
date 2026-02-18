import { env } from "@/env";
import Github from "@auth/core/providers/github";
import type { Profile } from "@auth/core/types";
import type { StartAuthJSConfig } from "start-authjs";

declare module "@auth/core/types" {
  export interface Session {
    admin: boolean;
    user: {
      name: string;
      email: string;
      sub: string;
      email_verified: boolean;
    } & Profile;
    account: {
      access_token: string;
    };
    expires: Date;
  }
}

export const authConfig: StartAuthJSConfig = {
  secret: env.AUTH_SECRET,
  providers: [Github],
  basePath: "/api/auth",
};
