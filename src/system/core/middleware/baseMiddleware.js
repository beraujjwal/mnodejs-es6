'use strict';
import autoBind from '../../autobind';
import { index as base } from '../base/index';

class baseMiddleware extends base {
  /**
   * Base Controller Layer
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    autoBind(this);
  }
}

export { baseMiddleware };
