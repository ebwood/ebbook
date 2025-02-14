import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "./config";


export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ({ email, subject, message }: { email: string, subject: string, message: string; }) => {

  await qstashClient.publishJSON({
    //! 下面的代码使用react-email来发送好看的邮件，但是无效
    // url: `${config.env.prodApiEndpoint}/api/send-email?from=${"ebwood <contact@ebwood.shop>"}&to=${email}&subject=${subject}&message=${message}`,
    api: {
      name: "email",
      provider: resend({ token: config.env.resend.token }),
    },
    body: {
      from: "ebwood <contact@ebwood.shop>",
      to: [email],
      subject,
      message,
      html: message,
    },
  });
};