const { FailureResponseObject } = require('./failureResponseObject');

class Method {
  processRequest(request) {
    throw new Error('not implemented');
  }

  async process(request) {
    if (request && !request.isValid()) {
      return FailureResponseObject.buildFromInvalidRequestObject(request);
    }

    try {
      return await this.processRequest(request);
    } catch (err) {
      return FailureResponseObject.buildFromError(err);
    }
  }
}

module.exports = {
  Method,
};
