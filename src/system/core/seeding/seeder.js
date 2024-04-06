'use strict'

import fs from 'fs';
import path from 'path';
//import { URL } from 'url';
import { Seeder } from 'mongo-seeding';
import pluralize from 'pluralize';
//import caseChanger from 'case';

//const chalk = (await import('chalk')).default
const log = console.log;

//const __filename = new URL('', import.meta.url).pathname;
//const __dirname = new URL('.', import.meta.url).pathname;

import dbConfig from '../../../config/db.config';
const seederPath = path.resolve(__dirname, '../../../database/seeder/');
const servicePath = path.resolve(__dirname + '/../../../neo4j/services/');

const basename = 'index.js';
const config = {
  database: dbConfig.url,
  inputPath: seederPath,
  dropDatabase: false,
  dropCollections: true,
  databaseReconnectTimeout: 10000,
  mongoClientOptions: undefined,
  bulkWriteOptions: undefined,
};

log('✔ Seeding process started');
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
    seederPath,
    {
      extensions: ['js', 'json', 'ts'],
      //transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
    },
  );
log('✔ Reading collections file done.');

const sedding = [];

fs.readdirSync(servicePath)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  }).forEach(async (file) => {
    let moduleName = file.slice(0, -3);
    sedding[moduleName] = await import(path.join(servicePath, file));
  });

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const main = async () => {
  try {
    log('✔ MongoDB migration started.');
    await seeder.import(collections);
    log('✔ MongoDB migration ended.');
    log('✔ Neo4j migration started.');

    await collections.forEach( async collection => {
      const singularModelName = pluralize.singular(collection.name);
      const documents = collection.documents;
      const neo4jService = sedding[singularModelName]
      // if(neo4jService) {
      //   log(`✔ Neo4J seeding for ${singularModelName}`);
      //   await documents.forEach( async (document) => {
      //     document.id = document._id;
      //     await neo4jService.create(document);
      //     await sleep(10000);
      //   });
      // }
    });
    log('✔ Seed complete!');
    //process.exit(0);
  } catch (err) {
    console.log(err)
    log('✘ Seeding process failed!');
    //process.exit(0);
  }

};

main();