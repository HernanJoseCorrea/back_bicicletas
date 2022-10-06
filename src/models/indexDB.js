const Persona = require('./persona');
const Cliente = require('./cliente');

const Telefono = require('./telefono');

const Direccion = require('./direccion');

const GestionVentas = require('./gestionVentas');
const InfoVentas = require('./infoVentas');
const Producto = require('./producto');
const Tipo = require('./tipo');

const Inventario = require('./inventario');
const DetalleInventario = require('./detalleInventario');
const Carrito = require('./carrito');


Cliente.belongsTo(Persona, {foreignKey: "IdPersonaFk"});
Persona.hasMany(Cliente, {foreignKey: "IdPersonaFk"});



Direccion.belongsTo(Persona, {foreignKey: "IdPersonaFk"});
Persona.hasOne(Direccion, {foreignKey: "IdPersonaFk"});



Telefono.belongsTo(Persona, {foreignKey: "IdPersonaFk"});
Persona.hasOne(Telefono, {foreignKey: "IdPersonaFk"});



GestionVentas.belongsTo(Persona, {foreignKey: "IdPersonaFk"});
Persona.hasMany(GestionVentas, {foreignKey: "IdPersonaFk"});

InfoVentas.belongsTo(GestionVentas, {foreignKey: "IdGestionVentaFk"});
GestionVentas.hasOne(InfoVentas, {foreignKey: "IdGestionVentaFk"});

InfoVentas.belongsTo(Producto, {foreignKey: "IdProductoFk"});
Producto.hasOne(InfoVentas, {foreignKey: "IdProductoFk"});

Producto.belongsTo(Tipo, {foreignKey: "IdTipoFk"});
Tipo.hasOne(Producto, {foreignKey: "IdTipoFk"});

DetalleInventario.belongsTo(Producto, {foreignKey: "IdProductoFk"});
Producto.hasOne(DetalleInventario, {foreignKey: "IdProductoFk"});

DetalleInventario.belongsTo(Inventario, {foreignKey: "IdInventarioEntradaFk"});
Inventario.hasOne(DetalleInventario, {foreignKey: "IdInventarioEntradaFk"});

Inventario.belongsTo(Persona, {foreignKey: "IdPersonaFk"});
Persona.hasMany(Inventario, {foreignKey: "IdPersonaFk"});

Carrito.belongsTo(Persona, {foreignKey: "IdPersonaFk"});
Persona.hasMany(Carrito, {foreignKey: "IdPersonaFk"});

Carrito.belongsTo(Producto, {foreignKey: "IdProductoFk"});
Producto.hasMany(Carrito, {foreignKey: "IdProductoFk"});

module.exports ={
  Cliente,
  Persona,
  Telefono,
  Direccion,
  GestionVentas,
  InfoVentas,
  Producto,
  Tipo,
  Inventario,
  DetalleInventario,
  Carrito
}