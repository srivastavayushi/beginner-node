function auth(req, res, next) {
  if (req.query.admin === "true") {
    req.admin = true;
    console.log("Middleware : AUTH : PASSED");
    next();
    return;
  } else {
    console.log("Middleware : AUTH : FAILED");
    res.send("Sorry ! You aren't authorized");
  }
}
module.exports = auth;
