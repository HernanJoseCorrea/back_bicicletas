const {
  Carrito,
  Producto,
  Tipo,
  DetalleInventario
} = require('../models/indexDB');

const CrearCarrito = async(carr) => {

  try{
    const carrito = await Carrito.create(carr);
    if(carrito){
      return{
        success: true,
        message: "Se ha añadido al carrito correctamente.",
        status: 201
      }
    }
  }catch(err){
    console.log(err);
    return{
      success: false,
      message: "Error al añadir al carrito.",
      status: 500
    }
  }
}

const ObtenerCarritoPorId = async(id) => {
  try{
    const carrito = await Carrito.findAndCountAll({
      where:{
        IdPersonaFk: id
      },
      include:[{
        model: Producto,
        attributes: ["IdProducto","Nombre","CantidadDisponible","ImgUrl"],
        include: {
          model: DetalleInventario,
          attributes: ["Precio"]
        }
      }],

      attributes: ["IdCarrito"]
    });

    if(carrito){
      return{
        success: true,
        res: carrito,
        message: "Ok"        ,
        status: 200
      }
    }
  }catch(e){
    return{
      success: false,
      message: "Error al listar carrito.",
      status: 500
    }
  }
}

module.exports = {
  CrearCarrito,
  ObtenerCarritoPorId
}