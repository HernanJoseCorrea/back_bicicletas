const {DataTypes} = require('sequelize');
const db = require('../db/db');

// Direccion contiene llave primaria de ciudad
const GestionVentas = db.define('GestionVentas',{
  IdGestionVenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Fecha: {
    type: DataTypes.DATE
  },
  Codigo: {
    type: DataTypes.STRING(250),
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

module.exports = GestionVentas;