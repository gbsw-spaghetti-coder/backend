const { User } = require('../models');

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