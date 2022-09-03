const express = require('express');
const passport = require("passport");
const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
})

module.exports = router;
