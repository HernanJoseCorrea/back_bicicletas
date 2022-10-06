const {DataTypes} = require('sequelize');
const db = require('../db/db');

const DetalleInventario = db.define('DetalleInventarios',{
  IdDetalleInventario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Precio: { 
    type: DataTypes.FLOAT,
  },
  IdInventarioEntradaFk: { // LLAVE FORANEA DE ENTRADA INVENTARIO
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdProductoFk: { // LLAVE FORANEA DE PRODUCTO
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});



module.exports = DetalleInventario;