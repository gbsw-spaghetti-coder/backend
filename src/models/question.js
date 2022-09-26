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
    db.Question.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
    db.Question.hasMany(db.Image); // post.addImages, post.getImages
    db.Question.hasMany(db.Answer); // post.addComments, post.getComments
    db.Question.hasMany(db.Good);
  }
};