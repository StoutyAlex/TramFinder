
module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      console.log('Launch Handler canHandle');
      return request.type === 'LaunchRequest';
  },
  handle({ responseBuilder, requestEnvelope }) {
      const outputSpeech = 'Hello and welcome to Tram Finder';
      return responseBuilder
          .speak(outputSpeech)
          .reprompt('try again, ' + outputSpeech)
          .getResponse();
  },
};
