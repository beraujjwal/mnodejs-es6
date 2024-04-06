'use strict'
import 'dotenv/config';

const authMechanism = 'DEFAULT';
const qString = `retryWrites=true&w=majority&authMechanism=${authMechanism}`;

let dbUserPass = '';
if(process.env.DB_USERNAME && process.env.DB_PASSWORD) dbUserPass = `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`;
if(process.env.DB_REPLICA_SET) qString = '&replicaSet=' + process.env.DB_REPLICA_SET;

export default {
  url: `${process.env.DB_CONNECTION}://${dbUserPass}${process.env.DB_HOST}/${process.env.DB_NAME}?${qString}`,
  host: process.env.DB_HOST || 'localhost',
  post: process.env.DB_PORT || '27017',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME || 'mnodejs',
  replicaSet: process.env.DB_REPLICA_SET
};

