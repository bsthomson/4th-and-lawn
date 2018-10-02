const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");

// Sets the port express will listen to.
const PORT = process.env.PORT || 3001;

// Sets the location of our database express will use.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/4th-and-lawn";

// Where our database models are stored.
const db = require("./models/index")

const app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express-session information
app.use(session({
  key: "user_sid",
  secret: "somerandomstuff",
  resave: false,
  saveUnitialized: false,
  cookie: {
    expires: 600000
  }
}));

// Sets express to use passport.js
app.use(passport.initialize());
app.use(passport.session());

// Passport.js parameters
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// If our express-session info doesn't match our cookie info clear the cookie info
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid")
  }
  next();
});

// Tells express where our API routes are
require("./routes/apiRoutes")(app);

// Tells express where our Authenticator is
require("./routes/index")(app);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Tells mongoose.js where our database is
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Mongodb connection successful"))
  .catch((err) => console.error(err));

// Tells express to listen to port 3001
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
