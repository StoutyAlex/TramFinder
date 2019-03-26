const station = require('../station');
const translator = require('../station/translator');

module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      console.log('Station Handler canHandle');
      return request.type === 'IntentRequest' && request.intent.name === 'StationTimeIntent' ;
  },
  handle: async ({ responseBuilder, requestEnvelope }) => {
    const stationName = requestEnvelope.request.intent.slots.station.value;
    let requestedStation;
    try {
        requestedStation = await station(stationName);
      } catch (error) {
        console.log(error);
        return responseBuilder
          .speak('There was an error getting the data for ' + stationName)
          .reprompt('try again, ' + 'outputSpeech')
          .getResponse();
      }

      const outputSpeech = translator(requestedStation);
      console.log(requestedStation);

      return responseBuilder
        .speak(outputSpeech)
        .reprompt('try again, ' + station.stationName)
        .getResponse();
  },
};