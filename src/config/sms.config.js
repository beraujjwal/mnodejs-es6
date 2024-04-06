'use strict'
import 'dotenv/config';

export const config = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  verifySid: process.env.TWILIO_VERIFY_SID,
};
