const express = require("express");

const auth = require("../controllers/AuthController");

module.exports = function (app) {
// restrict index for logged in user only
app.get("/", auth.home);

// route to register page
app.get("/register", auth.register);

// route to register action
app.post("/register", auth.doRegister);

// route to login page
app.get("/login", auth.login);

// route for login action
app.post("/login", auth.doLogin);

// route for logout action
app.get("/logout", auth.logout);

};
