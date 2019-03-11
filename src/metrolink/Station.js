const _ = require('lodash');

const parseStation = (data, stationName) => {
  return data.filter((station) =>
    station.StationLocation.toLowerCase() === stationName.toLowerCase()
  );
};

class Station {
  constructor(data, stationName) {
    this.stationName = stationName.toLowerCase();
    this.data = parseStation(data, this.stationName);
  }

  getData() {
    return this.data;
  }

  getName() {
    return this.stationName;
  }

  getIncoming() {
    return this.data.filter((side) =>
      side.Direction === 'Incoming'
    ); 
  }

  getOutgoing() {
    return this.data.filter((side) =>
      side.Direction === 'Outgoing'
    )
  }
};

module.exports = Station;