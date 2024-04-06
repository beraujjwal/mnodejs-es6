'use strict';
import autoBind from '../../system/autobind';
import { validation } from './validation';

class resourceValidation extends validation {
  /**
   * Resource validation constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    autoBind(this);
  }

  async create(req, res, next) {
    const validationRule = {
      parent: 'string|exists:Resource,_id',
      name: 'required|string',
    };
    return await this.validate(req, res, next, validationRule);
  }

  async update(req, res, next) {
    const validationRule = {
      parent: 'string|exists:Resource,_id',
      name: 'required|string',
      status: 'required|boolean',
    };
    return await this.validate(req, res, next, validationRule);
  }
}
export default new resourceValidation();
