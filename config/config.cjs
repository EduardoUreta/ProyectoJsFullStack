// Sequelize
require('dotenv').config() 

const envConfig = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "host": process.env.DB_HOST,
  "dialect": "postgres",
  JWT_SECRET: process.env.JWT_SECRET
}

module.exports = envConfig