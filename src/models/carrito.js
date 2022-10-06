const {DataTypes} = require('sequelize');
const db = require('../db/db');

const Carrito = db.define('Carritos',{
  IdCarrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  IdPersonaFk: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdProductoFk: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});

module.exports = Carrito;