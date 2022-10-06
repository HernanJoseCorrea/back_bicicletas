const {DataTypes} = require('sequelize');
const db = require('../db/db');

const Persona = db.define('Personas',{
  IdPersona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Documento:{
    type: DataTypes.STRING(10)
  },
  PrimerNombre: {
    type: DataTypes.STRING(45)
  },
  SegundoNombre: {
    type: DataTypes.STRING(45)
  },
  PrimerApellido: {
    type: DataTypes.STRING(45)
  },
  SegundoApellido: {
    type: DataTypes.STRING(45)
  },
  Usuario:{
    type: DataTypes.STRING(145)
  },
  Contrasena: {
    type: DataTypes.STRING(150)
  },
  Administrador : {
    type : DataTypes.TINYINT,
    defaultValue: 0,
    allowNull : false
  },
  Activo : {
    type : DataTypes.TINYINT,
    defaultValue: 1,
    allowNull : false
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});

module.exports = Persona;