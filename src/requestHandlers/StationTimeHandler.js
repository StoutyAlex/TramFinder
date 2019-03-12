const moment = require('moment');
const metrolink = require('../metrolink');
const Station = require('../metrolink/Station');

module.exports = {
  canHandle({ requestEnvelope }) {
      const request = requestEnvelope.request;
      console.log('Station Handler canHandle');
      return request.type === 'IntentRequest' && request.intent.name === 'StationTimeIntent' ;
  },
  handle: async ({ responseBuilder, requestEnvelope }) => {
    const stationName = requestEnvelope.request.intent.slots.station.value;
    try {
        const rawData = await metrolink.getData();
        const station = new Station(rawData.data.value, stationName);
        
        console.log(station.getWaitTimesUnique(station.getOutgoing()));
        console.log(station.getWaitTimesUnique(station.getIncoming()));
        return responseBuilder
          .speak(station.getName())
          .reprompt('try again, ' + station.getName())
          .getResponse();
      } catch (error) {
        console.log(error);
        return responseBuilder
          .speak('There was an error getting the data for ' + stationName)
          .reprompt('try again, ' + 'outputSpeech')
          .getResponse();
      }
      // return metrolink.getData(stationSlot)
      //   .then(station => {
      //     console.log(station);
      //     let outputSpeech = '';


      //     outputSpeech = `${incomingText} ${outgoingText}`;


      //   })
      //   .catch(error => {
      //     return responseBuilder
      //       .speak('Sorry did not work')
      //       .reprompt('try again, ' + outputSpeech)
      //       .getResponse();
      //   });
  },
};