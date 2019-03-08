
module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      return request.type === 'SessionEndedRequest';
  },
  handle({ responseBuilder, requestEnvelope }) {
      console.log(`Session ended with reason: ${requestEnvelope.request.reason}`);
      return responseBuilder.getResponse();
  }
};
