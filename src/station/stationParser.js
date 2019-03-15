const _ = require('lodash');

const parseStation = (data, stationName) => {
  return data.filter((station) =>
    station.StationLocation.toLowerCase() === stationName.toLowerCase()
  );
};

const getWaitTimes = (incomingOrOutgoing) => {
  let waitTimes = [];
  incomingOrOutgoing.forEach((tram) => {
    if(!_.find(waitTimes, {'destination': tram.Dest0, 'wait': tram.Wait0 })) {
      if ( !tram.Dest0 ) return; 
      waitTimes.push({
        destination: tram.Dest0,
        wait: tram.Wait0
      });
    }
    if(!_.find(waitTimes, {'destination': tram.Dest1, 'wait': tram.Wait1 })) {
      if ( !tram.Dest1 ) return; 
      waitTimes.push({
        destination: tram.Dest1,
        wait: tram.Wait1
      });
    }
    if(!_.find(waitTimes, {'destination': tram.Dest2, 'wait': tram.Wait2 })) {
      if ( !tram.Dest2 ) return; 
      waitTimes.push({
        destination: tram.Dest2,
        wait: tram.Wait2
      });
    }
  });
  return waitTimes;
};

const getIncoming = (station) => {
  return station.filter((side) =>
    side.Direction === 'Incoming'
  ); 
};

const getOutgoing = (station) => {
  return station.filter((side) =>
    side.Direction === 'Outgoing'
  )
};

const getGrouped = (times) => {
  let groupedItems = [];
  times.forEach((tram) => {
    if ( _.find(times, { destination: tram.destination })) {
      if(!_.find(groupedItems, { destination: tram.destination })) {
        groupedItems.push({
          destination: tram.destination,
          wait: [ tram.wait ]
        });
      } else {
        const index = groupedItems.findIndex(item => item.destination === tram.destination);
        groupedItems[index].wait.push(tram.wait);
      }
    }
  });
  return groupedItems;
};


module.exports = {
  parseStation,
  getWaitTimes,
  getIncoming,
  getOutgoing,
  getGrouped,
}