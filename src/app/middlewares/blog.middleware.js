'use strict';
import autoBind from '../../system/autobind'
import { middleware } from './middleware';

class blogMiddleware extends middleware {
  /**
   * Middleware constructor
   * @author MNodejs Cli
   * @param null
   */
  constructor() {
    super();
    autoBind(this);
  }

  /**
   *
   * @param {*} action
   * @param {*} module
   * @returns
   */
  sampleFunction(req, res, next) {
    next();
    return;
  }
}

export default new blogMiddleware();
