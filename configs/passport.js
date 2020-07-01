const User          = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs'); 
const passport      = require('passport');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});
 
passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});
 
passport.use(
  new LocalStrategy({
    usernameField: 'phoneNumber',
    passwordField: 'password'
  },(phoneNumber, password, callback) => {
    User.findOne({ phoneNumber })
      .then(user => {
        if (!user) {
          return callback(null, false, { message: 'Incorrect phone number' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return callback(null, false, { message: 'Incorrect password' });
        }
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
  })
);