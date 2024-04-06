'use strict'

import express from 'express'
import 'express-router-group';

import rolesController from '../../app/controllers/roles.controller';
import roleValidation from '../../app/validations/role.validation';
import authMiddleware from '../../app/middlewares/auth.middleware';
import aclMiddleware from '../../app/middlewares/acl.middleware';

const router = express.Router();

router.group('/v1.0', (router) => {
  router.get(
    '/roles',
    [authMiddleware.verifyToken, aclMiddleware.hasPermission('read', 'roles')],
    rolesController.rolesList,
  );
  router.group('/role', authMiddleware.verifyToken, (router) => {
    router.post(
      '',
      [aclMiddleware.hasPermission('create', 'roles'), roleValidation.create],
      rolesController.roleStore,
    );

    router.get(
      '/:id',
      [aclMiddleware.hasPermission('read', 'roles')],
      rolesController.roleDetails,
    );

    router.put(
      '/:id',
      [aclMiddleware.hasPermission('update', 'roles'), roleValidation.update],
      rolesController.roleUpdate,
    );

    router.delete(
      '/:id',
      [aclMiddleware.hasPermission('delete', 'roles')],
      rolesController.roleDelete,
    );
  });
});

export default router;
