const moment = require("moment");

function logger(req, res, next) {
  console.log("before");
  // console.log("Middleware : Logger");
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${moment().format()}`,
  );
  next();
  console.log("after");
}

module.exports = logger;
