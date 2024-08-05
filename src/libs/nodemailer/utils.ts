import Mail from 'nodemailer/lib/mailer';
import boom from '@hapi/boom';

import { EmailOptions, transporter } from './types';
import { config } from '../../config/environment.config';

export async function sendEmail(
  data: EmailOptions,
): Promise<any> {
  try {
    const options: Mail.Options = {
      ...data,
      from: config.emailFrom,
    };

    await transporter.sendMail(options);
  } catch (error) {
    throw boom.badRequest(error);
  }
}