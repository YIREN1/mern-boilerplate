const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
// const User = require('../models/User');

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Match user
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        return done(null, false, { message: 'That email is not registered' });
      }
      req.user = user;
      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
