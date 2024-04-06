'use strict'

import express from 'express'
import 'express-router-group';

import resourcesController from '../../app/controllers/resources.controller';
import resourceValidation from '../../app/validations/resource.validation';
import authMiddleware from '../../app/middlewares/auth.middleware';
import aclMiddleware from '../../app/middlewares/acl.middleware';

const router = express.Router();

router.group('/v1.0', (router) => {
  router.get(
    '/resources',
    [
      authMiddleware.verifyToken,
      aclMiddleware.hasPermission('read', 'resources'),
    ],
    resourcesController.resourcesList,
  );
  router.group('/resource', authMiddleware.verifyToken, (router) => {
    router.post(
      '',
      [
        aclMiddleware.hasPermission('create', 'resources'),
        resourceValidation.create,
      ],
      resourcesController.resourceStore,
    );

    router.get(
      '/:id',
      [aclMiddleware.hasPermission('read', 'resources')],
      resourcesController.resourceDetails,
    );

    router.put(
      '/:id',
      [
        aclMiddleware.hasPermission('update', 'resources'),
        resourceValidation.update,
      ],
      resourcesController.resourceUpdate,
    );

    router.delete(
      '/:id',
      [aclMiddleware.hasPermission('delete', 'resources')],
      resourcesController.resourceDelete,
    );
  });
});

export default router;
