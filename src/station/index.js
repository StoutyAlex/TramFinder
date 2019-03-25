const axios = require('axios');
const {
  parseStation,
  getWaitTimes,
  getOutgoing,
  getIncoming,
  getGrouped
} = require('./stationParser');

const getData = async () => {
  const rawData = await axios.get('https://api.tfgm.com/odata/Metrolinks', {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.metrolink_key,
    }
  });
  return rawData.data.value;
}

module.exports = async (stationName) => {
  const data = await getData();
  const station = parseStation(data, stationName.toLowerCase());
  return {
    stationName: stationName.toLowerCase(),
    outgoing: getGrouped(getWaitTimes(getOutgoing(station))),
    incoming: getGrouped(getWaitTimes(getIncoming(station))),
  };
};
