import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        if (token.role === "ADMIN" || token.role === "USER") {
          session.user.role = token.role;
        }
      }

      if (session.user && token.email) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.username;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.picture = existingUser.image;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
