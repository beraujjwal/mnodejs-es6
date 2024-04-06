'use strict';
import 'dotenv/config';

import { response } from '../../system/core/helpers/apiResponse';
import mongoose from 'mongoose';

export const exceptionHandler = (controllerFunction) => {
  return async (req, res, next) => {
    const session = (process.env.DB_REPLICA_SET) ? await mongoose.startSession() : null;
    try {
      if(process.env.DB_REPLICA_SET) await session.startTransaction();
      const result = await controllerFunction(req, session);
      const resultStructure = {
        code: result.code,
        error: false,
        message: result.message,
        data: result.result
      }
      if(process.env.DB_REPLICA_SET) await session.commitTransaction();
      return res.status(result.code).json(response(resultStructure));
    } catch (error) {
      if(process.env.DB_REPLICA_SET) await session.abortTransaction();
      next(error);
    } finally {
      if(process.env.DB_REPLICA_SET) await session.endSession();
    }
  };
};