const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
        validate: {
          isEmail: true,
        },
        unique: true,
        comment: "이메일"
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: "비밀번호",
      },
      nick: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "닉네임",
      },
      profile_img: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'https://spaghetti-listener.s3.ap-northeast-2.amazonaws.com/profile.png',
        comment: "프로필 이미지"
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1000,
        comment: "유저 포인트"
      },
      provider: {
        type : Sequelize.STRING(10),
        allowNull: false,
        defaultValue : 'local',
        comment: "로그인방식",
      },
      role: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "user",
        comment: "유저 권한"
      },
      snsId: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: "sns 아이디",
      },
      introduce: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "자기소개",
      },
      lastlogintime: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: "로그인시간"
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.User.hasMany(db.Question);
    db.User.hasMany(db.Answer);
    db.User.hasMany(db.Good);
    db.User.hasMany(db.Bad);
    db.User.hasMany(db.Selection);
  }
};