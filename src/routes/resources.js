'use strict'

import express from 'express'
import 'express-router-group';

import resourcesController from '../app/controllers/resources.controller';
import resourceValidation from '../app/validations/resource.validation';
import authMiddleware from '../app/middlewares/auth.middleware';
import aclMiddleware from '../app/middlewares/acl.middleware';

import { exceptionHandler } from '../app/middlewares/exceptionHandler.middleware';

const router = express.Router();

router.group('/v1.0', (router) => {
  router.get( '/resources', exceptionHandler(resourcesController.resourcesList) );

  router.group('/resource', (router) => {
    router.post(
      '',
      [
        aclMiddleware.hasPermission('create', 'resources'),
        resourceValidation.create,
      ],
      exceptionHandler(resourcesController.resourceStore)
    );

    router.get(
      '/:id',
      [aclMiddleware.hasPermission('read', 'resources')],
      exceptionHandler(resourcesController.resourceDetails)
    );

    router.put(
      '/:id',
      [
        aclMiddleware.hasPermission('update', 'resources'),
        resourceValidation.update,
      ],
      exceptionHandler(resourcesController.resourceUpdate)
    );

    router.patch(
      '/:id',
      [
        aclMiddleware.hasPermission('update', 'resources')
      ],
      exceptionHandler(resourcesController.resourceStatusUpdate)
    );

    router.delete(
      '/:id',
      [aclMiddleware.hasPermission('delete', 'resources')],
      exceptionHandler(resourcesController.resourceDelete)
    );
  });
});

export default router;
