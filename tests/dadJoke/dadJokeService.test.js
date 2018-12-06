const fetch = require('node-fetch');
const { DadJokeService } = require('../../src/dadJoke/dadJokeService');

jest.mock('node-fetch');

describe('DadJokeService', () => {
  test('makeRequest should fetch', () => {
    const dadJokeService = new DadJokeService();
    dadJokeService.requestJoke();
    expect(fetch).toHaveBeenCalledWith(
      'https://icanhazdadjoke.com/',
      { headers: { Accept: 'application/json' } },
    );
  });

  test('convertToJson should call json', () => {
    const response = {
      json: jest.fn().mockReturnValue('test'),
    };
    const dadJokeService = new DadJokeService();
    dadJokeService.convertToJson(response);
    expect(response.json).toHaveBeenCalledWith();
  });

  test('extractJoke should return joke from json', () => {
    const json = { foo: 'bar', joke: 'test' };
    const dadJokeService = new DadJokeService();
    const joke = dadJokeService.extractJoke(json);
    expect(joke).toBe('test');
  });

  test('getJoke should fetch and extract joke', async () => {
    const requestJoke = jest.fn(() => Promise.resolve());
    const convertToJson = jest.fn(() => Promise.resolve());
    const extractJoke = jest.fn().mockReturnValue('a joke');
    const dadJokeService = new DadJokeService();
    dadJokeService.requestJoke = requestJoke;
    dadJokeService.convertToJson = convertToJson;
    dadJokeService.extractJoke = extractJoke;
    const joke = await dadJokeService.getJoke();
    expect(joke).toBe('a joke');
    expect(requestJoke).toHaveBeenCalled();
    expect(convertToJson).toHaveBeenCalled();
    expect(extractJoke).toHaveBeenCalled();
  });

  test('formatForTwitter should format twitter message', () => {
    const message = 'test';
    const dadJokeService = new DadJokeService();
    const received = dadJokeService.formatForTwitter(message);
    const expected = `${message} #dadJokeBot #noServerNovember #dadJoke @icanhazdadjoke`;
    expect(received).toBe(expected);
  });
});
