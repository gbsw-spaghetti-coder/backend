const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const User = require('./user');
const Answer = require('./answer');
const Question = require('./question');
const Image = require('./image');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Question = Question;
db.Answer = Answer;
db.Image = Image;

User.init(sequelize);
Question.init(sequelize);
Answer.init(sequelize);
Image.init(sequelize);

Question.associate(db);
Image.associate(db);
Answer.associate(db);
User.associate(db);


module.exports = db;