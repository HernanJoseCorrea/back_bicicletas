const {DataTypes} = require('sequelize');
const db = require('../db/db');

// Direccion contiene llave primaria de persona y codigo postal
const Direccion = db.define('Direcciones',{
  IdDireccion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Carrera: {
    type: DataTypes.STRING(45)
  },
  Calle: {
    type: DataTypes.STRING(45)
  },
  NombreCalle: {
    type: DataTypes.STRING(45)
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

module.exports = Direccion;