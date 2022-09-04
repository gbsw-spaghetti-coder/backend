const { Answer, User } = require('../models');

exports.getAnswer = async (req, res) => {
  try {
    const answers = await Answer.findAll({
      include : {
        model: User,
        where: { QuestionId : req.params.id }
      }
    });
    res.status(200).json({
      success: true,
      data: answers
    });
  } catch (error) {
    console.error(error);
  }
}

exports.createAnswer = async (req, res) => {
  try {
    await Answer.create({
      content: req.body.content,
      QuestionId: parseInt(req.params.id, 10),
      UserId: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "댓글 등록 성공"
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "댓글 등록 실패"
    })
  }
}

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findOne({ where: { id: req.params.id }});
    if (req.user.id === answer.dataValues.UserId) {
      await Answer.destroy({ where: { id: req.params.id }});
      res.status(200).json({
        success: true,
        message: "답변 삭제 성공"
      });
    } else {
      res.status(401).json({
        success: false,
        message: '삭제 권한이 없습니다'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "답변 삭제 실패"
    })
  }
}


exports.selection = async (req, res) => {
  try {
    const selection = await Answer.findAll({
      where: { QuestionId : req.params.id }
    });

    console.log(selection);


    /*const user = await Answer.findOne({
      where: { UserId: req.user.id }
    });


    if (req.user.id !== selection.dataValues.UserId) {
      res.status(200).json({
        success: false,
        message: "글쓴이만 수정 가능합니다"
      })
    }*/

    if (selection.dataValues.selection === 'false') {
      await Answer.update(
        { selection: 'true'},
        { where: { id: req.user.id }}
      )
      res.status(200).json({
        success: true,
        message: "채택 완료"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "채택된 답변입니다"
      })
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "채택 실패"
    })
  }
}