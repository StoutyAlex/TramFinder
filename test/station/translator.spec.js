const translator = require('../../src/station/translator');

describe('Translator', () => {
  test('should return valid outputSpeech given stations', () => {
    const station = {
      stationName: 'jib',
      outgoing: [
      {
        destination: 'Eccles',
        wait: ['1', '2']
      },
      {
        destination: 'Ashton',
        wait: ['5', '10', '12']
      },
      {
        destination: 'Cornbrook',
        wait: ['5']
      }
    ],
    incoming: [
      {
        destination: 'Eccles',
        wait: ['1', '2']
      },
      {
        destination: 'Ashton',
        wait: ['5', '10', '12']
      },
      {
        destination: 'Cornbrook',
        wait: ['5']
      }
    ]
  }
    expect(translator(station)).toEqual(
      'Here are the tram times at jib: The next tram to Eccles is in 1 and 2 minutes The next tram to Ashton is in 5 10 and 12 minutes The next tram to Cornbrook is in 5 minutes. The next tram to Eccles is in 1  and 2 minutes. The next tram to Ashton is in 5 10  and 12 minutes. The next tram to Cornbrook is in 5 minutes. ');
  })
});
