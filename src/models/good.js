const Sequelize = require('sequelize');

module.exports = class Good extends Sequelize.Model {
  static init(sequelize) {
    return super.init({

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Good',
      tableName: 'Goods',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.Good.belongsTo(db.User);
    db.Good.belongsTo(db.Question);
  }
};