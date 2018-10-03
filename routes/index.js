const express = require("express");
const passport = require("passport");

const db = require("../models");

const User = db.User;

module.exports = function (app) {

// restrict index for logged in user only
app.get("/", (req, res) => {
  res.redirect("/home");
});

// route to register page
app.route("/register")
  .get((req, res) => {
    res.render("register")
  })
  .post((req, res) => {
    console.log("user signup");

    const { username, password, firstname, lastname, phonenumber } = req.body;

    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log("User.js post err: ", err)
      } else if (user) {
        res.json({
          error: `Sorry, already a user with that username: ${username}`
        })
      } else {
        User.create({
          username: req.body.username,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phonenumber: req.body.phonenumber
        })
      }
    })
  })

// route to login page
app.get("/login", (req, res, next) => {
  console.log('==== user!!====')
  console.log(req.user)
  if (req.user) {
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
})

// route for login action
app.post("/login",
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body)
    next()
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    let userInfo = {
      username: req.user.username
    };
    res.send(userInfo)
  });

// route for logout action
app.post("/logout", (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ msg: "logging out" })
  } else {
    res.send({ msg: "no user to log out" })
  }
});
};
