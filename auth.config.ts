import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/validation";
import { getUserByEmail } from "./data/user";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
