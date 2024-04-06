'use strict';
import autoBind from '../../system/autobind';
import { baseController } from '../../system/core/controller/baseController';

class controller extends baseController {
  /**
   * @desc Controller constructor
   *
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service) {
    super(service);
    autoBind(this);
  }
}

export { controller };
