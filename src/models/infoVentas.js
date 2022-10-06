const {DataTypes} = require('sequelize');
const db = require('../db/db');

const InfoVenta = db.define('InformacionVentas',{
  IdInformacionVenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
  },
  IdGestionVentaFk: { // LLAVE FORANEA DE GESTION VENTAS
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdProductoFk: { // LLAVE FORANEA DE PRODUCTO
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});

module.exports = InfoVenta;