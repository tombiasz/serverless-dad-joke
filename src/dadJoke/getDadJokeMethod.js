const { Method } = require('../common/method');
const { SuccessResponseObject } = require('../common/successResponseObject');
const { DadJokeService } = require('./dadJokeService');

class GetDadJokeMethod extends Method {
  constructor(dadJokeService = new DadJokeService()) {
    super();
    this.dadJokeService = dadJokeService;
  }

  processRequest(request) {
    const joke = this.dadJokeService.getJoke();
    return new SuccessResponseObject(joke);
  }
}

module.exports = {
  GetDadJokeMethod,
};
