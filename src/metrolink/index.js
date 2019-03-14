const axios = require('axios');

const getData = () =>
  axios.get('https://api.tfgm.com/odata/Metrolinks', {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.metrolink_key,
    }
  });

module.exports = {
  getData,
}
