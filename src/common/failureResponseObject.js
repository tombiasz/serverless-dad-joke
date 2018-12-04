const { ResponseObject } = require('./responseObject');

class FailureResponseObject extends ResponseObject {
  constructor(type, message) {
    super();
    this.type = type;
    this.message = message;
  }

  get value() {
    return { type: this.type, message: this.message };
  }

  isSuccess() {
    return false;
  }

  static get VALIDATION_ERROR() {
    return 'VALIDATION_ERROR';
  }

  static get SYSTEM_ERROR() {
    return 'SYSTEM_ERROR';
  }

  static buildSystemError(message) {
    return new this(this.SYSTEM_ERROR, message);
  }

  static buildValidationError(message) {
    return new this(this.VALIDATION_ERROR, message);
  }

  static buildFromInvalidRequestObject(invalidRequest) {
    const message = invalidRequest.errors.map(({ parameter, error }) => ({ parameter, error }));
    return this.buildValidationError(message);
  }

  static buildFromError(err) {
    const message = `${err.name}: ${err.message}`;
    return this.buildSystemError(message);
  }
}

module.exports = {
  FailureResponseObject,
};
