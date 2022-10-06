const {DataTypes} = require('sequelize');
const db = require('../db/db');

const Inventario = db.define('InventarioEntradas',{
  IdInventarioEntrada: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Fecha: { 
    type: DataTypes.DATE,
  }, 
  NumeroCompra: { 
    type: DataTypes.STRING(15)
  },
  IdPersonaFk: { // LLAVE FORANEA DE PROVEEDOR
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});

module.exports = Inventario;