'use strict';
import 'dotenv/config';
import { baseError } from '../system/core/error/baseError';
import { config } from '../config/sms.config';

export const sendSMS = function (smsOptions) {
    console.log(smsOptions);
    return true;
};
