
module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      return request.type === 'LaunchRequest';
  },
  handle({ responseBuilder }) {
      const { environment } = process.env;
      const outputSpeech = `Hello and welcome to ${environment} Tram Finder`;
      return responseBuilder
          .speak(outputSpeech)
          .reprompt('try again, ' + outputSpeech)
          .getResponse();
  },
};