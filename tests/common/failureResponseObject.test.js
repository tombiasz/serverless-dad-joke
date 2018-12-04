const { InvalidRequestObject } = require('../../src/common/invalidRequestObject');
const { FailureResponseObject } = require('../../src/common/failureResponseObject');

describe('FailureResponseObject', () => {
  test('isSuccess should be false', () => {
    const response = new FailureResponseObject();
    expect(response.isSuccess()).toBeFalsy();
  });

  test('constructor takes type and message', () => {
    const type = 'foo';
    const message = 'bar';
    const response = new FailureResponseObject(type, message);
    expect(response.type).toBe(type);
    expect(response.message).toBe(message);
  });

  test('buildSystemError should return object with type SYSTEM_ERROR', () => {
    const message = 'test';
    const response = FailureResponseObject.buildSystemError(message);
    expect(response.type).toBe(FailureResponseObject.SYSTEM_ERROR);
    expect(response.message).toBe(message);
  });

  test('buildValidationError should return object with type VALIDATION_ERROR', () => {
    const message = 'test';
    const response = FailureResponseObject.buildValidationError(message);
    expect(response.type).toBe(FailureResponseObject.VALIDATION_ERROR);
    expect(response.message).toBe(message);
  });

  test('buildFromInvalidRequest should build proper validation error', () => {
    const request = new InvalidRequestObject();
    request.addError('foo', 'bar');
    request.addError('fizz', 'buzz');
    const response = FailureResponseObject.buildFromInvalidRequestObject(request);
    expect(response.type).toBe(FailureResponseObject.VALIDATION_ERROR);
    expect(response.message).toEqual([
      { parameter: 'foo', error: 'bar' },
      { parameter: 'fizz', error: 'buzz' },
    ]);
  });

  test('buildFromError should build proper system error', () => {
    const err = new Error('test');
    const response = FailureResponseObject.buildFromError(err);
    expect(response.type).toBe(FailureResponseObject.SYSTEM_ERROR);
    expect(response.message).toBe('Error: test');
  });

  test('class instance has value property', () => {
    const message = 'test';
    const response = FailureResponseObject.buildValidationError(message);
    expect(response.value).toEqual({
      type: FailureResponseObject.VALIDATION_ERROR,
      message,
    });
  });
});
