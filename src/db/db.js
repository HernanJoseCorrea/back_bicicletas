const {Sequelize} = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
  process.env.DB_NAME, // database
  process.env.DB_USER, // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging : false
  }
);

db.authenticate().then(() => {
  console.log('Conectado')
})
.catch((err) => {
  console.log('No conectado');
})

module.exports = db