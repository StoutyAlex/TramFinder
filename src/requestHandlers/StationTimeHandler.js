const moment = require('moment');
const metrolink = require('../metrolink');

module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      console.log('Station Handler canHandle');
      return request.type === 'IntentRequest' && request.intent.name === 'StationTimeIntent' ;
  },
  handle({ responseBuilder }) {
      const time = moment().format('h:mm A');
      return metrolink.getStation('Broadway')
        .then(station => {
          console.log(station);
          let outputSpeech = '';
          const { Wait0, Dest0 } = station.incoming;
          const incomingText = `The next tram to ${Dest0} is in ${Wait0} minutes.`;
          const outgoingText = `The next tram to ${station.outgoing.Dest0} is in ${station.outgoing.Wait0} minutes.`;

          outputSpeech = `${incomingText} ${outgoingText}`;

          return responseBuilder
            .speak(outputSpeech)
            .reprompt('try again, ' + outputSpeech)
            .getResponse();
        })
        .catch(error => {
          return responseBuilder
            .speak('Sorry did not work')
            .reprompt('try again, ' + outputSpeech)
            .getResponse();
        });
  },
};