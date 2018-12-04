const { SuccessResponseObject } = require('../../src/common/successResponseObject');

describe('SuccessResponseObject', () => {
  test('isSuccess should be true', () => {
    const response = new SuccessResponseObject();
    expect(response.isSuccess()).toBeTruthy();
  });

  test('constructor takes value', () => {
    const value = 'test';
    const response = new SuccessResponseObject(value);
    expect(response.value).toBe(value);
  });

  test('object type should be SUCCESS', () => {
    const response = new SuccessResponseObject();
    expect(response.type).toBe(SuccessResponseObject.SUCCESS);
  });

  test('constructor by default sets value to empty string', () => {
    const response = new SuccessResponseObject();
    expect(response.value).toBe('');
  });
});
