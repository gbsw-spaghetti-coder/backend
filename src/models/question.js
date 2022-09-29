const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "질문 제목"
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "질문 내용"
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "조회수"
      },
      category: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: "카테고리"
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Question',
      tableName: 'questions',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.Question.belongsTo(db.User);
    db.Question.hasMany(db.Image);
    db.Question.hasMany(db.Answer);
    db.Question.hasMany(db.Good);
    db.Question.hasMany(db.Bad);
    db.Question.hasMany(db.Selection);
  }
};