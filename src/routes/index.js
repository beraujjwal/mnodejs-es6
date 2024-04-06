'use strict';

import express from 'express';

const app = express();

//import permissions from './permissions';
//import resources from './resources';
//import roles from './roles';
import users from './users';

//router.use('/', permissions);
//router.use('/', resources);
//router.use('/', roles);
app.use('/', users);

export default app;