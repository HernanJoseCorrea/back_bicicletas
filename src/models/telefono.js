const {DataTypes} = require('sequelize');
const db = require('../db/db');

const Telefono = db.define('Telefonos',{
  IdTelefono: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Numero: { 
    type: DataTypes.STRING(10),
  }, 
  IdPersonaFk: { // LLAVE FORANEA DE PERSONA
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});

module.exports = Telefono;