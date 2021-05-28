const path = require("path");
const os = require("os");
const fs = require("fs");
const EventEmitter = require("events");
const emitter = new EventEmitter();
const http = require("http");
//console.log(module);

//log("I am ayushi");

console.log(path.parse(__filename));
console.log(os.freemem());
console.log(os.totalmem());
fs.readdir("./", function (err, files) {
  if (err) console.log("error", err);
  else console.log("result", files);
});

//MODULE EXPORTS
const Logger = require("./logger");
const logger = new Logger();

// EVENT LISTENER
logger.on("MessageLogged", (arg) => {
  console.log("Event Called ....", arg);
});

logger.log("Hello World !");

// EVENT LISTENER
emitter.on("Logging", (arg) => {
  console.log("MESSAGE RECIEVED :", arg.message);
  console.log("MESSAGE SENDER :", arg.sender);
});

// EMIT EVENT
emitter.emit("Logging", {
  message: "Hey Did you get my message?",
  sender: "Ayushi",
});

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("HELLO WORLD");
    res.end();
  } else if (req.url == "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on("connection", (socket) => {
//   console.log("New Connection ...");
// });
const PORT = 3000;
server.listen(PORT);
console.log(`Listening on port 3000...`);
