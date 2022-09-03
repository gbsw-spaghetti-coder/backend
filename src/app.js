const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();

const passportConfig = require('./passport');
passportConfig();

const { sequelize } = require('./models');

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  secure: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,  // process.env.cookie_secret
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24000 * 60 * 60 * 14 // 14일
  },
}));
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require('./routes/auth');
const oauthRouter = require('./routes/oauth');
const userRouter = require('./routes/user');
const questionRouter = require('./routes/question');
const answerRouter = require('./routes/answer');

app.use('/api/auth', authRouter);
app.use('/api/auth', oauthRouter);
app.use('/api/user', userRouter);
app.use('/api/question', questionRouter);
app.use('/api/answer', answerRouter);

app.listen(3001, () => {
  console.log('app listening on http://localhost:3001');
});
