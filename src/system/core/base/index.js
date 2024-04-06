'use strict'
import 'dotenv/config';

import autoBind from '../../autobind';
import db from '../model/index';


class index {

  /**
   * Base Controller Layer
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    this.db = db;
    this.models = db.trans.models
    this.env = process.env;
    //console.log('this.db', this.db);
    autoBind(this);

  }


}

export { index };
