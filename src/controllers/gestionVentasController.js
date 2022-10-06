const {
    Cliente,
    Persona,
    TipoDocumento,
    Telefono,
    TipoTelefono,
    Ciudad,
    Direccion,
    GestionVentas,
    InfoVentas,
    Producto,
    Tipo,
    DetalleInventario
} = require('../models/indexDB');
  

const formatErrors = (e, Errors) => {
    const errors = e.errors;
    let objErrors = [];
    
    if(errors){
      Object.entries(errors).map(e => {
        const {path, message} = e[1];
        objErrors.push({path, message});
      })
  
      objErrors = objErrors.concat(Errors);
      return objErrors;
    }else if(Errors.length){
      return Errors;
    }
}


const CrearVenta = async(info) => {

    const Errors = [];

    const {Fecha, Codigo, IdPersonaFk} = info;
    try{
        const ventas = await GestionVentas.create({Fecha, Codigo, IdPersonaFk});
        const {IdGestionVenta} = ventas.dataValues;
        // Crear la venta desde el frontend
        if(ventas !== null){
            await InfoVentas.create({
                Cantidad: info.Cantidad,
                IdGestionVentaFk: IdGestionVenta,
                IdProductoFk: info.IdProductoFk
            });
        }
        // En caso de cumplir las condiciones anteriores, retornamos un mensaje exitoso
        return{
            success: true,
            message: "Compra registrada exitosamente ",
            status: 201
        }
    }catch(e){
        console.log(e); // en caso de errores
        return{
            success: false,
            message: "Error al registrar la compra",
            errors: formatErrors(e, Errors),
            status: 500   
        }
    }
}


// Solo podre ver las ventas, no crear, modificar ni eliminar
const ObtenerVentas = async() => {
    try{
        const ventas = await GestionVentas.findAndCountAll({
            include: [{
                model: Persona,
                attributes:["IdPersona","Documento","PrimerNombre","PrimerApellido"],
                include:[{
                        model: Telefono,
                        attributes: ["Numero"],
                    },
                    {
                        model: Direccion,
                        attributes: ["Carrera","Calle","NombreCalle"]
                    }]
            },
            {
                model: InfoVentas,
                attributes: ["Cantidad"],
                include:{
                    model: Producto,
                    attributes: ["Nombre"]
                }
            }],

            attributes: ["IdGestionVenta","Fecha","Codigo"],
        })
    
        return{
            success: true,
            res: ventas,
            message: "Ok",
            status: 200
        }
    }catch(e){
      console.log(e)
      return{
        success: false,
        message: "Error",
        status: 500
      }
    }
}

// Seria buscar la compra realizada por el usuario
// Admin -> Venta
// Usuario -> Compra
const ObtenerVentasPorId = async(id) => {
    try{
        const ventas = await GestionVentas.findAll({
            where: {
                IdPersonaFk: id
            },
            include: {
                model: InfoVentas,
                attributes: ["Cantidad"],
                include:{
                    model: Producto,
                    attributes: ["Nombre", "ImgUrl"],
                    include:[{
                        model: Tipo,
                        attributes: ["Descripcion"]
                    },{
                        model: DetalleInventario,
                        attributes: ["Precio"] 
                    }]
                }
            },
        
            attributes: ["IdGestionVenta","Fecha","Codigo"],
        });
        if(ventas){
            return{
                success: true,
                res: ventas,
                message: "Ok",
                status: 200
            }
        }
    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error",
            status: 500
        }
    }
}

// Esto descontara la cantidad cuando el producto sea comprado
const ActualizarVentaCantidad = async(id, data) => {
    try{
        const {CantidadDisponible} = data;

        await Producto.update({CantidadDisponible: CantidadDisponible},{
            where: {
                IdProducto: id
            }
        });

        return{
            success: true,
            message: "Se ha actualizado correctamente el producto",
            status: 200
        }

    }catch(e){
        console.log(e)
        return{
            success: false,
            message: "Error al actualizar el producto",
            status: 500
        }
    }
}
  
module.exports = {
    CrearVenta,
    ObtenerVentas,
    ObtenerVentasPorId
}