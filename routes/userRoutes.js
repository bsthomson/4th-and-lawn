const express = require("express");
const passport = require("passport");

const db = require("../models");

const User = db.User;
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot

module.exports = function (app) {

  const passportLocal = passport.authenticate("local");

  // route to register page
  app.post("/register", (req, res) => {
    console.log("user signup");

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
          .then((err, user) => {
            passport.authenticate('local')(req, res, function () {
              console.log("signed up", req.user);
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

  // route for login action
  app.post("/login",
    function (req, res, next) {
      next()
    },
    passportLocal,
    (req, res) => {
      console.log("logged in", req.user);
      let userInfo = {
        email: req.user.email,
        firstname: req.user.firstname
      };
      req.session.user = userInfo.email
      res.send(userInfo)
    }
  );

  app.get('/user', (req, res) =>{
    console.log("req.session.passport")
    console.log(req.session.passport)
    if (req.session.passport !== undefined) {
      console.log(req.session.passport.user);
      User.findOne({ _id: req.session.passport.user })
        .then( (user) => {
          console.log("user")
          console.log(user)
          res.json({ user: user })  
        })
    } else {
      res.json({ user: null })
    }
  })

  // route for logout action
  app.post("/logout", (req, res) => {
    if (req.user) {
      req.logout()
      res.send({ msg: "logging out" })
    } else {
      res.send({ msg: "no user to log out" })
    }
  });

}