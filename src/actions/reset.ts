"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas/index";

import { getUserByEmail } from "@/data/user";

import { generatePasswordResetToken } from "@/lib/tokens";
import { sendReestEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail({ email });

  if (!existingUser) return { error: "Email not found!" };

  const resetToken = await generatePasswordResetToken({ email });

  await sendReestEmail({
    email: resetToken.email,
    token: resetToken.token,
  });

  return { success: "Reset email sent!" };
};
