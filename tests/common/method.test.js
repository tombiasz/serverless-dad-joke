const { Method } = require('../../src/common/method');
const { FailureResponseObject } = require('../../src/common/failureResponseObject');
const { SuccessResponseObject } = require('../../src/common/successResponseObject');
const { InvalidRequestObject } = require('../../src/common/invalidRequestObject');
const { ValidRequestObject } = require('../../src/common/validRequestObject');

describe('Method', () => {
  test('process should handle invalid request', async () => {
    const request = new InvalidRequestObject();
    request.addError('param1', 'error1');
    request.addError('param2', 'error2');
    const method = new Method();
    const response = await method.process(request);
    expect(response.isSuccess()).toBeFalsy();
    expect(response.type).toBe(FailureResponseObject.VALIDATION_ERROR);
  });

  test('process should handle system error', async () => {
    const method = new Method();
    method.processRequest = () => { throw new Error('ups :('); };
    const request = new ValidRequestObject();
    const response = await method.process(request);
    expect(response.isSuccess()).toBeFalsy();
    expect(response.type).toBe(FailureResponseObject.SYSTEM_ERROR);
    expect(response.value).toEqual({
      type: FailureResponseObject.SYSTEM_ERROR,
      message: 'Error: ups :(',
    });
  });

  test('process should not require request to run', async () => {
    const method = new Method();
    method.processRequest = () => new SuccessResponseObject('test');
    const response = await method.process();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.type).toBe(SuccessResponseObject.SUCCESS);
    expect(response.value).toBe('test');
  });
});
