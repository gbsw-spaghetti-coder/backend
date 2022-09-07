const Sequelize = require('sequelize');

module.exports = class Answer extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "답변 내용"
      },
      good: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "추천"
      },
      bad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "비추천"
      },
      selection: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'false',
        comment: "채택 여부",
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Answer',
      tableName: 'Answers',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.Answer.belongsTo(db.User);
    db.Answer.belongsTo(db.Question);
  }
};