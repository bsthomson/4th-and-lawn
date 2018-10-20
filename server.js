const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const logger = require("morgan");

// Sets the port express will listen to.
const PORT = process.env.PORT || 3001;

// Sets the location of our database express will use.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/4th-and-lawn";

// Where our database models are stored.
const db = require("./models");
const User = db.User;
const Jayhawk = db.Jayhawk;

const app = express();

app.use(logger("dev"));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express-session information
app.use(session({
  key: 'user_sid',
  // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: "somerandomstuff",
  resave: false,
  saveUnitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next();
});

// Sets express to use passport.js
app.use(passport.initialize());
app.use(passport.session());

// Passport.js parameters
passport.use(new LocalStrategy(
  {
    usernameField: "email"
  },
  function (email, password, done) {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }
      if (!password) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user)
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  })
});

// Tells express where our jayhawk AP route is
require("./routes/jayhawkRoutes")(app);

// Tells express where our renter API routes are
require("./routes/renterRoutes")(app);

// Tells express where our parking spot API routes are
require("./routes/parkingSpotRoutes")(app);

// Tell express where where our user API routes are
require("./routes/userRoutes")(app);

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
