const passport = require("passport");

module.exports = function (app) {

  // Posts login information to passport
  app.post('/login',
    passport.authenticate('local'), {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }
  );
}