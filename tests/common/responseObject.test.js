const { ResponseObject } = require('../../src/common/responseObject');

describe('ResponseObject', () => {
  test('isSuccess should throw error', () => {
    expect(() => new ResponseObject().isSuccess()).toThrow(Error);
  });
});
