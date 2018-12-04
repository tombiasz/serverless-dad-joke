const { DadJokeService } = require('../../src/dadJoke/dadJokeService');

describe('DadJokeService', () => {
  test('getJoke should return joke', () => {
    const dadJokeService = new DadJokeService();
    expect(dadJokeService.getJoke()).toBe('not a funny joke');
  });
});
