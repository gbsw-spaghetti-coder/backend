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
      provider: 'local',
    });

    res.status(201).json({ success: true, message: "회원가입 성공" })
  } catch (error) {
    if (error.message === 'Validation error: Validation isEmail on email failed') {
      res.status(400).json({ success: false, message: "올바른 이메일 형식이 아닙니다" })
    } else if(error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ success: false, message: "이미 가입된 이메일 입니다" })
    } else {
      console.error(error.name);
      res.status(400).json({ success: false, message: "가입 실패" });
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
      return res.status(400).json({ success: false, message: "비밀번호가 다릅니다"});
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
    req.session.destroy(() => {
      req.session;
    });
    res.status(200).json({ success: true, message: "로그아웃 성공"});
  });
}