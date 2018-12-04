const { Method } = require('../common/method');
const { SuccessResponseObject } = require('../common/successResponseObject');
const { DadJokeService } = require('./dadJokeService');

class GetDadJokeMethod extends Method {
  constructor(dadJokeService = new DadJokeService()) {
    super();
    this.dadJokeService = dadJokeService;
  }

  async processRequest(request) {
    const joke = await this.dadJokeService.getJoke();
    return new SuccessResponseObject(joke);
  }
}

module.exports = {
  GetDadJokeMethod,
};
