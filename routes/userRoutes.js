const passport = require("passport");

const db = require("../models");

const User = db.User;

module.exports = function (app) {

  const passportLocal = passport.authenticate("local");

  // route to post user info after they register
  app.post("/register", (req, res) => {
    console.log("registering")

    const { email, password, firstname, lastname, phonenumber } = req.body;

    User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log("User.js post err: ", err)
      } else if (user) {
        res.json({
          error: `Sorry, already a user with that email: ${email}`
        })
      } else {
        console.log("created new user!")
        User.create({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          phonenumber: phonenumber
        })
          .then( (err, user) => {
            passport.authenticate('local')(req, res, () => {
              let userInfo = {
                email: req.user.email,
                firstname: req.user.firstname
              };
              req.session.user = userInfo.email
              res.send(userInfo)
            })
        })
        .catch( error => {
          console.log("error: ", error)
        })
      }
    })
  })

  // route to post login information to see if they match with User db
  app.post("/login", passportLocal, (req, res) => {
    let userInfo = {
      email: req.user.email,
      firstname: req.user.firstname
    };
    req.session.user = userInfo.email
    res.send(userInfo)
  });

  // route to see if a user is logged in already
  app.get('/user', (req, res) =>{
    if (req.session.passport !== undefined) {
      User.findOne({ _id: req.session.passport.user })
        .then( (user) => {
          res.json({ user: user })  
        })
    } else {
      res.json({ user: null })
    }
  })

  // route to log User out
  app.post("/logout", (req, res) => {
    if (req.session.passport.user) {
      res.send({ msg: "logging out" })
      req.logout()
    } else {
      res.send({ msg: "no user to log out" })
    }
  });
};
