const { User } = require('../models');
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.sign = async (req, res) => {
  const { email, password, nick } = req.body;
  try {
    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      password: hash,
      nick,
      profile_img: req.file.location,
      provider: 'local',
    });

    res.status(201).json({
      success: true,
      message: "회원가입 성공",
    })
  } catch (error) {
    if (error.message === 'Validation error: Validation isEmail on email failed') {
      res.status(400).json({
        success: false,
        message: "올바른 이메일 형식이 아닙니다"
      })
    } else {
      res.status(400).json({
        success: false,
        message: "가입 실패",
      });
    }
  }
}

exports.login = async (req, res, next) => {
  passport.authenticate('local', (authError, user) => {
    if (authError) {
      console.error(authError);
      res.status(400).json({ success: false, message: "로그인 실패"});
    }

    if (!user) {
      return res.status(400).json({ success: false, message: "유저 정보가 없습니다"});
    }

    return req.login(user, (loginError) => {
      if(loginError) {
        console.error(loginError);
        return res.status(400).json({ success: false, message: "로그인에 실패하였습니다"});
      }
      return res.status(200).json({ success: true, message: "로그인에 성공하였습니다"});
    })
  })(req, res, next);
}

exports.logout = async (req, res, next) => {
  req.logout(req.user, err => {
    if(err) {
      return next(err);
    }
    req.session.destroy();
    res.status(200).json({ success: true, message: "로그아웃 성공"});
  });
}