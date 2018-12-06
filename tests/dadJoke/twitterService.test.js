const Twitter = require('twitter');
const { TwitterService } = require('../../src/dadJoke/twitterService');

jest.mock('twitter');

const consumerKey = 'consumerKey';
const consumerSecret = 'consumerSecret';
const accessTokenKey = 'accessTokenKey';
const accessTokenSecret = 'accessTokenSecret';
const config = {
  consumerKey,
  consumerSecret,
  accessTokenKey,
  accessTokenSecret,
};

const screenName = 'foobar';
const tweetId = '23123123';
const tweet = {
  id_str: tweetId,
  user: {
    screen_name: screenName,
  },
};

describe('TwitterService', () => {
  test('constructor should call Twitter', () => {
    const twitterService = new TwitterService(config);
    expect(Twitter).toHaveBeenCalledWith({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret,
    });
    expect(twitterService.twitter).toBeInstanceOf(Twitter);
  });

  test('buildFromEnvVars should call constructor with proper config', () => {
    const env = {
      TWITTER_CONSUMER_KEY: consumerKey,
      TWITTER_CONSUMER_SECRET: consumerSecret,
      TWITTER_ACCESS_TOKEN_KEY: accessTokenKey,
      TWITTER_ACCESS_TOKEN_SECRET: accessTokenSecret,
    };
    const twitterService = TwitterService.buildFromEnvVars(env);
    expect(twitterService).toBeInstanceOf(TwitterService);
    expect(Twitter).toHaveBeenCalledWith({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret,
    });
    expect(twitterService.twitter).toBeInstanceOf(Twitter);
  });

  test('postTweet should call twitter post method and return promise', () => {
    const messageToPost = 'test';
    const mockPost = jest.fn(() => Promise.resolve(tweet));
    const twitterService = new TwitterService(config);
    twitterService.twitter.post = mockPost;
    expect(twitterService.postTweet(messageToPost)).resolves.toBe(tweet);
    expect(mockPost)
      .toHaveBeenCalledWith('statuses/update', { status: messageToPost });
  });

  test('buildLinkToTweet should return link to tweeter message', () => {
    const twitterService = new TwitterService(config);
    const received = twitterService.buildLinkToTweet(tweet);
    const expected = `https://twitter.com/${screenName}/status/${tweetId}`;
    expect(received).toBe(expected);
  });
});
