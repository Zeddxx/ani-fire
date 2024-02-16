import NextAuth from "next-auth";
import { getUserById } from "./data/user";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
        // if(account?.provider !== "credentials") return true;

        const existingUser = await getUserById(user.id!)
        if(!existingUser) return false;

        return true
    },
    async session({ token, session }) {
        if(token.sub && session.user) {
            session.user.id = token.sub;
        }

        if(token.sub && session.user) {
          session.user.name = token.name
        }
        return session;
    },
    async jwt({ token, user, account }) {
        if(!token.sub) return token;

        const existingUser = await getUserById(token.sub)

        if(!existingUser) return token;

        return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
});
