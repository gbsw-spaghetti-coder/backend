const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const github = require('./githubStrategy');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    User.findOne({ where: { id: user.id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
  github();
};