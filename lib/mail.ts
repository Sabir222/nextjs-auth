import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "mail@sabirkoutabi.tech",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email</p>`,
  });
};
