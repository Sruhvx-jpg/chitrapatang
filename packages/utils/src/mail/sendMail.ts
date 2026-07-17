import { Resend } from 'resend';
import { env } from '../../env';
import {
  sendCodeViaMailSchema,
  SendCodeViaMailParams,
  sendWelcomeMailSchema,
  SendWelcomeMailParams,
} from './model';

const resend = new Resend(env.RESEND_EMAIL_KEY);

export async function SendCodeViaMail(payload: SendCodeViaMailParams) {
  const { receiver, subject, code, para, expiresAt } = await sendCodeViaMailSchema.parseAsync(payload);

  const formattedExpiry = expiresAt instanceof Date
    ? expiresAt.toLocaleString()
    : new Date(expiresAt).toLocaleString();

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #4F46E5; margin-bottom: 20px;">Verification Code</h2>
      <p style="font-size: 16px; line-height: 1.5;">${para}</p>
      <div style="background-color: #F3F4F6; padding: 15px 30px; border-radius: 8px; font-size: 28px; font-weight: bold; letter-spacing: 4px; text-align: center; margin: 25px 0; border: 1px solid #E5E7EB; color: #1F2937;">
        ${code}
      </div>
      <p style="font-size: 14px; color: #6B7280; margin-top: 20px;">
        This code is valid until: <strong style="color: #374151;">${formattedExpiry}</strong>
      </p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: receiver,
    subject,
    html: htmlContent,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function SendWelcomeMail(payload: SendWelcomeMailParams) {
  const { receiver, subject, username } = await sendWelcomeMailSchema.parseAsync(payload);

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #4F46E5; margin-bottom: 20px;">Welcome to Chitrapatang!</h2>
      <p style="font-size: 16px; line-height: 1.5;">Hi <strong>${username}</strong>,</p>
      <p style="font-size: 16px; line-height: 1.5;">
        We're thrilled to have you join our community. Thank you for signing up!
      </p>
      <p style="font-size: 16px; line-height: 1.5;">
        If you have any questions or need assistance, feel free to reply directly to this email.
      </p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 14px; color: #6B7280;">
        Best regards,<br />
        The Chitrapatang Team
      </p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: receiver,
    subject,
    html: htmlContent,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
