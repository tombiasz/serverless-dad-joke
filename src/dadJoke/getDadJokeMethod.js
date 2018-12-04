const { Method } = require('../common/method');
const { SuccessResponseObject } = require('../common/successResponseObject');

class GetDadJokeMethod extends Method {
  processRequest(request) {
    const joke = 'not a good joke';
    return new SuccessResponseObject(joke);
  }
}

module.exports = {
  GetDadJokeMethod,
};
