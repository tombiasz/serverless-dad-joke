const { SuccessResponseObject } = require('../../src/common/successResponseObject');
const { GetDadJokeMethod } = require('../../src/dadJoke/getDadJokeMethod');

const joke = 'a joke';
const jokeFormatted = `${joke} formatted`;
const dadJokeService = {
  getJoke: jest.fn(() => Promise.resolve(joke)),
  formatForTwitter: jest.fn().mockReturnValue(jokeFormatted),
};

const screenName = 'foobar';
const tweetId = '23123123';
const linkToTweet = 'https://link';
const tweet = { id_str: tweetId, user: { screen_name: screenName } };

const twitterService = {
  postTweet: jest.fn(() => Promise.resolve(tweet)),
  buildLinkToTweet: jest.fn().mockReturnValue(linkToTweet),
};

describe('GetDadJokeMethod', () => {
  let getDadJokeMethod = null;
  beforeEach(() => {
    getDadJokeMethod = new GetDadJokeMethod(dadJokeService, twitterService);
  });

  test('should return successful response', async () => {
    const response = await getDadJokeMethod.process();
    expect(response.type).toBe(SuccessResponseObject.SUCCESS);
    expect(response.value).toEqual({ joke: jokeFormatted, link: linkToTweet });
  });

  test('should get joke from service', async () => {
    await getDadJokeMethod.process();
    expect(dadJokeService.getJoke).toHaveBeenCalledWith();
  });

  test('should format joke for twitter', async () => {
    await getDadJokeMethod.process();
    expect(dadJokeService.formatForTwitter).toHaveBeenCalledWith(joke);
  });

  test('should post joke to twitter', async () => {
    await getDadJokeMethod.process();
    expect(twitterService.postTweet).toHaveBeenCalledWith(jokeFormatted);
  });

  test('should get tweet url', async () => {
    await getDadJokeMethod.process();
    expect(twitterService.buildLinkToTweet).toHaveBeenCalledWith(tweet);
  });
});
