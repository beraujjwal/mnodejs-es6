'use strict'

import express from 'express'
import 'express-router-group';

import permissionsController from '../app/controllers/permissions.controller';
import permissionValidation from '../app/validations/permission.validation';
import authMiddleware from '../app/middlewares/auth.middleware';
import aclMiddleware from '../app/middlewares/acl.middleware';

import { exceptionHandler } from '../app/middlewares/exceptionHandler.middleware';

const router = express.Router();

router.group('/v1.0', (router) => {
  router.get(
    '/permissions',
    /*[
      authMiddleware.verifyToken,
      aclMiddleware.hasPermission('read', 'permissions'),
    ],*/
    exceptionHandler(permissionsController.permissionList)
  );
  router.group('/permission', /*authMiddleware.verifyToken,*/ (router) => {
    router.post(
      '',
      /*[
        aclMiddleware.hasPermission('create', 'permissions'),
        permissionValidation.create,
      ],*/
      exceptionHandler(permissionsController.permissionStore)
    );

    router.get(
      '/:id',
      [aclMiddleware.hasPermission('read', 'permissions')],
      exceptionHandler(permissionsController.permissionDetails)
    );

    router.put(
      '/:id',
      [
        aclMiddleware.hasPermission('update', 'permissions'),
        permissionValidation.update,
      ],
      exceptionHandler(permissionsController.permissionUpdate)
    );

    router.delete(
      '/:id',
      [aclMiddleware.hasPermission('delete', 'permissions')],
      exceptionHandler(permissionsController.permissionDelete)
    );
  });
});

export default router;
