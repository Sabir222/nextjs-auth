import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import { getUserByid } from "./lib/user";
//import { getUserByid } from "./lib/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   if (!user || !user.id) {
    //     return false;
    //   }
    //   const CheckUser = await getUserByid(user.id);
    //   if (!CheckUser || !CheckUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      if (user && user.id) {
        const existingUser = await getUserByid(user.id);
        if (!existingUser?.emailVerified) {
          return false;
        }
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
