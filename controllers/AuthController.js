const passport = require("passport");

const db = require("../models");
const User = db.User;

const userController = {};

// Restrict access to root page
userController.home = (req, res) => {
  res.render("index", { user : req.user });
};

// Go to registration page
userController.register = (req, res) => {
  res.render("register");
};

// Post registration
userController.doRegister = (req, res) => {
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, (err, user) => {
    if (err) {
      return res.rend("register", { user: user });
    }

    passport.authenticate("local")(req, res, function () {
      res.redirect("/");      
    });
  });
};

// Go to login page
userController.login = (req, res) => {
  passport.authenticate("local")(req, res, function () {
    res.redirect('/');
  });
};

// Post login
userController.doLogin = (req, res) => {
  passport.authenticate("local")(req, res, function () {
    res.redirect("/");
  });
};

// Logout
userController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = userController;
