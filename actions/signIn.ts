"use server";

// TODO: update this file in readme and delete todo when finished
import { SignInSchema } from "@/schemas";
import * as z from "zod";

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  return { sucess: "Valid Fields" };
};
