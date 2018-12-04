const { ValidRequestObject } = require('../../src/common/validRequestObject');

describe('ValidRequestObject', () => {
  test('should be false', () => {
    const request = new ValidRequestObject();
    expect(request.isValid()).toBeTruthy();
  });
});
