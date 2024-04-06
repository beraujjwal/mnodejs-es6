'use strict'
import 'dotenv/config';

import path from 'path';
import { URL } from 'url';

//const __filename = new URL('', import.meta.url).pathname;
//const __dirname = new URL('.', import.meta.url).pathname;

export const config = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  //secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const defaultMail = {
  from: process.env.DEFAULT_EMAIL,
  subject: process.env.DEFAULT_SUBJECT,
  to: process.env.DEFAULT_EMAIL,
  subject: 'Usha Digital',
  template: 'index',
  attachments: [
    { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
  ]
};
