const { RequestObject } = require('./requestObject');

class ValidRequestObject extends RequestObject {
  static fromObject(obj) {
    throw new Error('not implemented');
  }

  isValid() {
    return true;
  }
}

module.exports = {
  ValidRequestObject,
};
