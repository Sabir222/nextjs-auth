"use server";

import { SignUpSchema } from "@/schemas";
import * as z from "zod";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  return { sucess: "Valid Fields" };
};
