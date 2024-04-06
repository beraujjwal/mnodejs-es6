'use strict'
import 'dotenv/config';

export default {
  url: process.env.NEO4J_HOST,
  username: process.env.NEO4J_USERNAME,
  password: process.env.NEO4J_PASSWORD,
  database: process.env.NEO4J_DATABASE,
};