const { RequestObject } = require('../../src/common/requestObject');

describe('RequestObject', () => {
  test('isValid should throw error', () => {
    expect(() => new RequestObject().isValid()).toThrow(Error);
  });
});
