const axios = require('axios');
const config = require('../config');

const stationParser = (data, stationName) => {
  const stationArray = data.filter((station) => {
    return station.StationLocation === stationName;
  });
  const incoming = stationArray[0];
  const outgoing = stationArray[1];
  return {
    incoming,
    outgoing,
  }
};

const getMetrolinkData = () =>
  axios.get('https://api.tfgm.com/odata/Metrolinks', {
    headers: {
      'Ocp-Apim-Subscription-Key': config.TFGM.primaryKey,
    }
  });

const getStation = (stationName) => 
  getMetrolinkData()
    .then(data => stationParser(data.data.value, stationName))
    .then(data => data)
    .catch(error => console.log(error));

const getRawData = () => 
  getMetrolinkData()
    .then(data => data);

const getIncoming = (stationName) =>
  getMetrolinkData()
    .then(data => stationParser(data.data.value, stationName))
    .then(data => data.incoming);

const getOutgoing = (stationName) => 
  getMetrolinkData()
    .then(data => stationParser(data.data.value, stationName))
    .then(data => data.outgoing);

module.exports = {
  getStation,
  getRawData,
  getIncoming,
  getOutgoing,
}
