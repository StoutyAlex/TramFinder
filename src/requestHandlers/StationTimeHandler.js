const station = require('../station');

module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      console.log('Station Handler canHandle');
      return request.type === 'IntentRequest' && request.intent.name === 'StationTimeIntent' ;
  },
  handle: async ({ responseBuilder, requestEnvelope }) => {
    const stationName = requestEnvelope.request.intent.slots.station.value;
    try {
        const requestedStation = await station(stationName);
        console.log(requestedStation); 

        return responseBuilder
          .speak(requestedStation.stationName)
          .reprompt('try again, ' + station.stationName)
          .getResponse();
      } catch (error) {
        console.log(error);
        return responseBuilder
          .speak('There was an error getting the data for ' + stationName)
          .reprompt('try again, ' + 'outputSpeech')
          .getResponse();
      }
  },
};