import * as nodemailer from 'nodemailer';

import Mail from 'nodemailer/lib/mailer';
import { config } from '../../config/environment.config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type EmailOptions = {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    attachments?: Mail.Attachment[];
  };

// options for create a nodemailer tranporter
const transport: SMTPTransport | SMTPTransport.Options | string = {
  //pool: true,
  host: config.smtpHost,
  port: Number(config.smtpPort),
  secure: true,
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
};

export const transporter = nodemailer.createTransport(transport);