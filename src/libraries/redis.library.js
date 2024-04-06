'use strict'
import 'dotenv/config';

//const chalk = (await import('chalk')).default

import { redisClient } from '../helpers/redis';
const log = console.log;

if(redisClient) {
    redisClient.connect().catch((err)=> {
        log(/*chalk.white.bgRed.bold*/('✘ Redis client setup process failed!'));
    });
}

export const set = async (key, value, timeout = '5m') => {
    try {
        await redisClient.set(key, value, redisClient.print);
        await redisClient.expire(key, getExpiresInTime(timeout));
        return true;
    } catch (ex) {
        console.log(ex);
        return true;
    }
};

export const setValue = async (key, value, timeout = '5m') => {
    try {
        await redisClient.set(key, value, redisClient.print);
        await redisClient.expire(key, getExpiresInTime(timeout));
        return true;
    } catch (ex) {
        console.log(ex);
        return true;
    }
};

export const getValue = async (key) => {
    try {
        return await redisClient.get(key, function (err, result) {
            if (err) {
                console.log(err);
            }
            return result;
        });
    } catch (ex) {
        console.log(ex);
    }
};

export const deleteValue = async (key) => {
    try {
        return await redisClient.del(key, function(err, response) {
            if (err) {
                console.log(err);
            }
            return response;
         });
    } catch (ex) {
        console.log(ex);
    }
};

function getExpiresInTime(expiresIn) {
    (expiresIn) ? expiresIn : process.env.JWT_EXPIRES_IN;
    const expiresInInt = parseInt(expiresIn);
    const expiresInString = expiresIn.split(expiresInInt)[1];
    let expiresInTime = expiresInInt
    switch (expiresInString) {
        case 'm':
            expiresInTime = expiresInInt * 60;
            break;
        case 'h':
            expiresInTime = expiresInInt * 60 * 60;
            break;
        case 'd':
            expiresInTime = expiresInInt * 60 * 60 * 24;
            break;

        default:
            expiresInTime = expiresInInt;
            break;
    }
    return expiresInTime;
  }