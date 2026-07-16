import { z } from 'zod';

export const sendCodeViaMailSchema = z.object({
  receiver: z.string().email(),
  subject: z.string().default('mail from chitrapatang'),
  code: z.string().regex(/^[a-zA-Z0-9]{4,8}$/, 'Code must be between 4 and 8 alphanumeric characters.'),
  para: z.string(),
  expiresAt: z.union([z.instanceof(Date), z.string(), z.number()]),
});

export type SendCodeViaMailParams = z.input<typeof sendCodeViaMailSchema>;

export const sendWelcomeMailSchema = z.object({
  receiver: z.string().email(),
  subject: z.string().default('Welcome to chitrapatang'),
  username: z.string(),
});

export type SendWelcomeMailParams = z.input<typeof sendWelcomeMailSchema>;
