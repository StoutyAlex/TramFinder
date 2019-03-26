
const helpText = 'To find tram times just say "Alexa ask tram finder for tram times to ladywell" outside of the skill or "ladywell tram times" inside the skill.';

module.exports = {
  canHandle({ requestEnvelope }) {
    return requestEnvelope.request.type === 'IntentRequest'
      && requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle({ responseBuilder }) {
    return responseBuilder
      .speak(helpText)
      .getResponse();
  }
};