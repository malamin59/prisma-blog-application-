import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./mailer";
import { emailVerificationTemplate } from "./emailTemplates";


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.APP_URL!],
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "USER" },
      phone: { type: "string" },
      status: { type: "string", defaultValue: "ACTIVE" },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: emailVerificationTemplate({
          name: user.name,
          verificationUrl,
        }),
      });
    },
  },
});
