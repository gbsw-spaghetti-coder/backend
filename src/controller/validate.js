const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.isExistEmail = async (req, res) => {
  try {
    const existEmail = await User.findOne({ where: { email: req.body.email }});

    if (existEmail) {
      res.status(409).json({ success: false, message: "이미 사용 중인 이메일 입니다" });
    } else {
      res.status(200).json({ success: false, message: "사용 가능한 이메일 입니다" });
    }
  } catch (error) {
    res.json({ success: false, message: error.toString() })
  }
}

exports.isExistNick = async (req, res) => {
  try {
    const existNick = await User.findOne({ where: { nick: req.body.nick } });

    if (existNick) {
      res.status(409).json({ success: false, message: "사용 불가능한 닉네임 입니다" });
    } else {
      res.status(200).json({ success: false, message: "사용 가능한 닉네임 입니다" });
    }
  } catch (error) {
    res.json({ success: false, message: error.toString() })
  }
}

exports.validatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email }
    });
    if(user) {
      const hash = await bcrypt.compare(req.body.password, user.password);
      if(!hash) {
        res.status(400).json({ success: false, message: "비밀번호가 다릅니다"});
      } else {
        res.status(200).json({ success: true, message: "바꿀수있습니다"});
      }
    }
  } catch (error) {
    next(error);
  }
}