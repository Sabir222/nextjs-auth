"use server";

import { SignUpSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const findUser = await getUserByEmail(email);
  if (findUser) {
    return { error: "User Already Exists" };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { sucess: "Created,Confirmation email sent" };
};
