const { ValidRequestObject } = require('./common/validRequestObject');
const { SuccessResponseObject } = require('./common/successResponseObject');
const { FailureResponseObject } = require('./common/failureResponseObject');
const { GetDadJokeMethod } = require('./dadJoke/getDadJokeMethod');

const STATUS_CODE_MAP = {
  [SuccessResponseObject.SUCCESS]: 200,
  [FailureResponseObject.VALIDATION_ERROR]: 400,
  [FailureResponseObject.SYSTEM_ERROR]: 500,
};

function responseObjectToHttpResponse({ type, value }) {
  return {
    statusCode: STATUS_CODE_MAP[type],
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ message: value }),
  };
}

function getDadJoke(event, context, callback) {
  const request = new ValidRequestObject();
  const getDadJokeMethod = new GetDadJokeMethod();
  const response = getDadJokeMethod.process(request);
  callback(null, responseObjectToHttpResponse(response));
}

module.exports = {
  getDadJoke,
};
