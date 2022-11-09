const { User } = require('../models');
const bcrypt = require("bcrypt");

exports.getMyData = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'email', 'nick', 'profile_img', 'point', 'introduce', 'createdAt'],
      where: { id: req.user.id }
    });

    res.json(user)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "사용자 정보를 불러오지 못했습니다" })
  }
}

exports.updateInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}});

    console.log(req.file);

    if(req.user.id !== user.dataValues.id) {
      return res.status(401).json({ success: false, message: "권한이 없습니다"});
    }else{
      await User.update(
        {
          nick : req.body.nick,
          introduce: req.body.introduce,
          profile_img: req.file.location
        },
        { where: { id: req.user.id }}
      )
      res.status(200).json({success: true, message: "수정 성공"})
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: {id: req.user.id }});
    const hash = await bcrypt.hash(req.body.password, 12);
    if(req.user.id !== user.dataValues.id) {
      return res.status(401).json({ success: false, message: "권한이 없습니다"});
    }else{
      await User.update(
        {
          password: hash
        },
        { where: { id: req.user.id }}
      )
      res.status(200).json({success: true, message: "비밀번호 변경 성공"})
    }
  } catch(error) {
    console.error(error);
    next(error);
  }
}