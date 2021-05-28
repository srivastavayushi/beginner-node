// console.log(__filename);
// console.log(__dirname);

const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    // EMIT AN EVENT
    this.emit("MessageLogged", {
      id: 1,
      url: "http://localhost",
      sender: "Ayushi",
    });
  }
}

module.exports = Logger;
