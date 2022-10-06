const {Sequelize} = require('sequelize');

const db = new Sequelize(
  'tienda_bicicletas', // database
  'root', // username
  '', // password
  {
    host: 'localhost',
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

module.exports = db;