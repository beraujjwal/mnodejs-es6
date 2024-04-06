'use strict';
import autoBind from '../../system/autobind';
import { baseValidation } from '../../system/core/validation/baseValidation';

class validation extends baseValidation {
  /**
   * @desc Controller constructor
   *
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    autoBind(this);
  }
}

export { validation };
