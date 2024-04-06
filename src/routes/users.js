'use strict'

import express from 'express'
import 'express-router-group';

import usersController from '../app/controllers/users.controller';
import authController from '../app/controllers/auth.controller';
import userValidation from '../app/validations/user.validation';
import authMiddleware from '../app/middlewares/auth.middleware';
import aclMiddleware from '../app/middlewares/acl.middleware';

import { exceptionHandler } from '../app/middlewares/exceptionHandler.middleware';

const router = express.Router();

router.group('/v1.0', (versionRouter) => {

  versionRouter.group('/auth', (authRouter) => {

    authRouter.post('/sign-up', [userValidation.signup], exceptionHandler(authController.register));
    authRouter.post('/sign-in', [userValidation.signin], exceptionHandler(authController.login));
    authRouter.post('/otp-resend', [userValidation.signin], exceptionHandler(authController.otpResend));
    authRouter.post('/otp-verify', [userValidation.signin], exceptionHandler(authController.otpVerify));
    authRouter.post('/email-verify', exceptionHandler(authController.emailVerify));
    authRouter.post('/phone-verify',  exceptionHandler(authController.phoneVerify));

    authRouter.post(
      '/forgot-password',
      [userValidation.forgotPassword],
      exceptionHandler(authController.forgotPassword)
    );

    authRouter.post(
      '/reset-password',
      [userValidation.forgotPassword],
      exceptionHandler(authController.resetPassword)
    );
  });

  versionRouter.get('/profile', authMiddleware.verifyiNCompletedToken, exceptionHandler(usersController.profile));

  versionRouter.put(
    '/profile',
    [authMiddleware.verifyiNCompletedToken, userValidation.profile],
    exceptionHandler(usersController.updateProfile)
  );

  versionRouter.post(
    '/change-password',
    [authMiddleware.verifyiNCompletedToken, userValidation.changePassword],
    exceptionHandler(usersController.changePassword)
  );

  versionRouter.post('/create-carrier-user', exceptionHandler(usersController.createNewCarrierUser));

  // versionRouter.post(
  //   '/:role/user',
  //   [authMiddleware.verifyToken, aclMiddleware.hasPermission('create', 'users')],
  //   exceptionHandler(usersController.userStore)
  // );

  // versionRouter.get(
  //   '/:role/user/:id',
  //   [authMiddleware.verifyToken, aclMiddleware.hasPermission('read', 'users')],
  //   exceptionHandler(usersController.userDetails)
  // );

  // versionRouter.put(
  //   '/:role/user/:id',
  //   [authMiddleware.verifyToken, aclMiddleware.hasPermission('update', 'users')],
  //   exceptionHandler(usersController.userUpdate)
  // );

  // versionRouter.delete(
  //   '/:role/user/:id',
  //   [authMiddleware.verifyToken, aclMiddleware.hasPermission('delete', 'users')],
  //   exceptionHandler(usersController.userDelete)
  // );


  // versionRouter.get(
  //   '/:role/users',
  //   [authMiddleware.verifyToken, aclMiddleware.hasPermission('read', 'users')],
  //   exceptionHandler(usersController.userList)
  // );


});

export default router;
