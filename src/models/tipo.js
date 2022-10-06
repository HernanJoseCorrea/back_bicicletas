const {DataTypes} = require('sequelize');
const db = require('../db/db');

const Tipo = db.define('Tipos',{
  IdTipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Descripcion: { // LLAVE FORANEA DE PERSONA
    type: DataTypes.STRING(45),
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});

module.exports = Tipo;