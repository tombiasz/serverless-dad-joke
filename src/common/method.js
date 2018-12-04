const { FailureResponseObject } = require('./failureResponseObject');

class Method {
  processRequest(request) {
    throw new Error('not implemented');
  }

  process(request) {
    if (!request.isValid()) {
      return FailureResponseObject.buildFromInvalidRequestObject(request);
    }

    try {
      return this.processRequest(request);
    } catch (err) {
      return FailureResponseObject.buildFromError(err);
    }
  }
}

module.exports = {
  Method,
};
