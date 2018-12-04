const { ValidRequestObject } = require('../../src/common/validRequestObject');
const { SuccessResponseObject } = require('../../src/common/successResponseObject');
const { GetDadJokeMethod } = require('../../src/dadJoke/getDadJokeMethod');

const dadJokeService = {
  getJoke: jest.fn().mockReturnValue('a joke'),
};

describe('GetDadJokeMethod', () => {
  test('should return successful response', () => {
    const getDadJokeMethod = new GetDadJokeMethod(dadJokeService);
    const response = getDadJokeMethod.process();
    expect(response.type).toBe(SuccessResponseObject.SUCCESS);
    expect(response.value).toBe('a joke');
  });

  test('should get joke from service', () => {
    const getDadJokeMethod = new GetDadJokeMethod(dadJokeService);
    getDadJokeMethod.process();
    expect(dadJokeService.getJoke).toHaveBeenCalledWith();
  });
});
