const { User } = require('../models');

exports.getMyData = async (req, res) => {
  console.log(req.user);
  try {
    const data = {
      email: req.user.dataValues.email,
      nick: req.user.dataValues.nick,
      profile_img: req.user.dataValues.profile_img,
      point: req.user.dataValues.point
    }
    res.json({ success: true, data })
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "사용자 정보를 불러오지 못했습니다" })
  }
}

exports.updateUser = async (req, res) => {
  const { email, password, nick } = req.body;
  try {

  } catch (error) {
    console.error(error);
  }
}

exports.updatePassword = async (req, res) => {
  try {

  } catch(error) {
    console.error(error);
  }
}

exports.updateMyIntroduce = async (req, res) => {
  try {
    await User.update(
      { introduce: req.body.introduce},
      { where: {id: req.user.id} }
    );
    res.status(200).json({
      success: true,
      message: "자기소개 수정 성공"
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "수정 실패"
    });
  }
}