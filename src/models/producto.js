const {DataTypes} = require('sequelize');
const db = require('../db/db');

const Producto = db.define('Productos',{
  IdProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Nombre: {
    type: DataTypes.STRING(45)
  },
  CantidadDisponible: {
    type: DataTypes.INTEGER
  },
  IdTipoFk: { // LLAVE FORANEA DE TIPO_Producto
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Activo : {
    type : DataTypes.TINYINT,
    defaultValue: 1,
    allowNull : false
  },
  ImgUrl: {
    type: DataTypes.STRING(350)
  },
  Descripcion : {
    type: DataTypes.STRING(450)
  }
},{
  // I don't want createdAt and updatedAt

  createdAt: false,

updatedAt: false,
});

module.exports = Producto;