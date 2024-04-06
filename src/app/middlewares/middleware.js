'use strict';
import autoBind from '../../system/autobind'

import {
  baseMiddleware,
} from '../../system/core/middleware/baseMiddleware';

class middleware extends baseMiddleware {
  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    autoBind(this);
  }
}

export { middleware };
