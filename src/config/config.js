require('dotenv').config();
const env = process.env;

const development = {
  username: "root",
  password: "1234",
  database: "spaghetti_listener",
  host: "localhost",
  dialect: "mysql",
  port: 3307,
  timezone : "+09:00",
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true
  },
  define: {
    timestamps: true
  }
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  //port: env.MYSQL_PORT
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  //port: env.MYSQL_PORT
};

module.exports = { development, production, test };
