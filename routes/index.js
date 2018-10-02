const express = require("express");
const router = express.Router();

const auth = require("../controllers/AuthController");

module.exports = function (app) {
// restrict index for logged in user only
app.router.get("/", auth.home);

// route to register page
app.router.get("/register", auth.register);

// route to register action
app.router.post("/register", auth.doRegister);

// route to login page
app.router.get("/login", auth.login);

// route for login action
app.router.post("/login", auth.doLogin);

// route for logout action
app.router.get("/logout", auth.logout);

};
