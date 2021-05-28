const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();

// INIT MIDDLEWARE
//app.use(logger);

// HANDLEBARS MIDDLEWARE
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage route
app.get("/", function (req, res) {
  res.render("index", {
    title: "Member App",
    members,
  });
});

// setup static server : can create as many html pages as we want , only for serving html files
app.use(express.static(path.join(__dirname, "public")));

// member api routes
app.use("/api/members", require("./routes/api/Members"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
