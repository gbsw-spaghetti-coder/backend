const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

const { User } = require('../models');

module.exports = () => {
  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3001/api/auth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile._json);
    try {
      const exUser = await User.findOne({
        snsId: profile._json.id,
        provider: 'github'
      })

      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json.email,
          nick: profile._json.login,
          profile_img: profile._json.avatar_url,
          snsId: profile._json.id,
          provider: 'github',
        })
        console.log(newUser);
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }))
}






/*passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));*/
