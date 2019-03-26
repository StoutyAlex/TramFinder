
const SUPPORTED_INTENTS = [ 'AMAZON.StopIntent', 'AMAZON.CancelIntent'];

module.exports = {
  canHandle: ({ requestEnvelope }) => {
    return requestEnvelope.request.type === 'IntentRequest'
      && SUPPORTED_INTENTS.includes(requestEnvelope.request.intent.name);
  },
  handle: ({ responseBuilder }) => {
    return responseBuilder
    .speak('bye')
    .withShouldEndSession(true)
    .getResponse();
  },
};
