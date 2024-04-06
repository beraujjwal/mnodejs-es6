'use strict';
import 'dotenv/config';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { URL } from 'url';

import { baseError } from '../system/core/error/baseError';
import { config, defaultMail } from '../config/mail.config';

//const __filename = new URL('', import.meta.url).pathname;
//const __dirname = new URL('.', import.meta.url).pathname;

const viewPath =  path.resolve(__dirname, '../resources/templates/views/');
const partialsPath = path.resolve(__dirname, '../resources/templates/partials');


export const sendMail = function (mailOptions) {
  mailOptions = { ...defaultMail, ...mailOptions };

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(config);

  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.handlebars',
      // partialsDir: viewPath,
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
    },
    viewPath: viewPath,
    extName: '.handlebars',
  }))

  // send mail with defined transport object
  // visit https://nodemailer.com/ for more options
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) return console.log(error);
    console.debug('mail sent:', info.response);
  });
};
