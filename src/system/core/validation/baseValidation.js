'use strict';
import autoBind from '../../autobind';
import { index as base } from '../base/index';

import { validator } from '../helpers/validate';
import { validationError } from'../helpers/apiResponse';

class baseValidation extends base {
  /**
   * Base Controller Layer
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    autoBind(this);
  }

  async validate(req, res, next, validationRule, customMessages = {}) {
    await validator(req.body, validationRule, customMessages, async(err, status) => {
      if (!status) {
        return res.status(412).json(validationError(err));
      } else {
        next();
      }
    });
  }
}

export { baseValidation };