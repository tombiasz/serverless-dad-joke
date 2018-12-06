const { Method } = require('../common/method');
const { SuccessResponseObject } = require('../common/successResponseObject');
const { DadJokeService } = require('./dadJokeService');
const { TwitterService } = require('./twitterService');

class GetDadJokeMethod extends Method {
  constructor(
    dadJokeService = new DadJokeService(),
    twitterService = TwitterService.buildFromEnvVars(process.env),
  ) {
    super();
    this.dadJokeService = dadJokeService;
    this.twitterService = twitterService;
  }

  async processRequest() {
    const joke = await this.dadJokeService.getJoke();
    const jokeFormatted = this.dadJokeService.formatForTwitter(joke);
    const tweet = await this.twitterService.postTweet(jokeFormatted);
    const link = this.twitterService.buildLinkToTweet(tweet);
    return new SuccessResponseObject({ link, joke: jokeFormatted });
  }
}

module.exports = {
  GetDadJokeMethod,
};
