'use strict';
import fs from 'fs';;
import util from 'util';
import { baseError } from '../system/core/error/baseError';
import { admin } from '../config/firebase.config';

const log_file = fs.createWriteStream(__dirname + '/../logs/notifications.log', {flags : 'w'});
const log_stdout = process.stdout;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

const notificationOptions = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

export const send = function (fcmTokens, title, message, options) {
    const payload = {
        notification: {
          title: title,
          body: message
        }
    };

    if(!title) title = 'Hello';

    if(!message) message = 'Welcome to MNode';

    let newOptions = {...notificationOptions, ...options}

    if(fcmTokens.length < 1 ) {
    } else {
        admin.messaging().sendToDevice(fcmTokens, payload, newOptions).then( response => {
            return true;
        }).catch( err => {
            console.debug(err.message);
        });
    }
};