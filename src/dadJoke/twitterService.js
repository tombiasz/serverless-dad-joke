const Twitter = require('twitter');

const TWITTER_STATUS_UPDATE_ENDPOINT = 'statuses/update';

class TwitterService {
  constructor({
    consumerKey,
    consumerSecret,
    accessTokenKey,
    accessTokenSecret,
  }) {
    this.twitter = new Twitter({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret,
    });
  }

  buildLinkToTweet({ id_str: tweetId, user: { screen_name: screenName } }) {
    return `https://twitter.com/${screenName}/status/${tweetId}`;
  }

  postTweet(message) {
    return this.twitter.post(
      TWITTER_STATUS_UPDATE_ENDPOINT,
      { status: message },
    );
  }

  static buildFromEnvVars({
    TWITTER_CONSUMER_KEY: consumerKey,
    TWITTER_CONSUMER_SECRET: consumerSecret,
    TWITTER_ACCESS_TOKEN_KEY: accessTokenKey,
    TWITTER_ACCESS_TOKEN_SECRET: accessTokenSecret,
  }) {
    return new this({
      consumerKey,
      consumerSecret,
      accessTokenKey,
      accessTokenSecret,
    });
  }
}

module.exports = {
  TwitterService,
};
