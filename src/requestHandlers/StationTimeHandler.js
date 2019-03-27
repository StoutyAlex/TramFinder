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

      let outputSpeech = 'Could not find station details for ' + stationName;
      if(requestedStation.outgoing.length !== 0 || requestedStation.incoming.length !== 0) {
        outputSpeech = translator(requestedStation);
      }

      return responseBuilder
        .speak(outputSpeech)
        .reprompt('try again, ' + station.stationName)
        .getResponse();
  },
};