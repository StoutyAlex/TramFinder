const stationParser = require('../../src/station/stationParser');

describe('StationParser', () => {
  describe('Grouping', () => {
    test('should group unique destinations with a single array of times', () => {
      const times = [
        { destination: 'Eccles', wait: '2' },
        { destination: 'Eccles', wait: '15' },
        { destination: 'Eccles', wait: '23' }
      ];
      let result = stationParser.getGrouped(times);
      console.log(result);
      expect(result).toEqual([
        {
          destination: 'Eccles',
          wait: [
            '2',
            '15',
            '23'
          ]
        },
      ])
    });
    test('should group unique destinations with a single array of wait times', () => {
      const times = [ { destination: 'MediaCityUK', wait: '3' },
      { destination: 'Altrincham', wait: '4' },
      { destination: 'Manchester Airport', wait: '6' },
      { destination: 'East Didsbury', wait: '0' },
      { destination: 'East Didsbury', wait: '3' },
      { destination: 'East Didsbury', wait: '14' } ];
      let result = stationParser.getGrouped(times);
      expect(result).toEqual([
        {
          destination: 'MediaCityUK', wait: [ '3' ]
        },
        {
          destination: 'Altrincham', wait: [ '4' ]
        },
        {
          destination: 'Manchester Airport', wait: [ '6' ]
        },
        {
          destination: 'East Didsbury', wait: [ '0', '3', '14']
        },
      ])
    });
  });
});
