import { z } from "zod";

export const registerUserInputModel = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type registerUserInputType = z.infer<typeof registerUserInputModel>;

export const registerUserOutputModel = z.object({
  id: z.string().uuid(),
  username: z.string(),
});

export type registerUserOutputType = z.infer<typeof registerUserOutputModel>;

export const loginUserInputModel = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type loginUserInputType = z.infer<typeof loginUserInputModel>;

export const loginUserOutputModel = z.object({
  emailVerified: z.boolean(),
  fullName: z.string(),
  email: z.string(),
});

export type loginUserOutputType = z.infer<typeof loginUserOutputModel>;

export const verifyEmailInputModel = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(4, "Verification code must be exactly 4 digits"),
});

export type verifyEmailInputType = z.infer<typeof verifyEmailInputModel>;

export const verifyEmailOutputModel = z.object({
  fullName: z.string(),
  email: z.string(),
});

export type verifyEmailOutputType = z.infer<typeof verifyEmailOutputModel>;
