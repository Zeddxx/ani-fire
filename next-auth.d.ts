import "@auth/core/jwt";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}
