'use strict'
import 'dotenv/config';

export default {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
};
