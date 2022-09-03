const { Question } = require('../models');

exports.createQuestion = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    await Question.create({
      title,
      content,
      category,
      UserId: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "질문 등록 성공"
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "질문 등록 실패"
    })
  }
}

exports.getQuestions = async (req, res) => {
  let pageNum = req.query.page; // 요청 페이지 넘버
  let offset = 0;

  if(pageNum > 1){
    offset = 15 * (pageNum - 1);
  }
  try {
    const data = await Question.findAll({
      offset: offset,
      limit: 15
    })
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "글 불러오기 실패"
    })
  }
}

exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({ where: { id: req.params.id }});
    if (question) {
      await Question.increment({ views: 1 }, { where: { id: req.params.id }});
    }
    res.status(200).json({
      success: true,
      question
    })
  } catch (error) {
    console.error(error);
  }
}

exports.delete = async (req, res) => {
  try {
    const question = await Question.findOne({ where: { id: req.params.id }});

    if(req.user.id === question.dataValues.UserId) {
      await Question.destroy({ where: { id: req.params.id }});
      res.status(200).json({
        success: true,
        message: '질문 삭제 성공',
      });
    } else {
      res.status(401).json({
        success: false,
        message: '삭제 권한이 없습니다'
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: '질문 삭제 실패',
    });
  }
}