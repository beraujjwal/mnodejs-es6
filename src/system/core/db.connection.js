'use strict'
import 'dotenv/config';
import db from './model/index';
import dbConfig from '../../config/db.config';

const log = console.log;

const mongoConnectOptions = {
  wtimeoutMS: 2500,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  replicaSet: db.replicaSet,
  user: dbConfig.username,
  pass: dbConfig.password
};


function connectDB(db) {
  try {
    db.mongoose.connect(dbConfig.url, mongoConnectOptions).then(() => {
      if (process.env.APP_ENV !== 'production') {
        log('✔ Connected to database with ', dbConfig.url);
      } else {
        log('✔ Connected to the database!');
      }
    }).catch(err => {
      console.log(err);
      log('✘ Cannot connect to the database with ', dbConfig.url);
      log(`✘ Error: ${err.message}`);
      process.exit();
    });

  } catch (err) {
    console.log(err);
    log('✘ Cannot connect to the database!');
    log(`✘ Error: ${err.message}`);
  }
}

function connectDecorator(func) {
  let cache = new Map();

  return function (db) {
    if (cache.has(db)) {
      return cache.get(db);
    }
    let result = func(db);
    cache.set(db, result);
    return result;
  };
}

connectDB = connectDecorator(connectDB);
connectDB(db);

if (process.env.APP_ENV === 'development') {
  db.mongoose.set('debug', true);
}