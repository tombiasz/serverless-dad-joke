const { RequestObject } = require('./requestObject');

class InvalidRequestObject extends RequestObject {
  constructor() {
    super();
    this.errors = [];
  }

  addError(parameter, error) {
    this.errors.push({ parameter, error });
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  isValid() {
    return false;
  }

  static fromValidationErrors(errors) {
    const request = new this();
    errors.forEach(({ dataPath, message }) => {
      request.addError(dataPath, message);
    });
    return request;
  }
}

module.exports = {
  InvalidRequestObject,
};
