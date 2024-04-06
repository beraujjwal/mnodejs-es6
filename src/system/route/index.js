'use strict'
import 'dotenv/config';

import { URL } from 'url';
import express from 'express'
import fs from 'fs';
import path from 'path';
//const __filename = new URL('', import.meta.url).pathname;
//const __dirname = new URL('.', import.meta.url).pathname;
const routesPath = __dirname + '/../../routes/';
const basename = 'index.js';

const app = express();

fs.readdirSync(routesPath)
  .filter((file) => {
    if (file.indexOf('.') !== 0 && file.slice(-3) === '.js') {
      return file;
    }

    const innerDirPath = routesPath + file + '/';
    fs.readdirSync(innerDirPath)
      .filter((innerFile) => {
        return innerFile.indexOf('.') !== 0 && innerFile !== basename && innerFile.slice(-3) === '.js';
      })
      .forEach(async(innerFile) => {
        let routeName = await import(path.join(innerDirPath, innerFile));
        app.use(`/${file}/`, routeName.default);
      });
  })
  .forEach(async (file) => {
    //console.log('path.join(routesPath, file)', path.join(routesPath, file))
    //let routeName = await import(path.join(routesPath, file));
    //console.log('routeName-->', (await import(path.join(routesPath, file))).default);
    app.use('/', (await import(path.join(routesPath, file))).default)
  });

export default app;
