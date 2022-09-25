const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENTID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: '/api/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao' }
      });

      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account.email,
          nick: profile._json.properties.nickname,
          profile_img: profile._json.properties.thumbnail_image,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      return done(error);
    }
  }));
}