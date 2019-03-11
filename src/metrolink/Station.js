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

  getWaitTimesUnique(incomingOrOutgoing) {
    let waitTimes = [];
    incomingOrOutgoing.forEach((tram) => {
      if(!_.find(waitTimes, {'destination': tram.Dest0, 'wait': tram.Wait0 })) {
        waitTimes.push({
          destination: tram.Dest0,
          wait: tram.Wait0
        });
      }
      if(!_.find(waitTimes, {'destination': tram.Dest1, 'wait': tram.Wait1 })) {
        waitTimes.push({
          destination: tram.Dest1,
          wait: tram.Wait1
        });
      }
      if(!_.find(waitTimes, {'destination': tram.Dest2, 'wait': tram.Wait2 })) {
        waitTimes.push({
          destination: tram.Dest2,
          wait: tram.Wait2
        });
      }
    });
    return waitTimes;
  }

  getWaitTimes(incomingOrOutgoing) {
    let waitTimes = [];
    incomingOrOutgoing.forEach((tram) => {
      waitTimes.push({
        destination: tram.Dest0,
        wait: tram.Wait0
      });
      waitTimes.push({
        destination: tram.Dest1,
        wait: tram.Wait1
      });
      waitTimes.push({
        destination: tram.Dest2,
        wait: tram.Wait2
      });
    });
    return waitTimes;
  }
};

module.exports = Station;