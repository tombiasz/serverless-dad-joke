const { InvalidRequestObject } = require('../../src/common/invalidRequestObject');

describe('InvalidRequestObject', () => {
  test('should accept errors', () => {
    const request = new InvalidRequestObject();
    request.addError('param1', 'error1');
    request.addError('param2', 'error2');

    expect(request.hasErrors).toBeTruthy();
    expect(request.errors.length).toBe(2);
  });

  test('should be false', () => {
    const request = new InvalidRequestObject();
    expect(request.isValid()).toBeFalsy();
  });

  test('fromValidationErrors should return instance with errors set', () => {
    const errors = [
      { dataPath: 'foo', message: 'bar' },
      { dataPath: 'fizz', message: 'buzz' },
    ];
    const request = InvalidRequestObject.fromValidationErrors(errors);
    expect(request.isValid()).toBeFalsy();
    expect(request.hasErrors()).toBeTruthy();
    expect(request.errors.length).toBe(2);
  });
});
