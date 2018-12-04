const { Method } = require('../../src/common/method');
const { FailureResponseObject } = require('../../src/common/failureResponseObject');
const { SuccessResponseObject } = require('../../src/common/successResponseObject');
const { InvalidRequestObject } = require('../../src/common/invalidRequestObject');
const { ValidRequestObject } = require('../../src/common/validRequestObject');

describe('Method', () => {
  test('process should handle invalid request', () => {
    const request = new InvalidRequestObject();
    request.addError('param1', 'error1');
    request.addError('param2', 'error2');
    const method = new Method();
    const response = method.process(request);
    expect(response.isSuccess()).toBeFalsy();
    expect(response.type).toBe(FailureResponseObject.VALIDATION_ERROR);
  });

  test('process should handle system error', () => {
    const method = new Method();
    method.processRequest = () => { throw new Error('ups :('); };
    const request = new ValidRequestObject();
    const response = method.process(request);
    expect(response.isSuccess()).toBeFalsy();
    expect(response.type).toBe(FailureResponseObject.SYSTEM_ERROR);
    expect(response.value).toEqual({
      type: FailureResponseObject.SYSTEM_ERROR,
      message: 'Error: ups :(',
    });
  });

  test('process should not require request to run', () => {
    const method = new Method();
    method.processRequest = () => { return new SuccessResponseObject('test') };
    const response = method.process();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.type).toBe(SuccessResponseObject.SUCCESS);
    expect(response.value).toBe('test');
  });
});
