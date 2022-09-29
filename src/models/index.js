const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const User = require('./user');
const Answer = require('./answer');
const Question = require('./question');
const Image = require('./image');
const Good = require('./good');
const Bad = require('./bad');
const Selection = require('./selection');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Question = Question;
db.Answer = Answer;
db.Image = Image;
db.Good = Good;
db.Bad = Bad;
db.Selection = Selection;

User.init(sequelize);
Question.init(sequelize);
Answer.init(sequelize);
Image.init(sequelize);
Good.init(sequelize);
Bad.init(sequelize);
Selection.init(sequelize);

Question.associate(db);
Image.associate(db);
Answer.associate(db);
User.associate(db);
Good.associate(db);
Bad.associate(db);
Selection.associate(db);

module.exports = db;