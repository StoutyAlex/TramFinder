const moment = require('moment');

const responses = [
  'the time currently is ',
  'it is currently ',
  'the time now is ',
  'it is ',
]

module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      return request.type === 'IntentRequest' && request.intent.name === 'TimeIntent' ;
  },
  handle({ responseBuilder }) {
      const time = moment().format('h:mm A');
      const prefix = responses[Math.floor(Math.random()*responses.length)];

      const outputSpeech = `${prefix} ${time}`;

      return responseBuilder
          .speak(outputSpeech)
          .reprompt('try again, ' + outputSpeech)
          .getResponse();
  },
};