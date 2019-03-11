const mockData = require('../mockData');
const Station = require('../../src/metrolink/Station');

describe('StationParser', () => {
  describe('Multiple Stations', () => {
    test('should return all cornbrook stations', () => {
      const station = new Station(mockData.multipleStations, 'cornbrook');
      expect(station.getData()).toHaveLength(4);
    });
    test('should return empty array when station not found', () => {
      const station = new Station(mockData.multipleStations, 'amazing');
      expect(station.getData()).toEqual([]);
    });
  });
  describe('Outbound and Incoming', () => {
    const station = new Station(mockData.multipleStations, 'cornbrook');
    test('should group outbound stations', () => {
      expect(station.getOutgoing()).toHaveLength(2);
    });
    test('should group incoming stations', () => {
      expect(station.getIncoming()).toHaveLength(2);
    });
  })
  describe('getName', () => {
    test('should return station name', () => {
      const station = new Station(mockData.multipleStations, 'cornbrook');
      expect(station.getName()).toEqual('cornbrook');
    });
    test('should return station name despite uppercase letters', () => {
      const station = new Station(mockData.multipleStations, 'CoRnbrooK');
      expect(station.getName()).toEqual('cornbrook');
    });
  });
  describe('MultipleDestinations', () => {
    describe('getWaitTimes', () => {
      test('should return all destination - incoming', () => {
        const station = new Station(mockData.multipleDestinations, 'cornbrook');
        const waitTimes = station.getWaitTimes(station.getIncoming());
        expect(waitTimes).toHaveLength(3);
      });
      test('should return all destinations - outgoing', () => {
        const station = new Station(mockData.multipleDestinations, 'cornbrook');
        const waitTimes = station.getWaitTimes(station.getOutgoing());
        expect(waitTimes).toHaveLength(3);
      });
      test('should return all destinations - outgoing', () => {
        const station = new Station(mockData.stPetersSquare, 'St peters square');
        const waitTimes = station.getWaitTimesUnique(station.getIncoming());
        expect(waitTimes).toHaveLength(6)
      });
    });
    describe('getWaitTimesUnique', () => {
      test('should return only one destination with the lowest time to incoming', () => {
        const station = new Station(mockData.multipleDestinations, 'cornbrook');
        const waitTimes = station.getWaitTimesUnique(station.getIncoming());
        expect(waitTimes).toHaveLength(3);
      });
    });
  });
});