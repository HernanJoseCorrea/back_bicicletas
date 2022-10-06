const {DataTypes} = require('sequelize');
const db = require('../db/db');

const Cliente = db.define('Clientes',{
  IdCliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  IdPersonaFk: { // LLAVE FORANEA DE PERSONA
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});



module.exports = Cliente;