const Alexa = require('ask-sdk');

const TimeHandler = require('./src/requestHandlers/TimeHandler');
const LaunchHandler = require('./src/requestHandlers/LaunchHandler');
const SessionEndedHandler = require('./src/requestHandlers/SessionEndedHandler');

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
      LaunchHandler,
      TimeHandler,
      SessionEndedHandler,
    )
    .lambda();