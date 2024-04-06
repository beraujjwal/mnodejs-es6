'use strcit';


class validationError extends Error {

  /**
   * HTTP Error Class
   * @param error
   */
  constructor( error ) {

    super(error);

    Error.captureStackTrace(this, this.constructor);
    this.code = 412;
    this.status = false
    this.message = 'Validation Error';
    this.errors = error;
    this.name = 'PRECONDITION_FAILED';
  }
}


export { validationError }
