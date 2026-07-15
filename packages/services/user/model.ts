import { z } from "zod";

export const registerUserInputModel = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type registerUserInputType = z.infer<typeof registerUserInputModel>;

export const registerUserOutputModel = z.object({
  user: z.object({
    id: z.string().uuid(),
    fullName: z.string(),
    email: z.string(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type registerUserOutputType = z.infer<typeof registerUserOutputModel>;
