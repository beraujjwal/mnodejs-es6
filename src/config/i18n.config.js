'use strict'
import 'dotenv/config';
import i18n from 'i18n';
//import path from 'path';
//import { fileURLToPath } from 'url';

import { URL } from 'url';

//const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
//const __dirname = path.dirname(__filename); // get the name of the directory

//const __filename = new URL('', import.meta.url).pathname;
//const __dirname = new URL('.', import.meta.url).pathname;

i18n.configure({
    // setup some locales
    locales:['en', 'bn', 'hi'],
    defaultLocale: 'bn',
    queryParameter: 'lang',
    // where to store json files
    directory: __dirname + '/../resources/locales',
    /*api: {
        '__': 'translate',
        '__n': 'translateN'
    },*/
    register: global
});

export default async function(req, res, next) {
    const headres = req.headers;
    i18n.init(req, res);
    const lang = headres['accept-language'] || 'en';
    i18n.setLocale(lang);
    return next();
};