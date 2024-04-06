'use strict';
import autoBind from '../../system/autobind';
import { validation } from './validation';

class blogValidation extends validation {
  /**
   * Validation constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    autoBind(this);
  }

  async create(req, res, next) {
    const validationRule = {
      name: 'required|string',
      content: 'required|string',
      publish: 'required|boolean',
    };
    return await this.validate(req, res, next, validationRule);
  }

  async update(req, res, next) {
    const validationRule = {
      name: 'required|string',
      content: 'required|string',
      publish: 'required|boolean',
      status: 'required|boolean',
    };
    return await this.validate(req, res, next, validationRule);
  }
}
export default new blogValidation();
