const axios = require('axios');
const config = require('../config');

const getData = () =>
  axios.get('https://api.tfgm.com/odata/Metrolinks', {
    headers: {
      'Ocp-Apim-Subscription-Key': config.TFGM.primaryKey,
    }
  });

module.exports = {
  getData,
}
