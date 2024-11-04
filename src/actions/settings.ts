"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

import { SettingsSchema } from "@/schemas";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized!" };
  }

  const userRecord = await getUserById({ id: user.id as string });
  if (!userRecord) {
    return { error: "Unauthorized!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== userRecord.email) {
    const existingUser = await db.user.findFirst({
      where: {
        email: values.email,
      },
    });

    if (existingUser && existingUser.id !== userRecord.id) {
      return {
        error: "Email already exists!",
      };
    }

    const verificationToken = await generateVerificationToken({
      email: values.email,
    });

    await sendVerificationEmail({
      email: values.email,
      token: verificationToken.token,
    });

    return { success: "Verification email sent!" }
  }

  if (values.password && values.newPassword && userRecord.password) {
    const passwordsMatch = await bcrypt.compare(values.password, userRecord.password);
    if (!passwordsMatch) {
      return {
        error: "Current password is incorrect!",
      };
    }
    
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: userRecord.id,
    },
    data: {
      ...values,
    },
  });

  return {
    success: "Settings updated!",
  };
};
