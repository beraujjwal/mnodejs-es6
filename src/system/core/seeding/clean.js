'use strict'

import fs from 'fs';
import caseChanger from 'case';
import db from '../model/index';

const log = console.log;
const modelsPath = __dirname + '/../../../models';

// Loop models path and loads every file as a model except index file
const models = fs.readdirSync(modelsPath).filter((file) => {
  return (
    file.indexOf('.') !== 0 && file !== 'index' && file.slice(-3) === '.js'
  );
});

const deleteModelFromDB = (model) => {
  return new Promise((resolve, reject) => {
    let pascalSingularModelName = caseChanger.pascal(model.slice(0, -9));
    db[pascalSingularModelName].deleteMany({}, (err, row) => {
      if (err) {
        reject(err);
      } else {
        log(
          `✔ Cleanup for ${pascalSingularModelName} complete!`,
        );
        resolve(row);
      }
    });
  });
};

const clean = async () => {
  try {
    const promiseArray = models.map(async (model) => {
      await deleteModelFromDB(model);
    });
    await Promise.all(promiseArray);

    log('✔ Cleanup for all connections complete!');
    process.exit(0);
  } catch (err) {
    process.exit(0);
  }
};

clean();
