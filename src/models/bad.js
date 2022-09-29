const Sequelize = require('sequelize');

module.exports = class Bad extends Sequelize.Model {
  static init(sequelize) {
    return super.init({

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Bad',
      tableName: 'Bads',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.Bad.belongsTo(db.User);
    db.Bad.belongsTo(db.Question);
  }
};