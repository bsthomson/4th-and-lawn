const passport = require("passport");
const session = require("express-session");

const db = require("../models");
const User = db.User;
const Event = db.Event;

module.exports = function (app) {

  const passportLocal = passport.authenticate("local");

  // Route to post user info after they register
  app.post("/register", (req, res) => {
    console.log("registering")

    const { email, password, firstname, lastname, phonenumber } = req.body;

    User.findOne({ email: email }, (err, user) => {
      if (err) throw err;

      if (user) {
        console.log("Sorry that email's already in use.")

        res.json({
          error: `Sorry, already a user with that email: ${email}`
        })
      } else {
        User.create({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          phonenumber: phonenumber
        })
          .then((err, user) => {
            console.log("created new user!")
            passport.authenticate('local')(req, res, function () {
              let userInfo = {
                email: req.user.email,
                firstname: req.user.firstname
              };

              req.session.user = userInfo.email
              res.send(userInfo)
            })
          })
          .catch(error => {
            console.log("error: ", error)
          })
      }
    })
  })

  // Route to post login information to see if they match with User db
  app.post("/login", passportLocal, (req, res) => {
    let userInfo = {
      email: req.user.email,
      firstname: req.user.firstname
    };
    req.session.user = userInfo.email
    res.send(userInfo)
  });

  // Route to see if a user is logged in already
  app.get('/user', (req, res) => {
    if (req.session.passport !== undefined) {
      User.findOne({ _id: req.session.passport.user })
        .then((user) => {
          res.json({ user: user })
        })
    } else {
      res.json({ user: null })
    }
  })

  app.get('/api/user/:id', (req, res) => {
    if (req.session.passport !== undefined) {
      User.findOne({ _id: req.params.id })
        .then((user) => {
          res.json({ user: {
            firstName: user.firstname,
            lastName: user.lastname,
            phoneNumber: user.phonenumber,
            rentInfo: user.rentinfo
          } })
        })
    } else {
      res.json({ user: null })
    }
  })

  // Route to log out user
  app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      req.logout();
      console.log("session destroyed")
      res.send(200)
    })
  });

};
