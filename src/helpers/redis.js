'use strict'
import 'dotenv/config';
import { createClient } from 'redis';

import config from '../config/redis.config';

let redisClient = null;

if(config.host) {
  redisClient = createClient({
    port      : config.port,
    host      : config.host,
    url       : config.url
  });
}

export { redisClient };