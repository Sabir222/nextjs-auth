"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";
import db from "@/lib/db";
import { getUserByEmail } from "@/lib/user";

export const newVerificationToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token not found" };
  }
  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User not found" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.user.delete({ where: { id: existingToken.id } });

  return { success: "Email verified successfully" };
};
