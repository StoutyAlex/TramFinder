
module.exports = (station) => {
  let outputSpeech;

  const welcome = `Here are the tram times at ${station.stationName}: `;
  outputSpeech = welcome;

  // Loop through all the outgoing stationNames
  for (let i = 0; i != station.outgoing.length; i++) {
    // Loop through each destination's time
    const { destination, wait } = station.outgoing[i];
    outputSpeech = outputSpeech + `The next tram to ${destination} is in `;
    if (wait.length === 1) {
      outputSpeech = outputSpeech + `${wait[0]} minutes. `
    } else {
      for(let j = 0; j != wait.length; j++) {
        if(j != wait.length -1) {
          outputSpeech = outputSpeech + `${wait[j]} `
        } else {
          outputSpeech = outputSpeech + `and ${wait[j]} minutes `;
        }
      }
    }
  }


  // Loop through all the outgoing stationNames
  for (let i = 0; i != station.incoming.length; i++) {
    // Loop through each destination's time
    const { destination, wait } = station.incoming[i];
    outputSpeech = outputSpeech + `The next tram to ${destination} is in `;
    if (wait.length === 1) {
      outputSpeech = outputSpeech + `${wait[0]} minutes. `
    } else {
      for(let j = 0; j != wait.length; j++) {
        if(j != wait.length -1) {
          outputSpeech = outputSpeech + `${wait[j]} `
        } else {
          outputSpeech = outputSpeech + ` and ${wait[j]} minutes. `;
        }
      }
    }
  }

  return outputSpeech;
}