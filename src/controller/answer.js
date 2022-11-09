const { Answer, User, Question, Selection } = require('../models');

exports.getAnswer = async (req, res) => {
  try {
    const answers = await Answer.findAll({
      attributes: ['id', 'content', 'selection', 'createdAt', 'updatedAt'],
      where: { QuestionId : req.params.id },
      include : {
        model: User,
        attributes: ['email', 'nick', 'profile_img', 'point'],
      }
    });
    res.status(200).json(answers);
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
    res.status(200).json({ success: true, message: "댓글 등록 성공" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "댓글 등록 실패" })
  }
}

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findOne({ where: { id: req.params.id }});
    if (req.user.id === answer.dataValues.UserId) {
      await Answer.destroy({ where: { id: req.params.id }});
      res.status(200).json({ success: true, message: "답변 삭제 성공" });
    } else {
      res.status(401).json({ success: false, message: '삭제 권한이 없습니다' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "답변 삭제 실패" })
  }
}

/*exports.updateAnswer = async (req, res, next) => {
  try {
    const answer = await Answer.findOne({ where: {id: req.params.id}});
    if(req.user.id === answer.UserId) {
       await Answer.update(
         { content: req.body.content },
         { where: { id: req.params.id } }
       )
      res.status(200).json({ success: true, message: "답변 수정 완료" });
    }
  } catch(err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "답변 수정에 실패하였습니다"
    })
  }
}*/


//question 의 userid 와 req.user.id 가 같으면 채택 가능 다르면 실패
//


exports.selection = async (req, res, next) => {
  try {
    const question = await Question.findOne({ where: {id: req.params.qid} })
    const answer = await Answer.findOne({ where: { id: req.params.aid }});

    if(question.UserId !== req.user.id) {
      res.status(401).json({ success: false, message: "작성자만 채택 가능합니다 "});
    } else {
      res.status(200).json({ success: true, message: "채택 성공"});
    }

  } catch (error) {
    console.error(error);
    next(error);
  }
}