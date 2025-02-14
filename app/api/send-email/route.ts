"use server";

import { Resend } from "resend";
import Email from "@/components/Email";
import config from "@/lib/config";

const resend = new Resend(config.env.resend.token);

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from")!;
  const to = searchParams.get("to")!;
  const subject = searchParams.get("subject")!;
  const message = searchParams.get("message")!;

  const url = `${config.env.prodApiEndpoint}`;
  await resend.emails.send({
    from,
    to,
    subject,
    react: Email({ url: url, message }),
  });
};
