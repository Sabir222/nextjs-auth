import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { SignInSchema } from "./schemas";
import { getUserByEmail } from "./lib/user";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFiels = SignInSchema.safeParse(credentials);
        if (validatedFiels.success) {
          const { email, password } = validatedFiels.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const CheckPassword = await bcrypt.compare(password, user.password);
          if (CheckPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
