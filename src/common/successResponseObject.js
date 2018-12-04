const { ResponseObject } = require('./responseObject');

class SuccessResponseObject extends ResponseObject {
  constructor(value = '') {
    super();
    this.type = this.constructor.SUCCESS;
    this.value = value;
  }

  isSuccess() {
    return true;
  }

  static get SUCCESS() {
    return 'SUCCESS';
  }
}

module.exports = {
  SuccessResponseObject,
};
