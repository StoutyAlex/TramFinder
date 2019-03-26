
const parseDirection = direction => {
  let outputSpeech = ''
  for (let i = 0; i != direction.length; i++) {
    // Loop through each destination's time
    const { destination, wait } = direction[i];
    outputSpeech = outputSpeech + `The next tram to ${destination} is in `;
    if (wait.length === 1) {
      outputSpeech = outputSpeech + `${wait[0]} minutes. `
    } else {
      for(let j = 0; j != wait.length; j++) {
        if(j != wait.length -1) {
          outputSpeech = outputSpeech + `${wait[j]} `
        } else {
          outputSpeech = outputSpeech + `and ${wait[j]} minutes. `;
        }
      }
    }
  }
  return outputSpeech;
}

module.exports = (station) => {
  let outputSpeech;
  const welcome = `Here are the tram times at ${station.stationName}: `;
  
  outputSpeech = welcome;
  outputSpeech = outputSpeech + parseDirection(station.outgoing);
  outputSpeech = outputSpeech + parseDirection(station.incoming);

  return outputSpeech;
}