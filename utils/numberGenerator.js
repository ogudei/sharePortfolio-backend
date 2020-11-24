var events = require("events");
events.EventEmitter.defaultMaxListeners = 7000;
const WebSocket = require("ws");

// const socket = new WebSocket("ws://localhost:6969");

exports.generateDecimal = () => {
  let incOrDesc = Math.random() > 0.5 ? 1 : -1;
  return Math.random() + incOrDesc;
};
exports.generateInteger = () => {
  let incOrDesc = Math.random() > 0.5 ? 1 : -1;
  let generated = Math.random() * 10 * incOrDesc;
  return Math.floor(generated);
};
