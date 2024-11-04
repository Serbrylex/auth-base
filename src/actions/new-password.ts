"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas/index";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) return { error: "Missing token!" };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid password!",
    };
  }

  const existingToken = await getPasswordResetTokenByToken({ token });

  if (!existingToken) {
    return { error: "Invalid token!" };
  }
  
  const hasExpired = new Date() > existingToken.expires;

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail({ email: existingToken.email });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated!" };
};
