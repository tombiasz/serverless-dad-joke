const { ValidRequestObject } = require('../../src/common/validRequestObject');
const { SuccessResponseObject } = require('../../src/common/successResponseObject');
const { GetDadJokeMethod } = require('../../src/dadJoke/getDadJokeMethod');

describe('GetDadJokeMethod', () => {
  test('should return successful response', () => {
    const getDadJokeMethod = new GetDadJokeMethod();
    const response = getDadJokeMethod.process(new ValidRequestObject());
    expect(response.type).toBe(SuccessResponseObject.SUCCESS);
    expect(response.value).toBe('not a good joke');
  });
});
