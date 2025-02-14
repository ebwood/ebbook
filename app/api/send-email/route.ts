"use server";

import { Resend } from "resend";
import Email from "@/components/Email";
import config from "@/lib/config";

const resend = new Resend(config.env.resend.token);

export const sendEmail = async (
  from: string,
  to: string[],
  subject: string,
  message: string
) => {
  const url = `${config.env.prodApiEndpoint}`;
  await resend.emails.send({
    from: from,
    to: to,
    subject: subject,
    react: Email({ url: url, message: message }),
  });
};
