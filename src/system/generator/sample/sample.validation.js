'use strict';
const autoBind = require('auto-bind');
const { validation } = require('./validation');

class VALIDATION_CAMEL_CASE_SINGULAR_FROMValidation extends validation {
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
    };
    return await this.validate(req, res, next, validationRule);
  }

  async update(req, res, next) {
    const validationRule = {
      name: 'required|string',
      status: 'required|boolean',
    };
    return await this.validate(req, res, next, validationRule);
  }
}
module.exports = new VALIDATION_CAMEL_CASE_SINGULAR_FROMValidation();
