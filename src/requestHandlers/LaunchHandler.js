
module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      return request.type === 'LaunchRequest';
  },
  handle({ responseBuilder }) {
      const outputSpeech = 'Hello and welcome to int Tram Finder';
      return responseBuilder
          .speak(outputSpeech)
          .reprompt('try again, ' + outputSpeech)
          .getResponse();
  },
};
