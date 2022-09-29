const url = require('url');
const sequelize = require("sequelize");
const { Question, User, Good, Bad } = require('../models');
const Op = sequelize.Op;

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
  console.log(req.query, req.url);
  let pageNum = req.query.page;
  let offset = 0;

  if(pageNum > 1){
    offset = 15 * (pageNum - 1);
  }
  try {
    const data = await Question.findAll({
      offset: offset,
      limit: 15,
      order: [['id', 'desc']]
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
    const question = await Question.findOne(
      {
        where: { id: req.params.id },
        include : [{
          User,
        }, {
          Good
        }, {
          Bad
        }]
      },
    );
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

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({ where: { id: req.params.id }});

    if(req.user.id !== question.dataValues.UserId) {
      res.status(401).json({ success: false, message: "수정 권한이 없습니다" });
    } else {
      await Question.update(
        { title: req.body.title },
        { content: req.body.content },
        { where: { id: req.params.id } }
      )
      res.status(200).json({
        success: true,
        message: "질문 수정 완료"
      })
    }
  } catch (error) {
    console.error(error);
  }
}

exports.deleteQuestion = async (req, res) => {
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

exports.searchQuestion = async (req, res) => {


  try {
    const query = url.parse(req.url, true).query;
    //url = http://localhost:3001/api/question/search?q=zz
    /*if(pageNum > 1){
      offset = 15 * (pageNum - 1);
    }
    const question = await Question.findAll({
      where:{
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + query.search + "%"
            }
          },
          {
            content: {
              [Op.like]: "%" + query.search + "%"
            }
          }
        ]
      },
      include: User,
      offset: offset,
      limit: 15,
      order: [['id', 'desc']]
    });*/
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
}

/*exports.search = async (req, res) => {
  let query = req.query.q;
  try {
    const questions = await Question.findAll({
      where:{
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + query + "%"
            }
          },
          {
            content: {
              [Op.like]: "%" + query + "%"
            }
          }
        ]
      },
      include: User,
      limit: 15,
      order: [['id', 'desc']]
    });
    res.statsus(200).json({
      success: true,
      questions
    })
  } catch (error) {
    console.error(error);
  }
}*/

exports.goodQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({ where: { id: req.params.id }});
    const user = await Good.findOne({ where: { UserId: req.user.id, QuestionId: req.params.id }});
    /*const question = await Good.findOne({ where: { QuestionId: req.params.id }});*/

    if (!question) {
      return res.status(403).json({ success: false, message: "질문이 존재하지 않습니다"});
    }

    if (user) {
      await Good.destroy({
        where: {
          QuestionId: req.params.id,
          UserId: req.user.id
        }
      });

      return res.status(200).json({
        success: true,
        message: "좋아요 취소 성공"
      });
    }

    await Good.create({
      QuestionId: req.params.id,
      UserId: req.user.id,
    });

    res.status(201).json({ success: true, message: "좋아요 등록 성공" });
  } catch (error) {
    console.error(error);
  }
}

exports.badQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({ where: { id: req.params.id }});
    const user = await Bad.findOne({ where: { UserId: req.user.id, QuestionId: req.params.id }});

    if (!question) {
      return res.status(403).json({ success: false, message: "질문이 존재하지 않습니다"});
    }

    if (user) {
      await Bad.destroy({
        where: {
          QuestionId: req.params.id,
          UserId: req.user.id
        }
      });

      return res.status(200).json({
        success: true,
        message: "싫어요 취소 성공"
      });
    }

    await Bad.create({
      QuestionId: req.params.id,
      UserId: req.user.id,
    });

    res.status(201).json({ success: true, message: "싫어요 등록 성공" });
  } catch (error) {
    console.error(error);
  }
}