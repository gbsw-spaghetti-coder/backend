const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      url: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "사진 url",
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Image',
      tableName: 'Images',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.Image.belongsTo(db.Question);
  }
};