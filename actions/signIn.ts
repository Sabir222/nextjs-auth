"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// TODO: update this file in readme and delete todo when finished
import { SignInSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const signin = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Invalid Credentials" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return { error: "Email not verified, confirmation email sent" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { error: undefined, success: "Sign-In successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials", success: undefined };
        default:
          return { error: "Something went wrong!", success: undefined };
      }
    }
    throw error;
  }
};
