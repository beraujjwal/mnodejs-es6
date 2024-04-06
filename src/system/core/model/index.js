'use strict'
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import pluralize from 'pluralize';
import changeCase from 'case';

import dbConfig from '../../../config/db.config';

//const __filename = new URL('', import.meta.url).pathname;
//const __dirname = new URL('.', import.meta.url).pathname;
const modelsPath = __dirname + '/../../../models/';
const basename = 'index.js';

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.trans = mongoose.connection;

//(async() => {
  fs.readdirSync(modelsPath)
    .filter( async(file) => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      );
    })
    .forEach(async(file) => {
      let modelName = changeCase.pascal(pluralize.singular(file.slice(0, -8)));
      db[modelName] = (await import(path.join(modelsPath, file))).default //await import(path.join(modelsPath, file))
    });
//})();
export default db;
