'use strict'
import 'dotenv/config';

export default {
  secret:
    process.env.JWT_SECRET ||
    'Laid1DP7PxiA6GofhxVw87jWkRsHEnaEPd0vYRg70lT7pxfDODzK0Wc3LDxYYd6W',
};
