"use server";

import { SignUpSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { getUserByEmail } from "@/lib/user";

//TODO: update this file in readme and delete todo when finished
export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const findUser = await getUserByEmail(email);
  if (findUser) {
    return { error: "User Already Exists" };
  }
  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return { sucess: "Account Created" };
};
