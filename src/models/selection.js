const Sequelize = require('sequelize');

module.exports = class Selection extends Sequelize.Model {
  static init(sequelize) {
    return super.init({

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Selection',
      tableName: 'Selections',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.Selection.belongsTo(db.User);
    db.Selection.belongsTo(db.Question);
    db.Selection.belongsTo(db.Answer);
  }
};