'use strict'
import 'dotenv/config';

import { sendSMS } from '../helpers/sms';


export const sentOTPSMS = function (email, token) {
    try {
        const smsOptions = {
            otpCode: 100533
        };

        sendSMS(smsOptions);
    } catch (ex) {
        console.log(ex);
    }
};